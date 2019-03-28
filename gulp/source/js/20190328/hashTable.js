
'use strict'
//HashTable을 체이닝 처리
class HashTable {
    constructor(){
        this.table = [];
    }

    loseloseHashCode(key){
        let hash = 0;
        for(let i=0; i<key.length; i++){
            hash += key.charCodeAt(i);
        }
        return hash%37;
    }
    djb2HashCode(key){
        const hash = 5381;
        for(let i=0; i<key.length; i++){
            hash = hash*33 + key.charCodeAt(i);
        }
        return hash%1013;
    }
    ValuePair(key, value){
        this.key = key;
        this.value = value;
        this.toString = ()=>{
            return `[${this.key} - ${this.value}]`
        }
    }

    //위는 private로 구현 하려 했으나 es6 class에서는 불가능

    put(key,value){
        let position = this.loseloseHashCode(key);
        console.log('position : ', position);
        // this.table[position] = value;

        if(this.table[position] == undefined){
            this.table[position] = new LinkedList();
        }
        this.table[position].append(new this.ValuePair(key,value));

    }
    get(key){
        // return this.table[this.loseloseHashCode(key)];
        const position = this.loseloseHashCode(key);
        console.log('position : ', position);
        if(this.table[position] !== undefined){
            let current = this.table[position].getHead();
            while(current.next){
                if(current.element.key === key){
                    return current.element.value;
                }
                current = current.next
            }
            if(current.element.key === key){
                return current.element.value;
            }
        }
        return undefined;
    }
    remove(key){
        // this.table[this.loseloseHashCode(key)] = undefined;
        const position = this.loseloseHashCode(key);

        if(this.table[position] !== undefined){
            let current = this.table[position].getHead();
            while(current.next){
                if(current.element.key === key){
                    this.table[position].remove(current.element);
                    if(this.table[position].isEmpty()){
                        this.table[position] = undefined;
                    }
                    return true;
                }
                current = current.next
            }

            if(current.element.key === key){
                this.table[position].remove(current.element);
                if(this.table[position].isEmpty()){
                    this.table[position] = undefined;
                }
                return true;
            }
        }
        return false;
    }
    print(){
        for(let i=0; i<this.table.length;i++){
            if(this.table[i] !== undefined){
                console.log(i + ": "+ this.table[i]);
            }
        }
    }
}

const hashTable = new HashTable();

hashTable.put('a', 1);
hashTable.put('Gandalf', 'gandalf@email.com');
hashTable.put('John', 'JohnSnow@email.com');
hashTable.put('Tyrion', 'Tyrion@email.com');
hashTable.put('Aron', 'aaron@email.com');
hashTable.put('Donnie', 'donnie@email.com');
hashTable.put('Ana', 'ana@email.com');
hashTable.put('Jonathan', 'jonathan@email.com');
hashTable.put('Jamie', 'jamie@email.com');
hashTable.put('Sue', 'sue@email.com');
hashTable.put('Mindy', 'mindy@email.com');
hashTable.put('Paul', 'paul@email.com');
hashTable.put('Nathan', 'nathan@email.com');


console.log(hashTable.get('Gandalf'));
console.log(hashTable.get('Loiane'));

hashTable.print();
hashTable.remove('Jamie');
hashTable.print();
