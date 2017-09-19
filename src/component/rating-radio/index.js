import React from 'react'
import Rating from '../rating'


class RatingRadio extends React.Component {
  constructor () {
    super()

    this.state = { rating: 0 }
  }

  render () {
    return (
      <Rating
        min={1}
        max={5}
        onChange={(rating) => this.setState({ rating })}
        value={this.state.rating}
      />
    )
  }
}

export default RatingRadio
