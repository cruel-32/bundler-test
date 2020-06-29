import $ from 'jquery'
import slickCarousel from 'slick-carousel'

export class TestCode {
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

console.log('$ ::::: ', $)

$('button').on('click', e => {
    e.preventDefault();
    console.log('테스트')
})

console.log('slickCarousel ::::: ', slickCarousel)

$('#test2').slick()


