
const tempReact = window.React
// @ts-ignore
const tempReactDOM = window.ReactDOM


var activeGamemode_ = {
  osu:true,
  taiko:false,
  mania:false,
  fruits:false
}

declare global {
  var activeGamemode: typeof activeGamemode_
  var React: typeof React
  var ReactDOM: typeof ReactDOM
}


window.activeGamemode = activeGamemode_
// @ts-ignore
window.ReactDOM = tempReactDOM
window.React = tempReact


const callingReactWorkAround = 42069
export default callingReactWorkAround
