
'use strict'

const fibonacci = num => {
    if(num === 1 || num ===2){
        return 1;
    }
    return fibonacci(num -1) + fibonacci(num -2);
}

console.log('result : ', fibonacci(7)); //n번째 숫자구하기

class MinCoinChange {
    constructor(coinList){
        this.coins = coinList;
        this.cache = {};
    }

    makeChange(amount){
        let me = this;
        if(!amount){
            return []
        }
        if(this.cache[amount]){
            return this.cache[amount];
        }

        let min = [],
            newMin, newAmount;

        for(let i=0; i<this.coins.length; i++){
            let coin = this.coins[i];
            newAmount = amount - coin;
            if(newAmount >= 0){
                newMin = me.makeChange(newAmount);
            }
            if(
                newAmount >= 0 &&
                (newMin.length < min.length-1 || !min.length) &&
                (newMin.length || !newAmount)
            ) {
                min = [coin].concat(newMin);
                console.log('new Min : ', min + ' for ', amount);
            }
        }
        return (this.cache[amount] = min);
    }
}

console.log('MinCoinChange : ', MinCoinChange);
const minCoinChange = new MinCoinChange([1,5,10,25]);
console.log('minCoinChange : ', minCoinChange);
console.log('makeChange : ', minCoinChange.makeChange(36));

const minCoinChange2 = new MinCoinChange([1,3,4]);
console.log('minCoinChange : ', minCoinChange2);
console.log('makeChange : ', minCoinChange2.makeChange(6));