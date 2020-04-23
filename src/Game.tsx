import React from 'react'

import Board from './Board'

type GameProps = {
  
}

type GameState = {
  history: [{
    squares: string[]
  }]
}

class Game extends React.Component<GameProps, GameState> {

  state: GameState = {
    history: [{
      squares: Array(9).fill('')
    }]
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game