import React, { useContext, useEffect, useState } from 'react';
import { JwtContext } from '../Root';
import 'react-toastify/dist/ReactToastify.css';
import { WorkerService } from '../../Services/Worker Service/WorkerService';
import { SiteService } from '../../Services/Site Service/SiteService';
import { ISiteData } from '../../dto/Site/ISiteData';
import Select from 'react-select';
import { KeyAtSitePostService } from '../../Services/KeyAtSiteService/KeyAtSitePostService';

interface PopEditAssignSite {
    id: string | undefined;
    keys: string;
    toggle: () => void;
    fetchData: () => void;
  }
  
  function AssignSite({ id, keys, toggle, fetchData }: PopEditAssignSite) {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);

    const keyToSite = new KeyAtSitePostService(setJwtResponse!);

    const site = new SiteService(setJwtResponse!);
    const [siteData, setSiteData] = useState([] as ISiteData[]);

    const [selectedSite, setSelectedSite] = useState<string[]>([]);

    const [seen, setSeen] = useState(false);
  
  
    const togglePop = () => {
      setSeen(!seen);
      toggle(); // Call toggle here to close the popup
    };
  
    function handleLogin(e: any) {
      e.preventDefault();
      togglePop();
    }
   
    useEffect(() => {
    if (jwtResponse) {
      site.getAll(jwtResponse).then(       
            response => {
                if (response){
                  setSiteData(response);
                } else {
                  setSiteData([]);
                }
            }
        );
    }
}, []);
  
    function handleAddButtonClick() {
      if (jwtResponse) {
        try{
        selectedSite.forEach(element => {
            const dataItem = {
            id: id,
            keyId: keys,
            siteId: element
            };
    
        keyToSite.putKeyToSite(jwtResponse, dataItem)
          .then((response) => {
            if (response) {
              console.log("Worker updated on the site.");
            } else {
              console.error("Error updating worker.");
            }
          })
          .catch((error) => {
            console.error("Error updating worker:", error);
          })
          .finally(() => {
            fetchData();
            togglePop(); // Close the popup after updating
          });
        })}
        catch(e){
        console.log(e);
        }}
    }
  
    return (
      <div className={`popup ${seen ? 'visible' : ''}`}>
        <div className="popup-inner">
          <h2>Edit worker</h2>
          <form onSubmit={handleLogin}>
                <label>
                Select site
                <Select 
                options={siteData.map(m => ({label: (m.siteId +", "+ m.name), value: m.id}))}
                isMulti
                onChange={opt => setSelectedSite(opt.map(m => m.value))}
                />
            </label>
          <button type="submit" onClick={() => handleAddButtonClick()}>
            Update
          </button>
        </form>
          <br />
          <button className="btn btn-danger" onClick={togglePop}>
            Close
          </button>
        </div>
      </div>
    );
  }
  
  export default AssignSite;
