const fs = require('fs');

function findSpeed(number,limits){
    let result = [];

    while(number!=0){
        
        if(isIn(number,limits[0], limits[1])){
            result.push(number);
        }
        number--;
    }

    return result;
}

function isIn(number,min,max){
    
    let counter = 0;
    let aux = number;
    while(counter<min && counter<max && number>0){         
        counter+=number;
        number--;
    }

    return counter>=min && counter<=max;

}

function shoot(xVelocity, yVelocity, xRange, yRange){

    let x = 0;
    let y = 0;

    let maxY=0;

    while(x< xRange[1] && y > yRange[0]){
        x+=xVelocity;
        y+=yVelocity;
        if(maxY<y) maxY=y;

        if(x>= xRange[0] && x<= xRange[1] && y>= yRange[0] && y<= yRange[1]) return maxY;

        if(xVelocity>0) xVelocity--;
        yVelocity--;

    }


}

function solveP1(height=true){

    let inputValues = fs
		.readFileSync('./input17.txt')
		.toString()
		.split(",")
        .map( (n,i) => {
            let value = n.substring(n.indexOf("=")+1,).split("..").map(Number)
            return value;
        });
    
    let minY = Math.min(...inputValues[1]);
    let maxX = Math.max(...inputValues[0]);

    let result =[];

    let xValues = findSpeed(inputValues[0][1], inputValues[0]);
   
    for(let i=0; i<xValues.length;i++){
        for(let y=minY; y<Math.abs(minY);y++){
            let resultValue = shoot(xValues[i],y,inputValues[0],inputValues[1]);
            if(resultValue!=undefined){
                result.push(resultValue);
            }
        }
    }
    
    if(height){
        console.log(Math.max(...result));
    }else{
        console.log(result.length);
    }
   

}

function solveP2(){
    solveP1(false)
}

solveP1();
solveP2();