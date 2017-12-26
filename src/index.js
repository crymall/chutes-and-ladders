import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor() {
    super();

    this.board = {
      1: 38,
      4: 14,
      9: 31,
      16: 6,
      21: 42,
      28: 84,
      36: 44,
      47: 26,
      51: 67,
      56: 53,
      62: 19,
      64: 60,
      71: 91,
      80: 100,
      87: 24,
      93: 73,
      95: 75,
      98: 78
    }

    this.state = {
      playerCount: 2,
      players: [],
      stories: [],
      gameStarted: false
    }
  }

  updatePlayerCount = (e) => {
    this.setState({
      playerCount: e.target.value
    });
  }

  playGame = () => {
    const playerCount = this.state.playerCount;
    const players = this.state.players;
    const stories = this.state.stories;
    const board = this.board;
    let newPlayers = [];
    let playerName = "";

    if (playerCount > 0) {

      for (let i = 0; i < playerCount; i++) {
        playerName = "player" + (i + 1).toString();
        newPlayers = newPlayers.concat(playerName)
      }

      if (players === []) {
        this.setState({
          players: newPlayers
        });
      } else {
        players.forEach((playerName) => {
          let stateName = playerName + "story";
          let story = [];
          let currentSpace = 0;
          let turnCount = 0;

          while (currentSpace !== 100) {
            let roll = Math.floor((Math.random() * 6) + 1);

            if ((currentSpace + roll) < 100) {
              currentSpace = currentSpace + roll;
              story.concat(playerName + " landed on " + currentSpace + ".")

              if (board[currentSpace]) {
                if (currentSpace < board[currentSpace]) {
                  currentSpace = board[currentSpace];
                  story.concat("Ladder! " + playerName + " now on " + currentSpace + "!");
                } else {
                  currentSpace = board[currentSpace];
                  story.concat("Chute! " + playerName + " now on " + currentSpace + "!");
                }
              }

            } else {
              story.concat("Roll exceeded 100! Player still on " + currentSpace);
              continue;
            }

            turnCount += 1;

          if (currentSpace === 100) {
            console.log(story)

            story.concat(turnCount);

            let newStories = stories.concat(story);
            console.log("new story is " + newStories)

            this.setState({
              stories: newStories,
              gameStarted: true
            })
          }
        }
      }
    }
  }

  render() {
    let { playerCount, players, stories, gameStarted } = this.state;

    if (!gameStarted) {
      return (
        <div className="startScreen">

          <div className="gameDesc">
            <h2>Chutes and Ladders</h2>
            <p>
              The game "Chutes and Ladders" requires no player choice.
              It is, effectively, a complicated coin flip.
              Play it here and save time.
            </p>
          </div>


          <div className="gameForm">
            <label> How many players? {" "}
              <select onChange={this.updatePlayerCount}>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
              </select>
            </label>

            <button onClick={this.playGame}>Play!</button>
          </div>

        </div>
      );
    } else {
      return (
        <div className="wholeRecap">
          <h2>Chutes and Ladders</h2>
          {
            stories.forEach((story) => {
              story.map((leg) => {
                return (<p>{leg}</p>)
              })
            })
          }
        </div>
      )
    }
  }

}

render(<App />, document.getElementById('root'));
