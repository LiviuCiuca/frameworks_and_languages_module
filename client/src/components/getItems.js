import { useEffect, useState } from "react";


export const Items = (submitHandler) => {

  const [items, setItems] = useState([]);
  const [delete_btn, setDelete_btn] = useState(false);
  const [selected, setSelected] = useState(Number);
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
 
  //they don`t work
    // const DEFAULT_API = '/api/v1';  // default to current http(s)://currentHost:currentPort/api/v1'
	  // const urlParams = new URLSearchParams(window.location.search);
	  // const urlAPI = (urlParams.get('api') || DEFAULT_API).replace(/\/$/, '');  // Get api url (and remove trailing slash if present)

  // const host = window.location.host; 
  // console.log('current URL 👉️', host);
  // var serverURL = host.replace("8001", "8000");
  // console.log('server URL 👉️' , serverURL)
  

  //this needs to be copy pasted and also in the postItem
  const URL = 'https://8000-liviuciuca-frameworksan-jlo06whj1tw.ws-eu77.gitpod.io'

  
  const getItems = () => {
    fetch(URL +'/items')
      .then(response => response.json())
      .then(data => {
        //adds items to my array
        setItems(data)
        console.log(data);

        // resets the states 
      setDelete_btn(false);
      setSelected(0);
      });
  };

  const deleteItems = () =>{
    fetch(URL+ '/item/'+selected, {
      method: 'DELETE',})
    .then(async response => {
      const data = await response.json();

      // check for error response
      if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          console.log(error);
          return Promise.reject(error);
      }
      setStatus('Delete successful');
  })
  .catch(error => {
      setErrorMessage(error);
      console.error('There was an error!', errorMessage);
  });
  }

  //https://reactjs.org/docs/hooks-effect.html
  // every click on buttons resets/runs the following functions
  useEffect(() =>{
    deleteItems();
    getItems();
   
    // dependency array means this effect will only run once when btn is clicked
  }, [delete_btn, submitHandler]);

  // https://beta.reactjs.org/learn // scrolling down to use state and rendering list
  //displaying the items in a list, clicking on them sets the selected item
  const displayItems = items.map(item =>  
    <li class="pure-u-1 pure-u-lg-1-5 pure-u-md-2-5 "  key={item.id}>
     <details className="input" data-field="id">
        <summary onClick={() => {
          setSelected(selected ? 0 : item.id);
          }}>
          {item.user_id}
          <p />
            <button className="pure-button" data-action="delete" onClick={() =>{
             setDelete_btn(delete_btn ? false : true);
            }}>
             Delete
            </button>
            <p>Description: {item.description}</p>
        </summary>
          <p>Keywords : {item.keywords}</p>
          <p>Lat: {item.lat}</p>
          <p>Lon: {item.lon}</p>
          <img class="pure-img" alt="altProp" src={item.image} />
          <p>Date: {item.date_from}</p>      
      </details>  
    </li>
    );

  return (
  <div class="pure-g pure-g pure-u-1 pure-u-md-3-5 parent_second_class">
    <div class="second_class">
      <h2> Output </h2>
       <ul>
        {displayItems}
       </ul>  
      </div>
  </div>
  );
}

