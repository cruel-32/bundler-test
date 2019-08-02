'use strict'
function solution(arrangement){
    var answer = 0;
    var count = 0;
    var start = true;
    
    while(start){
        var index = arrangement.indexOf("()");
        var razor = arrangement.substr(index+2,arrangement.length);
       
        if(index !== 0){
            for(var i=0; i<index; i++){
                if(arrangement[i] === "("){
                    count+=1;
                } else {
                    count-=1;
                    answer++
                }
            }
        }

        answer += count
        arrangement = razor;

        if(index === -1){
            start = false;
        }
    }
    return answer;
}
console.log(solution("()(((()())(())()))(())"));
console.log(solution("()(((()()())))()((()))"));

function solution2(array){
    var answer = 0;
    var obj={};
    
    array.forEach(item=>{
        if(obj[item[1]]){
            obj[item[1]]++
        } else {
            obj[item[1]]=1;
        }
    })
    answer = Object.keys(obj).reduce((number,item)=> number*=obj[item]+1 ,1) - 1;
    return answer
}

var pattern1 = [
    ['yellow_hat', 'head_gear'],
    ['blue_sunglass', 'eye_wear'],
    ['green_turban', 'head_gear'],
]

var pattern2 = [
    ['crow_mask', 'face'],
    ['blue_sunglass', 'face'],
    ['smoky_makeup', 'face'],
]

console.log(solution2(pattern1))



function solution3(A,B){
    var answer = 0;
    A=A.map((item,index)=>({key:index,value:item}));
    B=B.map((item,index)=>({key:index,value:item}));

    A.sort((a,b)=>a.value-b.value);
    B.sort((a,b)=>b.value-a.value);

    for(var i=0; i<A.length;i++){
        var lowNumber = A[i];
        var highNumber = B[i];
        answer += lowNumber.value*highNumber.value
        // for(var x=0; x<B.length; x++){
        //     var highNumber = B[x];
        //     if(lowNumber.key !== highNumber.key){
        //         answer += lowNumber.value*highNumber.value
        //         console.log('answer : ', answer);
        //         break;
        //     }
        // }
    }
    return answer;
}

var A = [1, 4, 2]; //1 2 4
var B = [5, 4, 4]; //5 4 4 
console.log("낮은수 : ", solution3(A,B)); // 문제를 착각했음... ㅡㅡ

function solution4(strings){
    var answer = true; 
    if(strings[0] === ")" || strings[strings.length-1] === "(") return false;
    var left = 0;
    var right = 0;    
    for(var i of strings){
        if(i === "("){
            left++;
        } else {
            right++;
        }
        if(left < right){
            answer = false;
            break;
        }
    }

    if(left !== right){
        answer = false;
    }

    return answer
}

var strings = [
    "()()",
    "(())()",
    ")()(",
    "()()",
    "(()(",
    "(()(((())()",
    "()()(()((())()))",
]

var ran = Math.floor(Math.random()*strings.length);

console.log(solution4(strings[ran]))