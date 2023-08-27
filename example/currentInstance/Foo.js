import { h, getCurrentInstance } from "../../lib/guide-mini-vue.esm.js";
export const Foo = {
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    console.log(instance,'foo');
  },
  render() {
    return h("div", {}, [Foo]);
  },
};
