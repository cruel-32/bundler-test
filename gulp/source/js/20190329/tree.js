
'use strict'
//tree
class BinarySearchTree {
    constructor(){
        this.root = null;
    }
    Node(key){
        this.key = key;
        this.left = null;
        this.right = null;
    }
    insert(key){
        var newNode = new this.Node(key);

        if(this.root === null){
            this.root = newNode;
        } else {
            this.insertNode(this.root,newNode);
        }
    }
    insertNode(node, newNode){
        if(newNode.key < node.key){
            if(node.left === null){
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if(node.right === null){
                node.right = newNode;
            } else{
                this.insertNode(node.right, newNode);
            }
        }
    }
    inOrderTraverse(callback){
        this.inOrderTraverseNode(this.root,callback);
    }
    inOrderTraverseNode(node, callback){
        if(node !== null){
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);            
        }
    }
    preOrderTraverse(callback){
        this.preOrderTraverseNode(this.root, callback);
    }
    preOrderTraverseNode(node, callback){
        if(node !== null){
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }
    postOrderTraverse(callback){
        this.postOrderTraverseNode(this.root, callback);
    }
    postOrderTraverseNode(node, callback){
        if(node !== null){
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }
    min(){
        return this.minNode(this.root);
    }
    minNode(node){
        if(node){
            while(node && node.left !== null){
                node = node.left
            }
            return node.key
        }
        return null;
    }
    max(){
        return this.maxNode(this.root);
    }
    maxNode(node){
        if(node){
            while(node && node.right !== null){
                node = node.right
            }
            return node.key
        }
        return null;
    }
    search(key){
        return this.searchNode(this.root, key);
    }
    searchNode(node, key){
        if(node === null){
            return false;
        }
        if(key < node.key){
            return this.searchNode(node.left, key);
        } else if(key > node.key){
            return this.searchNode(node.right,key);
        } else {
            return true;
        }
    }
    remove(key){
        this.root = this.removeNode(this.root, key);
    }
    removeNode(node,key){
        if(node === null){
            return null;
        }
        if(key < node.key){
            node.left = this.removeNode(node.left, key);
            return node;
        } else if(key > node.key){
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            //case 1 - 리프 노드
            if(node.left === null && node.right === null){
                node = null;
                return node;
            }

            //case 2 - 자식이 하나뿐인 노드
            if(node.left === null){
                node = node.right;
                return node;
            } else if(node.right === null){
                node = node.left;
                return node;
            }

            //case 3 - 자식이 둘인 노드
            const aux = this.findMinNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right, aux.key);
            return node;
        }
    }
    minNode(node){
        if(node){
            while(node && node.left !== null){
                node = node.left
            }
            return node
        }
        return null;
    }
    printNode(value){
        console.log(value);
    }
}


const tree = new BinarySearchTree();
tree.insert(11); //root

tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);

console.log('tree : ', tree);

tree.inOrderTraverse(tree.printNode);
tree.preOrderTraverse(tree.printNode);

console.log(tree.search(1) ? '찾았다' : '못찾았다');
console.log(tree.search(8) ? '찾았다' : '못찾았다');


