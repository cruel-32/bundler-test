'use strict'
const parseTo10 = N => {
    return Array.prototype.slice.call(N.toString()).reduce((num,item,idx,arr)=> {
        if(item > 0){
            const x = (arr.length-1) - idx;
            // console.log('arr : ', arr);
            // console.log('idx : ', idx);
            // console.log('x : ', x);
            num+=(x ? Math.pow(2,x) : parseInt(item))
        }
        // console.log('num : ', num);
        return num;
    } ,0)
}
    
const parseTo2 = N => {
    let array = [];
    const unshifter = n => {
        if(n == 1){
            array.unshift(n)
        } else {
            array.unshift(n%2)
            const nn = Math.floor(n/2);
            if(nn>=1){
                unshifter(nn);
            }
        }
    }
    unshifter(N);
    return BigInt(array.join(''));
}

function failedSolution(A) {
    let exception = [];
    for(let i=0; i<A.length; i++){
        if(exception.find(item=>item==i)){
            continue
        } else {
            let first = A[i];
            for(let x=i+1; x<A.length; x++){
                if(first == A[x]){
                    exception.push(i);
                    exception.push(x);
                    break;
                } else {
                    if(x == A.length-1){
                        return A[i]
                    }
                    continue
                }
            }
            if(i == A.length-1){
                return A[i]
            }
        }
    }
}

console.time('failedSolution');
const returnFailedSolution = failedSolution([9,6,6,9,9,3,9,6,6,3,7,7,8]);
console.log('returnFailedSolution : ', returnFailedSolution);
console.timeEnd('failedSolution');


function slowSolution(A) {
    const find = array =>{
        let first = array[0];
        const filterd = array.filter(item=>item==first);
        if(filterd.length%2 == 0){
            return find(array.filter(item=>item!=first));
        } else {
            return filterd[filterd.length-1]
        }
    }
    return find(A)
}

console.time('slowSolution');
const rs = slowSolution([9,6,6,9,9,3,9,6,6,3,7,7,8]);
console.log('rs : ', rs);
console.timeEnd('slowSolution');

function slowSolution2(A) {
    // Convert the array to a map with element as a key and number of occurrences as a value
    // Example: { '3': 2, '7': 1, '9': 4 }
    let map = A.reduce((map, obj) => {
        map[obj] = ++map[obj] || 1
        return map
    }, {})
    
    // Then filter the map by checking if the key's value is equal to 1
    // Returns array with key
    let filteredArr = Object.keys(map).filter(el => map[el] === 1)
    
    return  +filteredArr[0] || null
}

console.time('slowSolution2');
const rs2 = slowSolution2([9,6,6,9,1,9,3,9,6,8,6,3,7,7,8]);
console.log('rs2 : ', rs2);
console.timeEnd('slowSolution2');

function solution(A) {
    let result = 0;
    for (let element of A) {  
        // console.log(parseTo2(result), ' ^ ', parseTo2(element))
        console.log(`result : ${result} (${parseTo2(result)}) ^ element : ${element} (${parseTo2(element)}) => ${result^element} (${parseTo2(result^element)})`)
        result ^= element
    }
    return result
}

console.time('solution');
const result = solution([9,6,6,9,3,9,8,3,9,6,6,3,7,7,8]);
console.log('result : ', result);
console.timeEnd('solution');





    
// console.log('parseTo10 11100110111110100000000000000110000000000001 : ', parseTo10(11100110111110100000000000000110000000000001) )
// console.log('parseTo10 10100000000000000110000000000001 : ', parseTo10(10100000000000000110000000000001) )
// console.log('parseTo10 11111111111111111111 : ', parseTo10(BigInt(11111111111111111111)))
// console.log('parseTo10 10110011011111010000 : ', parseTo10(BigInt(10110011011111010000)))
// console.log('parseTo10 100000000000 : ', parseTo10(100000000000) )
// console.log('parseTo10 100011 : ', parseTo10(100011) )
// console.log('parseTo10 101 : ', parseTo10(101) )

// console.log('parseTo2 1048572 : ', parseTo2(1048572) );
// console.log('parseTo2 735189 : ', parseTo2(735189) );
// console.log('parseTo2 2048 : ', parseTo2(2048) );
// console.log('parseTo2 35 : ', parseTo2(35) );
// console.log('parseTo2 5 : ', parseTo2(5) );
// console.log('parseTo2 147 : ', parseTo2(147) );
// console.log('parseTo2 5 : ', parseTo2(5) );
