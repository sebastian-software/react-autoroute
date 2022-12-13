import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom"
import { createRoutes, modulesToLazyRouteObjects, ReactRouterRouteModule } from "react-autoroute"

const routes = createRoutes(
  modulesToLazyRouteObjects(
    import.meta.glob<ReactRouterRouteModule>(["/src/routes/**/[\\w$[]*.{jsx,tsx}"]),
    "/src/routes/"
  )
)
const createRouter = location.pathname.endsWith("/index.html") ? createHashRouter : createBrowserRouter
const router = createRouter(routes)

function App() {
  return (
    <div>
      <h1>Example: React Router</h1>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
