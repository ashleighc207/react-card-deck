import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <img
        className="Card"
        src={this.props.image}
        style={{
          transform: `translateX(${this.props.x}px) translateY(${this.props.y}px)`
        }}
      />
    );
  }
}

export default Card;
