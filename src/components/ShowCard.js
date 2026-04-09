import React, { Component } from "react";
import PropTypes from "prop-types";

// Using a Class Component to demonstrate Constructors and State
export default class ShowCard extends Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false };
  }

  render() {
    const { show, onClick } = this.props;
    return (
      <div 
        className="card" 
        onClick={onClick}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        <div className="card-icon">{show.poster}</div>
        <h3>{show.title}</h3>
        <p>Rating: {show.rating}/10</p>
        <p>{show.year}</p>
      </div>
    );
  }
}

// Demonstrating Props Validation
ShowCard.propTypes = {
  show: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};