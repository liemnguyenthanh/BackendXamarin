import express from 'express';
import User from '../models/userModel';
import { getToken, isAuth } from '../util';

const router = express.Router();

// router.put('/:id', isAuth, async (req, res) => {
//   const userId = req.params.id;
//   const user = await User.findById(userId);
//   if (user) {
//     user.name = req.body.name || user.name;
//     user.username = req.body.username || user.username;
//     user.password = req.body.password || user.password;
//     const updatedUser = await user.save();
//     res.send({
//       _id: updatedUser.id,
//       name: updatedUser.name,
//       username: updatedUser.username,
//       isAdmin: updatedUser.isAdmin,
//       token: getToken(updatedUser),
//     });
//   } else {
//     res.status(404).send({ message: 'User Not Found' });
//   }
// });

router.post('/signin', async (req, res) => {

  const signinUser = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (signinUser) {
    res.status(201).json({
      success : true ,
      data : {
        _id: signinUser.id,
        name: signinUser.name,
        username: signinUser.username,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
      }
    });
  } else {
    res.status(401).json({ success : false ,message: 'Invalid username or Password.' });
  }
});

router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  });
  const newUser = await user.save();
  if (newUser) {
    res.state(201).json(
      {
        success : true ,
        data : {
          _id: newUser.id,
          name: newUser.name,
          username: newUser.username,
          isAdmin: newUser.isAdmin,
          token: getToken(newUser),
        }
      }
    );
  } else {
    res.status(401).json({ success : false,  message: 'Invalid User Data.' });
  }
});

// router.get('/createadmin', async (req, res) => {
//   try {
//     const user = new User({
//       name: 'Basir',
//       username: 'admin@example.com',
//       password: '1234',
//       isAdmin: true,
//     });
//     const newUser = await user.save();
//     res.send(newUser);
//   } catch (error) {
//     res.send({ message: error.message });
//   }
// });

export default router;
