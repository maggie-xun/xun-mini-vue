import {
  mutableHandler,
  readonlyHandler
  // shallowReadonlyHandler
} from './baseHandlers'

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly'
}

export function reactive(raw) {
  return createActiveObject(raw, mutableHandler)
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandler)
}

export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE]
}

// export function shallowReadonly(raw) {
//   return createActiveObject(raw, shallowReadonlyHandler)
// }
export function isReadonly(value) {
  console.log(value, 5555)
  return !!value[ReactiveFlags.IS_READONLY]
}

export function isProxy(value) {
  return isReactive(value) || isReadonly(value)
}

function createActiveObject(raw: any, baseHandlers) {
  console.log(baseHandlers, 444)
  return new Proxy(raw, baseHandlers)
}
