import store from '../store'
import MainWrapper from '../components/MainWrapper.jsx'
const route = props => {
  page('*', (ctx, next) => {
    store(state => {
      ReactDOM.render(<MainWrapper {...state}/>, document.getElementById('main'))
    })
    store.load()
  })
  page({hashband: false})
}
module.exports = {route:route}