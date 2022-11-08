//const { fetchData } = require('./lib/politicoParse');

const fetch = require('node-fetch');
const fs = require('fs');

//fetchData();

const urls = {
  gov: 'https://www.politico.com/election-data/2022-ge__collection__gov/data.json',
  sen: 'https://www.politico.com/election-data/2022-ge__collection__sen/data.json',
  house:
    'https://www.politico.com/election-data/2022-ge__collection__cd/data.json',
  abortion:
    'https://www.politico.com/election-data/2022-ge__collection__key-ballot-measures_abortion/data.json',
  constitutions:
    'https://www.politico.com/election-data/2022-ge__collection__key-ballot-measures_constitutions/data.json',
  criminalJustice:
    'https://www.politico.com/election-data/2022-ge__collection__key-ballot-measures_criminal-justice/data.json',
  drugs:
    'https://www.politico.com/election-data/2022-ge__collection__key-ballot-measures_drugs/data.json',
  elexAdmin:
    'https://www.politico.com/election-data/2022-ge__collection__key-ballot-measures_elex-admin/data.json',
};

const fetchAll = () => {
  console.log('fetching');
  const now = new Date()
    .toISOString()
    .replaceAll(':', '-')
    .replaceAll('.', '-');
  console.log(now);

  fs.mkdirSync(`./raw_data/${now}`, { recursive: true });

  Object.keys(urls).forEach(async (key) => {
    const res = await fetch(urls[key]);
    const data = await res.json();

    fs.writeFileSync(
      `./raw_data/${now}/${key}.json`,
      JSON.stringify(data, null, 2),
    );
  });
};

fetchAll();

setInterval(fetchAll, 5 * 60 * 1000); // 60 * 1000 milsec
