import React, { useState } from 'react';
import Header from '../components/Header';
import MainItems from '../components/MainItems';
import validator from 'validator';
import axios from 'axios';
import { HEADER_FIELDS, BODY_FIELDS, NEW_TICKET_STATE} from '../assets/utils';
import ValidationError from '../components/ValidationError';

const Main = ({activePage, adminLoggedIn}) => {
  const [submittedTicket, setSubmittedTicket] = useState(false);
  const [currentInfo, setCurrentInfo] = useState(NEW_TICKET_STATE);
  const [validationFlag, setValidationFlag] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (currentInfo.header === '' || 
        currentInfo.body === '' || 
        currentInfo.urgent === '' ||
        currentInfo.first_name === '' || 
        currentInfo.last_name === '' || 
        currentInfo.email === '' ||
        !validator.isEmail(currentInfo.email)){
          setValidationFlag(true);
    } else {
        setValidationFlag(false);
        console.log(`${process.env.REACT_APP_PRODUCTION_URL}/v1/api/tickets`)
        await axios.post(`${process.env.REACT_APP_PRODUCTION_URL}/v1/api/tickets`, currentInfo);

        // reset state
        setCurrentInfo(NEW_TICKET_STATE)
        setSubmittedTicket(true);
    };
  };

  return (
    <React.Fragment>
      <Header 
        activePage={activePage} 
        adminLoggedIn={adminLoggedIn} 
      />
      <main>
        <div className='main-container'>{
          !submittedTicket 
            ? <React.Fragment>
              <div className='main-header'>
              <section/> 
              <h2>NEW TICKET</h2>
              </div>
              <div className='main-tank'>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <ul className='main-tank'>
                    <div className='main-tank-header'>
                    {<MainItems fields={HEADER_FIELDS} currentInfo ={currentInfo} setCurrentInfo={setCurrentInfo}/>}
                    </div>
                    {<MainItems fields={BODY_FIELDS} currentInfo ={currentInfo} setCurrentInfo={setCurrentInfo}/>}
                    {validationFlag && <ValidationError message='Please fill out all required fields correctly'/>}
                    <button className='button' type='submit'> SUBMIT </button>
                    <div className='.space'/>
                  </ul>
                </form>
              </div>
              </React.Fragment>
            : <React.Fragment>
                <div className='main-header'>
                  <section/> 
                  <h2>SUBMISSION SUCCESFULL</h2>
                </div>
                <div className='main-tank'>
                  <section className='spacer'/>
                  <button className='button' onClick={()=> setSubmittedTicket(false)}>
                    OK
                  </button>
                </div>
              </React.Fragment>
        }
        </div>
      </main>
    </React.Fragment>
  )
}

export default Main;