
'use strict'
//tree
function Graph(){
    let vertices = [];
    let adjList = new Dictionary();

    this.addVertex = (v)=>{
        vertices.push(v);
        adjList.set(v,[]);
    }

    this.addEdge = (v,w)=>{
        adjList.get(v).push(w);
        adjList.get(w).push(v);
    }

    this.toString = ()=>{
        let s = '';
        for(let i=0; i<vertices.length; i++){
            s += vertices[i] + ' -> ';
            let neighbors = adjList.get(vertices[i]);
            for(let j=0; j<neighbors.length; j++){
                s += neighbors[j];
            }
            s += '\n';
        }
        return s;
    }

    const initializeColor = ()=>{
        let color = [];
        for(let i=0; i<vertices.length; i++){
            color[vertices[i]] = 'white';
        }
        return color;
    }

    this.bfs = (v, callback)=>{
        let color = initializeColor(),
            queue = new Queue();
        
        queue.enqueue(v);
        while(!queue.isEmpty()){
            let u = queue.dequeue(),
                neighbors = adjList.get(u);
            
            color[u] = 'grey';
            
            for(let i=0; i<neighbors.length; i++){
                let w = neighbors[i];
                if(color[w] === 'white'){
                    color[w] = 'grey';
                    queue.enqueue(w);
                }
            }
            color[u] = 'black';
            if(callback){
                callback(u);
            }
        }
    }

    this.BFS = (v, callback)=>{
        let color = initializeColor(),
            queue = new Queue(),
            d = [],
            pred = [];
        
        queue.enqueue(v);

        for(let i=0; i<vertices.length; i++){
            d[vertices[i]] = 0;
            pred[vertices[i]] = null;
        }

        while(!queue.isEmpty()){
            let u = queue.dequeue(),
                neighbors = adjList.get(u);
            color[u] = 'grey';
            
            for(let i=0; i<neighbors.length; i++){
                let w = neighbors[i];
                if(color[w] === 'white'){
                    color[w] = 'grey';
                    d[w] = d[u] +1;
                    pred[w] = u;
                    queue.enqueue(w);
                }
            }
            color[u] = 'black';
            if(callback){
                callback(u);
            }
        }

        return {
            distances : d,
            predecessors : pred
        }

    }

    this.printNode = (value)=>{
        console.log('탐색한 정점 : ', value);
    }
}

const graph = new Graph();
const myVertices = ['A','B','C','D','E','F','G','H','I'];

for(let i=0; i<myVertices.length; i++){
    graph.addVertex(myVertices[i]);
}

graph.addEdge('A','B');
graph.addEdge('A','C');
graph.addEdge('A','D');
graph.addEdge('C','D');
graph.addEdge('C','G');
graph.addEdge('D','G');
graph.addEdge('D','H');
graph.addEdge('B','E');
graph.addEdge('B','F');
graph.addEdge('E','I');

// console.log(graph.toString());

graph.bfs(myVertices[0], graph.printNode);

// graph.BFS(myVertices[0], graph.printNode);

const shortestPathA = graph.BFS(myVertices[0]);

console.log(shortestPathA);


const fromVertex = myVertices[0];
for(let i=1; i<myVertices.length; i++){
    let toVertex = myVertices[i],
        path = new Stack();
    for(let v=toVertex; v!==fromVertex; v=shortestPathA.predecessors[v]){
        path.push(v);
    }
    path.push(fromVertex);
    let s = path.pop();
    while(!path.isEmpty()){
        s += ' - ' + path.pop();
    }
    console.log(s);
}


