import React, { useState } from 'react';
import Header from '../components/Header';
import MainItems from '../components/MainItems';
import validator from 'validator';
import axios from 'axios';

const Main = ({activePage, setActivePage, adminLoggedIn}) => {
  const [ticketInfoReceived, setTicketInfoReceived] = useState(false);

  const [currentInfo, setCurrentInfo] = useState({
    status_id: 1,
    header: '',
    body: '',
    urgent: '',
    first_name: '',
    last_name: '',
    email: ''
  });

  const headerFields = {
    'header': 'Brief Summary (50 characters or less)',
    'urgent': 'Is this urgent?'
  };

  const bodyFields = {
    'body': 'Detailed Issue (400 characters or less)',
    'first_name': 'First Name:',
    'last_name': 'Last Name:',
    'email': 'Email:'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = document.querySelector('#error-message');

    if (currentInfo.header === '' || 
        currentInfo.body === '' || 
        currentInfo.urgent === '' ||
        currentInfo.first_name === '' || 
        currentInfo.last_name === '' || 
        currentInfo.email === '' ||
        !validator.isEmail(currentInfo.email)) {
      if (errorMessage) errorMessage.innerHTML = 'Error: Please fill out all required fields correctly!';
    } else {
        if (errorMessage) errorMessage.innerHTML = '';

        await axios.post('/v1/api/tickets', currentInfo);
        setTicketInfoReceived(true);
    };
  };

  return (
    <React.Fragment>
      <Header 
        activePage={activePage} 
        setActivePage={setActivePage} 
        adminLoggedIn={adminLoggedIn} 
      />
      <main>
        <div className='main-container'>{
          !ticketInfoReceived 
            ? <React.Fragment>
              <div className='main-header'>
              <section/> 
              <h2>NEW TICKET</h2>
              </div>
              <div className='main-tank'>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <ul className='main-tank'>
                    <div className='main-tank-header'>
                    {<MainItems fields={headerFields} currentInfo ={currentInfo} setCurrentInfo={setCurrentInfo}/>}
                    </div>
                    {<MainItems fields={bodyFields} currentInfo ={currentInfo} setCurrentInfo={setCurrentInfo}/>}
                    <li id='error-message'></li>
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
                  <button className='button' onClick={()=> setTicketInfoReceived(false)}>
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