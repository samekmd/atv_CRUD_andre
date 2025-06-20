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
class ProductService {
    createProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma_1.default.product.create({ data });
            return product;
        });
    }
    getProduct(pr_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.product.findUnique({ where: { pr_id: pr_id } });
        });
    }
    getProducts(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.product.findMany({
                where: { user_id }
            });
        });
    }
    updateProduct(pr_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const productExists = yield prisma_1.default.product.findUnique({ where: { pr_id } });
            if (!productExists) {
                throw new Error("Produto não existe");
            }
            const product = yield prisma_1.default.product.update({
                where: { pr_id },
                data: data
            });
            return product;
        });
    }
    deleteProduct(pr_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.default.product.delete({
                where: { pr_id: pr_id }
            });
        });
    }
}
exports.default = ProductService;
