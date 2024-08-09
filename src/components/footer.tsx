import ExtLink from './ext-link'

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <footer style={{position:'relative', bottom:0, width:'100%', textAlign:'center', padding:'0px',backgroundColor:'#f5f5f5', color:'#000000', fontSize:'14px', lineHeight:'1.5', fontFamily:'sans-serif', fontStyle:'normal', letterSpacing:'0px',  marginTop:'20px'}} >
        <span>
        © {year} Apoorva Verma all rights reserved
        </span>
        <br/>
        <span>
       Made with Notion + Next.JS
        </span>
      </footer>
    </>
  )
}
