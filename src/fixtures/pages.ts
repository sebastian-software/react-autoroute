export const rootLayout = {
  '_.tsx': { element: '<LayoutRoot />', errorElement: '<PageRootError />' },
}

export const rootPages = {
  'about.tsx': { element: '<PageAbout />' },
  'index.tsx': { element: '<PageRoot />' },
  '404.tsx': { element: '<NotFound />' },
}

export const rootPagesCamelCase = {
  'AboutPage.tsx': { element: '<PageAbout />' },
  'Index.tsx': { element: '<PageRoot />' },
  '404.tsx': { element: '<NotFound />' },
}

export const postsPagesWithLayout = {
  'posts.archive.tsx': { element: '<PagePostsArchive />' },
  'posts/_.tsx': { element: '<LayoutPosts />', errorElement: '<PagePostsError />' },
  'posts/[slug].tsx': { element: '<PagePost />' },
  'posts/index.tsx': { element: '<PagePostIndex />' },
}

export const postsPagesWithSeparation = {
  'posts.tsx': { element: '<PagePostsArchive />' },
  'posts/_.tsx': { element: '<LayoutPosts />', errorElement: '<PagePostsError />' },
  'posts/[slug].tsx': { element: '<PagePost />' }
}

export const settingsPages = {
  'settings.tsx': { element: '<PageSettings />' },
  'settings/_.tsx': { element: '<LayoutSettings />' },
  'settings/username/index.tsx': { element: '<PageUserName />' }
}

export const settingsPagesNamedIndex = {
  'settings.tsx': { element: '<PageSettings />' },
  'settings/_.tsx': { element: '<LayoutSettings />' },
  'settings/username/Username.tsx': { element: '<PageUserName />' }
}
