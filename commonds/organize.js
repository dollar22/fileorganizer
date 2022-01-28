let fs = require('fs');
let path = require('path');

let utilityObj = require("../utility");

function organizeFn(dirPath){
    // 1. input -> directory path given -> done
    let destPath;
    if(dirPath == undefined){
        dirPath = process.cwd();
        
    } 
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
             destPath = path.join(dirPath,"organized_files");
            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath);
                console.log("Created organized_files directory");
            } else{
                console.log("Directory already exists");
            }
           
        } else{
            console.log("please enter a valid directory");
        }

    // 2. create -> organized_file -> directory

    organizeHelper(dirPath,destPath);
    // 3. identify the categories of all the files present in that input directory ->
    // 4. copy/cut files to that organized directory inside of any of category
}

function organizeHelper(src,dest){
   let childNames = fs.readdirSync(src);
   for(let i = 0; i<childNames.length; i++){
       let childAddress = path.join(src,childNames[i]);
       let isFile = fs.lstatSync(childAddress).isFile();
       if(isFile){
           let category = getCategory(childNames[i]);
           sendFile(childAddress,dest,category);
       } 
   }
}

function sendFile(srcFile,dest, category){
       let categoryPath = path.join(dest,category);
       if(fs.existsSync(categoryPath) == false){
           fs.mkdirSync(categoryPath);
         }
       let fileName = path.basename(srcFile);
       let destFilePath = path.join(categoryPath,fileName);
       fs.copyFileSync(srcFile,destFilePath);  

}

function getCategory(name){
  let ext = path.extname(name);
  ext = ext.slice(1);

for(let type in utilityObj){
      let cTypeArray = utilityObj[type];
      for(let i = 0; i<cTypeArray.length; i++){
          if(ext==cTypeArray[i]){
              return type;
          }
      }
  }
  return "others";
}

module.exports={
    organizeKey:organizeFn
}