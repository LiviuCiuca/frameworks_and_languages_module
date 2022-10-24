import { useEffect, useState } from "react";

export const Items = (submitHandler) => {

  const [items, setItems] = useState([]);
  const [delete_btn, setDelete_btn] = useState(false);
  const [selected, setSelected] = useState(Number);
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const URL = 'https://8000-liviuciuca-frameworksan-ghwuf4drqno.ws-eu72.gitpod.io'

  
  const getItems = () => {
    fetch(URL +'/items')
      .then(response => response.json())
      .then(data => {
        setItems(data)
        console.log(data);
      setDelete_btn(false);
      setSelected(0);
      });
  };

  const deleteItems = () =>{
    fetch( URL+ '/item/' + selected, { method: 'DELETE' })
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
      console.error('There was an error!', error);
  });
  }

  useEffect(() =>{
  console.log(items)
    deleteItems();
    getItems();
    

    // submit_btn dependency array means this effect will only run once when btn is clicked
  }, [delete_btn, submitHandler]);

  // https://beta.reactjs.org/learn // scrolling down to use state and rendering list
  //displaying the items in a list, clicking on them sets the selected item
   const list_items = items.map(item =>  
    <li key={item.id}>
     <details>
      <summary onClick={() =>{ 
        setSelected(selected ? 0:item.id);
        console.log(selected);
        }}>
        {item.user_id}
      </summary>
        <p>Keywords : {item.keywords}</p>
        <p>Description: {item.description}</p>
        <p>Lat: {item.lat}</p>
        <p>Lon: {item.lon}</p>
        <p>Date: {item.date_from}</p>
      </details>  
    </li>
    );


  return (
    <div>
      <h1> freecycle</h1>
      <button onClick={() =>{
        setDelete_btn(delete_btn ? false : true);
      }}>
        delete
      </button>
      <ul>
        {list_items}
      </ul>
     
  </div>

      
  );
}

