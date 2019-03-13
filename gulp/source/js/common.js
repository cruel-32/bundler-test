'use strict'
/*
 * Functional Programming in JavaScript
 * Chapter 01
 * Magical -run- function in support of Listing 1.1
 * Author: Luis Atencio
 */
// -run- with two functions 

//순수함수. 무상태성(statelessness), 불변성 (immutability)

/*
    부수효과 정리
    - 전역 범위에서 변수, 속성, 자료구조를 변경
    - 함수의 원래 인수 값을 변경
    - 사용자 입력을 처리
    - 예외를 일으킨 해당 함수가 붙잡지 않고(catch) 그대로 예외(throw)를 던짐
    - 화면 또는 로그 파일에 출력
    - HTML 문서, 브라우저 쿠키, DB에 질의
*/

/**
 * common 클래스.
 * @constructor
 * @param {string} name - 역시 아무의미 없는 이름입니다.
 * @link introduce
 */
class CommonClass {
    constructor(name){
        this.name = name;
    }
    /**
     * setName함수로 문서화 연습
     * @param {string} a 아무상관없다
     * @param {boolean} retArr 의미없는 문서작성용
     * @returns {(number|Array)} 문서화 버릇을 들여놓읍시다
    */
    setName(str){
        return this.name + str;
    }
    /**
     * getName 함수입니다
     * @returns {(string)} name값 리턴
     * @example <caption>샘플예제1</caption>
     * this.getName() //name
    */
    getName(){
        return this.name
    }
}

const commonClass = new CommonClass('csh');

console.log('test : ', commonClass.setName('테스터'));

/** 
* @global
* @function
* @param {int} number - 헤헤헤헿
* @returns {(int)} +1 값을 리턴
*/
const globalFunction = number => number+1


/** 
* @global
* @function
* @param {int} number - 헤헤헤헿2
* @returns {(int)} -1 값을 리턴
*/
const groupTest = number => number-1