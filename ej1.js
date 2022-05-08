const fs = require("fs")

var inputValues=[]

 function readInput(){

    inputValues = fs.readFileSync("./input.txt").toString().split("\n").map(v => parseInt(v));
 

}

function solveP1(){

    console.log(inputValues.filter((element,index,array) => index > 0 && element > array[index-1]).length);
}

function solveP2(){
    var value=0, value2=0, counter=0;
    for(let i =0; i<inputValues.length; i++){
        if(i<3){
            value+=inputValues[i];
        }
        else{
            value2=value-inputValues[i-3]+inputValues[i];
            if(value < value2){
                counter++;
            }
            value=value2
        }

    }
    console.log(counter);
}

//optimized after watching solution
function solveP2opt(){
    //the only values changed between one group of three and the next one is the new value and the first value of the initial group
    console.log(inputValues.filter((x,i,a) => i>=3 && x > a[i-3]).length);
}
readInput();
solveP1();
solveP2();
solveP2opt();