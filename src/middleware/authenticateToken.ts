import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { TokenUser } from '../types/types'

const secretKey = process.env.JWT_SECRET
if (!secretKey) throw new Error('JWT_SECRET no está definida en las variables de entorno')

export const authenticateToken = (req: Request, res: Response, next: NextFunction): Response | any => {
  //* Obtenemos el token desde el encabezado de la solicitud
  const authHeader = req.headers?.authorization
  const token = authHeader?.split(' ')[1] // ? con split separamos el string en dos partes por el espacio ' ' y nos quedamos con la segunda[1] posición (el token)

  //* Si no hay token en la cabecera, devolvemos un error 401 (no autorizado)
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' })
  }

  //* Verificar el token con la clave secreta
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token no válido o expirado' })

    //* agregamos el usuario decodificado al objeto req
    req.user = req.user = decoded as TokenUser
    next()
  })
}
