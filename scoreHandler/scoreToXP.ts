import osuScoreToXP from './osuScoreToXP'
import taikoScoreToXP from './taikoScoreToXP'
import maniaScoreToXP from './maniaScoreToXP'
import fruitsScoreToXP from './fruitsScoreToXP'

import Score from '../classes/score'

export default function scoreToXP(score: Score){
  let xp: number
  switch(score.gamemode){
    case 'osu':
      xp = osuScoreToXP(score)
      break
    case 'fruits':
      xp = taikoScoreToXP(score)
      break
    case 'mania':
      xp = maniaScoreToXP(score)
      break
    case 'taiko':
      xp = fruitsScoreToXP(score)
      break
  }
  return xp
}
