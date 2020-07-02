import $ from 'jquery'
import { TestCode } from 'modules/Slick'

const testCode = new TestCode();
const abc = {
    name : 'test3333',
    amount : 5000,
}

testCode?.init({
    ...abc,
    amount:1000,
})

testCode?.setValues('test22', 2000)

console.log('$ ::::: ', $)



