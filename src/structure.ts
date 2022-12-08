
export const patterns = {
  route: [/\.(jsx|tsx)$/, ''],
  param: [/\[([^\]]+)\]/g, ':$1'],
  splat: [/\/\$$/, '/*'],
} as const

export function addModule(root: BaseRoute, fragments: string[], module: BaseRoute) {
  let parent = root
  for (var i = 0; i < fragments.length - 1; i++) {
    const name = fragments[i]
    let child: BaseRoute | undefined
    if (parent.children) {
      child = parent.children.find((child) => child.path === name)
    } else {
      parent.children = []
    }
    if (!child) {
      child = {
        path: name,
      }
      parent.children.push(child)
    }

    parent = child
  }

  const name = fragments.at(-1)

  if (name === '_') {
    parent.layout = module
  } else if (name === 'index') {
    parent.index = module
  } else {
    const child: BaseRoute = { ...module }
    child.path = name
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
