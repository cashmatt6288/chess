
import GamePiece from "./GamePiece";
import wn from "../images/whiteHorse.png";
import bn from "../images/blackHorse.png";

export default class Knight extends GamePiece {
    constructor(color){
        super(color, (color === 1 ? wn : bn))
        this.type = 'n';
    }
    
    ableToMove(position, destination) { //true if able to move
        return (position - 17 === destination ||
            position + 17 === destination ||
            position - 15 === destination ||
            position + 15 === destination ||
            position - 10 === destination ||
            position + 10 === destination ||
            position - 6 === destination ||
            position + 6 === destination);
    }

    findMoveRoute(position, destination) { //returns array of positions between current position and destination
        return [];
    }

    
}