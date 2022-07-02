const fs = require('fs');

function changeDirection(character){
    switch(character){
        case "}":
            return "{";
        case "]":
            return "[";
        case ")":
            return "(";
        case ">":
            return "<";
        default:
            return "";
    }
}

function findError(line,v=1){
    let map = {}
    let j=0;
    let depth=0;
    let valido = true;

    while(valido && j<line.length){
        if(line[j]=="{" || line[j]=="[" || line[j]=="<" || line[j]=="("){
            map[`${line[j]}${depth}`]= true;
            depth++;
        }else{
            let oppositeCharacter = changeDirection(line[j]);
            
            if(map[`${oppositeCharacter}${depth-1}`] ){

                delete map[`${oppositeCharacter}${depth-1}`]

                depth--;
            }else{
                
                valido = false;           
                
            }
        }
        j++;
    }

    if(!valido){
        return line[j-1];
    }
    return map;
    
}

function solveP1() {
   
	let inputValues = fs
		.readFileSync('./input10.txt')
		.toString()
		.split('\n')

    let scores = { ")":3, "}":1197, "]":57, ">":25137}
    
    let counter =0;

    for(let i=0; i< inputValues.length;i++){
        
        let errorCaracter = findError(inputValues[i]);
     
        if(typeof(errorCaracter) == typeof("a")){
            counter+=scores[errorCaracter];
            
        }
    }

console.log(counter)

}

function solveP2() {
   
	let inputValues = fs
		.readFileSync('./input10.txt')
		.toString()
		.split('\n')

    let scores = { "(":1, "{":3, "[":2, "<":4}
    
    let counter =0;

    let result = []


    for(let i=0; i< inputValues.length;i++){
        
        let errorCaracter = findError(inputValues[i],2);
     
        if(typeof(errorCaracter) != typeof("a")){
            result.push(Object.keys(errorCaracter).map(
                (c) => 
                {return { value :c.substring(0,1), depth: parseInt(c.substring(1,))}}
            )
            .sort((a,b) => b.depth - a.depth)
            .reduce(
                (acc, curr) => {

                    acc*=5;
                    acc+=scores[curr.value]               
                    return acc;
                },0
            ));

            
        }
    }

console.log(result.sort((a,b) => b-a)[parseInt(result.length/2)])

}

solveP1();
solveP2();