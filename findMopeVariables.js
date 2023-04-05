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
}

let playGame = {
  rgx: new RegExp(/function \w+\(\w+\) \{\n!/g),
  names: [
    " //playGame function",
  ],
  key: 0,
  start: 0,
  amount: 1,
  filter: /\w+\(/
}

let webSocketObject = {
  rgx: new RegExp(/ => \{\n\s+\w+ = new/g),
  names: [
    " // WebSocketObject",
  ],
  key: 0,
  start: 0,
  amount: 1,
  filter: /\w+/
}

function findRegex(rgx, objectKey, start, amount, names, filter = null) {
  let rgxObjectKeys = string.match(rgx)
  if (rgxObjectKeys) rgxObjectKeys = rgxObjectKeys[objectKey];
  else return 'not matched';
  let finalString = [];
  if (filter) {
    let variables = rgxObjectKeys.match(filter);
    for (let i = start; i < start + amount; i++) {
      finalString.push(variables[i]);
    }
    for (let i = 0; i < names.length; i++) {
      finalString[i] += names[i];
    }
  }
  else {
    finalString.push(rgxObjectKeys + names[0]);
  }
  return finalString;
}

console.log(findRegex(developer.rgx, developer.key, developer.start, developer.amount, developer.names, developer.filter));
console.log(findRegex(playGame.rgx, playGame.key, playGame.start, playGame.amount, playGame.names, playGame.filter));
console.log(findRegex(webSocketObject.rgx, webSocketObject.key, webSocketObject.start, webSocketObject.amount, webSocketObject.names, webSocketObject.filter));
