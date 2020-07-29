import React from 'react';
import Board from "./board"

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chess</h1>
      </header>
      <body>
        <div className="Game-scene">
        <Board 
        gameWidth={gameDimensions.gameWidth} 
        gameHeight={gameDimensions.gameHeight}
        boardColors={boardColors}
        color1={boardColors.color1}
        color2={boardColors.color2}
        />
        </div>
        
        
      </body>
    </div>
  );
}

export default App;
