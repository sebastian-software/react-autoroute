import { lazy, Suspense } from "react";
import type { ActionFunction, LoaderFunction, LoaderFunctionArgs, ActionFunctionArgs } from 'react-router-dom'

export type ElementFactory = () => JSX.Element

export type ReactRouterRouteModule = { default: ElementFactory; Loader: LoaderFunction; Action: ActionFunction; ErrorElement: ElementFactory }
export type ReactRouterImportMap = Record<string, () => Promise<ReactRouterRouteModule>>

export function modulesToLazyRouteObjects(imports: ReactRouterImportMap, root: string) {
  const routeConfig: Record<string, BaseRoute> = {}
  for (const fileName in imports) {
    const LazyElement = lazy(imports[fileName])

    routeConfig[fileName.replace(root, "")] = {
      element: <Suspense fallback={null} children={<LazyElement />} />,
      loader: async (args: LoaderFunctionArgs) => {
        const callback = await imports[fileName]().then((module) => module.Loader)
        return callback ? callback(args) : null
      },
      action: async (args: ActionFunctionArgs) => {
        const callback = await imports[fileName]().then((module) => module.Action)
        return callback ? callback(args) : null
      },
    }
  }

  return routeConfig
}
