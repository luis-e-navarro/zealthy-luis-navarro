import React, { useState, useEffect, act } from 'react';
import Sidebar from '../components/Sidebar';
import TicketItem from '../components/TicketItem';
import { NEW } from '../assets/utils';
import axios from 'axios';
import UnauthorizedAdmin from './UanuthorizedAdmin';

const AdminDashboard = ({adminLoggedIn, setAdminLoggedIn}) => {
  const [activeMetric, setActiveMetric] = useState(NEW);
  const [ticketItems, setTicketItems] = useState([]);
  const [clickedItem, setClickedItem] = useState(null);

  const getTickets = async () => {
    setClickedItem();
    setTicketItems([]);
    const tickets = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/v1/api/tickets`, {
      params: { status_id: activeMetric },
    }).then(res=>{
      return res.data.tickets.sort((a, b) => b.urgent - a.urgent);
    }).catch((err)=>{
      console.log(err)
    })

    if(tickets.length) setTicketItems(tickets);
  };

  const updateTicketStatus = async (id, status) => {
    await axios.patch(`${process.env.REACT_APP_PRODUCTION_URL}/v1/api/tickets/${id}`,{status_id: status});
    await getTickets();

  };

  useEffect(()=>{
    const activeMetricData = window.localStorage.getItem('ZEALTHY_ACTIVE_METRIC');
    const adminLoggedInData = window.localStorage.getItem('ZEALTHY_ADMIN_LOGGED_IN');

    if(activeMetricData !== null) setActiveMetric(JSON.parse(activeMetricData));
    if(adminLoggedInData !== null) setAdminLoggedIn(JSON.parse(adminLoggedInData));

  }, []);

  useEffect(() => {
    getTickets();
  }, [activeMetric]);

    return (
      adminLoggedIn
      ? <div id='dashboard-tank'>
          <Sidebar 
            activeMetric={activeMetric} 
            setActiveMetric={setActiveMetric} 
            setAdminLoggedIn={setAdminLoggedIn}
            setClickedItem={setClickedItem}
            setTicketItems={setTicketItems}
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
                  activeMetric={activeMetric}
                  totalTickets={ticketItems.length}
                  setTicketItems={setTicketItems}
                />
              ))}
          </div>
        </div>
      :
        <UnauthorizedAdmin/>
    );   
};

export default AdminDashboard;
