const publicPropertiesMap = {
  $e: i => i.vnode.el
}
export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { setupstate } = instance
    if (key in setupstate) {
      return setupstate[key]
    }

    const publicGetter = publicPropertiesMap[key]
    if (publicGetter) {
      return publicGetter(instance)
    }
  }
}
