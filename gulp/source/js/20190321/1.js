'use strict'

const config = {
    entryDir : ''
}
const dirList = [
    `\\project1\\build\\html\\test.html`,
    `\\project2\\build\\html\\20180318\\functional-programming-1`,
    `\\project3\\build\\html\\20180318\\functional-programming-2`,
    `\\project4\\build\\html\\20181017\\flex_test.html`,
    `\\project5\\build\\html\\20190321\\structures&algorithms.html`,
];

const maps = [];
dirList.forEach(dir=>{
    const allPath = dir.replace(config.entryDir, '').split('\\').reduce((arr,path)=>{
        if(path){
            arr.push(path);
        }
        return arr
    },[])
    const buildFolder = (folders, depth)=>{
        if((depth+1) >= allPath.length){
            folders.push(allPath[depth]);
        } else {
            const path = allPath[depth];
            const folder = folders.find(f=>f.folderName===path);
            if(folder){
                buildFolder(folder.files, depth+1);
            } else {
                const files = [];
                folders.push({
                    "folderName" : path,
                    "parentPath" : allPath[depth-1] || null,
                    files
                });
                buildFolder(files,depth+1);
            }
        }
    }
    buildFolder(maps,0);
});

console.log('maps : ', maps)