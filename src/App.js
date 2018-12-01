import React, { Component } from 'react';
import Navigation from './Component/Navigation/Navigation';
import Logo from './Component/Logo/Logo'
import InputForm from './Component/InputForm/InputForm'
import Rank from './Component/Rank/Rank';
import SignIn from './Component/SignIn/SignIn';
import Register from './Component/Register/Register';
import FaceRecognition from './Component/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

  const app = new Clarifai.App({
   apiKey: '0eeff62927394e65af1c6b2d96038bbc'
  });

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

class App extends Component {
  constructor(){
    super();
    this.state={
      input: '',
      url: '',
      box: [],
      route: 'signin',
      isSignedIN: false
    }
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
    console.log(arrayOfBoxes);
    this.setState({box: arrayOfBoxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value}); 
    console.log(event.target.value)
  }

  onSubmit = (event) => {
    this.setState({url: this.state.input}); 
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      console.log(response);
      this.calculateFaceLocation(response);
     } )
    .catch((err) => console.log(err, 'Error in Code'));
    this.setState({input: ''});
  }

  onRouteChange = (route) => {
    this.setState({route: route},() => {
      (this.state.route === 'home'
        ?this.setState({isSignedIN: true})
        :this.setState({isSignedIN: false}))});
  }

  render() {
    const { input, url, box, isSignedIN } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={param}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIN={isSignedIN} />
        {
          (this.state.route === 'signin')
          ? <SignIn onRouteChange={this.onRouteChange} />
          : (
            (this.state.route === 'home')
            ? <div>
                <Logo />
                <Rank />
                <InputForm onInputChange={this.onInputChange} value={input}
                onSubmit={this.onSubmit} />
                <FaceRecognition imageUrl={url} boxes={box} />
              </div>
            : <Register onRouteChange={this.onRouteChange} />)
        }
      </div>
    );
  }
}

export default App;
