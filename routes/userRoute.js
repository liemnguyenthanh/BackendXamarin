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

router.get('/findall', async (req, res) => {

  const signinUser = await User.find();

  return  res.status(201).json({
    success: true,
    signinUser
  });
  
});
router.post('/signin', async (req, res) => {

  const signinUser = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (signinUser) {
    res.status(201).json({
      success: true,
      user: {
        _id: signinUser.id,
        name: signinUser.name,
        username: signinUser.username,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
      }
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or Password.' });
  }
});

router.post('/register', async (req, res) => {
  const { name, username, password } = req.body
  const checkUser = await User.findOne({ username: username });
    console.log(checkUser);
    if (checkUser == null) {
    const user = new User({
      name: name,
      username: username,
      password: password,
    })
    const newUser = await user.save();
    console.log(newUser);
    if (newUser) {
      return res.status(201).json(
        {
          success: true,
          data: {
            _id: newUser.id,
            name: newUser.name,
            username: newUser.username,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser),
          }
        }
      );
    }
  }
  return res.status(201).json({ success: false, message: 'Invalid User Data.' });

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
