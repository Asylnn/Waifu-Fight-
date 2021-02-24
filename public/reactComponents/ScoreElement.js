const e = React.createElement;

export default class ScoreElement extends React.Component{
  render(){
    let mods = this.props.score.mods.reduce((modCombination, mod) => modCombination + mod)
    return(
      e("p",null, `[${this.props.score.rank}] ${this.props.score.title} +${mods} ${this.props.score.accuracy.toFixed(3)*100}% => ${this.props.score.xp}XP`)
    )
  }
}
