// import React, { useState, useEffect } from 'react';
// import { Items } from './getItems';

// export const DeleteItems = (URL,selected) => {

//     const [status, setStatus] = useState(null);
//     const [errorMessage, setErrorMessage] = useState(null);
//     const [delete_btn, setDelete_btn] = useState(false);

//     useEffect(() => {
//         fetch( URL+'/item/'+selected, { method: 'DELETE' })
//             .then(async response => {
//                 const data = await response.json();

//                 // check for error response
//                 if (!response.ok) {
//                     // get error message from body or default to response status
//                     const error = (data && data.message) || response.status;
//                     return Promise.reject(error);
//                 }

//                 setStatus('Delete successful');
//             })
//             .catch(error => {
//                 setErrorMessage(error);
//                 console.error('There was an error!', error);
//             });
//     }, []);

//     return (
//         <div className="card text-center m-3">
//             <h5 className="card-header">DELETE Request with Error Handling</h5>
//             <div className="card-body">
//             <button onClick={() =>{
//                 setDelete_btn(delete_btn ? false : true);
//             }}>
//                   Delete
//             </button>
//  
//             <Items detele_btn={delete_btn}/>
//             </div>

//         </div>
//     );
// }
