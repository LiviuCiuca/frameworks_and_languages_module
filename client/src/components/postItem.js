import React, { Component } from "react";
import { Items } from "./getItems";



export class PostItems extends Component {
  constructor(props) {
    super(props);

    
    this.state = {
      user_id: '',
      keywords: '',
      description: '',
      image: '',
      lon: parseFloat(''),
      lat: parseFloat(''),
    }
  }
  
  //adding values from text`boxes to my state proprieties
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = (e) => {
    //e.preventDefault()
    
    const URL = 'https://8000-liviuciuca-frameworksan-su70b9at5lk.ws-eu77.gitpod.io'
    //posting data at endpoint /item
    fetch(`${URL}/item`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(data => this.changeHandler)
  }
  
  //line 36 exports handler to add dependency for useEffect in getItems file
  //https://purecss.io/forms/  , https://purecss.io/buttons/
  render() {
    <Items data={this.submitHandler} />
    
    const { user_id, keywords, description, image, lat, lon } = this.state
    return (
    <div className="pure-u-1 pure-u-md-2-5 parent_first_class" >
        <div className="first_class">
          <h1>freecycle</h1>
        <form class="pure-form" onSubmit={this.submitHandler}>

          <div class="pure-input-rounded">
            <input type="text" name="user_id" value={user_id} onChange={this.changeHandler} />
            <label>User_id:</label>
          </div>

          <div class="pure-input-rounded">
            <input type="text" name="keywords" value={keywords} onChange={this.changeHandler} />
            <label>Keywords:</label>
          </div>

          <div class="pure-input-rounded">
            <input type="text" name="description" value={description} onChange={this.changeHandler} />
            <label>Description:</label>
          </div>

          <div class="pure-input-rounded">
            <input type="text" name="image" value={image} onChange={this.changeHandler} />
            <label>Image:</label>
          </div>

          <div class="pure-input-rounded">
            <input type="number" name="lat" value={lat} onChange={this.changeHandler} />
            <label>Lat:</label>
          </div>

          <div class="pure-input-rounded">
            <input type="number" name="lon" value={lon} onChange={this.changeHandler} />
            <label>Lon:</label>
          </div>

          <div id="submit" class="pure-button">
            <button name="submitBtn" type="submit" data-action="create_item">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>


    );
  }
}
