
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
                swap(j, j+1);
            }
        }
    }

    this.modifiedBubbleSort = ()=>{
        let length = array.length;
        for(let i=0; i<length; i++){
            for(let j=0; j<length-1; j++){
                if(array[j] > array[j+1]){
                    swap(j, j+1);
                }
            }
        }
    }

    this.selectionSort = ()=>{
        let length = array.length,
            indexMin;
        
        for(let i=0;i<length-1;i++){
            indexMin = i;
            for(let j=i; j<length; j++){
                if(array[indexMin]>array[j]){
                    indexMin = j;
                }
            }
            if(i !== indexMin){
                swap(i, indexMin);
            }
        }
    }

    this.insertionSort = ()=>{
        let length = array.length,
            j,temp;
        

        for(let i=1; i<length; i++){
            j=i;
            temp = array[i];
            while(j>0 && array[j-1] > temp){
                array[j] = array[j-1];
                j--
            }
            array[j] = temp;
        }
    }

    const mergeSortRec = (array)=>{
        const length = array.length;

        if(length===1){
            return array;
        }

        const mid = Math.floor(length/2),
            left = array.slice(0,mid),
            right = array.slice(mide, length);

        return merge(mergeSortRec(left),mergeSortRec(right));
    }

    const merge = (left,right)=>{
        const result = [],
            il = 0, ir = 0;
        
        while(il<left.length&&ir<right.length){
            if(left[il]<right[ir]){
                result.push(left[il++]);
            } else {
                result.push(right[ir++]);
            }
        }

        while(il<left.length){
            result.push(left[il++]);
        }

        while(ir<right.length){
            result.push(right[ir++]);
        }

        return result;
    }

    this.mergeSort = ()=>{
        array = mergeSortRect(array);
    }

    const quick = (array, left, right) =>{
        let index;

        if(array.length > 1){
            index = partition(array, left, right);

            if(left < index -1){
                quick(array, left, index-1);
            }

            if(index < right){
                quick(array, index, right);
            }
        }
    }

    const partition = (array,left,right)=>{
        let pivot =array[Math.floor((right+left)/2)],
            i=left, j=right;

        while(i<=j){
            while(array[i]<pivot){
                i++;
            }
            while(array[j]>pivot){
                j--;
            }
            if(1<=j){
                swapQuickStort(array, i, j);
                i++;
                j--;
            }
        }
        return i;
    }

    const swapQuickStort = (array,index1,index2)=>{
        let aux = array[index1];
        array[index1] = array[index2];
        array[index2] = aux;
    }

    this.quickSort = ()=>{
        quick(array, 0, array.length-1);
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

array.selectionSort();
console.log(array.toString());


