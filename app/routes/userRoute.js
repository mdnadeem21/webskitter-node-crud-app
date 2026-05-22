const exprees = require('express');
const  UserController  = require("../controller/user/UserController")

const router = exprees.Router();

router.post('/create/user',UserController.createUser)
router.get('/users',UserController.getUsers)
router.put('/update/user',UserController.updateUser)
router.delete('/delete/user',UserController.deleteUser)
router.get('/login/user',UserController.loginUser)


module.exports = router;