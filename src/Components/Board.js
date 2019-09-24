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
      remainingCards: 52,
      x: 0,
      y: 0
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
      let newCard = response.data.cards[0].image;
      this.setState(prevState => {
        return {
          deck: [...this.state.deck, newCard],
          remainingCards: response.data.remaining,
          x: 32 + Math.floor(246 * Math.random()),
          y: 32 + Math.floor(246 * Math.random())
        };
      });
    });
  }

  render() {
    return (
      <div className="Board">
        <button className="Board--button" onClick={this.getNewCard}>
          Get New Card
        </button>
        <div className="Board--card_container">
          {this.state.deck.map(card => {
            return <Card image={card} x={this.state.x} y={this.state.y} />;
          })}
        </div>
      </div>
    );
  }
}

export default Board;
