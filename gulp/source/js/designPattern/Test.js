'use strict'

function solution3(N) {
    // write your code in JavaScript (Node.js 8.9.4)
    // const n2 = N.toString(2);
    // let max = 0;
    // function getOne(n,c){
    //     if(n < n2.length){
    //         let nth = parseInt(n2[n]);
    //         if(nth == 1){
    //             max = max > c ? max : c;
    //             getOne(n+1,0);
    //         } else if(nth == 0){
    //             getOne(n+1,c+1);
    //         }
    //     }
    // }
    // getOne(0,0);

    const n2 = N.toString(2);
    let max = 0;
    let count = 0;
    for(let i=0; i<n2.length; i++){
        let nth = n2[i];
        if(nth == 1){
            max = Math.max(max,count);
            count=0;
        } else if(nth == 0){
            count+=1;
        }
    }
    return max;
}

console.time('solution3');
solution3(10000);
const a30 = solution3(10000);
console.log('a30 : ', a30);
console.timeEnd('solution3');
console.time('solution3');
const a31 =  solution3(152);
console.log('a31 : ', a31);
console.timeEnd('solution3');
console.time('solution3');
const a32 =solution3(1444);
console.log('a32 : ', a32);
console.timeEnd('solution3');


//Binary Gap
function solution(N) {
    // let array = [];
    // function M(n){
    //     array.unshift(n%2);
    //     if(n>1){
    //         M( Math.floor(n/2) );            
    //     }
    // }
    // M(N);
    let array = N.toString(2);
    let max=0;
    function find(n,length){
        if(n < array.length){
            if(array[n] == 0){
                find(n+1,length+1);
            }
            else {
                find(n+1,0);
                if(max < length){
                    max = length;
                }
            }
        }
    }
    find(0,0);
    return max
}

console.time('solution');
solution(10000);
const a10 = solution(100000);
console.log('a10 : ', a10);
console.timeEnd('solution');
console.time('solution');
const a11 =  solution(1520);
console.log('a11 : ', a11);
console.timeEnd('solution');
console.time('solution');
const a12 =solution(14440);
console.log('a12 : ', a12);
console.timeEnd('solution');


function solution2(N) {
    var resultArray = [];
    var num = (N).toString(2);
    var numArray = num.split('1');
    console.log('solution : ', numArray);
    for(var i = 0; i < numArray.length; i++) {
        if (numArray[i]) {
            resultArray.push(numArray[i]);
        }
    }
    if(resultArray.length == 0 || resultArray.length == 1) {
        return 0;
    } else {
        var result = resultArray.sort(function (a, b) { return b.length - a.length; })[0].length;
        return Number(result);
    }
}

console.time('solution2');
const a20 = solution2(100000);
console.log('a20 : ', a20);
console.timeEnd('solution2');
console.time('solution2');
const a21 = solution2(1520);
console.log('a21 : ', a21);
console.timeEnd('solution2');
console.time('solution2');
const a22 = solution2(14440);
console.log('a22 : ', a22);
console.timeEnd('solution2');

