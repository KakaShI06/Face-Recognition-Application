import React from 'react';
import './ImageLinkForm.css';

class ImageLinkForm extends React.Component{
  render(){
      return (
    <div>
      <p className='f3 center'>
        {'This Magic Brain will detect faces in your pictures. Git it a try.'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type='text' onChange= {this.props.onInputChange}/>
          <button
            onClick= {this.props.onButtonSubmit}
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer' >Detect</button>
        </div>
      </div>
    </div>
  );
  }
}

export default ImageLinkForm;