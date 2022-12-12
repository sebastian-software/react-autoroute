import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider
} from "react-router-dom";

import { createRoutes, importReactRouterModules, modulesToRouteObjects } from "react-autoroute"

const routes = createRoutes(modulesToRouteObjects(importReactRouterModules()))
const createRouter = location.pathname.endsWith("/index.html") ? createHashRouter : createBrowserRouter
const router = createRouter(routes)

function App() {
  return (
    <div>
      <h1>Vite + React Router</h1>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
