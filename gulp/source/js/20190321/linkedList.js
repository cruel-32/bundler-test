
'use strict'

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
    }
    this.insert = function(position,element){
        if(position>=0 && position<=length){
            var node = new Node(element),
                current = head, previous, index=0;
            
            if(position === 0){
                node.next = current;
                head = node;
            } else {
                while(index++ < position){
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            length++
            return true;
        } else {
            return false;
        }
    }
    this.removeAt = function(position){
        if(position>-1 && position<length){
            var current = head,
                previous, index = 0;
            
            if(position === 0){
                head = current.next
            } else {
                while(index++ < position){
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next
            }
            length--;
            return current.element;
        } else {
            return null;
        }
    }
    this.remove = function(element){
        var index = this.indexOf(element);
        return this.removeAt(index);
    }
    this.indexOf = function(element){
        var current = head,
            index = -1;

        while(current){
            if(element === current.element){
                return index;
            }
            index++;
            current = current.next;
        }

        return -1;
    }
    this.isEmpty = function(){
        return length === 0;
    }
    this.size = function(){
        return length;
    }
    this.toString = function(){
        var current = head,
            string = '';

        while(current){
            string += current.element;
            current = current.next;
        }
        
        return string;
    }
    this.getHead = function(){
        return head;
    }
    this.print = function(){}
}

var linkedList = new LinkedList();

linkedList.insert(0,'a');
linkedList.insert(0,'b');
linkedList.insert(1,'c');
linkedList.insert(2,'d');

console.log('linkedList size : ', linkedList.size());
console.log('linkedList getHead : ', linkedList.getHead());
console.log('linkedList toString : ', linkedList.toString());


function DoublyLinkedList(){
    var Node = function(element){
        this.element = element;
        this.next = null;
        this.prev = null;
    }

    var length = 0;
    var head = null;
    var tail = null;
    
    this.insert = function(position,element){
        if(position>=0 && position<=length){
            var node = new Node(element),
                current = head, previous, index=0;
            
            if(position === 0){
                if(!head){
                    head = node;
                    tail = node;
                } else {
                    node.next = current;
                    current.prev = node;
                    head = node;
                }
            } else if(position === length) {
                current = tail;
                current.next = node;
                node.prev = current;
                tail = node;
            } else {
                while(index++ < position){
                    previous = current;
                    current = current.next
                }
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            length++
            return true;
        } else {
            return false;
        }
    }
    this.removeAt = function(position){
        if(position>-1 && position<length){
            var current = head,
                previous, index = 0;
            
            if(position === 0){
                head = current.next

                if(length === 1){
                    tail = null;
                } else {
                    head.prev = null;
                }

            } else if(position === length-1){
                current = tail;
                tail = current.prev;
                tail.next = null;
            }  else {
                while(index++ < position){
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next
                current.next.prev = previous;
            }
            length--;
            return current.element;
        } else {
            return null;
        }
    }
    this.size = function(){
        return length;
    }
    this.getHead = function(){
        return head;
    }
    this.toString = function(){
        var current = head,
            string = '';

        while(current){
            string += current.element;
            current = current.next;
        }
        
        return string;
    }
}

var doublyLinkedList = new DoublyLinkedList();

doublyLinkedList.insert(0,'a');
doublyLinkedList.insert(0,'b');
doublyLinkedList.insert(1,'c');
doublyLinkedList.insert(2,'d');

console.log('doublyLinkedList size : ', doublyLinkedList.size());
console.log('doublyLinkedList getHead : ', doublyLinkedList.getHead());
console.log('doublyLinkedList toString : ', doublyLinkedList.toString());
