
'use strict'

class Set {
    constructor(){
        this.items = {};
    }
    has(value){
        // return value in this.items;
        return this.items.hasOwnProperty(value);
    }
    add(value){
        if(!this.has(value)){
            this.items[value] = value;
            return true;
        } else {
            return false;
        }
    }
    remove(value){
        if(this.has(value)){
            delete this.items[value];
            return true;
        } else {
            return false;
        }
    }
    values(){
        return Object.keys(this.items);
    }
    union(otherSet){
        const unionSet = new Set();
        let values = this.values();
        
        for(let i=0; i<values.length; i++){
            unionSet.add(values[i]);
        }

        values = otherSet.values();
        for(let i=0; i<values.length; i++){
            unionSet.add(values[i]);
        }
        return unionSet;
    }
    intersection(otherSet){
        const intersectionSet = new Set();
        const values = this.values();

        for(let i=0; i<values.length; i++){
            if(otherSet.has(values[i])){
                intersectionSet.add(values[i])
            }
        }
        return intersectionSet;
    }
    difference(otherSet){
        const differenceSet = new Set();
        const values = this.values();

        for(let i=0; i<values.length; i++){
            if(!otherSet.has(values[i])){
                differenceSet.add(values[i]);
            }
        }

        return differenceSet;
    }

    subset(otherSet){
        if(this.size() > otherSet.size()){
            return false;
        } else {
            const values = this.values();
            for(let i=0; i<values.length; i++){
                if(!otherSet.has(values[i])){
                    return false
                }
            }
            return true;
        }
    }
    clear(){
        this.items = {};
    }
    size(){
        return Object.keys(this.items).length;
    }
}

const set = new Set();

set.add('a');
set.add('b');
set.add('c');

console.log('set : ', set);
console.log('set.values() : ', set.values());

const setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);


const setB = new Set();
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);
setB.add(7);


console.log('union : ', setA.union(setB));
console.log('intersection : ', setA.intersection(setB));
console.log('difference : ', setA.difference(setB));
console.log('subset : ', setA.subset(setB));

//dictionary 또는 map이라 부른다
class Dictionary {
    constructor(){
        this.items = {};
    }
    has(key){
        return key in this.items
    }
    set(key, value){
        this.items[key] = value;
    }
    remove(key){
        if(this.has(key)){
            delete this.items[key];
            return true;
        }
        return false;
    }
    get(key){
        return this.has(key) ? this.items[key] : undefined;
    }
    values(){
        let values = [];
        for(let k in this.items){
            if(this.has(k)){
                values.push(this.items[k]);
            }
        }
        return values;
    }
    getItems(){
        return this.items;
    }
    clear(){
        this.items = {};
    }
    size(){
        return Object.keys(this.items).length;
    }
    keys(){
        return Object.keys(this.items);
    }
}

const dictionary = new Dictionary();

dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'JohnSnow@email.com');
dictionary.set('Tyrion', 'Tyrion@email.com');

console.log('dictionary has : ', dictionary.has('Gandalf'));
console.log('dictionary size : ', dictionary.size());
console.log('dictionary keys : ', dictionary.keys());
console.log('dictionary values : ', dictionary.values());
console.log('dictionary get : ', dictionary.get('Tyrion'));

