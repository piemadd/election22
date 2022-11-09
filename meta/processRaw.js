const fs = require('fs');

const races = JSON.parse(fs.readFileSync('races_raw.json', 'utf8'));
const states = JSON.parse(fs.readFileSync('states.json', 'utf8'));

let statesUnParsed = {};
let statesParsed = {};

//parsing through races to associate with each state.
Object.keys(races).sort((a, b) => {
  return Number(a.split('/')[1]) - Number(b.split('/')[1]);
}).forEach((raceKey) => {
  const info = raceKey.split('/');

  let race = races[raceKey];

  //const date = info[0];
  let state = states[info[1]].abbr;
  //let state = info[1];
  let raceType = info[2];
  let electionType = info[3];
  let electionName = '0';

  if (raceType.startsWith('cd')) {
    electionName = raceType.replace('cd', '');
    raceType = 'cd';
  }

  if (raceType.startsWith('question')) {
    electionName = raceType.replace('question', '');
    raceType = 'question';
  }

  //state
  statesParsed[state] = statesParsed[state] ? statesParsed[state] : {};

  //election type (general, runoff, etc)
  statesParsed[state][electionType] = statesParsed[state][electionType]
    ? statesParsed[state][electionType]
    : {};

  //race type (house, senate, etc)
  statesParsed[state][electionType][raceType] = statesParsed[state][
    electionType
  ][raceType]
    ? statesParsed[state][electionType][raceType]
    : {};

  race.state = state;
  race.raceType = raceType;
  race.electionType = electionType;
  race.electionName = electionName;

  //election name (district number, question number, etc)
  statesParsed[state][electionType][raceType][electionName] = race;

  statesUnParsed[race.id] = race;
});

fs.writeFileSync('./byID.json', JSON.stringify(statesUnParsed, null, 2));
fs.writeFileSync('./byState.json', JSON.stringify(statesParsed, null, 2));