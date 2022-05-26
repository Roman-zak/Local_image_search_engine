import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

export default class Admin_Image extends Component {
    constructor(props) {
        super(props);
        this.state = { 
                        id: this.props.id,
                        imageUrl: this.props.imageUrl,
                        tags: this.props.tags
                    };
    }
  render() {
    return (
      <div className='row'>
        <div className='col-sm'>

                id: {this.state.id}
           

        </div>
        <div className='col-sm'>
            Tags: {this.state.tags}
        </div>
        <div className='col-sm'>
            <img src={this.state.imageUrl} alt={this.state.tags}  width="200" height="200" />
            {/* <img src= "https://upload.wikimedia.org/wikipedia/commons/8/85/Autoportrait_de_Vincent_van_Gogh.JPG" alt={this.state.tags}  width="200" height="200" /> */}
        </div>
      </div>
    )
  }
}
