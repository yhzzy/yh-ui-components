import * as components from './components';

const VuePlugin = {
  install(Vue) {
    // eslint-disable-next-line no-restricted-syntax
    for (const component in components) {
      if (component) {
        Vue.component(`yh${component}`, components[component]);
      }
    }
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuePlugin);
}

export default VuePlugin;
