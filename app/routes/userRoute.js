const exprees = require('express');
const  UserController  = require("../controller/user/UserController")
const userAuth = require('../../app/middleware/userAuth')

const router = exprees.Router();

router.post('/create/user',UserController.createUser)
router.get('/users',UserController.getUsers)
router.put('/update/user/:id',UserController.updateUser)
router.delete('/delete/user/:id',UserController.deleteUser)
router.get('/login/user',UserController.loginUser)
router.get('/dashboard',userAuth,UserController.userDashboard)


module.exports = router;