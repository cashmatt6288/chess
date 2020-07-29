import React, { useState } from "react";

function Board(props) {

    function Square(props) {
        return (
            <div className="boardSquare" id={props.id} holdsPiece={props.holdsPiece} style={{width: props.size, backgroundColor: props.color}}>
            </div>
        )
    };

    const {gameWidth, gameHeight, boardColors} = props;
    const {color1, color2} = props.boardColors;
    const [board, setBoard] = useState({
        _position: [
            {id: "A1", squareNumber: 11, holdsPiece: null}, {id: "A2", squareNumber: 12, holdsPiece: null}, {id: "A3", squareNumber: 13, holdsPiece: null}, {id: "A4", squareNumber: 14, holdsPiece: null}, {id: "A5", squareNumber: 15, holdsPiece: null}, {id: "A6", squareNumber: 16, holdsPiece: null}, {id: "A7", squareNumber: 17, holdsPiece: null}, {id: "A8", squareNumber: 18, holdsPiece: null},
            {id: "B1", squareNumber: 21, holdsPiece: null}, {id: "B2", squareNumber: 22, holdsPiece: null}, {id: "B3", squareNumber: 23, holdsPiece: null}, {id: "B4", squareNumber: 24, holdsPiece: null}, {id: "B5", squareNumber: 25, holdsPiece: null}, {id: "B6", squareNumber: 26, holdsPiece: null}, {id: "B7", squareNumber: 27, holdsPiece: null}, {id: "B8", squareNumber: 28, holdsPiece: null},
            {id: "C1", squareNumber: 31, holdsPiece: null}, {id: "C2", squareNumber: 32, holdsPiece: null}, {id: "C3", squareNumber: 33, holdsPiece: null}, {id: "C4", squareNumber: 34, holdsPiece: null}, {id: "C5", squareNumber: 35, holdsPiece: null}, {id: "C6", squareNumber: 36, holdsPiece: null}, {id: "C7", squareNumber: 37, holdsPiece: null}, {id: "C8", squareNumber: 38, holdsPiece: null},
            {id: "D1", squareNumber: 41, holdsPiece: null}, {id: "D2", squareNumber: 42, holdsPiece: null}, {id: "D3", squareNumber: 43, holdsPiece: null}, {id: "D4", squareNumber: 44, holdsPiece: null}, {id: "D5", squareNumber: 45, holdsPiece: null}, {id: "D6", squareNumber: 46, holdsPiece: null}, {id: "D7", squareNumber: 47, holdsPiece: null}, {id: "D8", squareNumber: 48, holdsPiece: null},
            {id: "E1", squareNumber: 51, holdsPiece: null}, {id: "E2", squareNumber: 52, holdsPiece: null}, {id: "E3", squareNumber: 53, holdsPiece: null}, {id: "E4", squareNumber: 54, holdsPiece: null}, {id: "E5", squareNumber: 55, holdsPiece: null}, {id: "E6", squareNumber: 56, holdsPiece: null}, {id: "E7", squareNumber: 57, holdsPiece: null}, {id: "E8", squareNumber: 58, holdsPiece: null},
            {id: "F1", squareNumber: 61, holdsPiece: null}, {id: "F2", squareNumber: 62, holdsPiece: null}, {id: "F3", squareNumber: 63, holdsPiece: null}, {id: "F4", squareNumber: 64, holdsPiece: null}, {id: "F5", squareNumber: 65, holdsPiece: null}, {id: "F6", squareNumber: 66, holdsPiece: null}, {id: "F7", squareNumber: 67, holdsPiece: null}, {id: "F8", squareNumber: 68, holdsPiece: null},
            {id: "G1", squareNumber: 71, holdsPiece: null}, {id: "G2", squareNumber: 72, holdsPiece: null}, {id: "G3", squareNumber: 73, holdsPiece: null}, {id: "G4", squareNumber: 74, holdsPiece: null}, {id: "G5", squareNumber: 75, holdsPiece: null}, {id: "G6", squareNumber: 76, holdsPiece: null}, {id: "G7", squareNumber: 77, holdsPiece: null}, {id: "G8", squareNumber: 78, holdsPiece: null},
            {id: "H1", squareNumber: 81, holdsPiece: null}, {id: "H2", squareNumber: 82, holdsPiece: null}, {id: "H3", squareNumber: 83, holdsPiece: null}, {id: "H4", squareNumber: 84, holdsPiece: null}, {id: "H5", squareNumber: 85, holdsPiece: null}, {id: "H6", squareNumber: 86, holdsPiece: null}, {id: "H7", squareNumber: 87, holdsPiece: null}, {id: "H8", squareNumber: 88, holdsPiece: null},
        ],
    
        _colors: [color1, color2],
        _size: []
    });

    
    const [squares, setSquares] = useState(board._position);
    return (
        <div className="board">
            {squares.map((s, index) => {
                let appliedColor = "";
                if (index % 2 === 0) appliedColor = [color1];
                else appliedColor = [color2];
                return (
                    <Board 
                    key={s.id}
                    id={s.id}
                    color={appliedColor}
                    holdsPiece= {s.holdsPiece}
                    size={board._size / 64}
                    />
                ) 
            })}
            <div style={{width: '100%'}}></div>
            <div style={{  display: 'inline-block', width: '100px', height: 0, paddingBottom: '100px', backgroundColor: 'black' }} > </div>
        </div>  
    )
}
export default Board;