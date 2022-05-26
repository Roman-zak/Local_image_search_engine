import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from "axios";
//const axios = require('axios').default;
export default class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.state = {imageUrl: '',
                  tags: ''};
  
    this.handleChange = this.handleChange.bind(this);
 //   this.handleFileChange = this.handleFileChange.bind(this);
 //   this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  console.log(this.state);
}
  render() {
    let result = {
      "imageUrl" : this.state.imageUrl,
      "tags" : this.state.tags,
    }
    async function postData(e){
      e.preventDefault();
      console.log(result);
      var response = await axios.post("http://localhost:5000/upload", {result});
      alert(response.data.message);

    }
    return (
      <div>
          <Form onSubmit={postData} enctype="multipart/form-data">
          {/* <Form action="http://localhost:5000/upload" method="post" enctype="multipart/form-data"> */}
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Input image file</Form.Label>
                    <Form.Control type="text" placeholder="Image Url" accept="image/*" name="imageUrl" value={this.state.file} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="formPlaintext" className="mb-3">
                    <Form.Label>Input image tags</Form.Label>
                    <Form.Control type="text" placeholder="Normal text" name="tags" value={this.state.tags} onChange={this.handleChange}/>
                </Form.Group>
                <Button type="submit">Save</Button>
          </Form> 
      </div>
    )
  }
}
