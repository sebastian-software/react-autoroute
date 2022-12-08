import { test, expect, describe } from '@jest/globals'
import { postsPages, rootLayout, rootPages } from './fixtures/pages'
import { createStructure } from './structure'

describe('Create Structure', () => {
  test('root layout', () => {
    expect(createStructure(rootLayout)).toMatchInlineSnapshot(`
      {
        "layout": {
          "element": "<LayoutRoot />",
          "errorElement": "<PageRootError />",
        },
      }
    `)
  })

  test('root pages', () => {
    expect(createStructure(rootPages)).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "element": "<PageAbout />",
            "path": "about",
          },
        ],
        "index": {
          "element": "<PageRoot />",
        },
      }
    `)
  })

  test('root pages with layout (layout first)', () => {
    expect(createStructure({ ...rootLayout, ...rootPages })).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "element": "<PageAbout />",
            "path": "about",
          },
        ],
        "index": {
          "element": "<PageRoot />",
        },
        "layout": {
          "element": "<LayoutRoot />",
          "errorElement": "<PageRootError />",
        },
      }
    `)
  })

  test('root pages with layout (pages first)', () => {
    expect(createStructure({ ...rootPages, ...rootLayout })).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "element": "<PageAbout />",
            "path": "about",
          },
        ],
        "index": {
          "element": "<PageRoot />",
        },
        "layout": {
          "element": "<LayoutRoot />",
          "errorElement": "<PageRootError />",
        },
      }
    `)
  })

  test('posts pages', () => {
    expect(createStructure(postsPages)).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "element": "<PagePostsArchive />",
            "path": "posts/archive",
          },
          {
            "children": [
              {
                "element": "<PagePost />",
                "path": ":slug",
              },
            ],
            "index": {
              "element": "<PagePostIndex />",
            },
            "layout": {
              "element": "<LayoutPosts />",
              "errorElement": "<PagePostsError />",
            },
            "path": "posts",
          },
        ],
      }
    `)
  })
})
