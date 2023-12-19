import React, { useContext, useEffect, useState } from 'react';
import { JwtContext } from '../Root';
import { WorkerService } from '../../Services/Worker Service/WorkerService';
import { IUserInfoProps } from '../../dto/IUserInfoProps';
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';


function PopAddWorker(props: any) {
  const { jwtResponse, setJwtResponse } = useContext(JwtContext);

  const workerService = new WorkerService(setJwtResponse!);

  const [workerName, setWorkerName] = useState('');
  const [workerPlace, setWorkerPlace] = useState('');
  const [workerPhone, setWorkerPhone] = useState(Number);

  const [seen, setSeen] = useState(false);

  const togglePop = () => {
    setSeen(!seen);
  };


  function handleLogin(e: any) {
      e.preventDefault()
      // Code to handle login goes here
      props.toggle()
  }

  let jwtObject: any = jwt_decode(jwtResponse!.jwt);

    const UserId = (props: IUserInfoProps) => {
        return (
            props.jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
            //UserInfo(jwtObject={jwtObject})
        );
    }
    
    let userId = UserId(jwtObject={jwtObject})

    function handleAddButtonClick() {
        if (jwtResponse) {
          
          const dataItem = {
            id: undefined,
            name: workerName,
            company: workerPlace,
            phone: workerPhone
          };
      
          workerService.postWorker(jwtResponse, dataItem)
            .then((response) => {
              if (response) {
                console.log("Worker added to site.");
                togglePop();  // Close the popup after successful addition
              } else {
                props.toggle();
                toast.error('Conflict! There was a conflict in your request.');
              }
            })
            .catch((error) => {
              console.error("Error adding worker to site: ", error);
            })
            .finally(() => {
              props.fetchData();
            });
        }
      }

  return (
      <div className="popup">
          <div className="popup-inner">
              <h2>Add worker</h2>
              <form onSubmit={handleLogin}>
                  <label>
                      Worker name
                      <input  
                      onChange={(e) => setWorkerName(e.target.value)}
                      style={{ maxHeight: '150px', overflowY: 'auto' }}
                      />
                  </label>
                  <label>
                      Company
                      <input 
                      
                      
                        onChange={(e) => setWorkerPlace(e.target.value)}
                      />
                  </label>
                  <label>
                      Phone
                      <input
                      type="number"
                      
                        onChange={(e) => setWorkerPhone(e.target.valueAsNumber)}
                      />
                  </label>
                  <button type="submit"  onClick={() => handleAddButtonClick()}>Add</button>
              </form>
              <br></br>
              <button className="btn btn-danger" onClick={() => {props.toggle(); togglePop();}}>Close</button>
          </div>
      </div>
  )
}


export default PopAddWorker;