// import express from 'express'
// import { registerUser } from '../controllers/users.controller'; 

// const router = express.Router();

// router.get('/users', (req, res) => {
//     res.json({ message: 'List of users' });
//   });

// // register user
// router.post("/register", registerUser);
// router.post("/login", loginUser);

// export default router;

import { registerUser , loginUser , logoutUser , refreshToken} from  "../controllers/users.controller.js"


// File: routes/userRoutes.js
import express from 'express';
const router = express.Router();

// Define routes
router.get('/users', (req, res) => {
  res.json({ message: 'Users fetched successfully' });
});


// // register user
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout" , logoutUser)
router.post("/refresh",refreshToken)
export default router;