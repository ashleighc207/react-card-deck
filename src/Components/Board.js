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
  async getNewCard(evt) {
    evt.preventDefault();
    const url = `https://deckofcardsapi.com/api/deck/${this.state.id}/draw/`;
    try {
      await axios.get(url).then(response => {
        if (response.data.remaining === 0) {
          let err = new Error("No cards remaining!");
          err.name = "Nothing Returned";
          throw err;
        }
        let imageUrl = response.data.cards[0].image,
          cardId = response.data.cards[0].code,
          altTxt = `${response.data.cards[0].value} ${response.data.cards[0].suit}`,
          rotate;
        if (Math.floor(100 * Math.random()) <= 50) {
          rotate = Math.random() * 30 - 5;
        } else {
          rotate = `-${Math.random() * 30 - 5}`;
        }
        let x = Math.floor(50 * Math.random());
        let y = Math.floor(50 * Math.random());
        let newCard = {
          img: imageUrl,
          x: x,
          y: y,
          rotate: rotate,
          id: cardId,
          altText: altTxt
        };
        this.setState(prevState => {
          return {
            deck: [...this.state.deck, newCard],
            remainingCards: response.data.remaining
          };
        });
      });
    } catch (err) {
      console.log(err, err.name);
      if (err.name === "Nothing Returned") {
        this.setState({ remainingCards: 0 });
        alert(err);
      }
    }
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
                key={card.id}
                alt={card.altText}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Board;
