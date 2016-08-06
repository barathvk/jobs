import SplitPanel from 'react-split-panel'
import WordCloud from 'wordcloud/src/wordcloud2'
import Error from './Error.jsx'
class MainView extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
    this.loadCloud = data => {
      setTimeout(() => {        
        var clouddata = []
        data.tags.map(d => clouddata.push([d.value,d.count])) 
        WordCloud(document.getElementById('cloud'), { 
          list: clouddata , 
          clearCanvas: true, 
          fontFamily: 'BlinkMacSystemFont',
          gridSize: Math.round(16 * $('#cloud').width() / 1024),
          weightFactor: function (size) {
            return Math.pow(size, 1.7) * $('#cloud').width() / 1024;
          },
          color: function (word, weight) {
            return (weight > 6) ? '#F5D76E' : '#4FC1E9';
          },
          backgroundColor: '#434A54'
        })
      }, 100)      
    }
  }
  componentDidMount() {
    var data = this.props.data.filter(d => d._id == this.props.ctx.pathname.replace('/',''))[0]
    if (data) this.loadCloud(data)
  }
  componentWillReceiveProps(props) {
    var data = props.data.filter(d => d._id == props.ctx.pathname.replace('/',''))[0]
    if (data) this.loadCloud(data)
  }  
  render() {
    var data = this.props.data.filter(d => d._id == this.props.ctx.pathname.replace('/',''))[0]
    if (data) {
      var html = data.html.replace(/\<img(.*)\/\>/g,'')
    }    
    return (
      <div className='flex-column fill'>
        {
          data && (
            <SplitPanel direction='vertical' defaultWeights={[50,50]}>
              <div className='fill flex-column job-body'>
                <h4>
                  <FA name='star'/>
                  Details
                </h4>
                <div className='text fill' dangerouslySetInnerHTML={{__html:html}}/>
              </div>
              <div className='fill flex-column tag-cloud'>
                <h4>
                  <FA name='cloud'/>
                  Word Cloud
                </h4>
                <div className='fill flex-column'>
                  <div id='cloud' className='cloud fill canvas'></div>
                </div>
              </div>
            </SplitPanel>
          )
        }
        {
          !data && (
            <Error message='Please select a job listing'/>
          )
        }
      </div>      
    )
  }
}
export default MainView