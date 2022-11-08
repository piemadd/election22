const fetch = require('node-fetch');
const fs = require('fs');

let races = {};

fetch(
  'https://www.politico.com/2022-election/results/_next/data/S5-RXel04wLrZI1baE3kE/index.json',
)
  .then((res) => res.json())
  .then((data) => {
    //fuck it we ball

    data.pageProps.electionData[0].data.forEach((race, i) => {
      if (i == 0) {
        //console.log(race);
        return;
      }

      races[race[0]] = {
        id: race[0],
        rating: race[1],
        holdingParty: race[2],
        isBallot: race[3],
        isUncontested: race[4],
        excludeFromBalance: race[5],
        name: race[6],
        description: race[7],
        candidates: [],
      };
    });

    console.log(races)

    fs.writeFileSync('./out.json', JSON.stringify(races, null, 2));

    data.pageProps.electionData[1].data.forEach((candidate, i) => {
      if (i == 0) {
        //console.log(candidate);
        return;
      }

      console.log(candidate[0])

      races[candidate[0]].candidates.push({
        id: candidate[1],
        fullName: candidate[2],
        shortName: candidate[3],
        party: candidate[4],
        fullPartyName: candidate[5],
        ballotOrder: candidate[6],
        editorialPriority: candidate[7],
        isIncumbent: candidate[8],
        isAggregable: candidate[9],
        polarity: candidate[10],
        description: candidate[11],
      })
    });

    console.log(races)

    fs.writeFileSync('./out.json', JSON.stringify(races, null, 2));
  });
