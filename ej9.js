const fs = require('fs');

function solveP1() {
	let inputValues = fs
		.readFileSync('./input9.txt')
		.toString()
		.split('\n')
		.map((c) => c.split(''));

	let counter = 0;
	let lowPoint = true;
	for (let i = 0; i < inputValues.length; i++) {
		for (let j = 0; j < inputValues[0].length; j++) {
			lowPoint = true;
			if (inputValues[i][j] != 9) {
				if (i - 1 >= 0) {
					if (!(inputValues[i][j] < inputValues[i - 1][j])) {
						lowPoint = false;
					}
				}

				if (j - 1 >= 0) {
					if (!(inputValues[i][j] < inputValues[i][j - 1])) {
						lowPoint = false;
					}
				}

				if (j + 1 < inputValues[0].length) {
					if (!(inputValues[i][j] < inputValues[i][j + 1])) {
						lowPoint = false;
					}
				}

				if (i + 1 < inputValues.length) {
					if (!(inputValues[i][j] < inputValues[i + 1][j])) {
						lowPoint = false;
					}
				}

				if (lowPoint) {
					counter += parseInt(inputValues[i][j]) + 1;
				}
			}
		}
	}

	console.log(counter);
}

function solveP2() {
	let inputValues = fs
		.readFileSync('./input9.txt')
		.toString()
		.split('\n')
		.map((c) =>c.split(''))
		.map((c)=> c.map( v => {return {value: parseInt(v), checked: false}}));


    let largestBasins = [];
    for(let i =0; i<inputValues.length;i++){
        for(let j=0; j< inputValues[0].length; j++){
            if(inputValues[i][j].value!=9 && !inputValues[i][j].checked){
                let basin = findBasin(i,j,inputValues);
                largestBasins.push(basin);
            }
        }
    }

	console.log(largestBasins.sort((a,b)=> b-a).slice(0,3).reduce((acc,curr) => acc*curr,1));


}

function findBasin(i,j, array){

	let counter =1;
	array[i][j].checked=true;
	if(i-1>=0){
		if(array[i-1][j].value!=9 && !array[i-1][j].checked){
			counter+= findBasin(i-1,j,array);
		}
	}

	if(j-1>=0){
		if(array[i][j-1].value!=9 && !array[i][j-1].checked){
			counter+= findBasin(i,j-1,array);
		}
	}

	if(j+1<array[0].length){
		if(array[i][j+1].value!=9 && !array[i][j+1].checked){
			counter+= findBasin(i,j+1,array);
		}
	}

	if(i+1<array[0].length){
		if(array[i+1][j].value!=9 && !array[i+1][j].checked){
			counter+= findBasin(i+1,j,array);
		}
	}
	
	return counter;
}


solveP1();
solveP2();
