import React from 'react';
import 'tachyons';
import Navigation from './Navigation/Navigation.js';
import Logo from './Logo/Logo.js';
import ImageLinkForm from './ImageLinkForm/ImageLinkForm.js';
import './App.css';
import FaceRecognition from './FaceRecognition/FaceRecognition.js';
import SignIn from './SignIn/SignIn.js';
import Clarifai from 'clarifai';
import Register from './Register/Register.js';
import Rank from './Rank/Rank.js'

//response.outputs[0].data.regions[0].region_info.bounding_box

const app = new Clarifai.App({
 apiKey: '00b1ae9a8a7a41bcbfb6573059fa2305'
});

const intialState = {
  input: ' ',
  imageUrl: ' ',
  box: {},
  position: 'signin',
  user: {
    id: ' ',
    name: ' ',
    email: ' ',
    entries: 0,
    joined: ' '
  }
}

class App extends React.Component{
  constructor(){
    super()
    this.state= intialState

    this.onInputChange = this.onInputChange.bind(this)
    this.onButtonSubmit = this.onButtonSubmit.bind(this)
    this.onPositionChange= this.onPositionChange.bind(this)
  } 
  
  loadUser= (data) => {
    this.setState({ user : {
      id: data.id,
      name: data.name,
      email: data.email,
      joined: data.joined,
      entries: data.entries
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image= document.getElementById("inputImage");
    const width= Number(image.width);
    const height= Number(image.height);

    return{
      leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox= (box) => {
    this.setState({box: box})
  }


  onInputChange (event) {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input});
      app.models
        .predict(
          Clarifai.FACE_DETECT_MODEL,
          this.state.input)
        .then(response => {
          if (response) {
            fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count}))
              })

          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err));
   }

  onPositionChange(position) {
    if(position !== 'home'){
      this.setState(intialState)
    }
    this.setState({position : position})
  }

  render(){
    return(
      <div>
        <Navigation onPositionChange= {this.onPositionChange} position= {this.state.position}/>
        {
          this.state.position === 'home' ? 
          <div> 
            <Logo />
            <Rank
              className= 'center'
                  name={this.state.user.name}
                  entries={this.state.user.entries}
                />
            <ImageLinkForm onInputChange= {this.onInputChange} onButtonSubmit= {this.onButtonSubmit}/>
            <FaceRecognition imageUrl= {this.state.imageUrl} box={this.state.box} />
          </div>
          :
          (
            this.state.position === 'signin' ? 
            <SignIn onPositionChange= {this.onPositionChange} loadUser= {this.loadUser} /> : 
            <Register loadUser= {this.loadUser} onPositionChange= {this.onPositionChange}/>
        )
      

        }
      </div>

      )
  }
}


export default App;
