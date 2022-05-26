import React, {useState, Component } from 'react'
import { ReactDOM } from 'react';
import { Button, Form } from 'react-bootstrap'
import Admin_Image from  './Admin_Image'
import axios from "axios";

export default class Admin_Search extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
                        tags: '',
                        stateImageList: []
                    };
        
        this.handleChange = this.handleChange.bind(this); 
        this.setImageList = this.setImageList.bind(this);      
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
    setImageList(imageList){
        this.setState({
                stateImageList: imageList
        });
    }
    render() {
        var imageList = new Array();
        imageList.push(<Admin_Image id = "0" imageUrl="https://upload.wikimedia.org/wikipedia/commons/3/38/VanGogh_1887_Selbstbildnis.jpg" tags = "tags"/>);
        imageList.push(<Admin_Image id = "1" imageUrl="https://upload.wikimedia.org/wikipedia/commons/3/38/VanGogh_1887_Selbstbildnis.jpg" tags = "tags"/>);
        let result = {
          "tags" : this.state.tags
        }
        async function postData(e){
          e.preventDefault();
          console.log(result);
          var response = await axios.post("http://localhost:5000/search", {result});
          response.data.images.forEach(element => {
          imageList.push(<Admin_Image id = {element.id} imageUrl={element.imageUrl} tags = {element.tags}/>);  
            // domElement.appendChild(<Admin_Image id = {element.id} imageUrl={element.imageUrl} tags = {element.tags}/>);

            console.log(element);//
          });
        }
        return (
            <div>
                <Form onSubmit={postData} enctype="multipart/form-data">
                    <Form.Group controlId="formPlaintext" className="mb-3">
                        <Form.Label>Input search tags</Form.Label>
                        <Form.Control type="text" placeholder="Normal text" name="tags" value={this.state.tags} onChange={this.handleChange}/>
                    </Form.Group>
                    <Button type="submit">Search</Button>
                    {/* <Button onClick={}>Show</Button> */}
                </Form>
                <div className='gotten Images' id = "gottenImages">
                    {/* {this.state.stateImageList} */}
                    {imageList}
                    {/* {imageDataList.map((image)=><Admin_Image id = {image.id} imageUrl={image.imageUrl} tags = {image.tags}/>)} */}
                </div>
                {/* {imageList.forEach(element => {
                    <div>
                        {element}
                        {console.log(element)}
                    </div>
                })} */}
            </div> 
        )
  }
}



