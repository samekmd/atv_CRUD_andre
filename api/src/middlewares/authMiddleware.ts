import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "meuSegredo";

interface DecodedToken {
  user_id: number;
  user_email: string;
  user_admin: boolean;
  iat: number;
  exp: number;
}

interface AuthenticatedRequest extends Request {
  user?: DecodedToken;
}

const ensureAuthenticaded = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET) as DecodedToken;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido ou expirado" });
  }
};

const ensureAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const user = req.user;

  if (!user?.user_admin) {
    res.status(403).json({ message: "Acesso restrito ao administrador" });
    return;
  }

  next();
};

export { ensureAuthenticaded, ensureAdmin };
