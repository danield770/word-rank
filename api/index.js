const http = require('http');
const fetch = require('node-fetch');
const { BASE_URL, TOPIC_PARAMS, CONTENT_PARAMS } = require('./config');
const { URL } = require('url');
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
};
const decodeParams = (searchParams) =>
  Array.from(searchParams.keys()).reduce(
    (acc, key) => ({ ...acc, [key]: searchParams.get(key) }),
    {}
  );
// from: ?search=NASA
// to: {search: 'NASA'}

const getData = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return error;
  }
};

const server = http.createServer((req, res) => {
  const requestURL = new URL(req.url, BASE_URL);
  console.log('requestURL : ', requestURL);
  const decodedParams = decodeParams(new URLSearchParams(requestURL.search));
  console.log('decodedParams: ', decodedParams);
  const { search, titles } = decodedParams;

  let rest;
  if (search !== undefined) {
    rest = `${TOPIC_PARAMS}&search=${search}`;
  } else if (titles !== undefined) {
    rest = `${CONTENT_PARAMS}&titles=${titles}`;
  }
  const targetURL = encodeURI(BASE_URL + rest);
  // console.log('targetURL : ', targetURL);
  if (req.method === 'GET') {
    console.log(`Proxy GET request to : ${targetURL}`);
    getData(targetURL)
      .then((response) => {
        // console.log('response: ', response);
        res.writeHead(200, headers);
        res.end(JSON.stringify(response));
      })
      .catch((error) => {
        console.log(error);
        res.writeHead(500, headers);
        res.end(JSON.stringify(error));
      });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
