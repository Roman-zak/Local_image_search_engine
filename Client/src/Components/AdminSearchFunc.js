import React, {useState, Component } from 'react'
import { ReactDOM } from 'react';
import { Alert, Button, Form } from 'react-bootstrap'
import Admin_Image from  './Admin_Image'
import axios from "axios";

export const AdminSearchFunc = () => {
    const [images, setImages] = useState([]);
    const [tags, setTags] = useState("");
    const [tagsNew, setTagsNew] = useState("");
    const [idToDel, setIdToDel] = useState(0);
    const [idToEd, setIdToEd] = useState(0);
    const onTagsChange = (event) => {
        setTags(event.target.value);
    };
    const onIdToDelChange = (event) => {
        setIdToDel(event.target.value);
    };
    const onIdToEdChange = (event) => {
        setIdToEd(event.target.value);
    };
    const onTagsNewChange = (event) => {
        setTagsNew(event.target.value);
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
            imageList.push(<Admin_Image id = {element.id} imageUrl={element.fileUrl} tags = {element.tags}/>);  
            console.log(element);//
        });
        }

        setImages(imageList);
      }
    async function postDelete(e){
        e.preventDefault();
        setImages(null);
        var imageList = new Array();
        let deletData = {
            "idToDel" : idToDel
        }
        let result = {
            "tags" : tags
        }
        console.log(deletData);
        var response = await axios.post("http://localhost:5000/delete", {deletData});
        alert(response.data.message);
        response = await axios.post("http://localhost:5000/search", {result});
        if(response.status===210){
            response.data.images.forEach(element => {
            imageList.push(<Admin_Image id = {element.id} imageUrl={element.fileUrl} tags = {element.tags}/>);  
            console.log(element);//
            });
        }   
        setImages(imageList);
    }
    async function postEdit(e){
        e.preventDefault();
        setImages(null);
        var imageList = new Array();
        let editData = {
            "idToEd" : idToEd,
            "tagsNew" : tagsNew
        }
        let result = {
            "tags" : tags
        }
        console.log(editData);
        var response = await axios.post("http://localhost:5000/edit", {editData});
        alert(response.data.message);
        response = await axios.post("http://localhost:5000/search", {result});
        if(response.status===210){
            response.data.images.forEach(element => {
            imageList.push(<Admin_Image id = {element.id} imageUrl={element.fileUrl} tags = {element.tags}/>);  
            console.log(element);//
            });
        }   
        setImages(imageList);
    }
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-sm'>
                        <h2> Search </h2>
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
                    <div className='col-sm'>
                        <div className='row'>
                            <h3>Delete</h3>
                            <Form onSubmit={postDelete}>
                                <Form.Group controlId="number" className="mb-3">
                                    <Form.Label>Input id of image to delete</Form.Label>
                                    <Form.Control type="number" placeholder="number" name="id" value={idToDel} onChange={onIdToDelChange}/>
                                </Form.Group>
                                
                                <Button type="submit" variant="danger">Delete</Button>
                            </Form>
                        </div>
                        <div className='row'>
                            <h3>Edit</h3>
                            <Form onSubmit={postEdit}>
                                <Form.Group controlId="number" className="mb-3 col-sm">
                                    <Form.Label>Input id of image to edit</Form.Label>
                                    <Form.Control type="number" placeholder="number" name="id" value={idToEd} onChange={onIdToEdChange}/>
                                </Form.Group>
                                <Form.Group controlId="number" className="mb-3 col-sm">
                                    <Form.Label>Input new tags</Form.Label>
                                    <Form.Control type="text" placeholder="New tags" name="tagsNew" value={tagsNew} onChange={onTagsNewChange}/>
                                </Form.Group>
                                <Button type="submit" variant="warning">Edit</Button>
                            </Form>
                        </div>
                    </div>
                </div> 
            </div>
        )
  
}



