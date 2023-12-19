import { JwtContext } from "../Root";
import React, { useContext, useEffect, useState } from "react"
import '../../site.css'; 
import { WorkerGetService } from "../../Services/Worker Service/WorkerGetService";
import { IWorkerData } from "../../dto/Worker/IWorkerData";
import PopAddWorker from "./PopAddWorker";
import { WorkerRemoveService } from "../../Services/Worker Service/WorkerRemoveService";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";



const Worker = () => {


    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const workerService = new WorkerGetService(setJwtResponse!);
    const [workerData, setWorkerData] = useState([] as IWorkerData[]);
    

    const workerRemoveService = new WorkerRemoveService(setJwtResponse!);
    //Popup for worker add
    const [seen, setSeen] = useState(false);

    const togglePop = () => {
      setSeen(!seen);
    };

    //to update table after adding new worker
    useEffect(() => {
        fetchData();
      }, [jwtResponse]);

      const fetchData = () => {
        if (jwtResponse) {
            workerService.getWorkerAll(jwtResponse)
            .then((response) => {
              if (response) {
                setWorkerData(response);
              } else {
                setWorkerData([]);
              }
            });
        }
      };

      function handleDeleteUserClick(id: string) {
        if (jwtResponse) {
          
  
          const updatedDataItem = {
            id
          };
          
          workerRemoveService.deleteWorker(jwtResponse, updatedDataItem)
            .then((response) => {
              if (response) {
                console.log("Worker removed.");
                fetchData();
              } else if (response === "false"){
               
                console.error("Error removing worker.");
                Popup()
              }
            })
            .catch((error) => {
              console.error("Error removing worker:", error);
            })
            ;
        }
      }
      
      const Popup = () => {
        const [isVisible, setIsVisible] = useState(true);
      
        useEffect(() => {
          // Set a timeout to hide the pop-up after 5 seconds
          const timeoutId = setTimeout(() => {
            setIsVisible(false);
          }, 5000);
      
          // Cleanup the timeout to avoid memory leaks
          return () => clearTimeout(timeoutId);
        }, []); // Empty dependency array ensures the effect runs only once
      
        return (
          <div style={{ display: isVisible ? 'block' : 'none', padding: '10px', background: 'lightblue', position: 'fixed', bottom: 0, right: 0 }}>
            This is a pop-up!
          </div>
        );
      };

    const data = {
      columns: [
        {
          label: 'Worker name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Company',
          field: 'company',
        },
        {
          label: 'Phone',
          field: 'phone',
          sort: 'asc',
        }
      ],
      rows: workerData.map((rowData) => ({
        name: <Link to={`/workerProfile/id:${rowData.id}`}>{rowData.name}</Link>,
        company: rowData.company,
        phone: rowData.phone
      })),
    };
  
  
    return (<>
    <br></br>
      <div style={{ display: "flex" }}>
      <button onClick={togglePop} type="button" className="btn btn-primary">Add worker</button>
    {seen ? <PopAddWorker toggle={() => togglePop()} fetchData={fetchData} /> : null}
      </div>
      <br></br>
      <MDBDataTable
        striped
        bordered
        data={data}
        />
      </>
    );
  }
  
  export default Worker;