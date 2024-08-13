import Lightning from './svgs/lightning'
import Jamstack from './svgs/jamstack'
import Wifi from './svgs/wifi'
import Lighthouse from './svgs/lighthouse'
import Plus from './svgs/plus'
import Notion from './svgs/notion'
import Edit from './svgs/edit'
import Scroll from './svgs/scroll'

const features = [
  {
    text: 'Linux',
    path: './linux.svg',
  },
  {
    text: 'Git',
    path:  './git.svg'
  },
  {
    text: 'Bash',
    path: './bash.svg'
  }
]

const Features = () => (
  <div className="features">
    {features.map(({ text, path: Icon }) => (
      <div className="feature" key={text}>
        <img style={{height:30}} src={Icon} alt="apoorva" />
        <h4>{text}</h4>
      </div>
    ))}
  </div>
)

export default Features
