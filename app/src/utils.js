export const convertHtmlToText = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.innerText;
};

export const buildWordMap = (text) => {
  // convert to lowercase so that 'The' === 'the'
  // remove chars like '.', ',','(',')'
  // convert to arr by splitting on space
  // filter away falsy items of the array like multiple spaces etc.
  let wordArr = text
    .toLowerCase()
    .replace(/[\,\.\(\)]/g, '')
    .split(' ')
    .filter((x) => x);
  let wordMap = {};
  let max = 0;
  for (let word of wordArr) {
    if (wordMap[word]) {
      wordMap[word]++;
    } else {
      wordMap[word] = 1;
    }
    max = Math.max(max, wordMap[word]);
  }
  return [wordMap, max];
};

export const wordMapToStars = (input) => {
  const one = [],
    two = [],
    three = [],
    four = [],
    five = [];
  const [map, max] = input;
  for (let key in map) {
    if (map[key] <= max / 5) one.push([key, 1]);
    else if (map[key] <= (2 * max) / 5) two.push([key, 2]);
    else if (map[key] <= (3 * max) / 5) three.push([key, 3]);
    else if (map[key] <= (4 * max) / 5) four.push([key, 4]);
    else five.push([key, 5]);
  }
  return [
    [...five.sort()],
    [...four.sort()],
    [...three.sort()],
    [...two.sort()],
    [...one.sort()],
  ].flatMap((n) => (!n ? [] : n));
};

let funcs = [convertHtmlToText, buildWordMap, wordMapToStars];

export const htmlToProps = (html, steps = funcs) => {
  let result = html;
  for (let i = 0; i < steps.length; i++) {
    let step = steps[i];
    // Apply next step in the chain
    result = step(result);
    console.log(result);
  }
  return result;
};
