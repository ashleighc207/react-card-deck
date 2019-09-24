import React, { Component } from "react";
import "./Board.css";
import Card from "./Card.js";
import axios from "axios";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: [],
      id: "",
      remainingCards: 52
    };
    this.getNewCard = this.getNewCard.bind(this);
  }
  componentDidMount() {
    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/";
    axios.get(url).then(response => {
      this.setState({ id: response.data.deck_id });
    });
  }
  getNewCard(evt) {
    evt.preventDefault();
    const url = `https://deckofcardsapi.com/api/deck/${this.state.id}/draw/`;

    axios.get(url).then(response => {
      let imageUrl = response.data.cards[0].image;
      let rotate;
      if (Math.floor(100 * Math.random()) <= 50) {
        rotate = Math.random() * 30 - 5;
      } else {
        rotate = `-${Math.random() * 30 - 5}`;
      }
      let x = Math.floor(50 * Math.random());
      let y = Math.floor(50 * Math.random());
      let newCard = { img: imageUrl, x: x, y: y, rotate: rotate };
      this.setState(prevState => {
        return {
          deck: [...this.state.deck, newCard],
          remainingCards: response.data.remaining
        };
      });
    });
  }

  render() {
    return (
      <div className="Board">
        <div>
          <button className="Board--button" onClick={this.getNewCard}>
            Get a Card
          </button>
          <p className="Board--text">Cards left: {this.state.remainingCards}</p>
        </div>
        <div className="Board--card_container">
          {this.state.deck.map(card => {
            return (
              <Card
                image={card.img}
                x={card.x}
                rotate={card.rotate}
                y={card.y}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Board;
