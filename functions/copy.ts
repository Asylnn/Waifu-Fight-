export const copyInstance = (original: any) => Object.assign(Object.create(Object.getPrototypeOf(original)),original)

export function deepCopy(object: any){
  if(object != null){
    if(object.constructor.name != "collection"){
      if(object.constructor.name != "Array") object = copyInstance(object)
      for (let key in object) {
        if(typeof object[key] == "object"){
          object[key] = deepCopy(object[key])
        }
      }
    }
    /*else{
      var col = new collection()
      for (let key of object) {
        typeof key[1] == "object" ? col.set(key[0], deepCopy(key[1])) : col.set(key[0], key[1])
      }
    }*/
  }
  return /*col ||*/ object
}
