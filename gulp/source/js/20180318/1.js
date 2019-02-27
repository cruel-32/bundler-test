'use strict'
//명령형 프로그래밍
// function showStudent(ssn){
//     let student = db.find(ssn);
//     if(student!=null){
//         document.querySelector(`#${elementId}`).innerHTML = `
//             ${student.ssn},
//             ${student.firstname},
//             ${student.lastname}
//         `;
//     } else {
//         throw new Error('학생을 찾을 수 없습니다');
//     }
// }

//함수형 프로그래밍
// var find = curry((db,id)=>{
//     let obj = db.find(id);
//     if(obj == null){
//         throw new Error('객체를 찾을 수 없습니다');
//     }
//     return obj;
// })

// var csv = student => `${student.ssn}, ${student.firstname}, ${student.lastname}`;

// var append = curry((selector, info)=>{
//     document.querySelector(selector).innerHTML = info;
// });

var sum = (arr)=>{
    return arr.reduce((pre,now)=>{
        return pre+now;
    },0)
}

var size = (arr)=>{
    return arr.length;
}

var divide = (number,number2)=>{
    return number/number2
}

var input = [10,50,90];

var average = (arr) => {
    return divide(sum(arr),size(arr))
};

console.log(
    'aver :: ' + average(input)
);


