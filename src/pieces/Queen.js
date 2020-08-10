
import GamePiece from "./GamePiece"
import wq from "../images/whiteQueen.png";
import bq from "../images/blackQueen.png";

export default class Queen extends GamePiece {
    constructor(color){
        super(color, (color === 1 ? wq : bq));
        this.type = 'q';
    }
    modulus(x, y) {
        return x % y;
    }
    difference(x, y) {
        return Math.abs(x - y);
    }
    ableToMove(position, destination) { //true if able to move
        const dif = this.difference(position, destination);
        const mod = this.modulus(dif, 8);
        return (dif % 7 === 0 || mod === 0 || dif % 9 === 0 || (destination < position + (8- mod) && destination >= position - mod))

        
    }

    findMoveRoute(position, destination) { //returns array of positions between current position and destination
        let path = [];
        const dif = this.difference(destination, position);
        const mod = this.modulus(dif, 8);
        const arr = [7, 8, 9];
        const foundMod = arr.map((r) => this.modulus(dif, r));
        const moveVertOrDiagonal = foundMod.some((r) => {return !r});
        if (!moveVertOrDiagonal && (destination < position + (8- mod) && destination >= position - mod)){
            if (destination > position) {
                for (let i= 1; i < dif; i++) path.push(position + i);
            }
            else if (position > destination) {
                for (let i= 1; i < dif; i++) path.push(position - i);
            }
        }
        else if (moveVertOrDiagonal){
            const index = foundMod.findIndex((i) => {return i === 0})
            let incrementFactor = 0;
            if (index === 0) incrementFactor = 7;
            else if (index === 1) incrementFactor = 8;
            else if (index === 2) incrementFactor = 9;

            const mult = dif / incrementFactor;

                if (destination > position) {
                    for (let i = 1; i < mult; i++) path.push(position + (i * incrementFactor));
                }
                else { 
                    for (let i = 1; i < mult; i++) path.push(position - (i * incrementFactor));
                }
        }
        return path;
    }
}