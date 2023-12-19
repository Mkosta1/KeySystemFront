import { JwtContext } from "../Root";
import { useContext, useEffect, useState } from "react"
import '../../site.css'; 
import { MDBDataTable } from "mdbreact";
import { KeyGetService } from "../../Services/Key Service/KeyGetService";
import { IKeyAtSiteData } from "../../dto/KeyAtSite/IKeyAtSiteData";
import AddKey from "./AddKey";
import AssignSite from "./AssignSite";
import EditKey from "./EditKey";

const Keys = () => {


  const { jwtResponse, setJwtResponse } = useContext(JwtContext);

  const keyService = new KeyGetService(setJwtResponse!);
  const [all, setAll] = useState([] as IKeyAtSiteData[]);

  // for the KeyAdd popUp
  const [seen, setSeen] = useState(false);
  const togglePop = () => {
    setSeen(!seen);
  };

//for the site assign popUp
  const [seenSite, setSeenSite] = useState(false);
  const togglePopSite = () => {
    setSeenSite(!seenSite);
  };

  //for key edit
  const [editSite, setEditKey] = useState(false);
  const togglePopEdit = () => {
    setEditKey(!editSite);
  };

  
  const fetchData = () => {
    if (jwtResponse) {
      keyService.getKeys(jwtResponse).then(       
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

  
  const data = {
    columns: [
      {
        label: 'Key name',
        field: 'name',
        sort: 'asc',
      },
      {
        label: 'Key number',
        field: 'keynumber',
        sort: 'asc'
      },
      {
        label: 'Copies',
        field: 'copies',
      },
      {
        label: 'Total copies',
        field: 'total',
      },
      {
        label: 'Assigned to site',
        field: 'assigned',
        sort: 'asc'
      },
      {
        label: 'Edit',
        field: 'edit',
        sort: 'asc'
      }
      
    ],
    rows: all.map((item) => ({
      name: item.key.name,
      keynumber: item.key.keyNumber,
      copies: item.key.copies,
      total: item.key.neededCopies,
      assigned: (<>{item.site?.name || (<>
              <button onClick={togglePopSite} type="button" className="btn btn-primary">
                Assign site
              </button>
              {seenSite ? <AssignSite toggle={() => togglePopSite()} id={item.id} keys={item.key.id!} fetchData={fetchData} /> : null}
              </>)}</>)
              ,
      edit: (<>
        <button onClick={togglePopEdit} type="button" className="btn btn-secondary small-button">
          Edit
        </button>
        {editSite ? <EditKey toggle={() => togglePopEdit()} id={item.id} keys={item.key.id!} 
        name={item.key.name} keyNumber={item.key.keyNumber} copies={item.key.copies} total={item.key.neededCopies} currentSite={item.site.id}
        fetchData={fetchData} /> : null}
        </>)
    }))
  };


  return (<>
    <div>
    <br></br>
    <div style={{ display: "flex" }}>
    <button onClick={togglePop} type="button" className="btn btn-primary">Add key</button>
    {seen ? <AddKey toggle={() => togglePop()} fetchData={fetchData} /> : null}
    </div>
    <br></br>
    
    <MDBDataTable
        striped
        bordered
        data={data}
        />
     
    </div>
    </>
  );
}

export default Keys;
