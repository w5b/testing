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
    " //playGame function",
  ],
  key: 0,
  start: 0,
  amount: 1,
  filter: /\w+\(/,
  split: null,
}

let webSocketObject = {
  rgx: new RegExp(/ => \{\n\s+\w+ = new/g),
  names: [
    " // WebSocketObject",
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
    " // gameObjectsById",
    " // gameObjects",
  ],
  key: 0,
  start: 1,
  amount: 2,
  filter: null,
  split: ',',
}

function findRegex(obj) {
  let rgxObjectKeys = string.match(obj.rgx)
  if (rgxObjectKeys) rgxObjectKeys = rgxObjectKeys[obj.key];
  else return 'not matched';
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
        for (let j = obj.start; j < obj.start + obj.amount; j++) {
          finalString.push(variables[j]);
        }
        for (let n = 0; n < obj.names.length; n++) {
          finalString[n] += obj.names[n];
        }
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

console.log(findRegex(developer));
console.log(findRegex(playGame));
console.log(findRegex(webSocketObject));
console.log(findRegex(gameObjectsObject));
