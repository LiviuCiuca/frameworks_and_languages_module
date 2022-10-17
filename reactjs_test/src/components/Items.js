import { useEffect, useState } from "react"

export const Items = () => {

  const [items, setItems] = useState([]);
  const [submit_btn, setSubmit_btn] = useState(false);
  
  const fetchItems = () => {
    fetch('https://8000-liviuciuca-frameworksan-ghwuf4drqno.ws-eu71.gitpod.io/items', {
      method: 'GET',
   })
    .then((res) => res.json())
    .then((data) =>{
      setItems(data);
      console.log("my items from api",data);
    })
    .catch((err) => console.log(err));
  }; 

  useEffect(() =>{
    fetchItems();
  }, [submit_btn]);

  // https://beta.reactjs.org/learn // scrolling down to use state and rendering list
   const list_items = items.map(item =>  
    <li key={item.id}>
     <details>
      <summary>{item.user_id}</summary>
        <p>{item.keywords}</p>
        <p>{item.description}</p>
      </details>  
    </li>
    );

  return (
    <div>
      <h1> heyYOoo</h1>
      <button onClick={() =>{
        setSubmit_btn(submit_btn ? false : true);
      }}>
        Submit
      </button>
      <ul>
        {list_items}
      </ul>
  </div>

      
  );
};
