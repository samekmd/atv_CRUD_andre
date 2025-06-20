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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getUser = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const userService_1 = require("../services/userService");
const bcrypt_1 = __importDefault(require("bcrypt"));
function cript_password(password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashed_password = yield bcrypt_1.default.hash(password, 10);
            return String(hashed_password);
        }
        catch (error) {
            console.log("Erro ao criptografar senha: " + error);
            throw error;
        }
    });
}
const userService = new userService_1.UserService();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { password } = _a, rest = __rest(_a, ["password"]);
        const user_password = yield cript_password(password);
        const data = Object.assign(Object.assign({}, rest), { user_password: user_password, user_status: "A", user_quant_acesso: 1 });
        const user = yield userService.createUser(data);
        res.status(201).json({ id: user.user_id });
    }
    catch (error) {
        console.log("Erro ao criar usuário ", error);
        res.status(400).json(error);
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { user_id } = _a, rest = __rest(_a, ["user_id"]);
        const data = Object.assign({}, rest);
        const user = yield userService.updateUser(user_id, data);
        res.status(204).json("Usuário atualizado com sucesso!");
    }
    catch (error) {
        console.log("Erro ao atualizar usuário ", error);
        res.status(400).json(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const id = Number(user_id);
        const user = yield userService.deleteUser(id);
        res.status(204).json("Usuário deletado com sucesso!");
    }
    catch (error) {
        console.log("Erro ao deletar usuário ", error);
        res.status(400).json(error);
    }
});
exports.deleteUser = deleteUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const id = Number(user_id);
        const user = yield userService.getUser(id);
        res.status(200).json(user);
    }
    catch (error) {
        console.log("Erro ao selecionar usuário ", error);
        res.status(400).json(error);
    }
});
exports.getUser = getUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.getUsers();
        res.status(200).json(users);
    }
    catch (error) {
        console.log("Erro ao selecionar usuários ", error);
        res.status(400).json(error);
    }
});
exports.getUsers = getUsers;
