/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable no-useless-return */
/* eslint-disable linebreak-style */
/* eslint-disable prefer-template */
/* eslint-disable linebreak-style */
/* eslint-disable spaced-comment */
/* eslint-disable linebreak-style */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
// Requiring our models and passport as we've configured it
const router = require('express').Router();
const db = require('../models');
const passport = require('../config/passport');

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post('/login', passport.authenticate('local'), function (req, res) {
  console.log('check for invalid user' + res.message);
  res.json(req.user);
});

// otherwise send back an error
router.post('/signup', (req, res) => {
  db.User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then(function () {
      //res.json(req.body);
      //console.log('createduser' + res.body);
      res.redirect(307, '/api/login');
    })
    .catch((err) => {
      console.log('create user error' + err);
      res.status(406).json(err);
    });
  // .catch((Sequelize.) => {
  //   //console.log('create user error' + err);
  //   res.status(401).json(UniqueConstraintError);
  // });
});

// // Route for logging user out
// router.get('/logout', function (req, res) {
//   req.logout();
//   res.redirect('/');
// });

// **************** ADD GAME***************************
router.get('/locations', (req, res) => {
  // Here we add an "include" property to our options in our findAll query
  // In this case, just db.Post
  db.Location.findAll().then((response) => {
    res.json(response);
  });
});

router.get('/gametypes', (req, res) => {
  db.GameTypes.findAll().then((response) => {
    res.json(response);
  });
});
router.post('/games', (req, res) => {
  // ************add request

  db.Game.create({
    date: req.body.date,
    time: req.body.time,
    LocationId: req.body.LocationId,
    GameTypeId: req.body.GameTypeId,
    user: req.body.user,
  })
    .then(function (Game) {
      Game.addUser(req.body.user).then(() => {
        res.json(Game);
        console.log(req.body);
      });
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

// ********************************************************
// *************** search for games************************
router.get('/games', (req, res) => {
  db.Game.findAll({
    include: [db.GameTypes, db.Location],
  }).then((response) => {
    res.json(response);
  }).catch((err) => {
    res.status(401).json(err);
  });
});
// ************************* Get Game by Game ID *******************************
router.get('/games/:id', (req, res) => {
  db.Game.findOne({
    include: [db.GameTypes, db.Location],
  }).then((response) => {
    res.json(response);
  }).catch((err) => {
    res.status(401).json(err);
  });
});

router.post('/user_schedule/:id', (req, res) => {
  db.Game.findOne({
    where: {
      id: req.body.GameId,
      // UserId: req.body.UserId,
    },
  }).then((Game) => {
    console.log(Game);
    Game.addUser(
      req.body.UserId,
      res.json(Game),
      console.log(req.body.UserId),
    ).catch((err) => {
      console.log(err);
    });
  });
});
router.get('/user_schedule', (req, res) => {
  // db.GameTypes.findAll().then((schedule) => res.json(schedule));
  // console.log(res);
  console.log(req);
  db.Game.findAll({
    // where: {
    //   userId: req.params.id,
    //   // include: User,
    // },
  }).then((schedule) => res.json(schedule));
  // console.log(res);
  // res.json('get all games from schedule');
});

// *************************USER SCHEDULE &DATA AND SIGNEDUP PLAYERS *******************************

router.get('/games/:date/:LocationId/:GameTypeId', (req, res) => {
  // ************add request
  // console.log(
  //   // eslint-disable-next-line comma-dangle
  //   'inside /games:' +
  //     req.params.date +
  //     req.params.LocationId +
  //     req.params.GameTypeId +
  //     'Req:' +
  //     req
  // );
  db.Game.count({
    where: {
      date: req.params.date,
      LocationId: req.params.LocationId,
      GameTypeId: req.params.GameTypeId,
    },
  })
    .then((getgame) => res.json(getgame))
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.get('/gametypes/:GameTypeId', async (req, res) => {
  await db.GameTypes.findOne({
    where: {
      id: req.params.GameTypeId,
    },
  })
    .then((getgametypes) => res.json(getgametypes))
    .catch((err) => {
      res.status(401).json(err);
    });
});

// Route for getting some data about our user to be used client side
router.get('/user_data', (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      username: req.user.username,
      email: req.user.email,
      id: req.user.id,
    });
  }
});

// ********************************************************
// *************** Grab user schedule ************************
router.get('/user_schedule/:id', (req, res) => {
  db.User.findOne({
    include: [{
      model: db.Game,
      include: [db.GameTypes, db.Location, db.User],
    }],
    where: {
      id: req.params.id,
    },
  }).then((schedule) => res.json(schedule));
});

// eslint-disable-next-line eol-last
// *************** Destroy Game ************************
router.put('/remove_game_user/:id', (req, res) => {
  db.Game.findOne({
    where: {
      id: req.body.GameId,
      // UserId: req.body.UserId,
    },
  }).then((Game) => {
    console.log(Game);
    Game.removeUser(
      req.body.UserId,
      res.json(Game),
      console.log(req.body.UserId),
    ).catch((err) => {
      console.log(err);
    });
  });
});
// router.delete('/remove_game_user/:id', (req, res) => {
//   console.log(req.params.id);
//   db.Game.destroy({
//     where: {
//       id: req.params.id,
//     },
//   }).then((response) => {
//     res.json({
//       success: true,
//     });
//   });
// });
// eslint-disable-next-line eol-last
module.exports = router;