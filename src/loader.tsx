import { lazy, Suspense } from "react";
import type { ActionFunction, LoaderFunction, LoaderFunctionArgs } from 'react-router-dom'

export type ElementFactory = () => JSX.Element

export type ReactRouterRouteModule = { default: ElementFactory; Loader: LoaderFunction; Action: ActionFunction; ErrorElement: ElementFactory }
export type ReactRouterImportMap = Record<string, () => Promise<ReactRouterRouteModule>>

export function modulesToLazyRouteObjects(imports: ReactRouterImportMap, root: string) {
  const routeConfig: Record<string, any> = {}
  for (const fileName in imports) {
    const LazyElement = lazy(imports[fileName])

    routeConfig[fileName.replace(root, "")] = {
      element: <Suspense fallback={null} children={<LazyElement />} />,
      loader: async (params: LoaderFunctionArgs) => {
        const callback = await imports[fileName]().then((module) => module.Loader)
        return callback ? callback(params) : null
      }
    }
  }

  return routeConfig
}
