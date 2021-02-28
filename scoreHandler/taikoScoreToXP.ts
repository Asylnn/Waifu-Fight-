import Score from '../classes/score'

export default function taikoScoreToXP({difficulty, length, maxComboMap, accuracy, maxCombo, mods}:Score): number{
  let multiplicator = 1


  if(mods.includes("DT") || mods.includes("NC")){difficulty *= 1.35; length /= 1.5}
  if(mods.includes("HF")){difficulty *= 1/1.35; length *= 1.5}
  if(mods.includes("FL")){multiplicator *= 1 + (-1.5 + Math.pow(1.5, difficulty))*(Math.min(1.5, maxCombo/200))}
  if(mods.includes("HD")){multiplicator *= 1.15}
  if(mods.includes("EZ")){multiplicator *= 0.58*Math.pow(1.15, difficulty)}
  if(mods.includes("HR")){multiplicator *= 1.4}

  multiplicator *= (length/100)*Math.pow(Math.pow(4, 1/60), length/60)

  return Math.floor(16*multiplicator*Math.pow(1.6, difficulty)*Math.pow(accuracy, 2.5)*Math.sqrt(maxCombo/maxComboMap))
}
