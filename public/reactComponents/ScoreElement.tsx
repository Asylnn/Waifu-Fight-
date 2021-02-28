interface props {
  score: any
}

const ScoreElement : React.FC<props> = function(props){

  let mods = props.score.mods.reduce((modCombination: string, mod: string) => modCombination + mod, '')
  return(
    <p>{`[${props.score.rank}] ${props.score.title} +${mods} ${props.score.accuracy.toFixed(3)*100}% => ${props.score.xp}XP`}</p>
  )

}

export default ScoreElement
