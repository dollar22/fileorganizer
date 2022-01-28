#!/usr/bin/env node


let helpObj = require("./commonds/help");
let treeObj = require("./commonds/tree")
let organizeObj = require("./commonds/organize")

let inputArr = process.argv.slice(2);
let command = inputArr[0];

switch (command) {
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizeKey(inputArr[1]);
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("please enter valid command");
        break;
}





