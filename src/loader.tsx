import { lazy, Suspense } from "react";
import type { ActionFunction, LoaderFunction, RouteObject } from 'react-router-dom'

export type ElementFactory = () => JSX.Element

/**
 * Defines the exports used from the actual route modules
 */
export type ReactRouterRouteModule = { default: ElementFactory; loader?: LoaderFunction; action?: ActionFunction;  RouteError?: ElementFactory }

/**
 * The import map retrieved from the Vite bundler maps paths to these modules.
 */
export type ReactRouterImportMap = Record<string, () => Promise<ReactRouterRouteModule>>

/**
 * Filter for relevant fields from official RouteObject
 */
export type ReactRouterBaseRouteObject = Pick<RouteObject, "element" | "errorElement" | "loader" | "action">

export function modulesToLazyRouteObjects(imports: ReactRouterImportMap, root: string) {
  const routeConfig: Record<string, ReactRouterBaseRouteObject> = {}
  for (const fileName in imports) {
    const LazyElement = lazy(imports[fileName])
    const LazyErrorElement = lazy(() => imports[fileName]().then((module) => ({ default: module.RouteError ?? module.default })))

    const route: ReactRouterBaseRouteObject = {
      element: <Suspense fallback={null} children={<LazyElement />} />,
      errorElement: <Suspense fallback={null} children={<LazyErrorElement />} />,
      loader: async (args) => {
        const callback = await imports[fileName]().then((module) => module.loader)
        return callback ? callback(args) : null
      },
      action: async (args) => {
        const callback = await imports[fileName]().then((module) => module.action)
        return callback ? callback(args) : null
      }
    }

    routeConfig[fileName.replace(root, "")] = route
  }

  return routeConfig
}
