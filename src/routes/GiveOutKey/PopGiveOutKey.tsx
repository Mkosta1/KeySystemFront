import React, { useContext, useEffect, useState } from 'react';
import { JwtContext } from '../Root';
import { IWorkerData } from '../../dto/Worker/IWorkerData';
import { WorkerService } from '../../Services/Worker Service/WorkerService';
import { WorkerAtSiteService } from '../../Services/WorkerAtSite Service/WorkerAtSiteService';
import { IUserInfoProps } from '../../dto/IUserInfoProps';
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';
import { KeyAtSiteGetService } from '../../Services/KeyAtSiteService/KeyAtSiteService';
import { IKeyAtSiteData } from '../../dto/KeyAtSite/IKeyAtSiteData';
import Select from 'react-select';
import { WorkerGetService } from '../../Services/Worker Service/WorkerGetService';
import moment from 'moment-timezone';


function PopGiveOut(props: any) {
  const { jwtResponse, setJwtResponse } = useContext(JwtContext);
  
  const workerService = new WorkerGetService(setJwtResponse!);
  const [worker, setWorker] = useState([] as IWorkerData[]);

  const keyAtSiteService = new KeyAtSiteGetService(setJwtResponse!);
  const [keyData, setKeyData] = useState([] as IKeyAtSiteData[]);

  const workerAtSiteService = new WorkerAtSiteService(setJwtResponse!);

  const [selectedSite, setSelectedSite] = useState<string[]>([]);
  const [selectedWorker, setSelectedWorker] = useState('');

  const [seen, setSeen] = useState(false);

  const togglePop = () => {
    setSeen(!seen);
  };



  function handleLogin(e: any) {
      e.preventDefault()
      // Code to handle login goes here
      props.toggle()
  }


  useEffect(() => {
    if (jwtResponse) {
      keyAtSiteService.getKeyAtSite(jwtResponse).then(       
            response => {
                if (response){
                  setKeyData(response);
                } else {
                  setKeyData([]);
                }
            }
        );
    }
}, []);

useEffect(() => {
  if (jwtResponse) {
    workerService.getWorkerAll(jwtResponse).then(       
          response => {
              if (response){
                setWorker(response);
              } else {
                setWorker([]);
              }
          }
      );
  }
}, []);



function handleAddButtonClick(appUserId: string) {
  const currentTime = new Date();
  var time = moment.tz(currentTime, "Europe/Tallinn");
  
  if (jwtResponse) {
    try{
    selectedSite.forEach(element => {
      const dataItem = {
        appUserId,
        siteId: element,
        workerId: selectedWorker,
        when: time.toDate(),
        until: null
      };

      workerAtSiteService.postWorkerAtSite(jwtResponse, dataItem)
        .then((response) => {
          if (response) {
            console.log("Worker added to site.");
            togglePop();  // Close the popup after successful addition
          } else {
            throw new Error("Conflict! There was a conflict in your request.")
          }
        })
        .catch((error) => {
          console.error("Error adding worker to site: ", error);
        })
        .finally(() => {
          props.fetchData();
        });
    })}catch(error) { 
        console.log(error)
    }
}
}

let jwtObject: any = jwt_decode(jwtResponse!.jwt);

    const UserId = (props: IUserInfoProps) => {
        return (
            props.jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
        );
    }
    
    let userId = UserId(jwtObject={jwtObject})

  return (
      <div className="popup">
          <div className="popup-inner">
              <h2>Give key</h2>
              <form onSubmit={handleLogin}>
                  <label>
                      Select site
                      <Select 
                      options={keyData.map(m => ({label: (m.site.siteId +", "+ m.site.name +", "+"("+ m.key.keyNumber+")"), value: m.site.id}))}
                      isMulti
                      onChange={opt => setSelectedSite(opt.map(m => m.value))}
                      />
                  </label>
                  <label>
                      Select user
                      <Select 
                      options={worker.map(m => ({label: ("Name: "+m.name +", Phone: "+ m.phone), value: m.id}))}
                      onChange={opt => setSelectedWorker(opt?.value!)}
                      />
                  </label>
                  <button type="submit"  onClick={() => handleAddButtonClick(userId.toString())}>Give out</button>
              </form>
              <br></br>
              <button className="btn btn-danger" onClick={() => {props.toggle(); togglePop();}}>Close</button>
          </div>
      </div>
  )
}


export default PopGiveOut;