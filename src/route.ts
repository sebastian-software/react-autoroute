import { createStructure } from "./structure"

export function createRoute(item: BaseRoute): BaseRoute {
  let route: BaseRoute
  if (item.layout) {
    route = { ...item.layout }
    if (item.path && item.index) {
      route.path = item.path
    }
  } else if (item.index) {
    route = { ...item.index }
    route.path = item.path
  } else {
    // Filter out children in clone to process this later on...
    let { children, ...rest } = item
    route = rest
  }

  if (item.children) {
    route.children = item.children.map((child) => createRoute(child))
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
