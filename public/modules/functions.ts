export default function getStyleProperty(node: any, property: any): any {
  return window.getComputedStyle(node).getPropertyValue(property)
}
