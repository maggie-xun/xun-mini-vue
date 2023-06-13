export const extend = Object.assign

export const isObject = val => {
  return val != null && typeof val == 'object'
}

export const hasChanged = (newValue, val) => {
  console.log(newValue, val)
  return !Object.is(newValue, val)
}

export function hasOwn(props: any, key: any) {
  return Object.prototype.hasOwnProperty.call(props, key)
}
