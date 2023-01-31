import { pickObject, omitObject } from './object.js';

const baseObject = {
  a: 1,
  b: 'test',
  c: {
    x: -10,
    y: 'example',
    z: {},
  },
  d: undefined,
  e: null,
} as const;

test('pickObject', () => {
  expect(pickObject(baseObject, [])).toEqual({});
  expect(pickObject(baseObject, ['a'])).toEqual({ a: 1 });
  expect(pickObject(baseObject, ['b', 'c'])).toEqual({ b: baseObject.b, c: baseObject.c });
  expect(pickObject(baseObject, ['a', 'b', 'c', 'd', 'e'])).toEqual({ ...baseObject });
});

test('omitObject', () => {
  expect(omitObject(baseObject, [])).toEqual({ ...baseObject });
  expect(omitObject(baseObject, ['b', 'c', 'd', 'e'])).toEqual({ a: 1 });
  expect(omitObject(baseObject, ['a', 'd'])).toEqual({
    b: baseObject.b,
    c: baseObject.c,
    e: baseObject.e,
  });
  expect(omitObject(baseObject, ['a', 'b', 'c', 'd', 'e'])).toEqual({});
});
