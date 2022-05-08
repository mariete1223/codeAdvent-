const fs = require("fs")


var array = [];
var x=0;
var y=0;
var x1=0;
var y1=0;
var aim=0;
function readInput(){

    fs.readFileSync("./input2.txt").toString().split("\n").forEach((v,i,a) => {array[i] = v.split(" "); array[i][1]= parseInt(array[i][1]);});
}

//different way of handling input, saw after developing exercise
/*let [x, y] = [0, 0];
  const lines = input.split('\n').map(line => {
    const [direction, value] = line.split(' ');
    return { direction, value: +value };
  });
  */

function solveP1(){
    array.forEach( v => {
        switch(v[0]){
            case "forward": 
                x+=v[1];
                break;
            case "up":
                y-=v[1];
                break;
            case "down":
                y+=v[1];
                break;
            default:
                console.log("not valid option");
                break;
                
        }
    });
    console.log( x+" "+y);
}

function solveP2(){
    array.forEach( v => {
        switch(v[0]){
            case "forward": 
                x1+=v[1];
                y1+=aim*v[1];
                break;
            case "up":
                aim-=v[1];
                break;
            case "down":
                aim+=v[1];
                break;
            default:
                console.log("not valid option");
                break;
                
        }
    });
    console.log( x1+" "+y1);
}

readInput();
solveP1();
solveP2();