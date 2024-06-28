const db = require('../model/schema');
const ticketsController = {};

//get all tickets using a query parameter to filter response using status_id
ticketsController.getTickets = async (req, res, next) => {
  const {status_id} = req.query;

  const sqlStatement = `
    SELECT 
      t.ticket_id,
      tsd.description AS status,
      t.header,
      t.urgent,
      t.created_at
    FROM tickets t
    INNER JOIN ticket_status_description tsd ON t.status_id = tsd.status_id
    WHERE t.status_id = $1;
  `;

  try{
    const data = await db.query(sqlStatement, [status_id]);
    res.locals.tickets = data.rows;
    return next();
  } catch (err) {
    return next({
      log: 'express error caught in getTickets controller',
      status: 400,
      message: { err: 'an error occurred in getTickets controller' },
    });
  }
};

//get additional ticket detail using ticket_id as a path variable
ticketsController.getTicket = async (req,res,next)=>{
  const {ticket_id} = req.params;

  const sqlStatement = `
    SELECT 
      r.first_name,
      r.last_name,
      r.email,
      t.body
    FROM tickets t
    INNER JOIN requestors r ON t.requestor_id = r.requestor_id
    WHERE t.ticket_id = $1;
  `;
  try{
    const data = await db.query(sqlStatement, [ticket_id]);
    res.locals.ticket = data.rows[0];
    return next();
  } catch (err) {
    return next({
      log: 'express error caught in getTicket controller',
      status: 400,
      message: { err: 'an error occurred in getTicket controller' },
    });
  }
};

//create new ticket resource
ticketsController.createTicket = async (req, res, next) => {
  const {requestor_id} = res.locals;
  const {status_id, header, body, urgent} = req.body;

  const sqlStatement = `
    INSERT INTO tickets (requestor_id, status_id, header, body, urgent) 
    VALUES ($1, $2, $3, $4, $5);
  `;

  try{
    await db.query(sqlStatement, [requestor_id, status_id, header, body, urgent]);
    return next();
  } catch (err) {
    return next({
      log: 'express error caught in updateTicketStatus controller',
      status: 400,
      message: { err: 'an error occurred in updateTicketStatus controller' },
    });
  }
};

//update ticket status_id with new status_id in request body using ticket_id from path variable
ticketsController.updateTicketStatus = async (req,res,next)=>{
  const {ticket_id} = req.params;
  const {status_id} = req.body;
  const sqlStatement = `
    UPDATE tickets SET status_id = $1 WHERE ticket_id = $2;
  `;

  try{
    await db.query(sqlStatement, [status_id, ticket_id]);
    return next();
  } catch (err) {
    return next({
      log: 'express error caught in updateTicketStatus controller',
      status: 400,
      message: { err: 'an error occurred in updateTicketStatus controller' },
    });
  }
};


module.exports = ticketsController;   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
