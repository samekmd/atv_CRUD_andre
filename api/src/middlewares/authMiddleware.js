"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAdmin = exports.ensureAuthenticaded = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET || "meuSegredo";
const ensureAuthenticaded = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Token não fornecido' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token inválido ou expirado' });
        return;
    }
};
exports.ensureAuthenticaded = ensureAuthenticaded;
const ensureAdmin = (req, res, next) => {
    const user = req.user;
    if (!(user === null || user === void 0 ? void 0 : user.user_admin)) {
        res.status(403).json({ message: 'Acesso restrito ao administrador' });
        return;
    }
    next();
};
exports.ensureAdmin = ensureAdmin;
