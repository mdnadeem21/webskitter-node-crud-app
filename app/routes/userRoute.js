const exprees = require('express');
const  UserController  = require("../controller/user/UserController")
const userAuth = require('../../app/middleware/userAuth')

const router = exprees.Router();

router.post('/create/user',userAuth,UserController.createUser)
router.get('/users',userAuth,UserController.getUsers)
router.put('/update/user/:id',userAuth,UserController.updateUser)
router.delete('/delete/user/:id',UserController.deleteUser)
router.get('/login/user',UserController.loginUser)
router.get('/dashboard',userAuth,UserController.userDashboard)


module.exports = router;