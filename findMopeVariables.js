const string = require('./gameClient.js')
let devModEtc = {
  rgx: new RegExp(/= 0x0,[\n\s]+\w+ = !\[\].\n\w+ = !\[\].[\s\S\n]*?gCanvas/g),
  names: [
    " //isSuperDev",
    " //devMode_num",
    " //devMode_zoomEnabled",
  ],
  key: 0,
  start: 1,
  amount: 3,
}

let playGame = {
  rgx: new RegExp(/function \w+\(\w+\) \{\n!/g),
  names: [
    " //playGame function",
  ],
  key: 0,
  start: 0,
  amount: 1,
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

console.log(findRegex(devModEtc.rgx, devModEtc.key, devModEtc.start, devModEtc.amount, devModEtc.names, /_\w+/g));
console.log(findRegex(playGame.rgx, playGame.key, playGame.start, playGame.amount, playGame.names));