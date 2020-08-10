
import GamePiece from "./GamePiece"
import wp from "../images/whitePawn.png";
import bp from "../images/blackPawn.png";
export default class Pawn extends GamePiece {
    constructor(color, initialPosition){
        super(color, (color === 1 ? wp : bp));
        this.initialPosition = initialPosition;
        this.type = 'p';
    }
   
    ableToMove(position, destination, opponentOccupied) { //true if able to move
        if (this.color === 1) {
            if (position === this.initialPosition){
                if ((position - 8 === destination && !opponentOccupied) || (position - 16 === destination && !opponentOccupied)) return true;
                else if ((position - 7 === destination || position - 9 === destination) && opponentOccupied) return true;
                else return false;
            }
            else if (position - 8 === destination && !opponentOccupied) return true;
            else if ((position - 7 === destination || position - 9 === destination) && opponentOccupied) return true
            else return false;
        }
        else if (this.color === 2) {
            if (position === this.initialPosition){
                if ((position + 8 === destination && !opponentOccupied) || (position + 16 === destination && !opponentOccupied)) return true;
                else if ((position + 7 === destination || position + 9 === destination) && opponentOccupied) return true;
                else return false
            }
            else if (position + 8 === destination && !opponentOccupied) return true;
            else if ((position + 7 === destination || position + 9 === destination) && opponentOccupied) return true
            else return false;
        }
        
    }

    findMoveRoute(position, destination) { //returns array of positions between current position and destination
        let route = [];
        const dif = Math.abs(destination - position);
        if (this.color === 1 && position === this.initialPosition && dif === 16 ) route.push(position - 8);
        else if (this.color === 2 && position === this.initialPosition && dif === 16) route.push(position + 8);
        return route;
    }
}
