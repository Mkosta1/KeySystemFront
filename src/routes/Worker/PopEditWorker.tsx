import React, { useContext, useEffect, useState } from 'react';
import { JwtContext } from '../Root';
import 'react-toastify/dist/ReactToastify.css';
import { WorkerService } from '../../Services/Worker Service/WorkerService';

interface PopEditWorkerProps {
    id: string | undefined;
    name: string;
    company: string;
    phone: number;
    toggle: () => void;
    fetchData: () => void;
  }
  
  function PopEditWorker({ id, name, company, phone, toggle, fetchData }: PopEditWorkerProps) {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const workerService = new WorkerService(setJwtResponse!);
  
    const [seen, setSeen] = useState(false);
    const [workerName, setWorkerName] = useState('');
    const [workerPlace, setWorkerPlace] = useState('');
    const [workerPhone, setWorkerPhone] = useState(0);
  
    useEffect(() => {
      setWorkerName(name || '');
      setWorkerPlace(company || '');
      setWorkerPhone(phone || 0);
    }, [name, company, phone]);
  
    const togglePop = () => {
      setSeen(!seen);
      toggle(); // Call toggle here to close the popup
    };
  
    function handleLogin(e: any) {
      e.preventDefault();
      togglePop();
    }
  
    function handleAddButtonClick() {
      if (jwtResponse) {
        const dataItem = {
          id: id,
          name: workerName,
          company: workerPlace,
          phone: workerPhone,
        };
  
        workerService
          .putWorker(jwtResponse, dataItem)
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
      }
    }
  
    return (
      <div className={`popup ${seen ? 'visible' : ''}`}>
        <div className="popup-inner">
          <h2>Edit worker</h2>
          <form onSubmit={handleLogin}>
          <label>
            Worker name
            <input
              value={workerName}
              onChange={(e) => setWorkerName(e.target.value)}
              style={{ maxHeight: '150px', overflowY: 'auto' }}
            />
          </label>
          <label>
            Company
            <input
              value={workerPlace}
              onChange={(e) => setWorkerPlace(e.target.value)}
            />
          </label>
          <label>
            Phone
            <input
              type="number"
              value={workerPhone}
              onChange={(e) => setWorkerPhone(Number(e.target.value))}
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
  
  export default PopEditWorker;
