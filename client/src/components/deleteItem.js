import React, { useState, useEffect } from 'react';
import { Items } from './getItems';
// tried to make my delete into a separate file.
//i was close to do it, but i was missing something, 
//and scraped it and added delete and get method in one file 
export const DeleteItems = (URL,selected) => {

    const [status, setStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [delete_btn, setDelete_btn] = useState(false);
   
   const deleteHandler = (e) => {
        fetch( URL +'/item/'+ selected, { method: 'DELETE' })
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                setStatus('Delete successful');
            })
            .catch(error => {
                setErrorMessage(error);
                console.error('There was an error!', error);
            });
    };

    return (
        <div onSubmit={deleteHandler} className="deleteClass">
     
            <button onClick={() =>{
                setDelete_btn(delete_btn ? false : true);
            }}>
                  Delete
            </button>
 
            <Items delete_btn={delete_btn} />
           

        </div>
    );
}
