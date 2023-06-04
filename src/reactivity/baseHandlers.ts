import { track, trigger } from './effect'
import { ReactiveFlags } from './reactive'

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
function createGetter(isReadonly = false) {
  return function get(target, key) {
    console.log(key)
    if (key == ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    }
    if (key == ReactiveFlags.IS_READONLY) {
      return true
    }

    const res = Reflect.get(target, key)
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
  readonlyGet,
  set() {
    console.warn('set失败')
    return true
  }
}
