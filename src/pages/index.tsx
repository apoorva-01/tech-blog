import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Features from '../components/features'
import Contact from '../components/contact'
import sharedStyles from '../styles/shared.module.css'
import contactStyles from '../styles/contact.module.css'
export default function Index() {
  return (
    <>
      <Header titlePre="Home" />
      <div className={sharedStyles.layout}>
     
      <div className={contactStyles.avatar}>
          <img style={{borderRadius: '50%',height:200}} src="/me.jpg" alt="apoorva" height={80} />
        </div>

        <h1>Hi,  I'm Apoorva</h1>
        <h2>
        A personal blog focused on Software Development
        </h2>
        <Contact/>
        {/* <Features /> */}


      </div>
    </>
  )
}
