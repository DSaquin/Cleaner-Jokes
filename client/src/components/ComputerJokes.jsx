import React from 'react';
import ComputerJoke from './ComputerJoke.jsx';

class ComputerJokes extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showJokes: false };

    this.generateJokes = this.generateJokes.bind(this);
    this.showJokes = this.showJokes.bind(this);
  }

  generateJokes() {
    this.props.moreJokes('Computer');
  }

  showJokes() {
    this.setState({
      showJokes: !this.state.showJokes,
    });
  }

  render() {
    let { jokes, handleNotFavorite, handleFavorite } = this.props;
    return (
      <div className='space-above'>
        <h3 className='title'>Programmer Jokes</h3>
        {this.state.showJokes && (
          <button onClick={this.generateJokes} className='read-btn title'>
            more jokes
          </button>
        )}
        {'\n'}
        {this.state.showJokes === false && (
          <button onClick={this.showJokes} className='read-btn title'>
            more programmer jokes
          </button>
        )}
        {this.state.showJokes === false && (
          <ComputerJoke
            key={1}
            joke={jokes[0]}
            handleNotFavorite={handleNotFavorite}
            handleFavorite={handleFavorite}
          />
        )}
        {this.state.showJokes
          ? jokes.map((joke, idx) => (
              <ComputerJoke
                key={idx}
                joke={joke}
                handleNotFavorite={handleNotFavorite}
                handleFavorite={handleFavorite}
              />
            ))
          : null}
        {this.state.showJokes && (
          <button onClick={this.showJokes} className='hide-btn'>
            hide
          </button>
        )}
      </div>
    );
  }
}

export default ComputerJokes;
