import React, { Component } from "react";
import "./Board.css";
import Card from "./Card.js";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: []
    };
  }
  render() {
    return (
      <div>
        <Card />
      </div>
    );
  }
}

export default Board;
