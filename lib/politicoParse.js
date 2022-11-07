const fetch = require('node-fetch');

let races = {};

const fetchURL =
  'https://www.politico.com/2022-election/results/_next/data/2hn-AHTnndGC0vRZHx5Zq/index.json';

const fetchData = async () => {
  console.log('fetching')
  const response = await fetch(fetchURL);
  const data = await response.json();
  
  //going through data
  
  //basic race data
  const keys = data.pageProps.electionData[0].data[0];
  data.pageProps.electionData[0].data.forEach((race, i) => {
    if (i == 0) return;

    
  });
};

exports.fetchData = fetchData;