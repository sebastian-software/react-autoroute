
export const patterns = {
  route: [/\.(jsx|tsx)$/, ''],
  param: [/\[([^\]]+)\]/g, ':$1'],
  splat: [/\/\$$/, '/*'],
} as const

export function addModule(root: BaseRoute, fragments: string[], module: BaseRoute) {
  let parent = root
  const length = fragments.length - 1
  for (var i = 0; i < length; i++) {
    const name = fragments[i]
    let child: BaseRoute | undefined
    if (parent.children) {
      // Find potential previously added parent candidate which is not a leaf (= same folder)
      child = parent.children.find((child) => !child.leaf && child.path === name)
    } else {
      parent.children = []
    }

    // Create a new child for usage as parent later on
    if (!child) {
      child = {
        path: name,
      }
      parent.children.push(child)
    }

    parent = child
  }

  // Replacement for Array.prototype.at() which is not supported in NodeJS v14
  const name = fragments.slice(-1)[0]

  if (name === '_') {
    parent.layout = module
  } else if (name === 'index') {
    parent.index = module
    if (parent === root) {
      parent.path = "/"
    }
  } else {
    const child: BaseRoute = { ...module }
    child.path = name === "404" ? "*" : name
    child.leaf = true
    parent.children ??= []
    parent.children.push(child)
  }
}

export function fileNameToLayoutStructure(fileName: string): string[] {
  return fileName
    .replace(...patterns.route)
    .replace(...patterns.param)
    .replace(...patterns.splat)
    .split('/')
    .filter(Boolean)
    .map((fragment) => fragment.replace(/\./g, '/'))
}

export function createStructure(files: Record<string, BaseRoute>): BaseRoute {
  const root: BaseRoute = {}

  for (const fileName in files) {
    const module = files[fileName]
    const fragments = fileNameToLayoutStructure(fileName)

    addModule(root, fragments, module)
  }

  return root
}
