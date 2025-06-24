import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '123';

export interface ReqUser extends Request {
  usuarioId?: string;
}

export const autenticarJWT = (req: ReqUser, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ erro: 'Token não informado' });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ erro: 'Token inválido' });
    return;
  }

  try {
    const dados = jwt.verify(token, JWT_SECRET) as any;
    req.usuarioId = dados.id;
    next();
  } catch {
    res.status(401).json({ erro: 'Token inválido ou expirado' });
    return;
  }
};
