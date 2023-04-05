
const string = require('./gameClient.js')
let devModEtc = {
  rgx: new RegExp(/= 0x0,[\n\s]+\w+ = !\[\].\n\w+ = !\[\].[\s\S\n]*?gCanvas/g),
  names: [
    " //isSuperDev\n",
    " //devMode_num\n",
    " //devMode_zoomEnabled\n",
  ]
}

let playGame = {
  rgx: new RegExp(/function \w+\(\w+\) \{\n!/g),
  names: [
    "// playGame function",
  ]
}

function findRegex(rgx, objectKey, start, amount, names, filter = null) {
  let rgxObjectKeys = string.match(rgx)
  if (rgxObjectKeys) rgxObjectKeys = rgxObjectKeys[objectKey];
  else return 'not matched';
  let finalString = [];
  if (filter) {
    let variables = rgxObjectKeys.match(filter);
    for (let i = start; i < start + amount; i++) {
      finalString.push(variables[i].replace("\n", ""));
    }
    for (let i = 0; i < names.length; i++) {
      finalString[i] += names[i];
    }
  }
  else {
    finalString.push(rgxObjectKeys.replace("\n", "") + names[0]);
  }
  return finalString;
}

console.log(findRegex(devModEtc.rgx, 0, 1, 3, devModEtc.names, /_\w+/g));
console.log(findRegex(playGame.rgx, 0, 0, 1, playGame.names));