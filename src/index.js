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
    };

    this.state = {
      playerCount: 2,
      players: "",
      stories: [],
      gameStarted: false
    };
  }

  updatePlayerCount = (e) => {
    this.setState({
      playerCount: e.target.value
    });
  }

  setPlayers = () => {
    const playerCount = this.state.playerCount;
    let newPlayers = [];
    let playerName = "";

    for (let i = 0; i < playerCount; i++) {
      playerName = "player" + (i + 1).toString();
      newPlayers = newPlayers.concat(playerName);
    }

    this.setState({
      players: newPlayers
    });

  }

  playGame = () => {
    const playerCount = this.state.playerCount;
    const players = this.state.players;
    let newStories = [];
    const board = this.board;
    let currentSpace = 100;

    players.forEach((playerName) => {
      let stateName = playerName + "story";
      let story = [];
      let turnCount = 0;
      currentSpace = 0;

      while (currentSpace !== 100) {
        let roll = Math.floor((Math.random() * 6) + 1);

        if ((currentSpace + roll) <= 100) {
          currentSpace = currentSpace + roll;
          story.push(playerName + " landed on " + currentSpace + ".");

          if (board[currentSpace]) {
            if (currentSpace < board[currentSpace]) {
              currentSpace = board[currentSpace];
              story.push("Ladder! " + playerName + " now on " + currentSpace + "!");
            } else {
              currentSpace = board[currentSpace];
              story.push("Chute! " + playerName + " now on " + currentSpace + "!");
            }
          }

        } else {
          story.push("Roll exceeded 100! Player still on " + currentSpace);
          continue;
        }

        turnCount += 1;
      }

      if (currentSpace === 100) {
        story.push(turnCount);

        newStories.push(story);
      }
    });

    console.log(newStories);

    this.setState({
      stories: newStories,
      gameStarted: true
    });
  }




  render() {
    let { playerCount, players, stories, gameStarted } = this.state;

    let storyItem = stories.map((story) => {
                      let storyList = story.map((leg) => {
                        return <li>{leg}</li>
                      })

                      return (<ul className="stories"> {storyList} </ul>)
                    })

    if (!gameStarted) {
      return (
        <div className="startScreen">

          <div className="gameDesc">
            <h3>Chutes and Ladders</h3>
            <p>
              The game "Chutes and Ladders" requires no player choice.
            It is, effectively, a complicated coin flip.
            Play it here and save time.
            </p>
          </div>


          <div className="gameForm">
            <div className="playerCount">
              <label> How many players? {" "}
                <select onChange={this.updatePlayerCount}>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                </select>
              </label>

              <button onClick={this.setPlayers}>Set Player Number</button>
            </div>

            <button className="startButton" disabled={!players} onClick={this.playGame}>Play!</button>
          </div>

        </div>
      );
    } else {
      return (
        <div className="wholeRecap">
          <h3>Chutes and Ladders</h3>
          <div className="storiesContainer">
            {storyItem}
          </div>
        </div>
      )
    }
  }

}

render(<App /> , document.getElementById('root'));
