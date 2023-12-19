import { JwtContext } from "../Root";
import React, { useContext, useEffect, useState } from "react"
import '../../site.css'; 
import { WorkerGetService } from "../../Services/Worker Service/WorkerGetService";
import { IWorkerData } from "../../dto/Worker/IWorkerData";
import { WorkerRemoveService } from "../../Services/Worker Service/WorkerRemoveService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import PopEditWorker from "./PopEditWorker";


const WorkerProfile = () => {

    
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    
    const workerService = new WorkerGetService(setJwtResponse!);
    const [workerData, setWorkerData] = useState([] as IWorkerData[]);
    
    const workerRemoveService = new WorkerRemoveService(setJwtResponse!);
    const { id } = useParams()
    const navigate = useNavigate();
    const cleanId = id!.replace('id:', '');

    const [seen, setSeen] = useState(false);

    const togglePop = () => {
      setSeen(!seen);
    };


    const fetchData = () => {
        if (jwtResponse) {
            workerService.getWorker(jwtResponse, cleanId).then(
                response => {
                    if (response) {
                        setWorkerData([response]);
                    } else {
                        setWorkerData([]);
                      }
                    }
                );
            }
          };

// Use useEffect to fetch data initially and whenever jwtResponse changes
          useEffect(() => {
            fetchData();
          }, [jwtResponse]);

      function handleDeleteUserClick(id: string) {
        if (jwtResponse) {
          const updatedDataItem = {
            id
          };
          workerRemoveService.deleteWorker(jwtResponse, updatedDataItem)
            .then((response) => {
              if (response) {
                console.log("Worker removed.");
                navigate("/worker");
              } else if (response === "false"){
               
                console.error("Error removing worker.");
              }
            })
            .catch((error) => {
              console.error("Error removing worker:", error);
            })
            ;
        }
      }
    
      
      function ProfileStatistics() {
        return (<>
            {workerData!.map(data => (
              <div className="vh-100" key={data.id}>
                <MDBContainer className="container py-5 h-100">
                  <MDBRow className="justify-content-center align-items-center ">
                    <MDBCol md="12" xl="4">
                      <MDBCard style={{ borderRadius: '15px' }}>
                        <MDBCardBody className="text-center">
                            Name
                          <MDBTypography tag="h4">{data.name}</MDBTypography>
                          <MDBCardText className="text-muted mb-4">
                            Company: <b>{data.company}</b> <span className="mx-2">|</span> Phone: <b>{data.phone}</b>
                          </MDBCardText>
                          <div className="d-flex justify-content-between text-center mt-5 mb-2">
                            <div>
                              <button onClick={togglePop} type="button" className="btn btn-secondary small-button">Edit</button>
                              {seen ? <PopEditWorker toggle={() => togglePop()} id={data.id} name={data.name!} company={data.company!} phone={data.phone!} fetchData={fetchData} /> : null}
                            </div>
                            <div>
                              <button
                                type="button"
                                className="btn btn-danger small-button"
                                onClick={() => handleDeleteUserClick(cleanId)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              </div>
          ))}
          </>);
      }


    
    
    

    return (<>
    <br></br>
        {ProfileStatistics()}
      </>
    );
  }
  
  export default WorkerProfile;