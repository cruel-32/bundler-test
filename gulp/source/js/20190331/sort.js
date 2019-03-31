
'use strict'

function ArrayList(){
    let array = [];

    this.insert = (item)=>{
        array.push(item);
    }

    this.toString = ()=>{
        return array.join();
    }

    const swap = (index1,index2)=>{
        let aux = array[index1];
        array[index1] = array[index2];
        array[index2] = aux;
    }

    this.bubbleSort = ()=>{
        let length = array.length;
        for(let i=0; i<length; i++){
            for(let j=0; j<length-1; j++){
                if(array[j] > array[j+1]){
                    swap(j, j+1);
                }
            }
        }
    }
}

function createNonSortedArray(size){
    let array = new ArrayList();
    for(let i=size; i>0; i--){
        array.insert(i);
    }
    return array;
}

let array = createNonSortedArray(5);
console.log(array.toString());
array.bubbleSort();
console.log(array.toString());
