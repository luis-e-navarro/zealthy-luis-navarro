import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TicketItem from '../components/TicketItem';
import { NEW } from '../assets/utils';
import axios from 'axios';
import { backendURL } from '../assets/utils';

const AdminDashboard = ({setActivePage, setAdminLoggedIn}) => {
  const [active, setActive] = useState(NEW);
  const [ticketItems, setTicketItems] = useState([]);
  const [clickedItem, setClickedItem] = useState(null);

  const getTickets = async () => {
    const tickets = await axios.get(`${backendURL}/v1/api/tickets`, {
      params: { status_id: active },
    }).then(res=>{
      return res.data.tickets.sort((a, b) => b.urgent - a.urgent);
    }).catch((err)=>{
      console.log(err)
    })

    setTicketItems(tickets);
  };

  useEffect(() => {
    getTickets();
  }, [active]);
  
  const updateTicketStatus = ( id, status ) => {
    axios.patch(`${backendURL}/v1/api/tickets/${id}`,{status_id: status});
    getTickets();
  };

  return (
    <div id='dashboard-tank'>
      <Sidebar 
        active={active} 
        setActive={setActive} 
        setActivePage={setActivePage}
        setAdminLoggedIn={setAdminLoggedIn}
        setClickedItem={setClickedItem}
      />
      <div id='tickets-tank'>
        {ticketItems.map((ticket) => (
            <TicketItem
              key={`TicketItemKey-${ticket.ticket_id}`}
              ticket_id={ticket.ticket_id}
              header={ticket.header} 
              urgent={ticket.urgent}
              date={new Date(ticket.created_at).toLocaleString()}
              clickedItem={clickedItem}
              setClickedItem={setClickedItem}
              updateTicketStatus={updateTicketStatus}
            />
          ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
