const fs = require('fs');

function readInput(){
    let fold = false;
    let inputValues = fs.readFileSync('./input14.txt')
    .toString()
    .split('\n\n')
    .reduce((acc, curr, ind) => {
        
        if(ind){
            curr.split("\n").forEach((a) => {
                let values = a.trim().split("->");
                acc.rules[values[0].toString().trim()] = values[1].toString().trim();
            });
        }else{
            acc.initialInput= curr.toString().trim();
        }
        

        return acc;
    }, { initialInput : "" , rules : {} })
    return inputValues;
}


//first approach, this function doesnt work for a large number of steps
//cause the string reach te heap limit
function polymerModification(polymer, rules){
    let newString = "";

    for(let i=0; i< polymer.length-1; i++){
        let pair = polymer[i]+polymer[i+1];
        newString+=polymer[i];
        if(rules[pair]){
            newString+= rules[pair];
        }
    }
    newString+=polymer[polymer.length-1];

    return newString;
}

function solveP1(steps=10){
    
    let {initialInput, rules} = readInput();
    
    for(let i=0; i<steps; i++){
        initialInput= polymerModification(initialInput,rules);
    }

    let counters = initialInput.split("").reduce(
        (acc, curr,i,a) => {           

            if(acc.counter[curr]){
                acc.counter[curr]++;
            }else{
                acc.counter[curr]=1;
            }

            return acc;


        }, {counter : {}}
    );
    let result = Object.values(counters.counter).sort((a,b) => b-a);
    

    console.log(result[0]-result[result.length-1])
}

//upgrade of polymer Modification, here instead of adding the characters we count
//the pairs, elements that were repeated on the string we were working with,
//and having them on pairs ease use the application of the rules
function polymerModificationImproved(pairMap, rules){

    let newPairMap = {};

    for(let pair of Object.keys(pairMap)){
        if(rules[pair]){
            
            let newPair = pair[0]+rules[pair];
            newPairMap[newPair]= (newPairMap[newPair] || 0) + pairMap[pair];
           
            newPair=rules[pair]+pair[1];
            newPairMap[newPair]= (newPairMap[newPair] || 0) + pairMap[pair];

        }else{
            newPairMap[pair] = (newPairMap[pair] || 0) + pairMap[pair];
        }
    }

    return newPairMap;
}

function solveP2(){

    let {initialInput, rules} = readInput();
    let pairMap ={}

    for(let i=0; i< initialInput.length-1; i++){
        let pair = initialInput[i]+initialInput[i+1];
        pairMap[pair] = (pairMap[pair] || 0) + 1;
    }
    
    for(let i=0; i<40; i++){
        pairMap= polymerModificationImproved(pairMap,rules);
    }
    
    let counters = Object.keys(pairMap).reduce((acc, curr) => {
        acc.counter[curr[0]]= (acc.counter[curr[0]] || 0) + pairMap[curr];

        return acc;
    }
    ,
    {counter: {} }
    );

    //the last character isnt counted, due to the fact that we are summing the first character of the pairs
    //to avoid counting the same character twice, and the last character will always be the same because we
    //always insert characters in the middle
    counters.counter[initialInput[initialInput.length-1]]++;


    let result = Object.values(counters.counter).sort((a,b) => b-a);
    
    console.log(result[0]-result[result.length-1])
    

}

solveP1();
solveP2();