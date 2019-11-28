const truffle_connect = require('../connection/app.js');
const UserCtrl = require('../controllers/user.controller.js');


exports.getAccounts = function(req, res){
      console.log("**** GET /getAccounts ****");
      truffle_connect.start(function (answer) {
      res.send(answer);
      })
}

exports.getMyEirbmon = function(req, res){
  a = UserCtrl.VerifyRights(req.body._id, req.body.token, User, "user");
  a.then(val => 
  {
    if (val) {
      truffle_connect.getMyEirbmon(req.query.account,function (answer) {
      res.send(answer);
      })
    } else {
      console.log("ERROR NO RIGHTS");
      res.status(500).json({
        msg: "ERROR NO RIGHTS"
      })
    }
  })
  .catch(err => {console.log(err.message)});
}