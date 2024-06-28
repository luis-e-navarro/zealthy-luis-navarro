const express = require('express');
const ticketsController = require('../controllers/ticketsController');
const requestorsController = require('../controllers/requestorsController');
const adminController = require('../controllers/adminController');
const router = express.Router();

//tickets middleware routing
router.get(
  '/tickets',
  ticketsController.getTickets,
  (req, res) => {
    return res.status(200).json(res.locals);
  },
);

router.get(
  '/tickets/:ticket_id',
  ticketsController.getTicket,
  (req, res) => {
    return res.status(200).json(res.locals);
  },
);

router.post(
  '/tickets',
  requestorsController.createRequestor,
  requestorsController.findRequestor,
  ticketsController.createTicket,
  (req, res) => {
    return res.status(201).send('ticket created succesfully');
  },
);

router.patch(
  '/tickets/:ticket_id',
  ticketsController.updateTicketStatus,
  ticketsController.getTicket,
  (req, res) => {
    return res.status(200).json(res.locals);
  },
);

//admin middleware routing
router.post(
  '/admin/login',
  adminController.adminLogin,
  (req, res) => {
    return res.status(200).json(res.locals.login);
  },
);


module.exports = router;