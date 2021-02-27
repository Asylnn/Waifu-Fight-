import getScores from "./osuAPIHandler/getScores"
import manageOsuScore from "./scoreHandler/osu"
import {reducedScore} from './osuAPIHandler/interfaces'

export default async function updateClientScores(socket: any) {

  console.log("requesting scores from", socket.clientIp)

  let scores = await getScores("osu", socket.user, 5)
  let newScores: reducedScore[] = []
  for(const score of scores){
    if(socket.user.lastScoreId < score.id){
      //If the map isn't in pending, wip or graveyard see osuAPI v2 doc
      if([1, 2, 3, 4].includes(score.beatmap.ranked)) //4 is loved, is there any maps that break the combo? (insane kick slider)

      newScores.push(manageOsuScore(socket.user, score)) //Give XP to user and return a reduced score with only important info
    }
  }
  //socket.user.lastScoreId = scores.reduce((higestId, score) => Math.max(higestId, score.id)) uncomment this when finish testing
  socket.emit("updateScores", {scores:newScores, user:socket.user.convertToClient()})
}
