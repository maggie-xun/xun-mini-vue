import { hasOwn } from "../shared/index";

const publicPropertiesMap = {
  $e: i => i.vnode.el,
  $slots: i => i.slots,
};
export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { setupstate, props } = instance;
    if (key in setupstate) {
      return setupstate[key];
    }

    if (hasOwn(setupstate, key)) {
      return setupstate[key];
    } else if (hasOwn(props, key)) {
      return props[key];
    }

    const publicGetter = publicPropertiesMap[key];
    if (publicGetter) {
      return publicGetter(instance);
    }
  },
};
