import { test, expect, describe } from '@jest/globals'
import { fileNameToLayoutStructure } from './structure'

describe('Utils', () => {
  test('route fragments', () => {
    expect(fileNameToLayoutStructure('root.tsx')).toMatchInlineSnapshot(`
      [
        "root",
      ]
    `)
    expect(fileNameToLayoutStructure('posts.edit.tsx')).toMatchInlineSnapshot(`
      [
        "posts/edit",
      ]
    `)
    expect(fileNameToLayoutStructure('posts/index.tsx')).toMatchInlineSnapshot(`
      [
        "posts",
        "index",
      ]
    `)
    expect(fileNameToLayoutStructure('posts/[slug].tsx')).toMatchInlineSnapshot(`
      [
        "posts",
        ":slug",
      ]
    `)
    expect(fileNameToLayoutStructure('posts/$.tsx')).toMatchInlineSnapshot(`
      [
        "posts",
        "*",
      ]
    `)
  })
})
