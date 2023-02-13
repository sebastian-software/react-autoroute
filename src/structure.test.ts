import { test, expect, describe } from "@jest/globals"
import {
  postsPagesWithLayout,
  postsPagesWithSeparation,
  rootLayout,
  rootPages,
  rootPagesCamelCase,
  settingsPages,
  settingsPagesNamedIndex
} from "./fixtures/pages"
import { createStructure } from "./structure"

describe("Create Structure", () => {
  test("root layout", () => {
    expect(createStructure(rootLayout)).toMatchInlineSnapshot(`
      {
        "layout": {
          "element": "<LayoutRoot />",
          "errorElement": "<PageRootError />",
        },
      }
    `)
  })

  test("root pages", () => {
    expect(createStructure(rootPages)).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "element": "<PageAbout />",
            "leaf": true,
            "path": "about",
          },
          {
            "element": "<NotFound />",
            "leaf": true,
            "path": "*",
          },
        ],
        "index": {
          "element": "<PageRoot />",
        },
        "path": "/",
      }
    `)
  })

  test("root pages {camelcase)", () => {
    expect(createStructure(rootPagesCamelCase)).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "element": "<PageAbout />",
            "leaf": true,
            "path": "about-page",
          },
          {
            "element": "<NotFound />",
            "leaf": true,
            "path": "*",
          },
        ],
        "index": {
          "element": "<PageRoot />",
        },
        "path": "/",
      }
    `)
  })

  test("root pages with layout (layout first)", () => {
    expect(createStructure({ ...rootLayout, ...rootPages })).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "element": "<PageAbout />",
            "leaf": true,
            "path": "about",
          },
          {
            "element": "<NotFound />",
            "leaf": true,
            "path": "*",
          },
        ],
        "index": {
          "element": "<PageRoot />",
        },
        "layout": {
          "element": "<LayoutRoot />",
          "errorElement": "<PageRootError />",
        },
        "path": "/",
      }
    `)
  })

  test("root pages with layout (pages first)", () => {
    expect(createStructure({ ...rootPages, ...rootLayout })).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "element": "<PageAbout />",
            "leaf": true,
            "path": "about",
          },
          {
            "element": "<NotFound />",
            "leaf": true,
            "path": "*",
          },
        ],
        "index": {
          "element": "<PageRoot />",
        },
        "layout": {
          "element": "<LayoutRoot />",
          "errorElement": "<PageRootError />",
        },
        "path": "/",
      }
    `)
  })

  test("posts pages with separation", () => {
    expect(createStructure(postsPagesWithSeparation)).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "element": "<PagePostsArchive />",
            "leaf": true,
            "path": "posts",
          },
          {
            "children": [
              {
                "element": "<PagePost />",
                "leaf": true,
                "path": ":slug",
              },
            ],
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

  test("posts pages with layout", () => {
    expect(createStructure(postsPagesWithLayout)).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "element": "<PagePostsArchive />",
            "leaf": true,
            "path": "posts/archive",
          },
          {
            "children": [
              {
                "element": "<PagePost />",
                "leaf": true,
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

  test("settings structure", () => {
    expect(createStructure(settingsPages)).toMatchInlineSnapshot(`
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
                "index": {
                  "element": "<PageUserName />",
                },
                "path": "username",
              },
            ],
            "layout": {
              "element": "<LayoutSettings />",
            },
            "path": "settings",
          },
        ],
      }
    `)
  })

  test("settings structure", () => {
    expect(createStructure(settingsPagesNamedIndex)).toMatchInlineSnapshot(`
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
                "index": {
                  "element": "<PageUserName />",
                },
                "path": "username",
              },
            ],
            "layout": {
              "element": "<LayoutSettings />",
            },
            "path": "settings",
          },
        ],
      }
    `)
  })
})
