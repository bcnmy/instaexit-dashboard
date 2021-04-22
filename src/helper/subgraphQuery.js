const axios = require("axios");

const makeRequest = async (request) => {
  const result = await axios.post(
    "https://api.thegraph.com/subgraphs/name/mundhrakeshav/instaexitsmumbaisubgraph",
    {
      query: `{   ${request} }`,
    }
  );

  return result.data.data;
};

export default makeRequest;
