import {OSU_API_URL} from '../files/config.json'
import axios from 'axios'
import {ipAddr} from '../levelExtention'
import getHeaders from './getHeaders'


export default function deleteTokens(socket: any){ //This doesn't work for watever reason
  axios.delete(OSU_API_URL + "oauth/tokens/current", {headers:getHeaders((global as any).selfTokens.access_token)}).then(() => {
    ipAddr.put(socket.clientIp, -1)
  }).catch(error => {
    socket.emit("error", {errorNumber:4})
    console.error(error)
  })
}
