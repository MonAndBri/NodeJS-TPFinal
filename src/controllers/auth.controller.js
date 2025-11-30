import { generateToken } from '../utils/token-generator.js';

const default_user = {
    id: 1,
    email: "test@gmail.com",
    password: "123456"
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email y contraseña son obligatorios" });
        }
        if (email !== default_user.email || password !== default_user.password) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }
        const user = {
            id: default_user.id,
            email: default_user.email
        };

        const token = generateToken(user);
        return res.status(200).json({
            message: "Autenticación exitosa",
            token: token
        });

    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}
