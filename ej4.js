const fs = require("fs")

var inputValues;

class Bingo {
    constructor(matrix_string,index_id){
        this.id=index_id;
        this.matrix_string=matrix_string;
        let rows = matrix_string.split("\n");
        this.matrix= rows.map((row) =>
        row
            .trim()
            .split(/\s+/)
            .map((v) => parseInt(v, 10))
    );
    
    this.cells= {}
    this.marked = {}
    this.boardSum=0;
    this.finished= false;

    for(let row=0; row<this.matrix.length;row++){
        for(let column=0; column<this.matrix[0].length;column++){
            this.cells[this.matrix[row][column]]= [row,column];
            this.boardSum+=this.matrix[row][column];
        }
    }

    this.board_row = new Array(this.matrix.length).fill(0);
    this.board_column = new Array(this.matrix[0].length).fill(0);
    }

    has(number){
        return Boolean(this.cells[number]);
    }

    isMarked(number){
        return this.marked.contains(number);
    }

    add(number){
        if(!this.has(number)){
            return false;
        }
        let [row, column ] = this.cells[number];
        this.board_row[row]+=1;
        this.board_column[column]+=1;
        this.boardSum-=number;
        if(this.board_column[column] == this.board_row.length || this.board_row[row] == this.board_column.length){
            this.finished= true;
        }

        // checks if there is a bingo
        
        return this.finished;
    }

}


function readInput(){
    //after processing input, we obtain the numers of the bingo, stored at numbers
    //and in bords an array of a class we have created to simplify the functionality 
    //of checking numbers on our bingo board, check if we got a Bingo etc
    return inputValues = fs.readFileSync("./input4.txt")
                    .toString()
                    .trim()
                    .split("\n\n")
                    .reduce(
                        //acc-> acumulador, block ->current value, i-> index
                        (acc, block, i) => {
                            if(i==0){
                                acc.numbers= block.split(",").map(v => parseInt(v));
                            }
                            else{
                                acc.boards.push(new Bingo(block,i-1))
                            }

                            return acc;
                        },
                            {numbers : undefined, boards: []}
                        
                    )
}

function solveP1(){
    let inputValues = readInput();
    let bingo = false;
    let number =0 ;
    let currentBIngo =0;

    while(!bingo && number < inputValues.numbers.length ){
        currentBIngo=0;
        let bingoNumber = inputValues.numbers[number];
        
        while(!bingo && currentBIngo < inputValues.boards.length){
            if(inputValues.boards[currentBIngo].add(bingoNumber)){
                bingo= true;
                console.log(inputValues.boards[currentBIngo].boardSum*bingoNumber);
            }
            currentBIngo++;
        }
        number++;
    }

}

function solveP2(){
    let inputValues = readInput();

    let number =0 ;
    let currentBIngo =0;
    let boardsLeft= inputValues.boards.length;
    
    

    while(boardsLeft!=0 && number < inputValues.numbers.length ){
        currentBIngo=0;
        let bingoNumber = inputValues.numbers[number];
        
        while(boardsLeft!= 0 && currentBIngo < inputValues.boards.length){
            if( !inputValues.boards[currentBIngo].finished)  {
                if( inputValues.boards[currentBIngo].add(bingoNumber)){
                    boardsLeft--;
                }
            }
            currentBIngo++;
        }
        number++;
    }

    console.log(inputValues.boards[currentBIngo-1].boardSum*inputValues.numbers[number-1])


}

solveP1();
solveP2();