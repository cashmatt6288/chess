
import GamePiece from "./GamePiece"
import wb from "../images/whiteBishop.png";
import bb from "../images/blackBishop.png";
export default class Bishop extends GamePiece {
    constructor(color) {
        super(color, (color === 1 ? wb : bb));
        this.type = 'b';
    }

    ableToMove(position, destination) { //true if able to move
        const column = position % 8;
        let mult = 0;
        let factor = 0;
        const dif = Math.abs(position - destination);
        if (dif % 9 === 0) { mult = dif / 9; factor = 9 }
        else if (dif % 7 === 0) { mult = dif / 7; factor = 7 };
        return ((Math.abs(position - destination) % 9 === 0 && mult <= column) || (Math.abs(position - destination) % 7 === 0 && mult <= 8 - column));
    }

    findMoveRoute(position, destination) { //returns array of positions between current position and destination
        const column = position % 8;
        const row = (position - column) / 8;
        const dif = Math.abs(position - destination);
        let route = [];
        let mult = 0;
        let factor = 0;

        if (dif % 9 === 0) { mult = dif / 9; factor = 9 }
        else if (dif % 7 === 0) { mult = dif / 7; factor = 7 };

        if (dif % 7 === 0) {
            for (let i = 1; i < mult; i++) {
                if (destination > position && mult <= column) {
                    
                    route.push(position + (i * factor));
                }
                else if (position > destination) route.push(position - (i * factor));
            }

//bishop movement needs improvement...
//need to find way to ensure mult is not greater than the number of spaces the piece can move in a 
//particular direction
//currently the mult can be > those moves. may cause bugs.
//have to use col and row and find relationship b/t direction of movement and legal spaces to move
//
        }
        console.log(route)
        return route;
    }
    findAttackLine(position) {
        const perimeter = [0, 1, 2, 3, 4, 5, 6, 7, 8, 15, 16, 23, 24, 31, 32, 39, 40, 47, 48, 55, 56, 57, 58, 59, 60, 61, 62, 63]

        const subtract = (num, amount) => {
            return num - amount;
        }
        const add = (num, amount) => {
            return num + amount;
        }

        function findEnds(start, operator, multiplier) {
            let endPoint = start;
            if (perimeter.indexOf(start) === -1) {
                while (perimeter.indexOf(endPoint) === -1) endPoint = operator(endPoint, multiplier);
                return endPoint;
            }
            else {
                const modPerim = perimeter.filter(s => s !== start);
                while (modPerim.indexOf(endPoint) === -1 && endPoint < 63 && endPoint > 0) endPoint = operator(endPoint, multiplier);
                if (endPoint > 0 & endPoint < 63) return endPoint;
            }

        }

        const arr = [findEnds(position, subtract, 9), findEnds(position, subtract, 7), findEnds(position, add, 7), findEnds(position, add, 9)]

        return arr.filter(p => p !== undefined);
    }

}