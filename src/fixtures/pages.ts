export const rootLayout = {
  '_.tsx': { element: '<LayoutRoot />', errorElement: '<PageRootError />' },
}

export const rootPages = {
  'about.tsx': { element: '<PageAbout />' },
  'index.tsx': { element: '<PageRoot />' },
}

export const postsPages = {
  'posts.archive.tsx': { element: '<PagePostsArchive />' },
  'posts/_.tsx': { element: '<LayoutPosts />', errorElement: '<PagePostsError />' },
  'posts/[slug].tsx': { element: '<PagePost />' },
  'posts/index.tsx': { element: '<PagePostIndex />' },
}
