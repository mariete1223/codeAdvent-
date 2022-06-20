const fs = require("fs");
function solveP1(){

    let positions = fs.readFileSync("./input7.txt")
                    .toString()
                    .trim()
                    .split(",")
                    .map(Number)
                    .sort((a,b) => a-b);

    let position;

    if(positions.length%2===0){
   
        position= Math.floor((positions[positions.length/2]+positions[(positions.length/2)+1])/2);

    }else{
        
        position= positions[Math.ceil((positions.length+1)/2)];

    }

    let cont=0;
    for(let number of positions){
        cont+= Math.abs(number-position);
    }

    console.log(cont)
}

function solveP2(){

    let positions = fs.readFileSync("./input7.txt")
                    .toString()
                    .trim()
                    .split(",")
                    .map(Number);
                    

    let position;
    
    position = parseInt(positions.reduce((a,b) => a+b,0)/positions.length);

    let cont=0;
    for(let number of positions){
   
        cont+= (Math.abs(number-position)*(Math.abs(number-position)+1))/2;

    }

    console.log(parseInt(4.9))
}

solveP1();
solveP2();