import {cemalize,toHandlerKey} from '../shared/index'
export function emit(instance, event, ...args) {
  console.log('event ' + event)
  const { props } = instance

  console.log(props)

  //TPP  先去写一个特定行为，再重构成通用行为
  const handler = props[cemalize(toHandlerKey(event))]

  handler && handler(...args)
}
