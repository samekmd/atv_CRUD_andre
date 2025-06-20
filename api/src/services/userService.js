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
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../prisma/prisma"));
class UserService {
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data);
            const user = yield prisma_1.default.user.create({ data });
            return user;
        });
    }
    getUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.user.findUnique({ where: { user_id: user_id } });
            return user;
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma_1.default.user.findMany({ where: { user_admin: false } });
            return users;
        });
    }
    updateUser(user_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield prisma_1.default.user.findUnique({
                where: { user_id: user_id }
            });
            if (!userExists) {
                throw new Error("usuário não existe");
            }
            const user = yield prisma_1.default.user.update({
                where: { user_id: user_id },
                data: data
            });
            return user;
        });
    }
    deleteUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.default.user.delete({
                where: { user_id: user_id }
            });
        });
    }
}
exports.UserService = UserService;
