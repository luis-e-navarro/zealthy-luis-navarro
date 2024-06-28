const db = require('../model/schema');
const bcrypt = require('bcrypt');
const adminController = {};

//signs in admin user using bcrypt to compare stored hash with entered password
adminController.adminLogin = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username.length || !password.length) {
    res.locals.login = { isLogged: false, message: 'username or password fields missing' };
    return next();
  };
    
  const sqlStatement = `
    SELECT * FROM admin WHERE username = $1;
  `;

  try{
    const data = await db.query(sqlStatement, [username]); 
    if (data.rows[0] && await bcrypt.compare(password, data.rows[0].password_hash)){
      res.locals.login = { isLogged: true, message: 'admin succesfully logged in' };
    }else{
      res.locals.login = { isLogged: false, message: 'invalid username or password' };
    }
    return next();  
  }catch(err){
      return next({
        log: 'express error caught in adminLogin controller',
        status: 400,
        message: { err: 'an error occurred in adminLogin controller' },
      });    
  }
};


module.exports = adminController;   
    
    
    
    
    
    
    