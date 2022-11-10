const fs = require('fs');
const path = require('path');

const normalizeDate = ((date) => {
  let dateParts = date.split('T');

  //returning colons
  dateParts[1] = dateParts[1].replace('-', ':');
  dateParts[1] = dateParts[1].replace('-', ':');

  //returning dot
  dateParts[1] = dateParts[1].replace('-', '.');

  return new Date(dateParts.join('T'));
})

const folders = fs.readdirSync('./raw_data');

let processedData = {};

const meta = JSON.parse(fs.readFileSync('./meta/byID.json'));

folders.forEach((folder) => {
  const files = fs.readdirSync(`./raw_data/${folder}`);
  const actualDate = normalizeDate(folder);
  console.log('parsing out data from', actualDate);

  files.forEach((file) => {
    const data = JSON.parse(
      fs.readFileSync(`./raw_data/${folder}/${file}`, 'utf8'),
    );

    data.contests.forEach((contest) => {
      const contestMeta = meta[contest.id];

      if (contestMeta) {
        const state = contestMeta.state;
        const electionType = contestMeta.electionType;
        const raceType = contestMeta.raceType;
        const electionName = contestMeta.electionName;

        //ensuring state exists
        if (!processedData[state]) {
          processedData[state] = {};
        }

        //ensuring state type exists
        if (!processedData[state][electionType]) {
          processedData[state][electionType] = {};
        }

        //ensuring race type exists
        if (!processedData[state][electionType][raceType]) {
          processedData[state][electionType][raceType] = {};
        }

        //ensuring race (election name) exists
        if (!processedData[state][electionType][raceType][electionName]) {

          console.log(contest)

          processedData[state][electionType][raceType][electionName] = {
            id: contestMeta.id,
            rating: contestMeta.rating,
            holdingParty: contestMeta.holdingParty,
            isBallot: contestMeta.isBallot,
            isUncontested: contestMeta.isUncontested,
            excludefromBalance: contestMeta.excludefromBalance,
            name: contestMeta.name,
            description: contestMeta.description,
            candidates: {},
            stats: {},
          };

          //adding candidates
          contestMeta.candidates.forEach((candidate) => {
            console.log(candidate.id)
            processedData[state][electionType][raceType][electionName]['candidates'][candidate.id] = {
              id: candidate.id,
              fullName: candidate.fullName,
              shortName: candidate.shortName,
              party: candidate.party,
              fullPartyName: candidate.fullPartyName,
              ballotOrder: candidate.ballotOrder,
              editorialPriority: candidate.editorialPriority,
              isIncumbent: candidate.isIncumbent,
              isAggregable: candidate.isAggregable,
              polarity: candidate.polarity,
              description: candidate.description,
              stats: {},
            };
          });
        }

        /*
        //adding candidate stats
        contest.results.forEach((result) => {
          //console.log(processedData[state][electionType][raceType][electionName]['candidates'])
          console.log(result.id)
          processedData[state][electionType][raceType][electionName]['candidates'][result.id]['stats'][actualDate.valueOf()] = {
            timeStamp: actualDate.toISOString(),
            voteCount: result.voteCount,
            votePct: result.votePct,
          };
        })

        //adding contest stats
        processedData[state][electionType][raceType][electionName]['stats'][actualDate.valueOf()] = {
          timeStamp: actualDate.toISOString(),
          pctCounted: contest.progress.pct,
        };
        */
      }
    });
  });
});

console.log(processedData.IL.general.gov['0'])
console.log('done parsing data');

const processThatShit = (data) => {
  // Do some processing
  return processedData;
};

/*

  processedData
   - state
    - election type
      - race (json file)

  {
    timestamp: {[results]}
  }

*/
