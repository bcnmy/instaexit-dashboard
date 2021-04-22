const axios = require("axios");

const makeMumbaiRequest = async (request) => {
  const result = await axios.post(
    "https://api.thegraph.com/subgraphs/name/mundhrakeshav/instaexitsmumbaisubgraph",
    {
      query: `{   ${request} }`,
    }
  );

  return result.data.data;
};
const makeGoerliRequest = async (request) => {
  const result = await axios.post(
    "https://api.thegraph.com/subgraphs/name/mundhrakeshav/instaexits-testnet",
    {
      query: `{   ${request} }`,
    }
  );

  return result.data.data;
};

const makeRequest = { makeMumbaiRequest, makeGoerliRequest };

export default makeRequest;
