module.exports = function(app,User) {
    const UserCtrl = require('../controllers/user.controller.js');
    const GlobalCtrl = require('../controllers/global.controller.js');
    const truffle_connect = require('../connection/app.js');


    // Create a new User
    app.post('/api/users', (req, res) => {
        UserCtrl.Create(req, res, User, 'user');
    });

    // Retrieve all User
    app.get('/api/users', (req, res) => {
        GlobalCtrl.GetAll(req, res, User, 'user');
    });

    // Retrieve a single User by Id
    app.get('/api/users/:_id', (req, res) => {
        GlobalCtrl.GetById(req, res, User, 'user');
    });

    // Retrieve a single User by Name
    app.get('/api/users/name/:name', (req, res) => {
         GlobalCtrl.GetByName(req, res, User, 'name');
    });

    // Retrieve a single User by Email
    app.get('/api/users/email/:email', (req, res) => {
        UserCtrl.GetByEmail(req, res, User, 'email');
    });

    // Send mail to an user
    app.post('/api/users/send/', (req, res) => {
        UserCtrl.SendEmail(req, res);
    });

   // Update a User with Id
    app.put('/api/users', (req, res) => {
        GlobalCtrl.Update(req, res, User, 'user');
    });

    // Delete a User with Id
    app.delete('/api/users/:_id', (req, res) => {
        GlobalCtrl.Delete(req, res, User, 'user');
    });

    // Authentification
    app.post('/api/auth', (req, res) => {
        UserCtrl.Auth(req, res, User, 'user');
    });

    // Test token
    app.get('/api/test', (req, res) => {
      UserCtrl.TestToken(req, res, User, 'user');
    });

    /*
    partie blockchain
    */
    // renvoi tout les comptes
    app.get('/getAccounts', (req, res) => {
        console.log("**** GET /getAccounts ****");
        truffle_connect.start(function (answer) {
        res.send(answer);
        })
    });

    // afficher mes eirbmon
    app.get('/getMyEirbmon', (req, res) => {
        console.log("**** GET /getMyEirbmon ****");
        truffle_connect.getMyEirbmon(req.query.account,function (answer) {
        res.send(answer);
        })
    });
}
