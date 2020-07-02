import $ from 'jquery'
import { TestCode } from '../Slick'

const testCode = new TestCode();
const abc = {
    name : 'test1111',
    amount : 3000,
}

testCode?.init({
    ...abc,
    amount:1000,
})

testCode?.setValues('test22', 2000)

console.log('$ ::::: ', $)


$('#test1').slick()

$('button').on('click', e => {
    e.preventDefault();
    console.log('테스트')
})



