import { createStructure } from "./structure"

export function createRoute(item: BaseRoute, prepend = ""): BaseRoute {
  let route: BaseRoute
  if (item.layout) {
    route = { ...item.layout }
    if (item.path && item.index) {
      route.path = item.path
    } else {
      prepend += `${item.path}/`
    }
  } else if (item.index) {
    route = { ...item.index }

    // Make sure to prepend path segments from parent if not consumed already e.g. layout only
    if (item.path) {
      route.path = prepend + item.path
    }
  } else {
    // Filter out children in clone to process this later on...
    let { children, path, ...rest } = item
    route = rest

    // Make sure to prepend path segments from parent if not consumed already e.g. layout only
    if (path) {
      route.path = prepend + path
    }
  }

  if (item.children) {
    route.children = item.children.map((child) => createRoute(child, prepend))
  }

  if (item.layout && item.index) {
    const indexClone = { index: true, ...item.index }
    if (route.children) {
      route.children.unshift(indexClone)
    } else {
      route.children = [indexClone]
    }
  }

  return route
}

export function createRoutes(files: Record<string, BaseRoute>): BaseRoute[] {
  const struct = createStructure(files)
  return [createRoute(struct)]
}
