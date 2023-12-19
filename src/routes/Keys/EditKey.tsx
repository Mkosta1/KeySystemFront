import React, { useContext, useEffect, useState } from 'react';
import { JwtContext } from '../Root';
import 'react-toastify/dist/ReactToastify.css';
import { WorkerService } from '../../Services/Worker Service/WorkerService';
import { SiteService } from '../../Services/Site Service/SiteService';
import { ISiteData } from '../../dto/Site/ISiteData';
import Select from 'react-select';
import { KeyAtSitePostService } from '../../Services/KeyAtSiteService/KeyAtSitePostService';

interface PopEditKey {
    id: string | undefined;
    keys: string;
    name: string;
    keyNumber: string;
    copies: number;
    total: number;
    currentSite: string;
    toggle: () => void;
    fetchData: () => void;
  }
  
  /* 
  Currently NOT finished and isn't working correctly. Have to make PUT request and make a way to see the sites as a list as well or as a option.
  */


  function EditKey({ id, keys, name, keyNumber, copies, total, currentSite, toggle, fetchData }: PopEditKey) {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);

    const keyToSite = new KeyAtSitePostService(setJwtResponse!);

    const site = new SiteService(setJwtResponse!);
    const [siteData, setSiteData] = useState([] as ISiteData[]);

    const [selectedSite, setSelectedSite] = useState<string[]>([]);

    const [seen, setSeen] = useState(false);
  
    const [keyName, setKeyName] = useState('');
    const [keyNumbers, setKeyNumber] = useState('');
    const [keyCopies, setCopies] = useState(0);
    const [keyTotalCopies, setTotalCopies] = useState(0);
  
    useEffect(() => {
        setKeyName(name || '');
        setKeyNumber(keyNumber || '');
        setCopies(copies || 0);
        setTotalCopies(total || 0);
        const newValue = currentSite ? [currentSite] : [];
        setSelectedSite(newValue);
      }, [name, keyNumber, copies, total, currentSite]);


  
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
    const options = siteData.map(m => ({
        label: `${m.siteId}, ${m.name}`,
        value: String(m.id), // Convert to string to ensure it's treated as an actual ID
      }));
    
    return (
        <div className={`popup ${seen ? 'visible' : ''}`}>
          <div className="popup-inner">
            <h2>Edit worker</h2>
            <form onSubmit={handleAddButtonClick}>
              <label>
                Select site
                <Select
                    options={options}
                    isMulti
                    value={options.filter(option => selectedSite.includes(option.value))}
                    onChange={selectedOptions => setSelectedSite(selectedOptions.map(option => option.value))}
                    />
              </label>
              <button type="submit">Update</button>
            </form>
            <br />
            <button className="btn btn-danger" onClick={togglePop}>
              Close
            </button>
          </div>
        </div>
      );
    }
  
  export default EditKey;
