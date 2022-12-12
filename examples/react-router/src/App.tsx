import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider
} from "react-router-dom";
import type { ActionFunction, LoaderFunction } from 'react-router-dom'

import { createRoutes } from "react-autoroute"

type Element = () => JSX.Element
type Module = { default: Element; Loader: LoaderFunction; Action: ActionFunction; ErrorElement: Element }

const ROUTES = import.meta.glob<Module>(['/src/routes/**/[\\w$[]*.{jsx,tsx}'])
console.log("FILE ROUTES:\n-", Object.keys(ROUTES).join("\n- "))

const routeConfig: Record<string, any> = {}
for (var fileName in ROUTES) {
  const lazyModule = ROUTES[fileName]
  const LazyElement = lazy(lazyModule)

  routeConfig[fileName.replace("/src/routes/", "")] = {
    element: <Suspense fallback={null} children={<LazyElement />} />,
  }
}

const routes = createRoutes(routeConfig)
const createRouter = location.pathname.endsWith("/index.html") ? createHashRouter : createBrowserRouter
const router = createRouter(routes)

console.log("Config", routeConfig)
console.log("Routes:", routes)

function App() {
  return (
    <div>
      <h1>Vite + React Router</h1>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
