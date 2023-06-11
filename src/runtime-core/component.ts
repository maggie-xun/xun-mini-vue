import { PublicInstanceProxyHandlers } from './componentPublicInstance'

export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupstate: {}
  }
  return component
}
export function setupComponent(instance) {
  // initProps()
  // initSlots()
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance) {
  const component = instance.type

  instance.proxy = new Proxy(
    { _: instance },

    PublicInstanceProxyHandlers
  )
  const { setup } = component
  if (setup) {
    const setupResult = setup()

    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult(instance, setupResult: any) {
  if (typeof setupResult == 'object') {
    instance.setupstate = setupResult
  }

  finishComponentSetup(instance)
}
function finishComponentSetup(instance: any) {
  const component = instance.type

  // if (component.render) {
  instance.render = component.render
  // }
}
