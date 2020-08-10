
import GamePiece from "./GamePiece";
import wk from "../images/whiteKing.png";
import bk from "../images/blackKing.png";

export default class King extends GamePiece {
    constructor(color){
        super(color, (color === 1 ? wk: bk));
        this.type = 'k';
    }
    ableToMove(position, destination) { //true if able to move
        const toCheck = {
            position: position,
            destination: destination
        }
        const arr = [-9, -8, -7, -1, 1, 7, 8, 9];
        const ableToMove = arr.some(function(val) {return val + this.position === this.destination}, toCheck)
        return ableToMove;
    }

    findMoveRoute(position, destination) { //returns array of positions between current position and destination
        return [];
    }
   
}