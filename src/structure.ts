export const patterns = {
  route: [/\.(jsx|tsx)$/, ""],
  param: [/\[([^\]]+)\]/g, ":$1"],
  splat: [/\/\$$/, "/*"]
} as const

function camelToKebab(str: string): string {
  let kebab = str[0].toLowerCase()

  for (let i = 1; i < str.length; i++) {
    const char = str[i]
    if (/[A-Z]/.test(char)) {
      kebab += "-" + char.toLowerCase()
    } else {
      kebab += char
    }
  }

  return kebab
}

export function addModule(
  root: BaseRoute,
  fragments: string[],
  module: BaseRoute
) {
  let parent = root
  const length = fragments.length - 1
  for (var i = 0; i < length; i++) {
    const name = fragments[i]
    let child: BaseRoute | undefined
    if (parent.children) {
      // Find potential previously added parent candidate which is not a leaf (= same folder)
      child = parent.children.find(
        (child) => !child.leaf && child.path === name
      )
    } else {
      parent.children = []
    }

    // Create a new child for usage as parent later on
    if (!child) {
      child = {
        path: name
      }
      parent.children.push(child)
    }

    parent = child
  }

  // Apply kebab transform on fileName to allow classic React-style component
  // file names while using dashes in resulting URL paths e.g.
  // `PrivacySettings` => `privacy-settings`
  // The combination with slice() is a compatible replacement for
  // Array.prototype.at() which is not supported in NodeJS v14
  let name = camelToKebab(fragments.slice(-1)[0])

  // If the page name is identical to the parent path then we
  // assume that this is meant as a better named index page.
  if (name === parent.path) {
    name = "index"
  }

  if (name === "_") {
    parent.layout = module
  } else if (name === "index") {
    if (parent.index) {
      throw new Error(
        `Collision of two index pages at: ${JSON.stringify(fragments)}`
      )
    }

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
    .split("/")
    .filter(Boolean)
    .map((fragment) => fragment.replace(/\./g, "/"))
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
