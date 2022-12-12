import { lazy, Suspense } from "react";
import type { ActionFunction, LoaderFunction } from 'react-router-dom'

export type ElementFactory = () => JSX.Element

export type ReactRouterRouteModule = { default: ElementFactory; Loader: LoaderFunction; Action: ActionFunction; ErrorElement: ElementFactory }
export type ReactRouterImportMap = Record<string, () => Promise<ReactRouterRouteModule>>

export function importReactRouterModules(): ReactRouterImportMap {
  return import.meta.glob<ReactRouterRouteModule>(['/src/routes/**/[\\w$[]*.{jsx,tsx}'])
}

export function modulesToRouteObjects(imports: ReactRouterImportMap) {
  const routeConfig: Record<string, any> = {}
  for (var fileName in imports) {
    const LazyElement = lazy(imports[fileName])

    routeConfig[fileName.replace("/src/routes/", "")] = {
      element: <Suspense fallback={null} children={<LazyElement />} />,
    }
  }

  return routeConfig
}
