const { info, count } = require('console');
const fs = require('fs');


function readInput() {
	let inputValues = fs
		.readFileSync('./input15.txt')
		.toString()
		.split('\n')
		.map((a) => a.split('').map(Number))
	return inputValues;
}

function coordinateToIndex(x,y,map){
    return x+y*map.length;
}

function indexToCoordinate(index,map){
    const x =index % map.length;
    const y =(index-x)/map.length
    return {x,y};
}

function getNeighbour(index,map){
    let {x,y} = indexToCoordinate(index,map);

    return[
            {x:x+1, y:y},
            {x: x-1, y:y},
            {x:x, y:y+1},
            {x:x, y:y-1}
          ].filter(({x,y}) => x>=0 && y>=0 && x<map.length && y< map.length);
}

function solveP1Dijkstra(inputGiven=undefined) {
	let input = inputGiven || readInput();
    const dist = new Array(input.length * input[0].length).fill(Infinity);
    //const prev = new Array(input.length * input[0].length).fill(null);
    const Q = [0]
    dist[0]=0;
    
    while(Q.length>0){
        let {minIndex} = Q.reduce((acc,curr,index) => {
            if(dist[curr]<acc.min){

                acc.min=dist[curr];
                acc.minIndex=index;
            }

            return acc;
        },{min:Infinity, minIndex:0});

        let [u] =Q.splice(minIndex,1)

        if(u == coordinateToIndex(input.length-1,input.length-1,input)){
            console.log(dist[input.length*input.length-1]);
            return "end";
        }
        const neighbours = getNeighbour(u,input);
        neighbours.forEach( ({x,y}) => {

            let alternative = dist[u] + input[y][x];
            let neighbourIndex = coordinateToIndex(x,y,input);
            if(alternative< dist[neighbourIndex]){
                Q.push(neighbourIndex);
                dist[neighbourIndex]=alternative;
                //prev[neighbourIndex]= u;
            }
        });


    }

    console.log(dist[input.length*input.length-1])

}

function heuristic(x,y,x2,y2){
    let d1 = Math.abs(x2-x);
    let d2 = Math.abs(y2-y);

    return d1+d2;
}

// g(x): The total cost of getting to that node (pretty straightforward). If we reach a node for the first time or reach a node in less time than it currently took, then update the g(x) to the cost to reach this node.
// h(x): The estimated time to reach the finish from the current node. This is also called a heuristic. We online need to update this if it is not set already, since the distance to the finish will not change even if the path we took to arrive at a node changes. Note: There are many different ways to guess how far you are from the end, I use the Manhattan distance in this implementation.
// f(x): Simply g(x) + h(x). The lower the f(x), the better. Think about it like this: the best node is one that takes the least total amount of time to arrive at and to get to the end. So, a node that took only 1 step to arrive at and 5 to get to the end is more ideal than one that took 10 to arrive and and only 1 to get to the end.

function init(grid){

    for(var x = 0; x < grid.length; x++) {
        for(var y = 0; y < grid[x].length; y++) {
            let heur = heuristic(x,y,grid.length-1,grid[grid.length-1].length-1)
            if(x==0 && y==0){
                grid[x][y]= {cost: 0, g: 0 ,h: heur, f: heur, parent:null, x:x , y:y, closed:true}
            }else{
                grid[x][y]= {cost: grid[x][y], g: null ,h: heur, f: null, parent:null, x:x , y:y, closed:false}
            }
            
        }
    }


}

function getNeighbourStar(x,y,map){

    return[
            {x:x+1, y:y},
            {x: x-1, y:y},
            {x:x, y:y+1},
            {x:x, y:y-1}
          ].filter(({x,y}) => x>=0 && y>=0 && x<map.length && y< map[x].length).map(({x,y})=> map[x][y]);
}

function isInList(node, list){
    
    for(let currNode of list){
        if(currNode.x == node.x && currNode.y == node.y){
            return true;
        }
    }
    return false;
}

//CAN BE IMPROVED TURNING THE HEAP (openlist) INTO A BINARY HEAP 
//https://github.com/bgrins/javascript-astar/blob/ef5ec96002f87f8ae9854c9a411e6f482d20ff35/astar.js#L279

function solveP1A_Star(start, inputGiven=undefined) {


    let input = inputGiven || readInput();
    init(input);
  
    let end = {x:input.length-1, y: input[input.length-1].length-1}

    let openList = [];

    openList.push(input[start.x][start.y]);

    while(openList.length>0){
        let minF_Index =0;
        for(let i=0;i<openList.length;i++){
            if(openList[i].f< openList[minF_Index].f){
                minF_Index = i;
            }
        }
        
        let currentNode = openList[minF_Index];
        
       
        if(currentNode.x==end.x && currentNode.y == end.y){
            console.log(currentNode.g)
            return "end";
        }

        openList.splice(minF_Index,1);
        currentNode.closed=true;

        let neighbours = getNeighbourStar(currentNode.x, currentNode.y,input);

        neighbours.forEach((neighbour) => {

            if(!neighbour.closed){
                let gScore = currentNode.g+neighbour.cost;
                let gScoreIsBest = false;

                if(!isInList(neighbour,openList)){
                    gScoreIsBest= true;
                    openList.push(neighbour);
                }else if (gScore < neighbour.g ){
                    gScoreIsBest= true
                }

                if(gScoreIsBest== true){
                    neighbour.g= gScore;
                    neighbour.f= gScore+neighbour.h;
                    neighbour.parent= currentNode;
                }

            }
        });

    }

    console.log("no resultado")
}

function solveP2(){

    let input = readInput();


    let inputExpanded = new Array(input.length*5).fill(0)
                                                 .map((a,x) => new Array(input[0].length*5)
                                                 .fill(0)
                                                 .map((val,y) => {
                                                     let realX = x % input.length;
                                                     let realY = y % input.length;
                                                     let offset = Math.floor(x/input.length) + Math.floor(y/input.length);
                                                     let value = input[realX][realY] + offset;
                                                     return value > 9 ? value - 9 : value;

                                                 }));



    //solveP1A_Star({x:0,y:0},inputExpanded);
    solveP1Dijkstra(inputExpanded);
    
}

solveP1Dijkstra();
solveP1A_Star({x:0,y:0});
solveP2();




//TO CHECK TIME SPENT ON EACH FUNCTION AND LOOPS USE node --inspect-brk day15.js
//then open chrome and type about:inspect in devices our programe will be shown
//profiler -> start then go to sources and on the top right click pause