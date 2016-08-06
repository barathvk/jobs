import SplitPanel from 'react-split-panel'
import MainView from './MainView.jsx'
import MainMenu from './MainMenu.jsx'
import store from '../store'
class MainWrapper extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    store.load()
  }  
  render() {
    return (
      <div className='fill flex-column'>
        {
          this.props.loading && (
            <div className='flex-column fill loading'></div>
          )
        }
        {
          !this.props.loading && (
            <SplitPanel direction='horizontal' defaultWeights={[20,80]} className='fill'>
              <MainMenu {...this.props}/>
              <MainView {...this.props}/>
            </SplitPanel>
          )
        }
      </div>
    )
  }
}
export default MainWrapper