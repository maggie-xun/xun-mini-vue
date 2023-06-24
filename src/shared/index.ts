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

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export const toHandlerKey = (str: string) => {
  return str ? 'on' + capitalize(str) : ''
}

export const cemalize = (str: string): string => {
  return str.replace(/-(\w)/g, (_, c: string) => {
    return c ? c.toUpperCase() : ''
  })
}
