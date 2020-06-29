import $ from 'jquery'
import Slick from 'slick-carousel'

class TestCode {
    name;
    amount;

    init({name, amount}){
        this.name = name;
        this.amount = amount;
    }
    
    getName(){
        return this.name
    }

    getAmount(){
        return this.amount
    }

    setValues(...args){
        console.log('args ::::: ', args)

    }
}

const testCode = new TestCode();

testCode.init({
    name:'test',
    amount:1000,
})

console.log('$ :::::::::: ', $)
console.log('Slick :::::::::: ', Slick)

$('button').on('click', e => {
    e.preventDefault();
    console.log('테스트')
})