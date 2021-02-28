import ScoreElement from './ScoreElement.js'
import CheckboxGamemode from './CheckboxGamemode.js'
//import reducedScore from './osuAPIHandler/interfaces'

interface props {
  scores : any[]
}

interface state {
}

console.log(window)
console.log(window.activeGamemode)
console.log(activeGamemode)






export default class ScoresDisplay extends React.Component<props, state>{

  constructor(props: any){
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event: any){
    const {name, checked} = event.target
    activeGamemode[name] = checked
    this.forceUpdate()
  }

  render(){
    const scoreElements = this.props.scores.map((score :any) => <ScoreElement key = {score.reactMapId} score = {score}/>)
    let style = { // Move this to dedicated css file ?
      padding: "15",
      paddingTop: "20px",
      paddingBottom: "20px",
      borderRadius:"25px",
      backgroundColor: "#646464",
      display:"flex",
      flexDirection: "column" as "column", //workaround to ts bug
      alignItems: "center",
      justifyContent: "space-between",
      position: "absolute" as "absolute", //workaround to ts bug
      top:"100px"
    }

    let styleBox = {
      display:"flex"
    }

    return (
      <div style = {style}>
        <div style = {styleBox}>
          <CheckboxGamemode checked = {activeGamemode.osu} gamemode = "osu" handleChange={this.handleChange} />
          <CheckboxGamemode checked = {activeGamemode.mania} gamemode = "mania" handleChange={this.handleChange} />
          <CheckboxGamemode checked = {activeGamemode.taiko} gamemode = "taiko" handleChange={this.handleChange} />
          <CheckboxGamemode checked = {activeGamemode.fruits} gamemode = "fruits" handleChange={this.handleChange} />
        </div>
        <div>
          {scoreElements}
        </div>
      </div>
    )
  }

}
