export default function getHeaders(access_token: string){
  return {'authorization':`Bearer ${access_token}`}
}
