const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Middleware para proteger rutas
const { protect, restrictTo } = require('../middlewares/auth.middlware');

// Ruta para registrar un nuevo usuario
router.post('/register', userController.register);
router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUser);

// Ruta para el inicio de sesión
router.post('/login', userController.login);

// Ruta para actualizar el perfil de usuario
// Asegúrate de que solo usuarios logueados puedan acceder a esta ruta
router.patch('/update/:userId',protect, userController.updateProfile);
router.delete('/:id', userController.deleteUser);
 

module.exports = router;
