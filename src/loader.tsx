import { ComponentType, lazy, Suspense } from "react"
import type { ActionFunction, LoaderFunction, RouteObject } from "react-router-dom"

export type ElementFactory = () => JSX.Element

/**
 * Defines the exports used from the actual route modules
 */
export type ReactRouterRouteModule = {
  default: ElementFactory
  loader?: LoaderFunction
  action?: ActionFunction
  RouteError?: ElementFactory
}

/**
 * The import map retrieved from the Vite bundler maps paths to these modules.
 */
export type ReactRouterImportMap = Record<string, () => Promise<ReactRouterRouteModule>>

/**
 * Filter for relevant fields from official RouteObject
 */
export type ReactRouterBaseRouteObject = Pick<
  RouteObject,
  "element" | "errorElement" | "loader" | "action"
>

const loaderCache: Record<string, Promise<ReactRouterRouteModule>> = {}
const moduleCache: Record<string, ReactRouterRouteModule> = {}

type ModuleMember = "default" | "loader" | "action" | "RouteError"

function getMember<T>(fileName: string, memberName: ModuleMember, fallbackName?: ModuleMember): T {
  const module = moduleCache[fileName]
  if (memberName in module) {
    return module[memberName] as T
  } else if (fallbackName && fallbackName in module) {
    console.log(`Fallback ${memberName} => ${fallbackName}`)
    return module[fallbackName] as T
  } else {
    throw new Error(`Could not resolve: ${memberName} from ${fileName}`)
  }
}

/**
 * A wrapper around the `import` statements to allow access resolved promises without `await`
 * for synchronous access possibilities to module members.
 *
 * @param imports Wrapper ar
 * @param fileName
 * @param memberName
 * @param fallbackName
 * @returns
 */
async function getModuleMember<T>(
  imports: ReactRouterImportMap,
  fileName: string,
  memberName: ModuleMember,
  fallbackName?: ModuleMember
) {
  let moduleLoader: Promise<ReactRouterRouteModule>
  if (fileName in loaderCache) {
    moduleLoader = loaderCache[fileName]
  } else {
    console.log(`Caching ${fileName}...`)
    moduleLoader = loaderCache[fileName] = imports[fileName]()
  }

  const module = await moduleLoader
  moduleCache[fileName] = module

  return getMember<T>(fileName, memberName, fallbackName)
}

// function getModuleMemberSync(
//   fileName: string,
//   memberName: ModuleMember = "default",
//   fallbackName?: ModuleMember
// ) {
//   const module = moduleCache[fileName]
//   if (module) {
//     return getMember(fileName, memberName, fallbackName)
//   }
// }

export function modulesToLazyRouteObjects(imports: ReactRouterImportMap, root: string) {
  const routeConfig: Record<string, ReactRouterBaseRouteObject> = {}
  for (const fileName in imports) {
    const LazyElement = lazy(async () => {
      return { default: await getModuleMember<ComponentType>(imports, fileName, "default") }
    })

    const LazyErrorElement = lazy(async () => {
      return {
        default: await getModuleMember<ComponentType>(imports, fileName, "RouteError", "default")
      }
    })

    const route: ReactRouterBaseRouteObject = {
      element: <Suspense fallback={null} children={<LazyElement />} />,
      errorElement: <Suspense fallback={null} children={<LazyErrorElement />} />,
      loader: async (args) => {
        let callback
        try {
          callback = await getModuleMember<LoaderFunction>(imports, fileName, "loader")
        } catch (ex) {
          return null
        }

        return callback(args)
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
