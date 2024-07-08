import React, { useState } from 'react';
import axios from 'axios';
import { IN_PROGRESS, RESOLVED } from '../assets/utils';
import ValidationError from './ValidationError';

const TicketItem = (
  {
    ticket_id, 
    header, 
    urgent, 
    date, 
    clickedItem, 
    setClickedItem, 
    updateTicketStatus, 
    activeMetric
  }) => {
  const [ticketDetails, setTicketDetails] = useState({
    first_name: '',
    last_name: '',
    email:'',
    body:''
  });
  const [emailResponse, setEmailResponse] = useState('');
  const [validationFlag, setValidationFlag] = useState(false);

  const sendEmailResponse = () => {
    if(emailResponse === ''){
      setValidationFlag(true);
    }else{
      setValidationFlag(false);
      setEmailResponse(''); 
      window.alert(
        `Email has been sent succesfully to: \n ${ticketDetails.first_name} ${ticketDetails.last_name} - ${ticketDetails.email} \n email body: ${emailResponse}`
      ); 
    }
  };

  const handleClick = async () => {
    if(ticket_id !== clickedItem){
      await axios.get(`${process.env.PRODUCTION_URL}/v1/api/tickets/${ticket_id}`
      ).then(res => {
        setTicketDetails({...ticketDetails, ...res.data.ticket});
        setClickedItem(ticket_id);
      }).catch((err)=>{
        console.log(err)
      })      
    }
  };
  
  const updateTicket = (ticketStatus) => {
    updateTicketStatus(ticket_id, ticketStatus);
  };

  return (
    <div key={`div-${ticket_id}`}  onClick={handleClick} className={clickedItem === ticket_id ? 'ticket-container-clicked': 'ticket-container'}>
      <section key={`section-${ticket_id}`} className='ticket-header'>
        <div className='ticket-header-main'>
          <span>{header}</span> 
        </div>
        <div className='ticket-header-right'>{
          urgent 
            ? <span className='ticket-header-urgent'> URGENT </span> 
            : null
        }
        <span>{date}</span>
        </div>
      </section>
      {
        clickedItem === ticket_id 
          ? <section key={ticket_id} className='ticket-details-tank'>
              <div className='ticket-details-header'>
                <div className='details-main'>
                  <div id='submitted-tank'>
                    <span id='submitted-by'>submitted by:</span>
                    <span id='first-last-name'>{ticketDetails.first_name + ' ' + ticketDetails.last_name}</span>              
                  </div>
                </div>
                <div className='details-right'>
                  <select className={'details-select'} onChange={(e) => updateTicket(e.target.value)}>
                    <option value=''>Update Ticket Status</option>
                    {activeMetric !== IN_PROGRESS ? <option value={IN_PROGRESS}>IN PROGRESS</option> : null}
                    {activeMetric !== RESOLVED ? <option value={RESOLVED}>RESOLVED</option> : null}
                  </select>
                </div>
              </div>
              <div className='ticket-body'>
                <section>details:</section>
                <div>{ticketDetails.body}</div>
              </div>
              <div className='ticket-response'>
                <div className='email-body'>
                  <section>email:</section> <div>{ticketDetails.email}</div>
                </div>
                <textarea 
                  className='email-text-area' 
                  placeholder='response will be emailed to requestor from admin email account' 
                  value={emailResponse}
                  onChange={(e) => setEmailResponse( e.target.value)}
                />
                {validationFlag && <ValidationError message={'Cannot send empty email'}/>}
                <div onClick={sendEmailResponse} className='details-button'> SEND EMAIL </div>
              </div>
            </section>
          : null
      }
    </div>
  );
}

export default TicketItem;
