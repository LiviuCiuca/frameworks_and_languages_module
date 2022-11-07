import { useEffect, useState } from "react";
//npm install purecss --save
export const Items = (submitHandler) => {

  const [items, setItems] = useState([]);
  const [delete_btn, setDelete_btn] = useState(false);
  const [selected, setSelected] = useState(Number);
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
 
  const URL_API = (new URLSearchParams(document.location.search)).get("api")
  console.log(URL_API);
  const URL = 'https://8000-liviuciuca-frameworksan-ghwuf4drqno.ws-eu74.gitpod.io'

  
  const getItems = () => {
    fetch(URL +'/items')
      .then(response => response.json())
      .then(data => {
        setItems(data)
        console.log(data);

        // resets the states 
      setDelete_btn(false);
      setSelected(0);
      });
  };

  const deleteItems = () =>{
    fetch( URL+ '/item/'+selected, { method: 'DELETE' })
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

  useEffect(() =>{
    deleteItems();
    getItems();
    
    // submit_btn dependency array means this effect will only run once when btn is clicked
  }, [delete_btn, submitHandler]);

  // https://beta.reactjs.org/learn // scrolling down to use state and rendering list
  //displaying the items in a list, clicking on them sets the selected item
  const displayItems = items.map(item =>  
    <li class="pure-u-1-3" key={item.id}>
     <details data-field="id">
        <summary onClick={() => {
          setSelected(selected ? 0 : item.id);
          }}>
          {item.user_id}
          <div class="pure-u-1-12"/>
            <button data-action="delete" onClick={() =>{
             setDelete_btn(delete_btn ? false : true);
            }}>
             Delete
            </button>
        </summary>
          <p>Keywords : {item.keywords}</p>
          <p>Description: {item.description}</p>
          <p>Lat: {item.lat}</p>
          <p>Lon: {item.lon}</p>
          <img className="pure-img" src={item.image} />
          <p>Date: {item.date_from}</p>      
      </details>  
    </li>
    );

  return (
  <div>
    <h1> freecycle </h1>
      <ul>
        {displayItems}
      </ul>  
  </div>
  );
}

