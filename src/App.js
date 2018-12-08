import React, { Component } from 'react';
import Navigation from './Component/Navigation/Navigation';
import Logo from './Component/Logo/Logo'
import InputForm from './Component/InputForm/InputForm'
import Rank from './Component/Rank/Rank';
import SignIn from './Component/SignIn/SignIn';
import Register from './Component/Register/Register';
import FaceRecognition from './Component/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';

const  param = {
  particles: {
      number:{
        value: 133,
        density: {
          enable: true,
          value_area: 800
        }
      },
      move:{
        enable: true,
        direction: 'bottom',
        random: true,
        straight: true,
        speed: 12,
      },
      interactivity:{
        onhover:{
          enable: false
        }
      }
    }
}

const initialState = {
      input: '',
      url: '',
      box: [],
      route: 'signin',
      isSignedIN: false,
      user: {
        id : '',
        name : '',
        email : '',
        entries: 0,
        joined : new Date()
      }
    }

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({ 
      user : {
        id : data.id,
        name : data.name,
        email : data.email,
        entries: data.entries,
        joined : data.joined
      }
    });
  }

  calculateFaceLocation = (response) => {
    const clarifaiFace = response.outputs[0].data.regions;
    const image = document.getElementById('imageSource');
    const width = Number(image.width);
    const height = Number(image.height);
    const arrayOfBoxes = clarifaiFace.map((region) => {
      return ({
        left: region.region_info.bounding_box.left_col * width,
        top: region.region_info.bounding_box.top_row * height,
        right: width - (region.region_info.bounding_box.right_col * width),
        bottom: height - (region.region_info.bounding_box.bottom_row * height),
      });
    })
    this.setState({box: arrayOfBoxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value}); 
  }

  onSubmit = (event) => {
    this.setState({url: this.state.input}); 
    fetch('https://polar-cove-77096.herokuapp.com/imageUrl', {
          method : 'post',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify({
            input : this.state.input
          })
        })
    .then(response => response.json())
    .then(response => {
      this.calculateFaceLocation(response);
      if(response) {
        fetch('https://polar-cove-77096.herokuapp.com/image', {
          method : 'put',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
            id : this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries : count }));
        })
      }
      })
    .catch((err) => console.log(err, 'Error in Code'));
    this.setState({input: ''});
  }

  onRouteChange = (route) => {
    this.setState({route: route},() => {
      (this.state.route === 'home')
        ?this.setState({isSignedIN: true})
        :this.setState({isSignedIN: false});
      if(this.state.route === 'signout'){
        this.setState(initialState);
      }
    });
  }

  render() {
    const { input, url, box, isSignedIN } = this.state;
    return (
      <div className = "App">
        <Particles className = 'particles' params = {param}/>
        <Navigation onRouteChange = {this.onRouteChange} isSignedIN = {isSignedIN} />
        {
          (this.state.route === 'register')
          ? <Register onRouteChange = {this.onRouteChange} onLoadUser = {this.loadUser} />
          : (
            (this.state.route === 'home')
            ? <div>
                <Logo />
                <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
                <InputForm onInputChange={this.onInputChange} value={input}
                onSubmit={this.onSubmit} />
                <FaceRecognition imageUrl = {url} boxes = {box} />
              </div>
            : <SignIn onRouteChange={this.onRouteChange} onLoadUser = {this.loadUser} />)
        }
      </div>
    );
  }
}

export default App;
