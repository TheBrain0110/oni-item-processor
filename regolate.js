const {
  readFileSync,
  writeFileSync
} = require("fs");
const {
  parseSaveGame,
  writeSaveGame
} = require("oni-save-parser");

// Put the name of your save file here
const savename = "Regolith"

function loadFile(fileName) {
  const fileData = readFileSync(`./${fileName}.sav`);
  return parseSaveGame(fileData.buffer);
}

function saveFile(fileName, save) {
  const fileData = writeSaveGame(save);
  writeFileSync(`./${fileName}.sav`, new Uint8Array(fileData));
  console.log("Save File Written");
}

function modifyItems(itemName, newMass, newTemp) {
  const items = saveData.gameObjects.find(x => x.name === itemName);
  for (const item of items.gameObjects) {
  if (newMass) {item.behaviors[1].templateData.Units = newMass;}
  if (newTemp) {item.behaviors[1].templateData._Temperature = newTemp;}
  }
  console.log(`${itemName} Processed`)
}

function checkItems(itemName) {
  const items = saveData.gameObjects.find(x => x.name === itemName);
  for (const item of items.gameObjects) {
    var mass = item.behaviors[1].templateData.Units;
    var temp = item.behaviors[1].templateData._Temperature;
    console.log(`${itemName} Mass: ${mass}`);
    console.log(`${itemName} Temp: ${temp}`);
  }
}


const saveData = loadFile(savename);
console.log("Save File Parsed");

modifyItems("Regolith");
checkItems("Regolith");

//saveFile(`${savename}-pruned`, saveData);