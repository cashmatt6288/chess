
import GamePiece from "./GamePiece"
import wr from "../images/whiteRook.png";
import br from "../images/blackRook.png"
export default class Rook extends GamePiece {
    constructor(color) {
        super(color, (color === 1 ? wr : br));
        this.type = 'r';
    }
    ableToMove(position, destination) { //true if able to move

        const mod = position % 8;
        const dif = Math.abs(position - destination);


        return (dif % 8 === 0 || (destination < position + (8 - mod) && destination >= position - mod));


    }

    findMoveRoute(position, destination) { //returns array of positions between current position and destination
        let path = [];
        const mod = position % 8;
        const dif = Math.abs(position - destination);
        if (dif % 8 === 0) {
            const mult = dif / 8;
            for (let i = 1; i < mult; i++) {
                if (destination > position) path.push(position + (i * 8));
                else path.push(position - (i * 8));
            }
        }
        else if (destination < position + (8 - mod) && destination >= position - mod){
            if (destination > position) {
                for (let i = 1; i < dif; i++) path.push(position + i);
            }
            else if (position > destination) {
                for (let i = 1; i < dif; i++) path.push(position - i);
            }
        }
        return path;
    }
        

}