const string = require('./gameClient.js')
let developer = {
  rgx: new RegExp(/= 0x0,[\n\s]+\w+ = !\[\].\n\w+ = !\[\].[\s\S\n]*?gCanvas/g),
  names: [
    " //isSuperDev",
    " //devMode_num",
    " //devMode_zoomEnabled",
  ],
  key: 0,
  start: 1,
  amount: 3,
  filter: /_\w+/g,
  split: null,
}
let playGame = {
  rgx: new RegExp(/function \w+\(\w+\) \{\n!/g),
  names: [
    " //playGameFunction",
  ],
  key: 0,
  start: 0,
  amount: 1,
  filter: /\_\w+/g,
  split: null,
}

let webSocketObject = {
  rgx: new RegExp(/ => \{\n\s+\w+ = new/g),
  names: [
    " //WebSocketObject",
  ],
  key: 0,
  start: 0,
  amount: 1,
  filter: /\w+/,
  split: null,
}

let gameObjectsObject = {
  rgx: new RegExp(/0, \w+ = \{\}. \w+ = \[\], \w+ = \[\]./g),
  names: [
    " //gameObjectsById",
    " //gameObjects",
  ],
  key: 0,
  start: 1,
  amount: 2,
  filter: /\w+/g,
  split: ',',
}
let myPlayerId = {
  rgx: new RegExp(/= null, \w+ = \w+\['readuint32'\]/gi),
  names: [
    "//myPlayerId",
  ],
  key: 0,
  start: 0,
  amount: 1,
  filter: /\w+ /g,
}

let addServer = {
  rgx: new RegExp(/const \w+ = await \w+\(\w+\);[\S\s\n]*?;/gi),
  names: [
    " //add the server",
    " //connect to it",
  ],
  key: 0,
  start: 0,
  amount: 2,
  filter: /(await )?\w+\(\w+\)/gi,
  split: '\n',
}


function findRegex(obj) {
  let rgxObjectKeys = string.match(obj.rgx)
  if (rgxObjectKeys) rgxObjectKeys = rgxObjectKeys[obj.key];
  else return '';
  let finalString = [];
  if (!obj.split) {
    if (obj.filter) {
      let variables = rgxObjectKeys.match(obj.filter);
      for (let i = obj.start; i < obj.start + obj.amount; i++) {
        finalString.push(variables[i]);
      }
      for (let i = 0; i < obj.names.length; i++) {
        finalString[i] += obj.names[i];
      }
    }
    else {
      finalString.push(rgxObjectKeys + obj.names[0]);
    }
  }
  else {
    rgxObjectKeys = rgxObjectKeys.split(obj.split);
    if (obj.filter) {
      for (let i = 0; i < rgxObjectKeys.length; i++) {
        let variables = rgxObjectKeys[i].match(obj.filter);
        if (i >= obj.start && i <= obj.amount) {
          finalString.push(variables);
        }
      }
      for (let n = 0; n < obj.names.length; n++) {
        finalString[n] += obj.names[n];
      }
    }
    else {
      for (let i = obj.start; i < obj.start + obj.amount; i++) {
        finalString.push(rgxObjectKeys[i]);
      }
      for (let i = 0; i < obj.names.length; i++) {
        finalString[i] += obj.names[i];
      }
    }
  }
  return finalString;
}

let finalObject = [
  ...findRegex(developer),
  ...findRegex(playGame), ...findRegex(webSocketObject),
  ...findRegex(gameObjectsObject), ...findRegex(myPlayerId),
  ...findRegex(addServer),
];
let finalString = '';

for (let key in finalObject) {
  finalString += finalObject[key] + '\n';
}

console.log(finalString);