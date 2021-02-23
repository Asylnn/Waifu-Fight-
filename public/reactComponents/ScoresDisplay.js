const e = React.createElement;
import ScoreElement from './scoreElement.js'

export default class ScoresDisplay extends React.Component{

  render(){
    const scoreElements = this.props.scores.map(score => e(ScoreElement, {key:score.id, score:score}))

    let style = {
      padding: "15",
      paddingTop: "20px",
      paddingBottom: "20px",
      borderRadius:"25px",
      backgroundColor: "#646464",
      display:"flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      height:"65px",
      position: "absolute",
      top:"100px"
    }

    return (
      e("div", {style:style},
        scoreElements
      )
    )
  }
}
