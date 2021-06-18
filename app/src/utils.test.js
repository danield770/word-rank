import {
  convertHtmlToText,
  buildWordMap,
  wordMapToStars,
  htmlToProps,
} from './utils';

// it('converts html input to text', () => {
//   expect(convertHtmlToText('<p>Hi there</p>')).toEqual('Hi there'); // ReferenceError: DOMParser is not defined
// });

it('returns a word map and max frequency', () => {
  expect(
    buildWordMap(
      'car bicycle car bicycle car bicycle car bicycle car bicycle car bicycle plane plane truck'
    )
  ).toEqual([{ car: 6, bicycle: 6, plane: 2, truck: 1 }, 6]);
});
it('treats converts words to lowercase so that words in upper and lowercase are treated the same', () => {
  expect(
    buildWordMap(
      'car Bicycle car bicycle Car bicycle car bicycle car Bicycle car bicycle plane Plane truck'
    )
  ).toEqual([{ car: 6, bicycle: 6, plane: 2, truck: 1 }, 6]);
});
it('converts words to lowercase so that words in upper and lowercase are treated the same', () => {
  expect(
    buildWordMap(
      'car Bicycle car bicycle Car bicycle car bicycle car Bicycle car bicycle plane Plane truck'
    )
  ).toEqual([{ car: 6, bicycle: 6, plane: 2, truck: 1 }, 6]);
});
it('ignores punctuation characters which are joined with word chatacters', () => {
  expect(
    buildWordMap(
      'car Bicycle. car (bicycle) Car bicycle car bicycle car Bicycle car bicycle (plane) Plane truck.'
    )
  ).toEqual([{ car: 6, bicycle: 6, plane: 2, truck: 1 }, 6]);
});
it('converts the wordMap to an array of key-star array pairs', () => {
  expect(wordMapToStars([{ car: 6, plane: 2, truck: 1 }, 6])).toEqual([
    ['car', 5],
    ['plane', 2],
    ['truck', 1],
  ]);
  expect(
    wordMapToStars([
      { car: 5, plane: 4, boat: 3, tractor: 2, motorcycle: 1 },
      5,
    ])
  ).toEqual([
    ['car', 5],
    ['plane', 4],
    ['boat', 3],
    ['tractor', 2],
    ['motorcycle', 1],
  ]);
});
it('sorts words with the same star frequency alphabetically', () => {
  expect(
    wordMapToStars([{ car: 6, bicycle: 6, plane: 2, truck: 1 }, 6])
  ).toEqual([
    ['bicycle', 5],
    ['car', 5],
    ['plane', 2],
    ['truck', 1],
  ]);
});
// ReferenceError: DOMParser is not defined
// see https://stackoverflow.com/questions/11398419/trying-to-use-the-domparser-with-node-js/31268057

// it('composes mutiple functions to produce the final "props" result', () => {
//   expect(
//     htmlToProps('<p>The <i>quick</i> brown fox, jumps over the lazy dog</p>')
//   ).toEqual([
//     ['the', 5],
//     ['brown', 1],
//     ['dog', 1],
//     ['fox', 1],
//     ['jumps', 1],
//     ['lazy', 1],
//     ['over', 1],
//     ['quick', 1],
//   ]);
// });
