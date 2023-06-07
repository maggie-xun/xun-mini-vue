import { extend, isObject } from '../shared'
import { track, trigger } from './effect'
import { reactive, ReactiveFlags, readonly } from './reactive'

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)
function createGetter(isReadonly = false, isShallow = false) {
  return function get(target, key) {
    console.log(target, key, 77777)
    if (key == ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key == ReactiveFlags.IS_READONLY) {
      return isReadonly
    }

    const res = Reflect.get(target, key)
    if (isShallow) return res
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }
    //依赖收集
    !isReadonly && track(target, key)
    return res
  }
}

function createSetter() {
  return function (target, key, value) {
    const res = Reflect.set(target, key, value)
    // 触发依赖
    trigger(target, key)
    return res
  }
}
export const mutableHandler = {
  get,
  set
}

export const readonlyHandler = {
  get: readonlyGet,
  set() {
    console.warn('set失败')
    return true
  }
}
export const shallowReadonlyHandler = extend({}, readonlyHandler, {
  get: shallowReadonlyGet
})
