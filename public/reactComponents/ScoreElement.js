const e = React.createElement;

export default class ScoreElement extends React.Component{
  render(){
    let mods = this.props.score.mods.reduce((modCombination, mod) => modCombination + mod)
    return(
      e("p",null, `[${this.props.score.rank}] ${this.props.score.beatmapset.title} +${mods} (${this.props.score.accuracy.toFixed(3)*100}acc) => +1XP`)
    )
  }
}
