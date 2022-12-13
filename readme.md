# React Autoroute

[NextJS](https://nextjs.org/docs/routing/introduction)/RemixJS/SvelteKit inspired auto routing based on filesystem layout using [Vite](https://vitejs.dev) [glob imports](https://vitejs.dev/guide/features.html#glob-import). Currently supports [React Router](https://reactrouter.com/en/main) only. [TanStack Router](https://tanstack.com/router/v1) support will be added later when reaching a more mature phase.

![Test](https://github.com/sebastian-software/react-autoroute/actions/workflows/test.yml/badge.svg)
![Deploy](https://github.com/sebastian-software/react-autoroute/actions/workflows/deploy.yml/badge.svg)
![npm](https://img.shields.io/npm/v/react-autoroute)

- [Demo](https://sebastian-software.github.io/react-autoroute/index.html)

## Features

- Auto glob matching of `routes/**` (NextJS uses `pages/**` which is not a good match to layout nesting though)
- Index Routes e.g. `routes/blog/index.js` → `/blog`
- Layout Nesting like in RemixJS, not actually nested routes like in NextJS.
- Dynamic route segments `routes/blog/[slug].js` → `/blog/:slug` (`/blog/hello-world`)

## Documentation

Example:

```tsx
/// <reference types="vite/client" />

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoutes, modulesToLazyRouteObjects } from "react-autoroute"

const routes = createRoutes(modulesToLazyRouteObjects(
  import.meta.glob<ReactRouterRouteModule>(["/src/routes/**/[\\w$[]*.{jsx,tsx}"]),
    "/src/routes/"
))
const router = createBrowserRouter(routes)

function App() {
  return (
    <RouterProvider router={router} />
  )
}
```

Note: You might wonder: The actual [glob import feature](https://vitejs.dev/guide/features.html#glob-import) of
Vite cannot be implemented in the library-space because of unwanted side-effects (e.g. the library creates
dependencies to the actual application using it) and produces problems in combination with `lazy` loading
of components/routes.

## License

[Apache License; Version 2.0, January 2004](http://www.apache.org/licenses/LICENSE-2.0)

## Copyright

<img src="https://cdn.rawgit.com/sebastian-software/sebastian-software-brand/0d4ec9d6/sebastiansoftware-en.svg" alt="Logo of Sebastian Software GmbH, Mainz, Germany" width="460" height="160"/>

Copyright 2022<br/>[Sebastian Software GmbH](http://www.sebastian-software.de)
