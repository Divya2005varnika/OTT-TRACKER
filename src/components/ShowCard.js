import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ShowCard extends Component {
  constructor(props) {
    super(props);
    // Component API requirement: initializing state
    this.state = { isHovered: false };
  }

  render() {
    const { show, onClick, onDelete } = this.props;
    return (
      <div className="movie-card" onClick={onClick}>
        <div className="card-media">
          <span className="emoji-icon">{show.poster}</span>
          <button className="del-icon" onClick={onDelete} title="Remove Movie">✕</button>
          <div className="favorite-heart">🤍</div>
        </div>
        <div className="card-info">
          <h3>{show.title}</h3>
          <p className="meta-text">{show.category} | {show.year}</p>
          <div className="rating-row">
            <span className="star">⭐</span>
            <span className="score">{show.rating}/10</span>
          </div>
        </div>
      </div>
    );
  }
}

// Official Props Validation using the prop-types library
ShowCard.propTypes = {
  show: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};