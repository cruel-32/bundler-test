'use strict'
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
    console.log('solution : ', array);
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
const a10 = solution(10000);
console.log('a10 : ', a10);
console.timeEnd('solution');
console.time('solution');
const a11 =  solution(152);
console.log('a11 : ', a11);
console.timeEnd('solution');
console.time('solution');
const a12 =solution(1444);
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
const a20 = solution2(10000);
console.log('a20 : ', a20);
console.timeEnd('solution2');
console.time('solution2');
const a21 = solution2(152);
console.log('a21 : ', a21);
console.timeEnd('solution2');
console.time('solution2');
const a22 = solution2(1444);
console.log('a22 : ', a22);
console.timeEnd('solution2');

