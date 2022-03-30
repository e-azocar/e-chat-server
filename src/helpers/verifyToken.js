import { verify } from 'jsonwebtoken'

export const verifyToken = (req) => {
  const bearerToken = req.headers['authorization'];
  if (!bearerToken) return null
  if (!bearerToken.startsWith('Bearer ')) return null

  const token = bearerToken.split(' ')[1];
  return verify(token, process.env.JWT_SECRET);
}