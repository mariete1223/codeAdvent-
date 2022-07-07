const fs = require('fs');

function readInput(){
    let fold = false;
    let inputValues = fs.readFileSync('./input13.txt')
    .toString()
    .split('\n')
    .reduce((acc, curr) => {
        
        let values = curr.toString().trim().split(",");
 
        if(!fold && values != ""){
            
            acc.coordenadas.push(values.map((a) => parseInt(a)))
        }else{
           
            if(fold){
               
                acc.folds.push(values[0].split("=")
                                        .map((e,i,a) => {
                                            if(i==0){
                                                return e[e.length-1]
                                            }else {
                                                return parseInt(e);
                                            }
                                        }));
            }
            fold=true;
            
        }

        return acc;
    }, { coordenadas : [], folds : [] })

    return inputValues;
}

function fold(axis, foldCoordinate, coordenadas){

    let position = axis=="x" ? 0 : 1;
    let finalPoints = [];

    coordenadas.forEach( elem => {
        
       if(elem[position] > foldCoordinate){

            let copia = [...elem]
            copia[position]= foldCoordinate - (elem[position]-foldCoordinate);
            
            if(finalPoints.indexOf(copia.toString())==-1){
                finalPoints.push(copia.toString())
            }

       }else{
            if(finalPoints.indexOf(elem.toString())==-1){
                finalPoints.push(elem.toString());
            }
       }
    });

    return finalPoints.map(e => e.split(",").map(Number));

}

function solveP1(){
    let {coordenadas, folds} = readInput();


    console.log(fold(folds[0][0],folds[0][1],coordenadas).length);
   

}

function solveP2(){
    let {coordenadas, folds} = readInput();

    for(let i=0; i< folds.length; i++){
        coordenadas = fold(folds[i][0],folds[i][1],coordenadas)

    }
    
    let {maxX, maxY} = coordenadas.reduce((prev, curr) => {
        if( curr[0]>(prev.maxX || 0)){
            prev.maxX=curr[0]
        }
        if(curr[1]>(prev.maxY || 0)){
            prev.maxY=curr[1]
        }

        return prev;
    }, {maxX:0, maxY:0})

    let result = new Array(maxY+1);
    for(let i =0; i< maxY+1; i++){
        result[i]= new Array(maxX+1).fill(".");
    }

    coordenadas.forEach( (ele) => {
        result[ele[1]][ele[0]]="#";
    })

    for(let i =0; i< maxY+1; i++){
        console.log(result[i].join(""));
    }
    
}


solveP1();
solveP2();