import { getCurrentInstance } from "./component";

export function provider(key, value) {
  const currentInstance: any = getCurrentInstance();
  if (currentInstance) {
    let { providers } = currentInstance;
    const parentProvides = currentInstance.parent.providers;
    console.log(providers, parentProvides);
    // if (providers === parentProvides) {
    //   console.log("jjj");
    //   providers = currentInstance.provides = Object.create(parentProvides);
    // }
    providers[key] = value;
  }
}
export function inject(key, defaultValue) {
  const currentInstance: any = getCurrentInstance();
  if (currentInstance) {
      const parentProvides = currentInstance.parent.providers;
    if (key in parentProvides) {
      return parentProvides[key];
    } else if (defaultValue) {
      if (typeof defaultValue === "function") {
        return defaultValue();
      } else {
        return defaultValue;
      }
    }
  }
}
