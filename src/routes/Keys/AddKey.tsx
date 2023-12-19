import { useContext, useEffect, useState } from 'react';
import { JwtContext } from '../Root';
import { IUserInfoProps } from '../../dto/IUserInfoProps';
import jwt_decode from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { KeyService } from '../../Services/Key Service/KeyService';
import { IKeyData } from '../../dto/Key/IKeyData';
import { ISiteData } from '../../dto/Site/ISiteData';
import { SiteService } from '../../Services/Site Service/SiteService';
import { KeyAtSitePostService } from '../../Services/KeyAtSiteService/KeyAtSitePostService';


function AddKey(props: any) {
  const { jwtResponse, setJwtResponse } = useContext(JwtContext);

  const site = new SiteService(setJwtResponse!);
  const [siteData, setSiteData] = useState([] as ISiteData[]);

  const keyAtSiteService = new KeyAtSitePostService(setJwtResponse!);

  const keyService = new KeyService(setJwtResponse!);
  const [key, setKey] = useState([] as IKeyData[]);

  const [selectedSite, setSelectedSite] = useState<string[]>([]);
  const [keyName, setKeyName] = useState('');
  const [keyNumber, setKeyNumber] = useState('');
  const [keyCopies, setKeyCopies] = useState(Number);
  const [totalKeyCopies, setKeyTotalCopies] = useState(Number);


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
      const dataItem = {
        id: undefined,
        name: keyName,
        copies: keyCopies,
        neededCopies: totalKeyCopies,
        keyNumber: keyNumber
        
      };
      if(selectedSite.length === 0){
        keyService.postKey(jwtResponse, dataItem)
        .then((response) => {
          if (response) {
            const dataItem = {
              siteId: undefined,
              keyId: response.id!
            };
            //key added to site
            console.log("Key added.");
            //adding key to KeyAtSite but leaving site null when site was not selected
            keyAtSiteService.postKeyToSite(jwtResponse, dataItem)
           .then((response) => {
          if (response) {
            console.log("Key added.");
            props.fetchData();
            togglePop();  // Close the popup after successful addition
          } else {
            throw new Error("Conflict! There was a conflict in your request.")
          }
        })
            togglePop();  // Close the popup after successful addition
          } else {
            throw new Error("Conflict! There was a conflict in your request.")
          }
        })
        .catch((error) => {
          console.error("Error adding Key: ", error);
        })
        .finally(() => {
          props.fetchData();
        });
      }else{ selectedSite.forEach(element => {
        keyService.postKey(jwtResponse, dataItem)
          .then((response) => {
            if (response) {
              const dataItem = {
                siteId: element,
                keyId: response.id!
              };
              //key added to site
              console.log("Key added.");
              //adding key to KeyAtSite but leaving site null when site was not selected
              keyAtSiteService.postKeyToSite(jwtResponse, dataItem)
             .then((response) => {
            if (response) {
              console.log("Key added.");
              props.fetchData();
              togglePop();  // Close the popup after successful addition
            } else {
              throw new Error("Conflict! There was a conflict in your request.")
            }
          })
              togglePop();  // Close the popup after successful addition
            } else {
              throw new Error("Conflict! There was a conflict in your request.")
            }
          })
          .catch((error) => {
            console.error("Error adding Key: ", error);
          })
          .finally(() => {
            props.fetchData();
          });
        })}
      }catch(error) { 
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
              <h2>Add key</h2>
              <form onSubmit={handleLogin}>
                  <label>
                      Key name
                      <input  
                      onChange={(e) => setKeyName(e.target.value)}
                      style={{ maxHeight: '150px', overflowY: 'auto' }}
                      />
                  </label>
                  <label>
                      Key number
                      <input  
                      onChange={(e) => setKeyNumber(e.target.value)}
                      style={{ maxHeight: '150px', overflowY: 'auto' }}
                      />
                  </label>
                  <label>
                      Copies
                      <input
                      type="number"
                      
                        onChange={(e) => setKeyCopies(e.target.valueAsNumber)}
                      />
                  </label>
                  <label>
                      Total copies
                      <input
                      type="number"
                      
                        onChange={(e) => setKeyTotalCopies(e.target.valueAsNumber)}
                      />
                  </label>
                  <label>
                      Select site
                      <Select 
                      options={siteData.map(m => ({label: (m.siteId +", "+ m.name), value: m.id}))}
                      isMulti
                      onChange={opt => setSelectedSite(opt.map(m => m.value))}
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


export default AddKey;