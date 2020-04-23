import React from 'react'

import Board from './Board'

type GameProps = {
  
}

type GameState = {
  history: [{
    squares: string[]
  }],
  xIsNext: boolean
}

class Game extends React.Component<GameProps, GameState> {

  state: GameState = {
    history: [{
      squares: Array(9).fill('')
    }],
    xIsNext: true
  }

  calculateWinner = (squares: string[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick(i: number) {

    const history = this.state.history
    const current: string[] = history[history.length - 1].squares
    
    if (this.calculateWinner(current) || current[i]) {
      return
    } else {
        current[i] = this.state.xIsNext ? 'X' : 'O'
        history.push({squares: current})
        this.setState({
            history: history,
            xIsNext: !this.state.xIsNext
        })
    }
  }

  render() {

    const history = this.state.history
    const current: string[] = history[history.length - 1].squares
    const winner = this.calculateWinner(current)
    
    let status: string = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    if (winner === null) {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    } else {
      status = `Winner: ${winner}`
    }


    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current}
            onClick={(i) => this.handleClick(i)}
            calculateWinner={this.calculateWinner}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game