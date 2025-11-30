import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret_key = process.env.JWT_SECRET_KEY;

// Middleware para verificar el token JWT
export const authentication = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if (!authHeader)  return res.status(401).json({ error: "Falta el header Authorization" });
        
    // El header suele venir como: "Bearer 123abc..."
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token no proporcionado" });

    jwt.verify(token, secret_key, (err) => {
        if (err) return res.sendStatus(403);  // Token inválido o expirado
        next();
    });
}
