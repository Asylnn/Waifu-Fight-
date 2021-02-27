// @ts-nocheck To ignore all "import React Erros"
import ScoreElement from './ScoreElement.js'
//import reducedScore from './osuAPIHandler/interfaces'

interface props {
  scores : any[]
}

const ScoresDisplay : React.FC<props> = function(props){
  const scoreElements = props.scores.map(score => <ScoreElement key = {score.reactMapId} score = {score}/>)

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
    height:"65px",
    position: "absolute" as "absolute", //workaround to ts bug
    top:"100px"
  }

  return <div style = {style}>{scoreElements}</div>
}

export default ScoresDisplay
