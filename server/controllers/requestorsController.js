const db = require('../model/schema');
const requestorsController = {};

//create new requestor record for every new email received
requestorsController.createRequestor = async (req, res, next) => {
  const {first_name, last_name, email} = req.body;

  const sqlStatement = `
    INSERT INTO requestors(first_name, last_name, email) 
      VALUES ($1, $2, $3) 
    ON CONFLICT (email)
    DO UPDATE SET
    first_name = $1,
    last_name = $2
    `;

  try{
    await db.query(sqlStatement,[first_name, last_name, email]);
    return next();
  } catch (err) {
    return next({
      log: 'express error caught in createRequestor controller',
      status: 400,
      message: { err: 'an error occurred in createRequestor controller'},
    });
  };
};

//retrieve requestor_id using requestor email
requestorsController.findRequestor = async (req, res, next) => {
  const {email} = req.body;
  const sqlStatement = `
    SELECT requestor_id FROM requestors WHERE email = $1;
  `;

  try{
    const data = await db.query(sqlStatement, [email]); 

    res.locals.requestor_id = data.rows[0].requestor_id;
    return next();
  }catch(err){
    return next({
      log: 'express error caught in findRequestor controller',
      status: 400,
      message: { err: 'an error occurred in findRequestor controller' },
    });    
  }

};

module.exports = requestorsController;   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
