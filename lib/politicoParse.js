const fetch = require('node-fetch');

let races = {};

//metadata, only need to run once
//https://www.politico.com/2022-election/results/_next/data/2hn-AHTnndGC0vRZHx5Zq/index.json

//gov
//https://www.politico.com/election-data/2022-ge__collection__gov/data.json

//sen
//https://www.politico.com/election-data/2022-ge__collection__sen/data.json

//house
//https://www.politico.com/election-data/2022-ge__collection__cd/data.json

//ballot measures meta
//https://www.politico.com/2022-election/results/_next/data/2hn-AHTnndGC0vRZHx5Zq/ballot-measures.json

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

    //first 3 == candidate race
    //1, 4, 7, and 8 == amdendment/prop?


  });
};

exports.fetchData = fetchData;