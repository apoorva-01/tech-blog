import Header from './header'
import ExtLink from './ext-link'

import sharedStyles from '../styles/shared.module.css'
import contactStyles from '../styles/contact.module.css'

import GitHub from './svgs/github'
import Twitter from './svgs/twitter'
import Envelope from './svgs/envelope'
import LinkedIn from './svgs/linkedin'

const contacts = [
  {
    Comp: Twitter,
    alt: 'twitter icon',
    link: 'https://x.com/apoorva_verma_',
  },
  {
    Comp: GitHub,
    alt: 'github icon',
    link: 'https://github.com/apoorva-01',
  },
  {
    Comp: LinkedIn,
    alt: 'linkedin icon',
    link: 'https://www.linkedin.com/in/apoorva0510/',
  },
  {
    Comp: Envelope,
    alt: 'envelope icon',
    link: 'mailto:vermaapoorva0510@gmail.com',
  },
]

export default function Contact() {
  return (
    <>
      <div className={sharedStyles.layout}>
    
        {/* <h1 style={{ marginTop: 0 }}>Contact</h1> */}

        <div className={contactStyles.name}>
         Apoorva - MTS @{' '}
          <ExtLink href="https://oracle.com">Oracle</ExtLink>
        </div>

        <div className={contactStyles.links}>
          {contacts.map(({ Comp, link, alt }) => {
            return (
              <ExtLink key={link} href={link} aria-label={alt}>
                <Comp height={32} />
              </ExtLink>
            )
          })}
        </div>
      </div>
    </>
  )
}
