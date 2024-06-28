import React, {useState} from 'react';
import axios from 'axios';
import { backendURL } from '../assets/utils';
import { IN_PROGRESS, RESOLVED } from '../assets/utils';

const TicketItem = ({ticket_id, header, urgent, date, clickedItem, setClickedItem, updateTicketStatus}) => {
  const [ticketDetails, setTicketDetails] = useState({
    first_name: '',
    last_name: '',
    email:'',
    body:''
  });

  const [emailResponse, setEmailResponse] = useState('');
  const [ticketStatus, setTicketStatus] = useState();

  const sendEmailResponse = () => {
    console.log(
      {'Would normally send email here with body':
        {
          requestorEmail: ticketDetails.email, 
          emailResponse: emailResponse
        }
      }
    );
  };

  const handleClick = async () => {
    if(ticket_id !== clickedItem){
      await axios.get(`${backendURL}/v1/api/tickets/${ticket_id}`
      ).then(res => {
        setTicketDetails({...ticketDetails, ...res.data.ticket});
        setClickedItem(ticket_id);
      }).catch((err)=>{
        console.log(err)
      })      
    }
  };
  
  const updateTicket = () => {
    setClickedItem(null);
    updateTicketStatus(ticket_id, ticketStatus);
  };

  return (
    <div key={`div-${ticket_id}`}  onClick={handleClick} className='ticket-container'>
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
                  <select onChange={(e) => setTicketStatus( e.target.value)}>
                    <option value=''>Update Ticket Status</option>
                    <option value={IN_PROGRESS}>IN PROGRESS</option>
                    <option value={RESOLVED}>RESOLVED</option>
                  </select>
                  <div 
                    onClick={
                    ticketStatus !== undefined 
                      ? updateTicket 
                      : null
                    } 
                    className='button'>submit ticket update
                  </div>
                </div>
              </div>
              <div className='ticket-body'>
                <section>DETAILS:</section>
                <div>{ticketDetails.body}</div>
              </div>
              <div className='ticket-response'>
                <section>{ticketDetails.email}</section>
                <textarea 
                  className='text-area' 
                  placeholder='response will be emailed to requestor from admin email account' 
                  onChange={(e) => setEmailResponse( e.target.value)}
                />
                <div onClick={sendEmailResponse} className='button'> SEND TO EMAIL </div>
              </div>
            </section>
          : null
      }
    </div>
  );
}

export default TicketItem;
