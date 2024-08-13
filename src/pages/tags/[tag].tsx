import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from '../../components/header'
import blogStyles from '../../styles/blog.module.css'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import getPageData from '../../lib/notion/getPageData'
import { getBlogLink, getDateStr } from '../../lib/blog-helpers'
import sharedStyles from '../../styles/shared.module.css'
interface Post {
  id: string
  Date: string
  Page: string
  Tags: string; // Assuming Tags can be a string or an array of strings
  Published: string
  Slug: string
  content?: any[]
}

interface Props {
  posts: Post[]
  tag: string
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { tag } = params as { tag: string }
  const postsTable = await getBlogIndex()

  const filteredPosts = Object.values(postsTable)
  .filter((post: Post) => {
    // Split tags if they are a comma-separated string
    const tagsArray =
      typeof post.Tags === 'string' ? post.Tags.split(',') : (post.Tags || []);
    return (
      tagsArray
        .map((tag) => tag.toLowerCase().trim()) // Convert all tags to lowercase and trim whitespace
        .includes(tag.toLowerCase()) && post.Published === 'Yes'
    );
  })
  .map((post: Post) => ({
    ...post,
    content: [], // Optionally include content if needed
  }));

  return {
    props: {
      posts: filteredPosts,
      tag,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsTable = await getBlogIndex()
  const tags = new Set<string>()

  Object.values(postsTable).forEach((post) => {
    const postWithTags = post as Post; // Type assertion
    if (postWithTags.Tags) {
      postWithTags.Tags.split(',').forEach((tag) => tags.add(tag.trim()));
    }
  });
  
  const paths = Array.from(tags).map((tag) => ({
    params: { tag },
  }));

  return {
    paths,
    fallback: true,
  }
}

const TagPage: NextPage<Props> = ({ posts, tag }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header titlePre="Blog" />

      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        {/* If No Posts Found */}
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}

        <h1 style={{ fontSize: "1em",fontWeight: 600}}>Tag:&nbsp; <span className={blogStyles.tagchip} style={{ fontSize: "1em",fontWeight: 600}}>{tag.toUpperCase()}</span> </h1>
        {/* Listing Posts */}
        {posts.map((post) => {
          const date = new Date(post.Date)
          const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
          return (
            <div className={blogStyles.postPreview} key={post.Slug}>
              <h3>
                <span className={blogStyles.titleContainer}>
                  {!post.Published && (
                    <span className={blogStyles.draftBadge}>Draft</span>
                  )}

                  <div className={blogStyles.arrow}>»</div>

                  <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                    <a style={{ fontSize: '0.8em', fontWeight: 600 }}>
                      {post.Page}
                    </a>
                  </Link>

                  {post.Date && (
                    <div
                      className={blogStyles.dateContainer}
                      style={{ fontSize: '0.7em', fontWeight: 400 }}
                    >
                      {formattedDate}
                    </div>
                  )}
                </span>
              </h3>

              {/* {post.Authors.length > 0 && (
                <div className="authors">By: {post.Authors.join(' ')}</div>
              )} */}

              {/* Tags Added by me */}
              {post.Tags.length > 0 && (
                <div className={blogStyles.tags}>
                  {post.Tags.split(',').map((tag) => (
                       <Link key={tag} href={`/tags/${tag.toLowerCase()}`}><p className={blogStyles.tagchip}>{tag}</p></Link>
                  ))}
                </div>
              )}
              {/* <p>
                {(!post.preview || post.preview.length === 0) &&
                  'No preview available'}
                {(post.preview || []).map((block, idx) =>
                  textBlock(block, true, `${post.Slug}${idx}`)
                )}
              </p> */}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default TagPage
