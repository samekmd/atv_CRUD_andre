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
class SaleService {
    createSale(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = yield prisma_1.default.sale.create({ data });
            return sale;
        });
    }
    getSale(sl_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = yield prisma_1.default.sale.findUnique({
                where: { sl_id: sl_id }
            });
            return sale;
        });
    }
    getSales(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sales = yield prisma_1.default.sale.findMany({
                where: { user_id: user_id }
            });
            return sales;
        });
    }
    updateSale(sl_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = yield prisma_1.default.sale.update({
                where: { sl_id: sl_id },
                data: data
            });
            return sale;
        });
    }
    softDeleteSale(sl_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.default.sale.update({
                where: { sl_id: sl_id },
                data: { sl_is_delete: true }
            });
        });
    }
}
exports.default = SaleService;
