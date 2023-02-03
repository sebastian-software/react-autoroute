import { lazy, Suspense } from "react";
import type { ActionFunction, LoaderFunction, LoaderFunctionArgs, ActionFunctionArgs } from 'react-router-dom'

export type ElementFactory = () => JSX.Element

export type ReactRouterRouteModule = { default: ElementFactory; loader: LoaderFunction; action: ActionFunction; RouteError: ElementFactory }
export type ReactRouterImportMap = Record<string, () => Promise<ReactRouterRouteModule>>

export function modulesToLazyRouteObjects(imports: ReactRouterImportMap, root: string) {
  const routeConfig: Record<string, BaseRoute> = {}
  for (const fileName in imports) {
    const LazyElement = lazy(imports[fileName])
    const LazyErrorElement = lazy(() => imports[fileName]().then((module) => ({ default: module.RouteError })))

    routeConfig[fileName.replace(root, "")] = {
      element: <Suspense fallback={null} children={<LazyElement />} />,
      errorElement: <Suspense fallback={null} children={<LazyErrorElement />} />,
      loader: async (args: LoaderFunctionArgs) => {
        const callback = await imports[fileName]().then((module) => module.loader)
        return callback ? callback(args) : null
      },
      action: async (args: ActionFunctionArgs) => {
        const callback = await imports[fileName]().then((module) => module.action)
        return callback ? callback(args) : null
      },
    }
  }

  return routeConfig
}
