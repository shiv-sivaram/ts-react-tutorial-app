import React from 'react'

import Board from './Board'

type GameProps = {
  
}

type GameState = {
  history: {
    squares: string[]
  }[],
  xIsNext: boolean,
  stepNumber: number
}

class Game extends React.Component<GameProps, GameState> {

  state: GameState = {
    history: [{
      squares: Array(9).fill('')
    }],
    xIsNext: true,
    stepNumber: 0
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

    const history: {squares: string[]}[] = this.state.history.slice(0, this.state.stepNumber + 1)
    const squares: string[] = history[this.state.stepNumber].squares.slice()
    
    if (this.calculateWinner(squares) || squares[i]) {
      return
    } else {
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        const newHistory = history.concat({squares: squares})
        this.setState({
            history: newHistory,
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        })
    }
  }

  jumpTo = (move: number) => {
    this.setState({
        stepNumber: move,
        xIsNext: (move % 2) === 0,
    })
  }

  render() {

    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = this.calculateWinner(current.squares)

    const moves = history.map((step, move) => {
        const desc = move ?
            `Go to move # ${move}` :
            `Go to start`
        return (
            <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
        )    
    })
    
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
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            calculateWinner={this.calculateWinner}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game