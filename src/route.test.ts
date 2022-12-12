import { test, expect, describe } from '@jest/globals'
import { postsPages, rootLayout, rootPages } from './fixtures/pages'
import { createRoutes } from './route'

describe('Create Routes', () => {
  test('root page', () => {
    expect(createRoutes({ ...rootPages })).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "element": "<PageAbout />",
              "path": "about",
            },
          ],
          "element": "<PageRoot />",
          "path": "/",
        },
      ]
    `)
  })

  test('root layout', () => {
    expect(createRoutes({ ...rootLayout, ...rootPages, ...postsPages })).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "element": "<PageRoot />",
              "index": true,
            },
            {
              "element": "<PageAbout />",
              "path": "about",
            },
            {
              "element": "<PagePostsArchive />",
              "path": "posts/archive",
            },
            {
              "children": [
                {
                  "element": "<PagePostIndex />",
                  "index": true,
                },
                {
                  "element": "<PagePost />",
                  "path": ":slug",
                },
              ],
              "element": "<LayoutPosts />",
              "errorElement": "<PagePostsError />",
              "path": "posts",
            },
          ],
          "element": "<LayoutRoot />",
          "errorElement": "<PageRootError />",
          "path": "/",
        },
      ]
    `)
  })
})
