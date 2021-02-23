let getStyleProperty = (node, property) => {
  return window.getComputedStyle(node).getPropertyValue(property)
}

export default getStyleProperty
