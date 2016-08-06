import store from '../store'
import MainWrapper from '../components/MainWrapper.jsx'
import Error from '../components/Error.jsx'
const route = props => {
  page('*', (ctx, next) => {
    store(state => {
      ReactDOM.render(<MainWrapper {...state} ctx={ctx}/>, document.getElementById('main'))
    })
  })
  page({hashband: false})
}
module.exports = {route:route}