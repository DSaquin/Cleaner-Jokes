import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// SCSS STYLESHEET
import './stylesheets/style.scss';

// REACT-BOOTSTRAP
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// COMPONENTS
import JokeOfDay from './components/JokeOfDay.jsx';
import FavoritedJokes from './components/FavoritedJokes.jsx';
import ComputerJokes from './components/ComputerJokes.jsx';
import PunJokes from './components/PunJokes.jsx';
import DadJokes from './components/DadJokes.jsx';
import AnimalJokes from './components/AnimalJokes.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ProgrammerJokes: [''],
      PunnyJokes: [''],
      dadJokes: [''],
      animalJokes: [''],
      jokeOfDay: {},
      favoritedJokes: [''],
    };

    this.getAllJokes = this.getAllJokes.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.setFavorite = this.setFavorite.bind(this);
    this.unsetFavorite = this.unsetFavorite.bind(this);
    this.updateFavorites = this.updateFavorites.bind(this);
    this.getMoreJokes = this.getMoreJokes.bind(this);
    this.grabAJoke = this.grabAJoke.bind(this);
  }

  componentDidMount() {
    this.getAllJokes();
  }

  getAllJokes() {
    ///////////////////
    // PROGRAM JOKES //
    ///////////////////
    let idx = Math.floor(Math.random() * Math.floor(5));
    let list = [0, 10, 20, 30, 40, 50];
    axios.get(`/jokes/?id=${list[idx]}`).then((response) => {
      this.getFavorites();

      this.setState({
        ProgrammerJokes: response.data,
      });
    });

    ///////////////////
    ////// PUNS ///////
    ///////////////////
    let index = Math.floor(Math.random() * Math.floor(5));
    let group = [64, 74, 84, 94, 104, 113];
    axios.get(`/jokes/?id=${group[index]}`).then((response) => {
      this.setState({
        PunnyJokes: response.data,
      });
    });

    ///////////////////
    /// Dad Jokes /////
    ///////////////////
    let id = Math.floor(Math.random() * Math.floor(5));
    let gp = [127, 137, 147, 157, 167, 175];
    axios.get(`/jokes/?id=${gp[id]}`).then((response) => {
      this.setState({
        dadJokes: response.data,
      });
    });

    ///////////////////
    // Animal Jokes ///
    ///////////////////
    let aidx = Math.floor(Math.random() * Math.floor(5));
    let g = [190, 199, 211, 220, 230, 240];
    axios.get(`/jokes/?id=${g[aidx]}`).then((response) => {
      this.setState({
        animalJokes: response.data,
      });
    });

    ///////////////////
    // Today's Joke ///
    ///////////////////
    axios.get('/savedJoke').then((response) => {
      this.setState({
        jokeOfDay: response.data,
      });
    });
  }

  getMoreJokes(category) {
    let idx, list;
    if (category === 'Computer') {
      idx = Math.floor(Math.random() * Math.floor(5));
      list = [0, 10, 20, 30, 40, 50];
    } else if (category === 'puns') {
      idx = Math.floor(Math.random() * Math.floor(5));
      list = [64, 74, 84, 94, 104, 113];
    } else if (category === 'dad') {
      idx = Math.floor(Math.random() * Math.floor(5));
      list = [127, 137, 147, 157, 167, 175];
    } else if (category === 'animal') {
      idx = Math.floor(Math.random() * Math.floor(5));
      list = [190, 200, 210, 220, 230, 240];
    }
    axios.get(`/more-jokes?id=${list[idx]}`).then((res) => {
      if (list[0] < 60) {
        this.setState({
          ProgrammerJokes: res.data,
        });
      } else if (list[0] < 125) {
        this.setState({
          PunnyJokes: res.data,
        });
      } else if (list[0] < 190) {
        this.setState({
          dadJokes: res.data,
        });
      } else {
        this.setState({
          animalJokes: res.data,
        });
      }
    });
  }

  getFavorites() {
    axios.get('/favorites').then((res) => {
      this.setState({
        favoritedJokes: res.data,
      });
    });
  }

  setFavorite(joke) {
    axios({
      method: 'put',
      url: '/new-favorite',
      params: joke,
    });

    joke.favorited = 'true';
    const category = joke.category;
    const programJokes = [...this.state.ProgrammerJokes];
    const punnyJokes = [...this.state.PunnyJokes];
    const daddioJokes = [...this.state.dadJokes];
    const animals = [...this.state.animalJokes];
    switch (category) {
      case 'Computer':
        // update that joke in state
        const changeProgram = programJokes.forEach((item) => {
          if (item.id === joke.id) {
            item.favorited = 'true';
          }
        });
        break;

      case 'puns':
        // update that joke in state
        const changePun = punnyJokes.forEach((item) => {
          if (item.id === joke.id) {
            item.favorited = 'true';
          }
        });
        break;

      case 'dad':
        // update that joke in state
        const changeDad = daddioJokes.forEach((item) => {
          if (item.id === joke.id) {
            item.favorited = 'true';
          }
        });
        break;

      case 'animal':
        // update that joke in state
        const changeAnimal = animals.forEach((item) => {
          if (item.id === joke.id) {
            item.favorited = 'true';
          }
        });
        break;
    }

    this.updateFavorites(joke, programJokes, punnyJokes, daddioJokes, animals);
  }

  unsetFavorite(joke) {
    let id = joke.id;
    axios.put(`/remove-favorite?id=${id}`);

    const arr = [...this.state.favoritedJokes];
    for (let i = 0; i < arr.length; i++) {
      let currId = arr[i].id;
      if (currId === id) {
        arr.splice(i, 1);
      }
    }

    const category = joke.category;
    const programJokes = [...this.state.ProgrammerJokes];
    const punnyJokes = [...this.state.PunnyJokes];
    const daddioJokes = [...this.state.dadJokes];
    const animals = [...this.state.animalJokes];
    switch (category) {
      case 'Computer':
        // update that joke in state
        const changeProgram = programJokes.forEach((item) => {
          if (item.id === joke.id) {
            item.favorited = 'false';
          }
        });
        break;

      case 'puns':
        // update that joke in state
        const changePun = punnyJokes.forEach((item) => {
          if (item.id === joke.id) {
            item.favorited = 'false';
          }
        });
        break;

      case 'dad':
        // update that joke in state
        const changeDad = daddioJokes.forEach((item) => {
          if (item.id === joke.id) {
            item.favorited = 'false';
          }
        });
        break;

      case 'animal':
        // update that joke in state
        const changeAnimal = animals.forEach((item) => {
          if (item.id === joke.id) {
            item.favorited = 'false';
          }
        });
        break;
    }

    this.setState({
      favoritedJokes: arr,
      ProgrammerJokes: programJokes,
      PunnyJokes: punnyJokes,
      dadJokes: daddioJokes,
      animalJokes: animals,
    });
  }

  updateFavorites(favorite, programmer, pun, dad, animal) {
    let joined = this.state.favoritedJokes.concat(favorite);
    this.setState({
      favoritedJokes: joined,
      ProgrammerJokes: programmer,
      PunnyJokes: pun,
      dadJokes: dad,
      animalJokes: animal,
    });
  }

  grabAJoke() {
    let idx = Math.floor(Math.random() * Math.floor(123));
    axios
      .get(`/jokeOfToday/?id=${idx}`)
      .then((response) => {
        this.setState({
          jokeOfDay: response.data[0],
        });
      })
      .then(() => {
        axios.delete('/delete-jokeOfDay').then(() => {
          axios({
            method: 'post',
            url: '/new-jokeOfDay',
            params: this.state.jokeOfDay,
          });
        });
      });
  }

  render() {
    let {
      jokeOfDay,
      favoritedJokes,
      ProgrammerJokes,
      PunnyJokes,
      dadJokes,
      animalJokes,
    } = this.state;
    return (
      <div>
        <Container>
          <Row>
            <Col sm lg='4'>
              <div className='left-side '>
                <JokeOfDay jokeOfDay={jokeOfDay} grabAJoke={this.grabAJoke} />
                <FavoritedJokes
                  favoritedJokes={favoritedJokes}
                  handleNotFavorite={this.unsetFavorite}
                />
              </div>
            </Col>
            <Col sm lg='8'>
              <ComputerJokes
                jokes={ProgrammerJokes}
                handleFavorite={this.setFavorite}
                handleNotFavorite={this.unsetFavorite}
                moreJokes={this.getMoreJokes}
              />
              <PunJokes
                jokes={PunnyJokes}
                handleFavorite={this.setFavorite}
                handleNotFavorite={this.unsetFavorite}
                moreJokes={this.getMoreJokes}
              />
              <DadJokes
                jokes={dadJokes}
                handleFavorite={this.setFavorite}
                handleNotFavorite={this.unsetFavorite}
                moreJokes={this.getMoreJokes}
              />
              <AnimalJokes
                jokes={animalJokes}
                handleFavorite={this.setFavorite}
                handleNotFavorite={this.unsetFavorite}
                moreJokes={this.getMoreJokes}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
