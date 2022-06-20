const fs = require("fs");
const { markAsUntransferable } = require("worker_threads");

function readInput(){
    //after processing input, we obtain the numers of the bingo, stored at numbers
    //and in bords an array of a class we have created to simplify the functionality 
    //of checking numbers on our bingo board, check if we got a Bingo etc
    return inputValues = fs.readFileSync("./input5.txt")
                    .toString()
                    .trim()
                    .split("\n")
                    .reduce(
                        //acc-> acumulador, block ->current value, i-> index
                        (acc, block, i) => {
                            
                            block.split("->").forEach((v,i,a) => {
                                if(i==0){
                                    acc.initial.push(v.trim().split(",").map(Number))
                                }else{
                                    acc.end.push(v.trim().split(",").map(Number))
                                }
                            });
                            
                            return acc;
                        },
                            {initial : [], end: []}
                        
                    )
}

function solveP1(){
    let {initial, end} = readInput();
    let map = {}

    for(let i = 0 ; i <end.length; i++){
        
        if(initial[i][0]===end[i][0]){
            let x=initial[i][0];
            for(let j = Math.min(initial[i][1],end[i][1]); j <= Math.max(initial[i][1],end[i][1]);j++){
                map[x+","+j] = (map[x+","+j]|| 0) +1;
            } 
        }
        if(initial[i][1]===end[i][1]){
            let y=initial[i][1];
            for(let j = Math.min(initial[i][0],end[i][0]); j <= Math.max(initial[i][0],end[i][0]);j++){
                map[j+","+y] = (map[j+","+y] || 0) +1;
            } 
        }
    }
    console.log(Object.values(map).filter(x => x>1).length);
}

function solveP2(){
    let {initial, end} = readInput();
    let map = {}

    for(let i = 0 ; i <end.length; i++){
        
        if(initial[i][0]===end[i][0]){
            let x=initial[i][0];
            for(let j = Math.min(initial[i][1],end[i][1]); j <= Math.max(initial[i][1],end[i][1]);j++){
                map[x+","+j] = (map[x+","+j]|| 0) +1;
            } 
        }else if(initial[i][1]===end[i][1]){
            let y=initial[i][1];
            for(let j = Math.min(initial[i][0],end[i][0]); j <= Math.max(initial[i][0],end[i][0]);j++){
                map[j+","+y] = (map[j+","+y] || 0) +1;
            } 
        } else{
            let x= initial[i][0]
            let y= initial[i][1]

            while(x !== end[i][0] || y !== end[i][1]){

                 map[x+","+y]=(map[x+","+y] || 0) +1;
                 if(x< end[i][0]){
                     x++;
                 }else{
                     x--;
                 }
                 if(y< end[i][1]){
                     y++;
                 }else{
                     y--;
                 }
            }
            map[end[i][0]+","+end[i][1]]=(map[end[i][0]+","+end[i][1]] || 0) +1;

        }
    }
    console.log(Object.values(map).filter(x => x>1).length);
}

solveP1();
solveP2();

/*
Can be refactored doing this 

function direction(start,end){
    return start===end ? 0 : start < end ? 1 : -1;
}

export function part1(input, diagonal = false) {
    let {initial, end} = readInput();
    let map = {}

  for(let i = 0 ; i <end.length; i++){
    let x =initial[i][0];
    let y = initial[i][1];
    const xDirection = direction(x, end[i][0]);
    const yDirection = direction(y, end[i][1]);
    if (diagonal || iDirection === 0 || jDirection === 0) {
      while (x !== end[i][0] || y !== end[i][1]) {
        map[x+","+y]=(map[x+","+y] || 0) +1;
        x += iDirection;
        y += jDirection;
      }
      map[end[i][0]+","+end[i][1]]=(map[end[i][0]+","+end[i][1]] || 0) +1;
    }
}
   console.log(Object.values(points).filter(x => x > 1).length);
}






*/ 