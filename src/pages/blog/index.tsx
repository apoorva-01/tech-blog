import Link from 'next/link'
import Header from '../../components/header'

import blogStyles from '../../styles/blog.module.css'
import sharedStyles from '../../styles/shared.module.css'

import {
  getBlogLink,
  getDateStr,
  postIsPublished,
} from '../../lib/blog-helpers'
import { textBlock } from '../../lib/notion/renderers'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getBlogIndex from '../../lib/notion/getBlogIndex'

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex()

  const authorsToGet: Set<string> = new Set()
  const posts: any[] = Object.keys(postsTable)
    .map((slug) => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!preview && !postIsPublished(post)) {
        return null
      }
      post.Authors = post.Authors || []
      for (const author of post.Authors) {
        authorsToGet.add(author)
      }
      return post
    })
    .filter(Boolean)

  const { users } = await getNotionUsers([...authorsToGet])

  posts.map((post) => {
    post.Authors = post.Authors.map((id) => users[id].full_name)
  })

  return {
    props: {
      preview: preview || false,
      posts,
    },
    revalidate: 10,
  }

}



const Index = ({ posts = [], preview }) => {
  console.log("posts", posts)

  return (
    <>
      <Header titlePre="Blog" />
      {preview && (
        <div className={blogStyles.previewAlertContainer}>
          <div className={blogStyles.previewAlert}>
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview`}>
              <button className={blogStyles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}

      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        {/* If No Posts Found */}
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}

        {/* Listing Posts */}
        {posts.map((post) => {
          const date = new Date(post.Date);
          const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
          return (
            <div className={blogStyles.postPreview} key={post.Slug}>

              <h3>

                <span className={blogStyles.titleContainer}>
                  {!post.Published && (
                    <span className={blogStyles.draftBadge}>Draft</span>
                  )}

                  <div className={blogStyles.arrow} >»</div>

                  <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                    <a style={{ fontSize: "0.8em", fontWeight: 600 }} >{post.Page}</a>
                  </Link>

                  {post.Date && (
                    <div className={blogStyles.dateContainer} style={{ fontSize: "0.7em", fontWeight: 400 }}>
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
                  {post.Tags.split(',').map(tag => (
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

export default Index
