import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET
if (!secretKey) throw new Error('JWT_SECRET no está definida en las variables de entorno')

export const authenticateToken = (req: Request, res: Response, next: NextFunction): Response | any => {
  //* Obtener el token desde el encabezado de la solicitud
  console.log('Middleware de autenticación ejecutado')

  const authHeader = req.headers?.authorization
  const token = authHeader?.split(' ')[1] // ? con split separamos el string en dos partes por el espacio ' ' y nos quedamos con la segunda posición (el token)

  //* Si no hay token en la cabecera, devolver un error 401 (no autorizado)
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' })
  }

  //* Verificar el token con la clave secreta
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token no válido o expirado' })

    //* Si el token es válido, agregar el usuario decodificado al objeto `req`
    req.user = user as { id: number, email: string, role: string }
    next()
  })
}
