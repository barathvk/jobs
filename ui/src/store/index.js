import Hover from 'hover'
const actions = {  
  load: state => {
    state.loading = true    
    return state
  },
  reset: state => initialState,
  done: (state, newstate) => {
    newstate.loading = false
    return newstate
  }
}
const initialState = {}
const store = Hover(actions, initialState)
export default store