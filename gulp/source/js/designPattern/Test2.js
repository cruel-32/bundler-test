'use strict'
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


function solution(A) {
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

console.time('solution');
const rs = solution([9,6,6,9,9,3,9,6,6,3,7,7,8]);
console.log('rs : ', rs);
console.timeEnd('solution');
