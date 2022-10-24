import React,{Component} from "react";
import { Items } from "./getItems";



 export class  PostItems extends Component {
 constructor(props){
  super(props);

  this.state = {
    user_id:'',
    keywords:'',
    description:'',
    image:'',
    lon:parseFloat(''),
    lat:parseFloat('')
  }
}

 changeHandler = (e) => {
  this.setState({[e.target.name]: e.target.value})
 }

   submitHandler = (e) =>{
  //e.preventDefault()

  fetch('https://8000-liviuciuca-frameworksan-ghwuf4drqno.ws-eu72.gitpod.io/item', {   method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(this.state)
 })
  .then(response => response.json())
  .then(data => this.changeHandler)
  
 }
//line 36 exports handler to add dependency for useEffect in getItems file
render(){  <Items data={this.submitHandler}/>
  const {user_id,keywords,description,image,lat,lon} = this.state
    return (
    <div className="first_class">
        <h2>Input!</h2>
        
        <form action="create_item" onSubmit={this.submitHandler}>

         <div className="item-box">
            <input type="text" name="user_id" value={user_id} onChange={this.changeHandler}/>
            <label>User_id:</label>
          </div>

          <div className="item-box">
            <input type="text" name="keywords" value={keywords} onChange={this.changeHandler}/>
            <label>Keywords:</label>
          </div>

         <div className="item-box">
            <input type="text" name="description" value={description} onChange={this.changeHandler}/>
            <label>Description</label>
         </div>

         <div className="item-box">
            <input type="text" name="image" value={image} onChange={this.changeHandler}/>
            <img src={image}/>
         </div>

         <div className="item-box">
            <input type="number" name="lat" value={lat} onChange={this.changeHandler}/>
            <label>Lat:</label>
          </div>

         <div className="item-box">
            <input type="number" name="lon" value={lon} onChange={this.changeHandler}/>
            <label>Lon:</label>
         </div>

        <div className="create_item">
            <button name="create_item"  type="submit">
              create_item
            </button>
        </div>
      </form>
    </div>
    
          
      );
    }
  }
