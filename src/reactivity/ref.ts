import { trackEffects, triggerEffects, isTracking } from './effect'
import { hasChanged, isObject } from '../shared'
import { reactive } from './reactive'
class RefImpl {
  private _value: any
  public dep
  private _rawValue: any
  public __v_isRef = true
  
  constructor(value) {
    this._rawValue = value
    console.log(value, isObject(value))
    this._value = isObject(value) ? reactive(value) : value

    this.dep = new Set()
  }
  get value() {
    isTracking() && trackEffects(this.dep)
    return this._value
  }

  set value(newValue) {
    console.log(newValue, 999)
    if (!hasChanged(newValue, this._rawValue)) return
    this._rawValue = newValue
    this._value = isObject(newValue) ? reactive(newValue) : newValue
    triggerEffects(this.dep)
  }
}
export function ref(value) {
  return new RefImpl(value)
}

export function isRef(value) {
  return !!value.__v_isRef
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref
}
export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    get(target, key) {
      return unRef(Reflect.get(target,key))
    },
    set(target, key, value) {
      if (isRef(target[key]) && !isRef(value)) {
        return target[key].value=value
      } else {
        return Reflect.set(target,key,value)
      }
    }
  })
}
