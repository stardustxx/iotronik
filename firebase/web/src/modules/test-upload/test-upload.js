import React, {Component} from 'react';
import './test-upload.css';
import RaisedButton from 'material-ui/RaisedButton';

class TestUpload extends Component {

  constructor() {
    super();

    this.state = {
      isSubmitted: false
    };
  }

  styles = {
    button: {
      margin: 12
    },
    exampleImageInput: {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0
    }
  }

  clickUpload = (event) => {
    const fileUploadInput = document.querySelector('#file-upload-input');
    if (fileUploadInput.files.length) {
      this.submitData(fileUploadInput.files[0]);
    }
  }

  submitData = (file) => {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('name', `time_${Date.now()}`);

    let init = {
      method: 'POST',
      cache: 'default',
      body: formData
    };

    fetch("http://localhost:3000/occurrence", init).then((response) => {
      return response.json();
    }).then((result) => {
      console.log(result);
      this.setState({isSubmitted: true});
    });
  }

  render() {
    return (
      <div>
        <h1>Test Image Upload</h1>

        <RaisedButton
          label='Choose an Image'
          labelPosition='before'
          containerElement='label'
          style={this.styles.button}>
          <input
            id='file-upload-input'
            type="file"
            style={this.styles.exampleImageInput}/>
        </RaisedButton>

        <RaisedButton
          label="Upload"
          style={this.styles.button}
          onClick={this.clickUpload}/> {this.state.isSubmitted
          ? <p>
              Image submitted successfully
            </p>
          : null}
      </div>
    );
  }
}

export default TestUpload;