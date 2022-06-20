const fs = require("fs")

var inputValues;
function readInput(){

    inputValues = fs.readFileSync("./input3.txt").toString().split("\n");
}

function solveP1(){

    var column=0;
    var row=0;
    var result = new Array(inputValues[0].length);
    
    for(let i=0; i<result.length;i++){
        result[i]=0;
    }

    while(column < inputValues[0].length){
        while(row< inputValues.length && result[column]<(inputValues.length/2+1)){
            if(inputValues[row][column] === "1"){
                result[column]+=1;
            }
            row++;
        }
        if(result[column]>= inputValues.length/2+1){
            result[column]=1
        }
        else{
            result[column]=0;
        }
        column++;
        row=0;
    }

    let gamma= parseInt(result.join(""), 2);
    //we create a mask, creating a binary number with filled with 1´s until reaching the length of our input´s strings, 
    //and we convert it to decimal
    const mask = parseInt('1'.repeat(inputValues[0].length), 2);
    //with our mask we XOR with our gamma, obtaining the opposite value 
    let beta= parseInt(gamma ^ mask);

    console.log(gamma*beta);

}

//solution searched, it has a string instead of an array, but it always iterate the whole
//column, we have a stop conditiong in our while, slightly optimized that

//but i iterate several times on my solution array
/*
function findMostCommonBit(numbers, digit) {
    const counter = numbers.filter(number => number[digit] === '1').length;
    return counter >= numbers.length / 2 ? '1' : '0';
  }
  
  export function part1(input) {
    const numbers = input.split('\n');
    const mask = parseInt('1'.repeat(numbers[0].length), 2);
    let mostCommon = '';
    for (let digit = 0; digit < numbers[0].length; digit++) {
      mostCommon += findMostCommonBit(numbers, digit);
    }
    return parseInt(mostCommon, 2) * (parseInt(mostCommon, 2) ^ mask);
  }
*/

function findMostCommon(array, digit){
    const counter = array.filter(v => v[digit]==1).length;

    if(counter> array.length/2){
        return 1;
    }
    else if( counter == array.length/2 && array.length %2 ==0){
        return 10;
    }
    else {
        return 0;
    }
}

function solveP2(){

    let column=0;
    let row=0;
    let result = new Array(inputValues[0].length);
    
    for(let i=0; i<result.length;i++){
        result[i]=0;
    }
    
    let c02Scrubber= inputValues;
    let oxygenGen= inputValues;
    
    let mostCommonOX;
    let mostCommonC02;
    column=0;

    while(  (oxygenGen.length > 1 || c02Scrubber.length > 1) && column < inputValues[0].length){
        
        mostCommonOX= findMostCommon(oxygenGen, column);
        mostCommonC02= findMostCommon(c02Scrubber, column);

        if(oxygenGen.length != 1){
            oxygenGen= oxygenGen.filter(v => {
                if(mostCommonOX==10){
                    return v[column]==1;
                }
                else{
                    return v[column]==mostCommonOX;
                }
            });
        }

        if(c02Scrubber.length != 1){
            c02Scrubber= c02Scrubber.filter(v => {
                if(mostCommonC02==10){
                    return v[column]==0;
                }
                else{
                    return v[column]==(mostCommonC02^mask);
                }
            })
        }
        column++;
    }

    console.log(parseInt(c02Scrubber,2)*parseInt(oxygenGen,2));

}

readInput();
solveP1();
solveP2();