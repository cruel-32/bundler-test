'use strict'

const a = 1;
const b = 2;
const c = 3;

console.log('a & b : ', (a & b) & c);
console.log('a | b : ', (a | b));

console.log('2진 : ', parseInt("0101",2) );
console.log( null == undefined);

console.log( parseInt(null));

//Stack과 Queue를 공부해보자

//Stack => 후입선출 LIFO
function Stack (){
    var items = [];
    this.push = (element) =>{
        items.push(element);
    }
    this.pop = () =>{
        return items.pop();
    }
    this.peek = () => {
        return items[items.length-1];
    }
    this.isEmpty = () => {
        return items.length === 0;
    }
    this.size = () => {
        return items.length;
    }
    this.clear = () => {
        items = [];
    }
    this.print = () => {
        console.log(items.toString());
    }
}

function baseConverter(decNumber, base){
    var remStack = new Stack(),
        rem, baseString = '', digits='0123456789ABCDEF';
    
    while(decNumber > 0 ){
        rem = Math.floor(decNumber%base);
        remStack.push(rem);
        decNumber = Math.floor(decNumber/base);
    }
    while(!remStack.isEmpty()){
        baseString+=digits[remStack.pop()];
    }
    return baseString;
}

console.log(baseConverter(100345,2));
console.log(baseConverter(100345,8));
console.log(baseConverter(100345,16));

//Queue => 선입선출 FIFO
function Queue(){
    var items = [];
    this.enqueue = (element) =>{
        items.push(element);
    }
    this.dequeue = () =>{
        return items.shift();
    }
    this.front = () => {
        return items[0];
    }
    this.isEmpty = () => {
        return items.length === 0;
    }
    this.size = () => {
        return items.length;
    }
    this.clear = () => {
        items = [];
    }
    this.print = () => {
        console.log(items.toString());
    }
}

function PriorityQueue(){
    var items = [];
    function QueueElement(element,priority){
        this.element = element;
        this.priority = priority;
    }
    this.enqueue = function(element,priority){
        var queueElement = new QueueElement(element,priority);

        if(this.isEmpty()){
            items.push(queueElement);
        } else {
            var added = false;
            for(var i=0; i<items.length; i++){
                if(queueElement.priority < items[i].priority){
                    items.splice(i,0,queueElement);
                    added = true;
                    break;
                }
            }
            if(!added){
                items.push(queueElement);
            }
        }
    }
    // this.enqueue = (element) =>{
    //     items.push(element);
    // }
    this.dequeue = () =>{
        return items.shift();
    }
    this.front = () => {
        return items[0];
    }
    this.isEmpty = () => {
        return items.length === 0;
    }
    this.size = () => {
        return items.length;
    }
    this.clear = () => {
        items = [];
    }
    this.print = () => {
        console.log(JSON.stringify(items));
    }
}

var priorityQueue = new PriorityQueue();

priorityQueue.enqueue("john",2);
priorityQueue.enqueue("jack",1);
priorityQueue.enqueue("camila",1);
priorityQueue.enqueue("choi",2);
priorityQueue.print();

function LinkedList(){
    var Node = function(element){
        this.element = element;
        this.next = null;
    }

    var length = 0;
    var head = null;

    this.append = function(element){
        var node = new Node(element),
            current;
        
        if(head === null){
            head = node;
        } else {
            current = head;
            while(current.next){
                current = current.next;
            }
            current.next = node;
        }
        length++;
    };

    this.insert = function(position,element){}
    this.removeAt = function(position){
        if(position > -1 && position < length){
            var current = head,
                previous, index = 0;
            
            if(position === 0 ){
                head = current.next;
            } else {
                while(index++ < position){
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }

            length--;
            return current.element;
        } else {
            return null;
        }
    }
    this.remove = function(element){}
    this.indexOf = function(element){}
    this.isEmpty = function(){}
    this.size = function(){}
    this.toString = function(){}
    this.print = function(){}
    

}