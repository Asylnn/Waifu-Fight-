import getScores from "../osuAPIHandler/getScores"
import APIscoreToRegularScore from '../scoreHandler/APIscoreToRegularScore'
import scoreToXP from '../scoreHandler/scoreToXP'
import Score from '../classes/score'
import {mods} from '../osuAPIHandler/interfaces'

export default async function updateClientScores(socket: any, gamemode:mods): Promise<void> {

  console.log("requesting scores from", socket.clientIp, "gamemode is", gamemode)
  const APIscores = await getScores(gamemode, socket.user.id, 5)
  let scores: Score[] = []
  console.log(APIscores)
  for(const score of APIscores as any){                         // v If the map isn't in pending, wip or graveyard see osuAPI v2 doc
    if(socket.user.lastScoreId < score.id && [1, 2, 3, 4].includes(score.beatmap.ranked)){
      console.log("handling score...")
                            // ^ The user didn't do the map
        //4 is loved, is there any maps that break the combo? (insane kick slider)
      const regularScore = APIscoreToRegularScore(score)
      const xp = scoreToXP(regularScore)
      socket.user.incrementPlayCount(gamemode)
      socket.user.giveXP(xp)
      regularScore.xp = xp
      scores.push(regularScore)
    }
  }

  //socket.user.lastScoreId = scores.reduce((higestId, score) => Math.max(higestId, score.id)) uncomment this when finish testing
  socket.emit("updateScores", {scores, user:socket.user.convertToClient()})
}
