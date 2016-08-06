class MainMenu extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className='flex-column list'>
        {
          this.props.data && this.props.data.map((d,i) => {
            return (
              <div className='flex-row flex-center-align item' key={i}>
                {d.title}
              </div>
            )
          })
        }
      </div>
    )
  }
}
export default MainMenu