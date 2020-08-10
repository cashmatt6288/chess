import React from "react";
import Square from "./Square";


function Board(props) {
    const { squares, color1, color2, clickHandler } = props;

    function isEven(number) {
        if (number % 2 === 0) return true;
        else return false;
    }
    const board = squares.map((s, index) => {
        const mod = index % 8;
        const row = (index - mod) / 8;
        return <Square clickHandler= {clickHandler} color={isEven(index + row) ? color1 : color2} key={'square'+index} id={index} src={s ? s.style : null}/> 
        
    });
    return (
        <div className="board">
         {board}
        </div>
    )
}
export default Board;