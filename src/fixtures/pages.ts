export const rootLayout = {
  '_.tsx': { element: '<LayoutRoot />', errorElement: '<PageRootError />' },
}

export const rootPages = {
  'about.tsx': { element: '<PageAbout />' },
  'index.tsx': { element: '<PageRoot />' },
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
