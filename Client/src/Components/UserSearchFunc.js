import React, {useState, Component } from 'react'
import { ReactDOM } from 'react';
import { Button, Form } from 'react-bootstrap'
import User_Image from  './User_Image'
import axios from "axios";

export const UserSearchFunc = () => {
    const [images, setImages] = useState([]);
    const [tags, setTags] = useState("");

    const onTagsChange = (event) => {
        setTags(event.target.value);
    };
    async function postData(e){
        setImages(null);
        e.preventDefault();
        var imageList = new Array();
        let result = {
            "tags" : tags
        }
        console.log(result);
        var response = await axios.post("http://localhost:5000/search", {result});
        if(response.status===210){
            response.data.images.forEach(element => {
            imageList.push(<User_Image id = {element.id} imageUrl={element.fileUrl} tags = {element.tags}/>);  
            console.log(element);//
            });
        }
        setImages(imageList);
      }
        return (
            <div>
                <Form onSubmit={postData} enctype="multipart/form-data">
                    <Form.Group controlId="formPlaintext" className="mb-3">
                        <Form.Label>Input search tags</Form.Label>
                        <Form.Control type="text" placeholder="Normal text" name="tags" value={tags} onChange={onTagsChange}/>
                    </Form.Group>
                    <Button type="submit">Search</Button>
                </Form>
                <div className='container' id = "gottenImages">
                    {/* {this.state.stateImageList} */}
                    {images}
                </div>

            </div> 
        )
  
}



