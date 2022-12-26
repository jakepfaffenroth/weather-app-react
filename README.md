This is a React port of an older Vue project.

Converting the Vue project to React required:
- modifying components to use JSX rather than Vue's single-file-components
- modifying props, event handlers, and bindings to use React's syntax
- replacing Vue's `v-for`directive with array mapping to render lists
- modifying Vue watchers, computed properties, and methods into pure javascript functions
- replacing Vuex state, getters, and setters with React's useState hook
- replacing Vue's lifecycle hooks with React's useEffect hook
