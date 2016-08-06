import swal from 'sweetalert'
import 'sweetalert/dist/sweetalert.css'
import store from '../store'
class MainMenu extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
    this.delete = e => {
      swal(
        {
          title: 'Are You Sure?',
          text: 'Are you sure you want to delete this link?',
          showCancelButton: true,
          closeOnConfirm: false
        },
        () => {
          axios.delete(`/api/${e._id}/${e._rev}`).then(resp => {
            swal('Deleted!', `${e.title} has been deleted`, 'success')
            setTimeout(() => {
              store.load()
            }, 100)
          }).catch(err => {
            swal('Failed to delete', err, 'error')
          })
        }
      )
    }
    this.addLink = () => {
      swal({
        title: 'Add a Link',
        showCancelButton: true,
        confirmButtonText: 'Add Link',
        closeOnConfirm: false,
        type: 'input',
        inputPlaceholder: 'Please paste a link',
      }, value => {
        if (!value) {
          swal('Failed to Add','A link is required', 'error')
        }
        else {
          axios.post('/api', {link: value}).then(resp => {
            swal('Link Added', `The new link ${value} was added`,'success')
            setTimeout(() => {
              store.load()
            }, 100)
          }).catch(err => {
            swal('Failed to Add',err, 'error')
          })
        }        
      })
    }
  }
  render() {
    return (
      <div className='flex-column list'>
        <div className='flex-row flex-center-align item heading'>
          <h4>
            <FA name='fire'/>
            Jobs
          </h4>
        </div>
        {
          this.props.data && this.props.data.map((d,i) => {
            return (
              <div className={cn('flex-row flex-center-align item', {active: this.props.ctx.pathname == '/'+d._id})} key={i}>
                <a className={cn('flex-row flex-center-align fill')} href={'/' + d._id}>
                  <img src={d.favicon}/>
                  <span className='title truncate fill'>{d.title}</span>
                </a>
                <a href={d.href} target='_BLANK'>
                  <FA name='link'/>
                </a>
                <a onClick={this.delete.bind(this, d)}>
                  <FA name='times'/>
                </a>                
              </div>
            )
          })
        }
        <a className={cn('flex-row flex-center-align item add-link')} onClick={this.addLink}>
          <FA name='plus'/>
          <span className='title truncate fill'>Add Link</span>
        </a>
      </div>
    )
  }
}
export default MainMenu