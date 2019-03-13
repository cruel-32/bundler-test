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



/* babelTest는 +1해주는 함수다  */
const babelTest = (counter) => counter+1

/**
 * 바벨 클래스.
 * @constructor
 * @param {string} name - 역시 아무의미 없는 이름입니다.
 * @link introduce
 */
class BabelClass {
    constructor(name){
        this.name = name;
    }
    /**
     * introduce함수로 문서화 연습
     * @param {string} a 아무상관없다
     * @param {boolean} retArr 의미없는 문서작성용
     * @returns {(number|Array)} 문서화 버릇을 들여놓읍시다
    */
    introduce(str){
        return this.name + str;
    }
}

const babelClass = new BabelClass('바벨');

console.log('test : ',babelClass.introduce('테스터'));