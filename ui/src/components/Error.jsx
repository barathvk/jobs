class Error extends React.Component {
  render() {
    var smtext =  this.props.small ? ' small':''
    return (      
      <div className={'error flex-column fill flex-center ' + this.props.className + smtext}>
        <FA name='exclamation'/>
        <div>{this.props.message || 'Error'}</div>
      </div>
    )
  }
}
export default Error