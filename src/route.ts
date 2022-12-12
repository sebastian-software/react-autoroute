import type { RouteObject } from "react-router-dom"

import { createStructure } from "./structure"

export function createRoute(item: BaseRoute, prepend = ""): RouteObject {
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
      prepend = ""
    }
  } else {
    // Filter out children in clone to process this later on...
    let { children, path, ...rest } = item
    route = rest

    // Make sure to prepend path segments from parent if not consumed already e.g. layout only
    if (path) {
      route.path = prepend + path
      prepend = ""
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

export function createRoutes(files: Record<string, BaseRoute>): RouteObject[] {
  const struct = createStructure(files)
  return [createRoute(struct)]
}
