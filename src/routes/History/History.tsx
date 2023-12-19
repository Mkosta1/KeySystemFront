import React, { useContext, useEffect, useState } from 'react';
import { JwtContext } from '../Root';
import 'react-toastify/dist/ReactToastify.css';
import { ICustomDTOGetAll } from '../../dto/WorkerAtSite/ICustomDTOGetAll';
import { WorkerAtSiteGetService } from '../../Services/WorkerAtSite Service/WorkerAtSiteGetService';
import { MDBDataTable } from 'mdbreact';


function History(props: any) {
  const { jwtResponse, setJwtResponse } = useContext(JwtContext);
  
  const workerGetAllService = new WorkerAtSiteGetService(setJwtResponse!);
  const [all, setAll] = useState([] as ICustomDTOGetAll[]);
  const [seen, setSeen] = useState(false);

  const togglePop = () => {
    setSeen(!seen);
  };

  useEffect(() => {
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
  }, []);


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
        label: 'Until',
        field: 'until',
        sort: 'asc',
      },
      {
        label: 'Who gave',
        field: 'appUserId',
        sort: 'asc',
      },
    ],
    rows: all.map((rowData) => ({
      name: rowData.site.name,
      siteId: rowData.site.siteId,
      keyTaker: rowData.worker?.name,
      phone: rowData.worker?.phone,
      company: rowData.worker?.company,
      when: rowData.when?.toString(),
      until: rowData.until?.toString(),
      appUserId: rowData.appUser.firstName + " " +rowData.appUser.lastName,
    })),
  };



  return (
      <div className="popup-table">
          <div className="popup-inner-table">
              <h2>History</h2>
                <div>
                    <MDBDataTable
                        striped
                        bordered
                        small
                        scrollY
                        data={data}
                    />
                </div>
              <br></br>
              <button className="btn btn-danger" onClick={() => {props.toggle(); togglePop();}}>Close</button>
          </div>
      </div>
  )
}


export default History;