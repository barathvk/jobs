require('../css/style.sass')
import router from './router.jsx'
import store from '../store'
var main = document.createElement('div')
main.id = 'main'
main.classList.add('main')
main.classList.add('fill')
main.classList.add('flex-column')
document.body.appendChild(main)
router.route()