
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
    search(){

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
    postOrderTraverse(){}
    min(){}
    max(){}
    remove(){}
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

