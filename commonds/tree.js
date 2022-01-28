let fs = require('fs');
let path = require('path');

function treeFn(dirPath){
    if(dirPath == undefined){
        treeHelper(process.cwd(),"");
        } else{
            let doesExist = fs.existsSync(dirPath);
            if(doesExist ==true){
                 treeHelper(dirPath,"");
            } else{
                console.log("Please enter valid path or live empty for cwd");
            }
           
        }
    }


function treeHelper(dirPath,indent){
   let isFile = fs.lstatSync(dirPath).isFile();
   if(isFile == true){
       let fileName = path.basename(dirPath);
     console.log(indent+"├──"+fileName);
   } else{
            let dirName = path.basename(dirPath);
            console.log(indent+"└──"+dirName);
            let childrens = fs.readdirSync(dirPath);
            for(let i = 0; i<childrens.length; i++){
                let childPath = path.join(dirPath,childrens[i]);
                treeHelper(childPath,indent+"\t");
            }
   }
}

module.exports={
    treeKey: treeFn
}