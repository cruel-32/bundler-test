
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

    this.vanillaSort = ()=>{
        return array.sort((a,b)=>a>b);
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

    this.mergeSort = function(){
        array = mergeSortRec(array);
    };

    var mergeSortRec = function(array){

        var length = array.length;

        if(length === 1) {
            console.log(array);
            return array;
        }

        var mid = Math.floor(length / 2),
            left = array.slice(0, mid),
            right = array.slice(mid, length);

        return merge(mergeSortRec(left), mergeSortRec(right));
    };

    var merge = function(left, right){
        var result = [],
            il = 0,
            ir = 0;

        while(il < left.length && ir < right.length) {

            if(left[il] < right[ir]) {
                result.push(left[il++]);
            } else{
                result.push(right[ir++]);
            }
        }

        while (il < left.length){
            result.push(left[il++]);
        }

        while (ir < right.length){
            result.push(right[ir++]);
        }

        console.log(result);

        return result;
    };

    this.quickSort = function(){
        quick(array,  0, array.length - 1);
    };

    var partition = function(array, left, right) {

        var pivot = array[Math.floor((right + left) / 2)],
            i = left,
            j = right;

        console.log('피봇은 ' + pivot + '; 좌측 포인터는 ' + left + '; 우측 포인터는 ' + right);

        while (i <= j) {
            while (array[i] < pivot) {
                i++;
                console.log('i = ' + i);
            }

            while (array[j] > pivot) {
                j--;
                console.log('j = ' + j);
            }

            if (i <= j) {
                console.log('swap ' + array[i] + ' with ' + array[j]);
                swapQuickStort(array, i, j);
                i++;
                j--;
            }
        }

        return i;
    };

    var swapQuickStort = function(array, index1, index2){
        var aux = array[index1];
        array[index1] = array[index2];
        array[index2] = aux;
    };

    var quick = function(array, left, right){
        var index;
        if (array.length > 1) {

            index = partition(array, left, right);

            if (left < index - 1) {
                quick(array, left, index - 1);
            }

            if (index < right) {
                quick(array, index, right);
            }
        }
        return array;
    };

    this.binarySearch = (item)=>{
        this.quickSort();

        let low = 0,
            high = array.length -1,
            mid, element;

        while(low <= high){
            mid = Math.floor((low + high)/2);
            element = array[mid];
            if(element < item){
                low = mid + 1;
            } else if(element > item){
                high = mid - 1;
            } else {
                return mid;
            }
        }
        return -1;
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

console.time('vanillaSort');
array.vanillaSort();
console.timeEnd('vanillaSort');

console.time('bubbleSort');
array.bubbleSort();
console.log(array.toString());
console.timeEnd('bubbleSort');

// console.time('selectionSort');
// array.selectionSort();
// console.log(`selectionSort : `, array.toString());
// console.timeEnd('selectionSort');

// console.time('mergeSort');
// array.mergeSort();
// console.log(`mergeSort : `, array.toString());
// console.timeEnd('mergeSort');

// console.time('quickSort');
// array.quickSort();
// console.log(`quickSort : `, array.toString());
// console.timeEnd('quickSort');

