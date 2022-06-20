const fs = require("fs");
function solveP1(days = 80){

    let lanternFish = fs.readFileSync("./input6.txt")
                    .toString()
                    .trim()
                    .split(",")
                    .map(Number);

        

    let fish= new Array(9).fill(0);
    lanternFish.forEach(x => fish[x]++);
    let aux1 = 0;
    let aux2 = 0;
    for(let i=0;i<days;i++){
        
        for(let j=fish.length-1; j>= 0;j--){
           
            if(j===0){
                fish[8]=aux;
                fish[6]+=aux;
            }else if(j===fish.length-1){
                
                aux= fish[j-1];
                fish[j-1]=fish[j];

            }else{
                aux2=fish[j-1];
                fish[j-1]=aux;
                aux= aux2;
            }
        }
    }

    
    console.log(fish.reduce((a,b) => a+b));
    

}

function solveP2(){
    solveP1(256);
}

solveP1();
solveP2();

//if we use an aux array, inserting there the new fishes creating an arrays which looks like = [8,8,8...,8] we will end up 
//getting a maximum call stack exceeded, so we have to group the fishes into groups of their possible values