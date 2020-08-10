import React from "react";

function Square(props) {
    const {id, src, color, clickHandler} = props;
    

    return ( 
    
    <button className="board-square" onClick={(e) => clickHandler(Number(id))} id={id} style={{ backgroundColor: color, backgroundImage: src? 'url(' + src + ')' : null}}>{id}</button>
    )   
};
export default Square;

