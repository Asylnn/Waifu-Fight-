const {getScores} = require("./osuAPIHandler/getScores")

const updateClientScores = async function(socket) {

  let scores = await getScores("osu", socket.user, 5)
  let newScores = []
  scores.forEach(score => {
    if(socket.user.lastScoreId < score.id){
      newScores.push(score)
      socket.user.giveXP(1)
    }
  });
  //socket.user.lastScoreId = scores.reduce((higestId, score) => Math.max(higestId, score.id))
  socket.emit("updateScores", {scores:newScores, user:socket.user.convertToClient()})
}

exports.updateClientScores = updateClientScores
