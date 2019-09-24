import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  render() {
    return (
      <img
        className="Card"
        alt={this.props.alt}
        src={this.props.image}
        style={{
          transform: `translateX(${this.props.x}px) translateY(${this.props.y}px) rotate(${this.props.rotate}deg)`
        }}
      />
    );
  }
}

export default Card;
