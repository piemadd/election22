const fetch = require('node-fetch');

let races = {};

//metadata, only need to run once
//https://www.politico.com/2022-election/results/_next/data/S5-RXel04wLrZI1baE3kE/index.json

//gov
//https://www.politico.com/election-data/2022-ge__collection__gov/data.json

//sen
//https://www.politico.com/election-data/2022-ge__collection__sen/data.json

//house
//https://www.politico.com/election-data/2022-ge__collection__cd/data.json

//ballot measures meta
//https://www.politico.com/2022-election/results/_next/data/S5-RXel04wLrZI1baE3kE/ballot-measures.json

//abortion
//https://www.politico.com/election-data/2022-ge__collection__key-ballot-measures_abortion/data.json

//constitutions
//https://www.politico.com/election-data/2022-ge__collection__key-ballot-measures_constitutions/data.json

//criminal justice
//https://www.politico.com/election-data/2022-ge__collection__key-ballot-measures_criminal-justice/data.json

//drugs
//https://www.politico.com/election-data/2022-ge__collection__key-ballot-measures_drugs/data.json

//elex admin
//https://www.politico.com/election-data/2022-ge__collection__key-ballot-measures_elex-admin/data.json

const fetchURLs = {
  gov: 'https://www.politico.com/election-data/2022-ge__collection__gov/data.json',
  sen: 'https://www.politico.com/election-data/2022-ge__collection__sen/data.json',
  house: 'https://www.politico.com/election-data/2022-ge__collection__cd/data.json',
  abortion: 'https://www.politico.com/election-data/2022-ge__collection__key-ballot-measures_abortion/data.json',
  constitutions: 'https://www.politico.com/election-data/2022-ge__collection__key-ballot-measures_constitutions/data.json',
  criminalJustice: 'https://www.politico.com/election-data/2022-ge__collection__key-ballot-measures_criminal-justice/data.json',
  drugs: 'https://www.politico.com/election-data/2022-ge__collection__key-ballot-measures_drugs/data.json',
  elexAdmin: 'https://www.politico.com/election-data/2022-ge__collection__key-ballot-measures_elex-admin/data.json',
}

const fetchGov = async () => {
  const response = await fetch(fetchURLs.gov);
  const data = await response.json();

  console.log(data)
};

const fetchData = async () => {
  fetchGov();
};

exports.fetchData = fetchData;