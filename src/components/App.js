import React, { useState } from 'react';
import Board from "./Board"
import initializeBoard from "../helpers/initializeBoard";
import { act } from 'react-dom/test-utils';

function App() {
  const [gameDimensions, setGameDimensions] = React.useState(
    {
      gameWidth: '100%',
      gameHeight: '100%'
    });

  const [settings, setSettings] = React.useState({});
  const [boardColors, setBoardColors] = React.useState(
    {
      color1: "#f7f5dd",
      color2: "#cf7500"
    }
  );


  const [gameState, setGameState] = useState({
    squares: initializeBoard(),
    selectedSquare: -1,
    activeColor: 1,
    turn: 0,
    halfTurn: 1,
    checkMate: false
  })
  const { squares, selectedSquare, activeColor, turn, halfTurn, checkMate } = gameState;

  function gameStateHandler(s, value) {

    setGameState(prevValue => ({ ...prevValue, [s]: value }));
  }

  //
  //
  //queen and bishop movement issue. queen can move like a horse, possibly even more broad
  //king can move out of check to pos that keeps in check

  function clickHandler(index) {
    const isMySquare = checkIfMySquare(index);
    const boardSquares = squares.slice();
    const kingIndex = boardSquares.findIndex((square) => {
      if (square) return (square.type === 'k' && square.color === activeColor)
    });
    const king = boardSquares[kingIndex];

    const checkingPieces = isKingInCheck(activeColor, kingIndex);

    function movePiece() {
      boardSquares[index] = boardSquares[selectedSquare];
      boardSquares[selectedSquare] = null;
      gameStateHandler('squares', boardSquares);
      gameStateHandler('selectedSquare', -1);
      turnEnd();
    }
    if (isMySquare) gameStateHandler('selectedSquare', index);
    else {

      const isPieceActiveColor = function (piece) {
        if (boardSquares[piece]) return boardSquares[piece].color === activeColor;
        else return false;
      }

      if (selectedSquare === -1 && boardSquares[index] && isPieceActiveColor(index)) gameStateHandler('selectedSquare', index)
      else if (selectedSquare > -1 && boardSquares[selectedSquare]) {
        if (!checkingPieces) {
          const moveRoute = canPieceMoveHere(boardSquares[selectedSquare], index);

          if ((!boardSquares[index] || (boardSquares[index] && !isPieceActiveColor(index)))) {
            if (moveRoute) movePiece();
          }
          else if (boardSquares[index] && boardSquares[index].color === boardSquares[selectedSquare].color) gameStateHandler(selectedSquare, index);;

        }
        else if (checkingPieces) {
          const oppPathToKingArr = checkingPieces.map(piece => {
            return findOpponentPathToKing(piece, kingIndex);
          })
          const oppPieceIndexArr = checkingPieces.map(piece => {
            return findPieceIndex(piece)
          })
          const kingCanMove = canKingMove(king, index, true);
          const kingIsMoved = checkIfTrue(kingCanMove, canKingMove(king, index), selectedSquare === kingIndex);
          if (oppPathToKingArr.length === 1) {
            const myPieces = findMoveablePieces(activeColor).filter(p => p !== undefined);
            const oppPath = oppPathToKingArr[0];
            const oppPieceIndex = oppPieceIndexArr[0];
            const indexOfPiecesThatCaptureOpp = findIndexOfMoveablePieces(myPieces, oppPieceIndex);
            if (oppPath.length === 0) { //must capture piece or move king to get out of check 
              if (kingIsMoved) movePiece();
              else if (indexOfPiecesThatCaptureOpp.includes(selectedSquare) && index === oppPieceIndex) movePiece();
              
            }
            else if (oppPath.length > 0) { //can move king, capture piece or block check
              const myPiecesThatBlockCheck = myPieces.map(piece => {
                let blocksCheck = false;
                oppPath.forEach(position => {
                  if (canPieceMoveHere(piece, position)) {
                    blocksCheck = true;
                  }
                })
                if (blocksCheck) return piece;
                else return null;
              })
                .filter(piece => {
                  if (piece && piece.type !== 'k') return piece
                });
              if (kingIsMoved) movePiece();
              else if (indexOfPiecesThatCaptureOpp.includes(selectedSquare) && index === oppPieceIndex) movePiece();
              else if (myPiecesThatBlockCheck.length > 0) {
                const myBlockingPiecesIndex = myPiecesThatBlockCheck.map(piece => findPieceIndex(piece));
                if (myBlockingPiecesIndex.includes(selectedSquare) && oppPath.includes(index)) movePiece();
              }

            }
          }
          else if (oppPathToKingArr.length > 1) { //king must move
            if (kingIsMoved) movePiece();
            else if (!kingCanMove) gameStateHandler("checkMate", true);
          }

        }

      }

      else gameStateHandler('selectedSquare', -1);
    }

  }
  function checkIfTrue(x, y, z) {
    if (x !== false && y !== false && z !== false) return true;
    else return false;
  }
  function findOpponentPieces() {
    return squares.filter(p => p).map(piece => {
      if (piece.color !== activeColor) return piece
      else return null;
    }).filter(p => p);
  }

  function canKingMove(king, destination, checkingAllSquares = false) {
    const boardSquares = squares.slice();
    const foundMoves = boardSquares.map((square, index) => {
      if (canPieceMoveHere(king, index)) {
        return index;
      }
    })
      .filter(p => {
        if (p && boardSquares[p] && boardSquares[p].color !== activeColor) return p;
        else if (p && !boardSquares[p]) return p;
      });
    const legalMovesExist = foundMoves.some((move) => !isSquareAttacked(move));
    if (checkingAllSquares && foundMoves.length > 0 && legalMovesExist) return true;
    else if (!checkingAllSquares && foundMoves.includes(destination) && !isSquareAttacked(destination)) return true;
    else return false;
  }

  function isSquareAttacked(square) {
    const oppPieces = findOpponentPieces();
    // oppPieces.forEach(p => {
    //   if (p.type === 'b') {
    //     const pos = findPieceIndex(p)
        
    //     console.log("attack line ", p.findAttackLine(pos), p.color)
    //   }
    // })
    return oppPieces.some(piece => canPieceMoveHere(piece, square));
  }
  function findIndexOfMoveablePieces(piecesToCheck, destination) {
    return piecesToCheck.map(piece => {
      return canPieceMoveHere(piece, destination, true)
    })
      .filter(p => p)
      .map(piece => {
        return findPieceIndex(piece);
      });
  }
  function canPieceMoveHere(piece, destination, returnPiece = false) {
    if (piece) {
      const pieceIndex = findPieceIndex(piece);
      const boardSquares = squares.slice();
      const ableToMove = piece.type === 'p' ? piece.ableToMove(pieceIndex, destination, boardSquares[destination] ? true : false) : piece.ableToMove(pieceIndex, destination);
      const findMoveRoute = piece.findMoveRoute(pieceIndex, destination);
      const isLegal = isLegalMove(findMoveRoute);
      if (ableToMove && isLegal && !returnPiece) return findMoveRoute;
      else if (ableToMove && isLegal && returnPiece) return piece
      else return false;
    }
    else return false;
  }
  function findOpponentPathToKing(oppPiece, kingPos) {
    return canPieceMoveHere(oppPiece, kingPos);

  }
  function findMoveablePieces(activeColor) {
    const boardSquares = squares.slice();
    return boardSquares.map(piece => { if (piece && piece.color === activeColor) return piece });


  }

  function turnEnd() {
    gameStateHandler('halfTurn', halfTurn + 1);
    const turnEnd = activeColor === 1 ? true : false;
    gameStateHandler('activeColor', activeColor === 1 ? 2 : 1);
    if (turnEnd) gameStateHandler('turn', turn + 1);
  }
  function isKingInCheck(activeColor, kingIndex) {
    let piecesChecking = [];
    const boardSquares = squares.slice();

    const opponentPieces = boardSquares.map((square) => {
      if (square && square.color !== activeColor) return square
    }).filter(square => square !== undefined);
    opponentPieces.forEach((piece) => {
      const isPieceChecking = canPieceMoveHere(piece, kingIndex);
      if (isPieceChecking) piecesChecking.push(piece);

    });
    if (piecesChecking.length > 0) return piecesChecking; //returns array of position of checking pieces
    else return false
  }
  function findPieceIndex(piece) {
    return squares.findIndex((s) => s === piece)
  }

  function checkIfMySquare(square) {
    if (squares[selectedSquare] && squares[square]) {
      return squares[selectedSquare].color === squares[square].color
    }
    else return false
  }
  function isLegalMove(moveRoute) {
    if (moveRoute) {
      const isRouteOccupied = moveRoute.some((s) => {
        return squares[s] !== null
      })
      return isRouteOccupied ? false : true
    }
    else return true;
  }

  return (
    <div className="App">

      <h1>Chess</h1>

      <div>
        <div className="Game-scene" style={{ width: "512px" }}>
          <Board
            clickHandler={clickHandler}
            squares={squares}
            color1={boardColors.color1}
            color2={boardColors.color2}
          />

        </div>
        <div className="turn-log" style={{ fontSize: '20px', position: 'absolute', left: '600px' }}>
          <h2>{turn === 0 ? null : turn} </h2>
          <h3>{activeColor === 1 ? 'White' : 'Black'}</h3>
        </div>


      </div>
    </div>
  );
}

export default App;
