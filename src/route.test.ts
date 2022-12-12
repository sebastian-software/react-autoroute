import { test, expect, describe } from '@jest/globals'
import { postsPagesWithLayout, rootLayout, rootPages, settingsPages } from './fixtures/pages'
import { createRoutes } from './route'

describe('Create Routes', () => {
  test('root page', () => {
    expect(createRoutes({ ...rootPages })).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "element": "<PageAbout />",
              "leaf": true,
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
    expect(createRoutes({ ...rootLayout, ...rootPages, ...postsPagesWithLayout })).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "element": "<PageRoot />",
              "index": true,
            },
            {
              "element": "<PageAbout />",
              "leaf": true,
              "path": "about",
            },
            {
              "element": "<PagePostsArchive />",
              "leaf": true,
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
                  "leaf": true,
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

  test('settings', () => {
    expect(createRoutes(settingsPages)).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "element": "<PageSettings />",
              "leaf": true,
              "path": "settings",
            },
            {
              "children": [
                {
                  "element": "<PageUserName />",
                  "path": "username",
                },
              ],
              "element": "<LayoutSettings />",
            },
          ],
        },
      ]
    `)
  })
})
