import { h, provider, inject } from "../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  name: "App",
  render() {
    return h("div", {}, [h("div", {}, "apiInject"), h(Provider)]);
  },
  setup() {
    return {};
  },
};

const Provider = {
  name: "Provider",
  setup() {
    provider("foo", "fooVal");
    provider("bar", "barVal");
  },
  render() {
    return h("div", {}, [h("p", {}, "Provider"), h(Provider2)]);
  },
};

const Provider2 = {
  name: "Provide2r",
  setup() {
    provider("foo", "foo2");
    const foo = inject("foo");
    return { foo };
  },
  render() {
    return h("div", {}, [h("p", {}, `Provider2${this.foo}`), h(Consumer)]);
  },
};

const Consumer = {
  name: "Consumer",
  setup() {
    const foo = inject("foo");
    const bar = inject("bar");
    const baz = inject("baz", ()=>"bazDefault");
    return { foo, bar, baz };
  },
  render() {
    return h("div", {}, `Consumer-${this.foo}-${this.bar}-${this.baz}`);
  },
};
