import King from "../pieces/King";
import Queen from "../pieces/Queen";
import Pawn from "../pieces/Pawn";
import Rook from "../pieces/Rook";
import Bishop from "../pieces/Bishop";
import Knight from "../pieces/Knight";

function initializeBoard() {
    let squares= Array(64).fill(null);
    
    squares = squares.map((s, index) => {

        if ((index > 7 && index < 16) || (index > 47 && index < 56)) {
            return new Pawn(index < 16? 2 : 1, Number(index))
        }
        else if (index === 0 || index === 7 || index === 56 || index === 63){
            return new Rook(index < 16? 2 : 1) 
        }
        else if (index === 1 || index === 6 || index === 57 || index === 62){
            return new Knight(index < 16? 2 : 1)
        }
        else if (index === 2 || index === 5 || index === 58 || index === 61){
            return new Bishop(index < 16? 2 : 1)
        }
        else if (index === 3 || index === 59){
            return new Queen(index < 16? 2 : 1)
        }
        else if (index === 4 || index === 60){
            return new King(index < 16? 2 : 1)
        }
        else return null;
    })
    return squares;

}
export default initializeBoard;