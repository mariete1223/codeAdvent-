const fs = require('fs');

function solveP1() {
	inputValues = fs.readFileSync('./input8.txt').toString().split('\n').reduce((acc, block, i) => {
		block.split('|').forEach((v, i2, a) => {
			if (i2 == 0) {
				acc.testValue.push(v.trim().split(' '));
			} else {
				acc.digits.push(v.trim().split(' '));
			}
		});

		return acc;
	}, { testValue: [], digits: [] });

	let output = inputValues.digits.reduce((acc, v, i) => {
		let count = v.filter(
			(v) => v.length == 2 || v.length == 4 || v.length == 3 || v.length == 7
		).length;
		acc += count;
		return acc;
	}, 0);

	console.log(output);
}

function isSameString(string1, string2) {

    let string3 = string1 +string2
	return new Set(string1).size == new Set(string1 + string2).size && new Set(string1 + string2).size == new Set(string2).size;
}

function convert(string, realValues) {
	let newString = '';
	for (let i = 0; i < string.length; i++) {
		if (realValues[string[i]]) {
			newString += realValues[string[i]];
		} else {
			return false;
		}
	}
}

function contains(string, letters) {
	let bool = false;
	let index = 0;
	while (!bool && index < letters.length) {
       
		if (!string.includes(letters[index])) {
			bool = true;
  
		}
		index++;
	}

	return !bool;
}

function getNumber(test, digits) {
	let realValues = {};
	let auxMap = {};
	let bool = new Array(10).fill(false);
	let number = 10;

	while (number != 0) {
		let currentValue = 0;
		while (number != 0 && currentValue < test.length) {
			switch (test[currentValue].length) {
				case 2:
					if (!bool[currentValue]) {
						realValues[test[currentValue]] = 1;
						bool[currentValue] = true;
                        number--;
					}
					break;
				case 3:
					if (!bool[currentValue]) {
						realValues[test[currentValue].split()] = 7;
						auxMap[7] = test[currentValue];
                        bool[currentValue] = true;
                        number--;
					}
					break;
				case 4:
					if (!bool[currentValue]) {
						realValues[test[currentValue].split()] = 4;
						auxMap[4] = test[currentValue];
                        bool[currentValue] = true;
                        number--;
					}
					break;
				case 7:
					if (!bool[currentValue]) {
						realValues[test[currentValue].split()] = 8;
                        bool[currentValue] = true;
                        number--;
					}
				case 5:
					//235
					if (!bool[currentValue]) {
						if ( auxMap[7] && contains(test[currentValue], auxMap[7])) {
							realValues[test[currentValue].split()] = 3;
                            bool[currentValue] = true;
                            number--;
						} else if (auxMap[6] && contains(auxMap[6], test[currentValue])) {
							realValues[test[currentValue].split()] = 5;
                            bool[currentValue] = true;
                            number--;
						} else if (auxMap[6] && auxMap[7] ){
							realValues[test[currentValue].split()] = 2;
                            bool[currentValue] = true;
                            number--;
						}
                        
					}
					break;
				case 6:
                    //906
					if (!bool[currentValue]) {
						if (auxMap[4] && contains(test[currentValue], auxMap[4])) {
							realValues[test[currentValue].split()] = 9;
                            auxMap[9] = test[currentValue];
                            bool[currentValue] = true;
                            number--;
						} else if (auxMap[7] && auxMap[9] && contains(test[currentValue], auxMap[7]) && !contains(test[currentValue],auxMap[9])) {
							realValues[test[currentValue].split()] = 0;
                            bool[currentValue] = true;
                            number--;
						} else if (auxMap[4] && auxMap[7] && auxMap[9]){
							realValues[test[currentValue].split()] = 6;
							auxMap[6] = test[currentValue];
                            bool[currentValue] = true;
                            number--;
						}
                        
					}
					break;
				
			}
            currentValue++;
		}
	}


    let finalValue="";
    let noMatch=true;
    let keys= Object.keys(realValues);
    let key=0;
    for(let digit of digits){
      
        noMatch=true;
        key=0;
        while(noMatch && key < keys.length ){
            if(isSameString(keys[key],digit)){
               
                noMatch=false;
                finalValue +=realValues[keys[key]];
            }
            key++;
            
        }
    }
 
    return parseInt(finalValue);
}

function solveP2() {
	inputValues = fs.readFileSync('./input8.txt').toString().split('\n').reduce((acc, block, i) => {
		block.split('|').forEach((v, i2, a) => {
			if (i2 == 0) {
				acc.testValue.push(v.trim().split(' '));
			} else {
				acc.digits.push(v.trim().split(' '));
			}
		});

		return acc;
	}, { testValue: [], digits: [] });

    let counter = 0;

	for (let i = 0; i < inputValues.testValue.length; i++) {
        let number =getNumber(inputValues.testValue[i], inputValues.digits[i]);
		counter+=number
	}

    console.log(counter)
}

//part 2 can be refactored easly to be much cleaner:

// function part2(input) {
//     const lines = input.split('\n').map(x => x.split(' | '));
//     return lines
//       .map(l => l.map(d => d.split(' ').map(d => d.split('').sort().join(''))))
//       .reduce((prev, [patterns, output]) => {
//         const len = n => d => d.length === n;
//         const has = (p, n) => d => [...p].filter(c => d.includes(c)).length === n;
//         const d1 = patterns.find(len(2));
//         const d4 = patterns.find(len(4));
//         const d7 = patterns.find(len(3));
//         const d8 = patterns.find(len(7));
//         const d6 = patterns.filter(len(6)).find(has(d1, 1));
//         const d9 = patterns.filter(len(6)).find(has(d4, 4));
//         const d5 = patterns.filter(len(5)).find(has(d6, 5));
//         const d2 = patterns.filter(len(5)).find(has(d9, 4));
//         const d0 = patterns.filter(len(6)).find(d => d !== d6 && d !== d9);
//         const d3 = patterns.filter(len(5)).find(d => d !== d2 && d !== d5);
//         const map = [d0, d1, d2, d3, d4, d5, d6, d7, d8, d9];
//         return Number(output.map(d => map.indexOf(d)).join('')) + prev;
//       }, 0);

solveP1();
solveP2();
