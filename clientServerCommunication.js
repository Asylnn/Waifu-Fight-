const {getScores} = require("./osuAPIHandler/getScores")
const {manageOsuScore} = require("./scoreHandler/osu")


const updateClientScores = async function(socket) {

  console.log("requesting scores from", socket.clientIp)

  let scores = await getScores("osu", socket.user, 5)
  let newScores = []
  scores.forEach(score => {
    if(socket.user.lastScoreId < score.id){
      console.log("managing scores...")
      //If the map isn't in pending, wip or graveyard see osuAPI v2 doc
      if([1, 2, 3, 4].includes(score.beatmap.ranked)) //4 is loved, is there any maps that break the combo? (insane kick slider)
      newScores.push(manageOsuScore(socket.user, score)) //Give XP to user and return a reduced score with only important info
    }
  });
  //socket.user.lastScoreId = scores.reduce((higestId, score) => Math.max(higestId, score.id)) uncomment this when finish testing
  socket.emit("updateScores", {scores:newScores, user:socket.user.convertToClient()})
}

exports.updateClientScores = updateClientScores
