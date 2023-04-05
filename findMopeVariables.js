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

function findRegex(obj) {
  let rgxObjectKeys = string.match(obj.rgx)
  if (rgxObjectKeys) rgxObjectKeys = rgxObjectKeys[obj.key];
  else return 'not matched';
  let finalString = [];
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
  return finalString;
}

console.log(findRegex(developer));
console.log(findRegex(playGame));
console.log(findRegex(webSocketObject));
