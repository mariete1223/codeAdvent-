const fs = require('fs');

function increaseEnergyLevel(i, j, array) {

    let counter= 0;

    if(array[i][j].flash==false &&  array[i][j].value==9){
        array[i][j].value=0;
        array[i][j].flash= true;
        counter++;
        
        array[i-1] && array[i-1][j] && (counter+=increaseEnergyLevel(i-1,j,array));
        array[i+1] && array[i+1][j] && (counter+=increaseEnergyLevel(i+1,j,array));
        array[i] && array[i][j-1] && (counter+=increaseEnergyLevel(i,j-1,array));
        array[i] && array[i][j+1] && (counter+=increaseEnergyLevel(i,j+1,array));
        array[i-1] && array[i-1][j+1] && (counter+=increaseEnergyLevel(i-1,j+1,array));
        array[i-1] && array[i-1][j-1] && (counter+=increaseEnergyLevel(i-1,j-1,array));
        array[i+1] && array[i+1][j-1] && (counter+=increaseEnergyLevel(i+1,j-1,array));
        array[i+1] && array[i+1][j+1] && (counter+=increaseEnergyLevel(i+1,j+1,array));
    }else if(array[i][j].flash==false){
        array[i][j].value++;
    }

    return counter;
}

function reset(array) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[0].length; j++) {
			array[i][j].flash = false;
		}
	}
}

function solveP1(part2) {
	let inputValues = fs.readFileSync('./input11.txt').toString().split('\n').map((n) =>
		n.split('').map((n) => {
			return { value: n, flash: false };
		})
	);

    let counter=0;
    let stepCounter=0;
    let n=0;
    let i=0;
    let j=0;
    let flashes=0;
    let solucion= false;
	while( (!solucion && part2) || ( !part2 && n < 100)  ) {
        i=0;
        while (!solucion && i < inputValues.length) {
            j=0;
			while (!solucion && j < inputValues[0].length) {
				flashes=increaseEnergyLevel(i, j, inputValues);
                stepCounter+=flashes;
                j++;
			}
            
            i++;
		}
        if(stepCounter===inputValues.length*inputValues[0].length && part2){
            solucion=true;
        }
        counter+=stepCounter;
        stepCounter=0;
        reset(inputValues);
        n++;
	}

    if(part2){
        console.log(n)
    }else{
        console.log(counter)
    }
}
    

function solveP2() {
    solveP1(true);
}
    
//instead of having a boolena in each cell, we could increment all the values, even above 9, and at the end
//count them and set them to 0, saving memory

solveP1(false);
solveP2();
