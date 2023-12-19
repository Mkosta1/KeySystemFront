import { JwtContext } from "../Root";
import React, { useContext, useEffect, useState } from "react"
import '../../site.css'; 
import { SiteGetService } from "../../Services/Site Service/SiteGetService";
import { WorkerGetService } from "../../Services/Worker Service/WorkerGetService";
import { ISiteData } from "../../dto/Site/ISiteData";
import { IWorkerData } from "../../dto/Worker/IWorkerData";
import { WorkerKeyReturnService } from "../../Services/WorkerAtSite Service/WorkerKeyReturnService";
import PopGiveOutKey from "../GiveOutKey/PopGiveOutKey";
import { ICustomDTOGetAll } from "../../dto/WorkerAtSite/ICustomDTOGetAll";
import { WorkerAtSiteGetAllService } from "../../Services/WorkerAtSite Service/WorkerAtSiteGetAllService";
import { IUserInfoProps } from "../../dto/IUserInfoProps";
import jwt_decode from "jwt-decode";
import History from "../History/History";
import { MDBDataTable } from "mdbreact";
import Login from "../identity/Login";
import moment from "moment";

const Index = () => {


  const { jwtResponse, setJwtResponse } = useContext(JwtContext);

  const workerKeyReturnService = new WorkerKeyReturnService(setJwtResponse!);

  const workerGetAllService = new WorkerAtSiteGetAllService(setJwtResponse!);
  const [all, setAll] = useState([] as ICustomDTOGetAll[]);

  const [seen, setSeen] = useState(false);

  const togglePop = () => {
    setSeen(!seen);
  };

  const [history, setHistory] = useState(false);

  const toggleHistoryPop = () => {
    setHistory(!history);
  };

  
  const fetchData = () => {
    if (jwtResponse) {
      workerGetAllService.getAll(jwtResponse).then(       
            response => {
                if (response){
                  setAll(response);
                } else {
                  setAll([]);
                }
            }
        );
    }
  };

  

  // Use useEffect to fetch data initially and whenever jwtResponse changes
  useEffect(() => {
    fetchData();
  }, [jwtResponse]);

  function handleReturnButtonClick(id: string, appUserId: string, siteId: string, workerId: string, when: Date) {
    if (jwtResponse) {
      const currentTime = new Date();
      var time = moment.tz(currentTime, "Europe/Tallinn");

      const updatedDataItem = { id, appUserId, siteId, workerId, when,until: time.toDate() };
      

      workerKeyReturnService.updateWorkerAtSite(jwtResponse, updatedDataItem)
        .then((response) => {
          if (response) {
            console.log("Key returned successfully.");
            fetchData();
          } else {
            console.error("Error returning the key.");
          }
        })
        .catch((error) => {
          console.error("Error updating key info:", error);
        })
        ;
    }
  }

function getId(){
  if(jwtResponse != null){
  let jwtObject: any = jwt_decode(jwtResponse!.jwt);

  const UserId = (props: IUserInfoProps) => {
      return (
          props.jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
          //UserInfo(jwtObject={jwtObject})
      );
  }
  return UserId(jwtObject={jwtObject}).toString()
}else{
  return "";
}
}
  



  const data = {
    columns: [
      {
        label: 'Site name',
        field: 'name',
        sort: 'asc',
      },
      {
        label: 'SPAN ID',
        field: 'siteId',
      },
      {
        label: 'Key taker',
        field: 'keyTaker',
        sort: 'asc',
      },
      {
        label: 'Phone',
        field: 'phone',
      },
      {
        label: 'Company',
        field: 'company',
      },
      {
        label: 'When',
        field: 'when',
        sort: 'asc',
        
      },
      {
        label: 'Who gave',
        field: 'appUserId',
        sort: 'asc',
      },
      {
        label: 'Return',
        field: 'return',
      },
    ],
    rows: all.map((rowData) => ({
      name: rowData.site.name,
      siteId: rowData.site.siteId,
      keyTaker: rowData.worker.name,
      phone: rowData.worker.phone,
      company: rowData.worker.company,
      when: rowData.when?.toString(),
      appUserId: rowData.appUser.firstName + " " +rowData.appUser.lastName,
      return: <button type="button" className="btn btn-danger small-button" onClick={() => 
        handleReturnButtonClick(rowData.id, getId(), rowData.siteId, rowData.workerId, rowData.when!)} >Return</button>
    })),
  };


  return (<>
    <div style={{'display': jwtResponse == null ? 'none' : ''}}>
    <br></br>
    <div style={{ display: "flex" }}>
    <button onClick={toggleHistoryPop} type="button" className="history btn btn-dark">History</button>
    {history ? <History toggle={() => toggleHistoryPop()}/> : null}

    <button onClick={togglePop} type="button" className="btn btn-primary">Give out key</button>
    {seen ? <PopGiveOutKey toggle={() => togglePop()} fetchData={fetchData} /> : null}
    <button style={{ marginLeft: "auto" }} type="button" className="btn btn-secondary" onClick={() => fetchData()}>Refresh</button>  
    </div>
    <br></br>
    
    <MDBDataTable
        striped
        bordered
        data={data}
        />
     
    </div>
    <div style={{'display': jwtResponse == null ? '' : 'none'}}>
          <Login/>
    </div>
    </>
  );
}

export default Index;
