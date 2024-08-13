import Header from '../../components/header'
import Features from '../../components/features'
import Contact from '../../components/contact'
import sharedStyles from '../../styles/shared.module.css'
import contactStyles from '../../styles/contact.module.css'
export default function Index() {
    return (
        <>
            <Header titlePre="Home" />
            <div className={sharedStyles.layout}>
                <h1>Topics</h1>
                <Features />
            </div>
        </>
    )
}
