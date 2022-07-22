const fs = require('fs');
const { type } = require('os');




function readInput(){
    let inputValues = fs.readFileSync('./input12.txt')
    .toString()
    .split('\n')
    .reduce((acc, curr) => {
        
        let values = curr.toString().trim().split("-");

        if(acc.map[values[0]]){
            acc.map[values[0]].push(values[1])
        }else{
            acc.map[values[0]] = [values[1]];
        }
        if(acc.map[values[1]]){
            acc.map[values[1]].push(values[0])
        }else{
            acc.map[values[1]] = [values[0]];
        }
        return acc;
    }, {map : {}})

    return inputValues.map;
}

function getDifferentPaths(place, map, visited, cave=false, flag=false){

    let count=0;

    if(  place!=place.toUpperCase()){
        visited.push(place)
    }

    for(let i=0;i< map[place].length; i++){
        let visit = [...visited];
        if(map[place][i]=="end" && (!cave || cave && flag)){
            
            count++;

        }else{
          
            if( map[place][i]!="end" && (!visited.includes(map[place][i]) || (cave==map[place][i] && visited.includes(map[place][i]) && !flag))){
                
                if((cave==map[place][i] && visited.includes(map[place][i]) && !flag )){
                    count+=getDifferentPaths(map[place][i], map, visit, cave, true);
                }else{
                    count+=getDifferentPaths(map[place][i], map, visit, cave, flag);
                }

            }
        }
    }
    

    return count;

}

// Here it is the mistake i had on my old version of (getDifferentPaths), i setted the flag as true when i crossed the cave the second time
// but i didnt realise then that i also was setting it true to all the paths from the place i was at, cause it was the 
// same flag so i wasnt counting many paths crossing a small cave twice.

 /*if( map[place][i]!="end" && (!visited.includes(map[place][i]) || (cave==map[place][i] && visited.includes(map[place][i]) && !flag))){           
    if((cave==map[place][i] && visited.includes(map[place][i]) && !flag )){
        flag=true;
    }
    count+=getDifferentPaths(map[place][i], map, visit, cave, flag, string);
 }*/


function getSmallCaves(map){
    return Object.keys(map).filter(m => m!=m.toUpperCase() && m!="start" && m!="end");
}



function solveP1() {
    let input = readInput();

    console.log(getDifferentPaths("start",input, []));
    
    
}

function solveP2(){

    let input = readInput();
    let caves = getSmallCaves(input);
    let count = 0;
    //we get the amount of paths exactly having the small cave twice
    for(let cave of caves){
        count+= getDifferentPaths("start",input,[],cave)
    }
    //then we add it the amount of paths without repeating small caves
    count+=getDifferentPaths("start",input, []);
    console.log(count)
}


solveP1();
solveP2();
