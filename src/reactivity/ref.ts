import { trackEffects, triggerEffects, isTracking } from './effect'
import { hasChanged, isObject } from '../shared'
import { reactive } from './reactive'
class RefImpl {
  private _value: any
  public dep
  private _rawValue: any
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
