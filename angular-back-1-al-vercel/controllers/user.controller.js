const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
// Configurar JWT
const JWT_SECRET = 'tu_super_secreto'; // Este debe estar en una variable de entorno
const JWT_EXPIRES_IN = '90d';

const userController = {
    // Registro de usuario
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const newUser = new User({
                name,
                email,
                password: password,
                role: 'admin'
            });

            await newUser.save();
            res.status(201).send({ message: 'Usuario registrado con éxito', userId: newUser._id });
        } catch (error) {
            res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const vehicles = await User.find({});
            res.status(200).json(vehicles);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los vehículos', error: error.message });
        }
    },

    getUser: async (req, res) => {
        try {
            const { id } = req.params;
            const vehicle = await User.findById(id);

            if (!vehicle) {
                return res.status(404).json({ message: 'Vehículo no encontrado' });
            }

            res.status(200).json(vehicle);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el vehículo', error: error.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedVehicle = await User.findByIdAndDelete(id);

            if (!deletedVehicle) {
                return res.status(404).json({ message: 'Vehículo no encontrado' });
            }

            res.status(200).json({ message: 'Vehículo eliminado con éxito' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el vehículo', error: error.message });
        }
    },


    // Inicio de sesión
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            res.status(200).json({id: user._id,role: user.role, message: 'Login exitoso', token });
        } catch (error) {
            res.status(500).json({ message: 'Error en el login', error: error.message });
        }
    },

    // Actualizar perfil del usuario
    updateProfile: async (req, res) => {
        try {
            const { userId } = req.params;
            const { name, email } = req.body;
            const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.status(200).json({ message: 'Perfil actualizado con éxito', user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el perfil', error: error.message });
        }
    }
};

module.exports = userController;