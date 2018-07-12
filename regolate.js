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
    var element = item.behaviors.find(x => x.name === "PrimaryElement");
    if (newMass) {element.templateData.Units = newMass;}
    if (newTemp) {element.templateData._Temperature = newTemp;}
  }
  console.log(`${itemName} Processed`)
}

function checkItems(itemName) {
  const items = saveData.gameObjects.find(x => x.name === itemName);
  for (const item of items.gameObjects) {
    var element = item.behaviors.find(x => x.name === "PrimaryElement");
    var mass = element.templateData.Units;
    var temp = element.templateData._Temperature;
    console.log(`${itemName} Mass: ${mass}`);
    console.log(`${itemName} Temp: ${temp}`);
  }
}

function printDataStructure(itemName) {
  const items = saveData.gameObjects.find(x => x.name === itemName);
  for (const item of items.gameObjects) {
    console.log(`\n${itemName}`);
    console.log(item.behaviors);
  }
}


const saveData = loadFile(savename);
console.log("Save File Parsed");

modifyItems("Regolith", 1, 10);
checkItems("Regolith");
modifyItems("BunkerTile", null, 100);
checkItems("BunkerTile");
modifyItems("ExteriorWall", null, 100);
checkItems("ExteriorWall");
modifyItems("SolarPanel", null, 100);
checkItems("SolarPanel");
//printDataStructure("SolarPanel");
modifyItems("Iron", null, 200)
modifyItems("BunkerDoor", null, 100)
modifyItems("GlassTile", null, 100)
printDataStructure("BunkerDoor");

saveFile(`${savename}-pruned`, saveData);