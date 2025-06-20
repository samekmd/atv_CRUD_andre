"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.JWT_SECRET || 'meuSegredo';
class AuthService {
    login(user_email, user_password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.user.findUnique({
                where: { user_email: user_email }
            });
            if (!user) {
                throw new Error("Email inválido");
            }
            const password = yield bcrypt_1.default.compare(user_password, user.user_password);
            if (!password) {
                throw new Error("Senha inválida");
            }
            if (user.user_status !== 'A') {
                throw new Error("Usuário bloqueado");
            }
            const token = jsonwebtoken_1.default.sign({
                user_id: user.user_id,
                user_email: user.user_email,
                user_admin: user.user_admin
            }, SECRET, { expiresIn: '1d' });
            return {
                message: 'Login realizado com sucesso',
                token,
                user: {
                    id: user.user_id,
                    nome: user.user_name,
                    email: user.user_email,
                    admin: user.user_admin
                }
            };
        });
    }
}
exports.default = AuthService;
