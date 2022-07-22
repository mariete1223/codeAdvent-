const fs = require('fs');


const readInput = (input,number) => input.splice(0,number).join("");

function binaryToDecimal(binary){
	return parseInt(parseInt(binary,2).toString(10),10);
}

function readLiteralValue(input){

	let binaryConverted = readInput(input,5);
	let binaryNumber = binaryConverted.substring(1,5);

	while(binaryConverted[0] != 0){

		binaryConverted = readInput(input,5);
		binaryNumber += binaryConverted.substring(1,5);
		
	}

	return binaryToDecimal(binaryNumber);

}

function readOperatorPacket(input,version){

	let subpacket = [];
	let packetBitsOrNumber = 0;
	let lengthType = parseInt(readInput(input,1));
	
	if(lengthType){
		packetBitsOrNumber = binaryToDecimal(readInput(input,11));
	}else{
		
		packetBitsOrNumber = binaryToDecimal(readInput(input,15));
	}

	let packetsParsed = 0;
	let targetLength = input.length - packetBitsOrNumber;

	while( (packetBitsOrNumber>packetsParsed && lengthType) || (input.length!=targetLength && !lengthType) ){

		subpacket.push(parsePacket(input,version));
		packetsParsed++;
		
	}

	
	return subpacket;
}

function parsePacket(input, version){

	let binaryTarget= readInput(input,6);
	let ver = binaryToDecimal(binaryTarget.substring(0,3));
	let packetId = binaryToDecimal(binaryTarget.substring(3,6));

	if(packetId==4){
		let valor = readLiteralValue(input);
		
		if(version){
			return ver;
		}else{
			return valor;
		}

	}else{

		let subpacket = readOperatorPacket(input,version);
	
		if(version){
			return subpacket.reduce((a,b)=> a+b,0)+ver;
		}

		switch(packetId){
			case 0:
				return subpacket.reduce((a,b) => a+b,0);
			case 1:
				return subpacket.reduce((a,b) => a*b,1);
			case 2:
				return Math.min(...subpacket)
			case 3:
				return Math.max(...subpacket)
			case 5: 
				return subpacket[0] > subpacket[1] ? 1 : 0
			case 6: 
				return subpacket[0] < subpacket[1] ? 1 : 0
			case 7:
				return subpacket[0] == subpacket[1] ? 1 : 0
		}
	
	}
	
}


function solveP1() {
	let inputValues = fs
		.readFileSync('./input16.txt')
		.toString()
		.trim()
		.split("")
		.map(n => parseInt(n,16).toString(2).padStart(4,"0").split(""))
		.flat();
		
	console.log(parsePacket(inputValues,1));
}

function solveP2() {
	let inputValues = fs
		.readFileSync('./input16.txt')
		.toString()
		.trim()
		.split("")
		.map(n => parseInt(n,16).toString(2).padStart(4,"0").split(""))
		.flat();
		
	console.log(parsePacket(inputValues,0));

	
}

solveP1();

solveP2();

