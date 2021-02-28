import {reducedScore} from '../osuAPIHandler/interfaces'
import User from '../classes/user'

export default function manageOsuScore(user:User, score:any): reducedScore{

  user.incrementPlayCount("osu")

  let difficulty =  score.beatmap.difficulty_rating
  let length = score.beatmap.hit_length
  let maxComboMap = score.beatmap.count_circles + score.beatmap.count_sliders + score.beatmap.count_spinners
  let accuracy = score.accuracy
  let maxCombo = score.max_combo
  let mods = score.mods
  let multiplicator = 1


  if(mods.includes("DT") || mods.includes("NC")){difficulty *= 1.35; length /= 1.5}
  if(mods.includes("HF")){difficulty *= 1/1.35; length *= 1.5}
  if(mods.includes("FL")){multiplicator *= 1 + (-1.5 + Math.pow(1.5, difficulty))*(Math.min(1.5, maxCombo/200))}
  if(mods.includes("HD")){multiplicator *= 1.15}
  if(mods.includes("EZ")){multiplicator *= 0.58*Math.pow(1.15, difficulty)}
  if(mods.includes("HR")){multiplicator *= 1.4}


  multiplicator *= (length/100)*Math.pow(Math.pow(4, 1/60), length/60)
  console.log("multiplicator", multiplicator)
  console.log("difficulty", difficulty)
  console.log("length", length)
  console.log("accuracy", accuracy)
  console.log("maxCombo", maxCombo)
  console.log("maxComboMap", maxComboMap)
  console.log("xp-difficulty", Math.pow(1.6, difficulty))
  console.log("xp-accuracy", Math.pow(accuracy, 2.5))
  console.log("xp-combo", Math.sqrt(maxCombo/maxComboMap))
  let xp = Math.floor(16*multiplicator*Math.pow(1.6, difficulty)*Math.pow(accuracy, 2.5)*Math.sqrt(maxCombo/maxComboMap))

  console.log(xp)
  user.giveXP(xp)
  let reducedScore = {
    difficulty:difficulty,
    length:length,
    maxCombo:maxCombo,
    maxComboMap:maxComboMap,
    accuracy:accuracy,
    title:score.beatmapset.title,
    rank:score.rank,
    mods:mods,
    reactMapId:score.id,
    xp:xp
  }
  return reducedScore
}
