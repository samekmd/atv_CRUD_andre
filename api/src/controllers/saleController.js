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
exports.updateSale = exports.deleteSale = exports.getSales = exports.getSale = exports.createSale = void 0;
const saleService_1 = __importDefault(require("../services/saleService"));
const saleService = new saleService_1.default();
const createSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = Object.assign({}, req.body);
        const sale = yield saleService.createSale(data);
        res.status(201).json(sale);
    }
    catch (error) {
        console.log("Erro ao cadastrar venda", error);
        res.status(400).json("Erro ao cadastrar venda");
    }
});
exports.createSale = createSale;
const getSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sl_id } = req.params;
        const sale = yield saleService.getSale(Number(sl_id));
        res.status(200).json(sale);
    }
    catch (error) {
        console.log("Erro ao selecionar venda: ", error);
        res.status(404).json("Venda não encontrada");
    }
});
exports.getSale = getSale;
const getSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const sales = yield saleService.getSales(Number(user_id));
        res.status(200).json(sales);
    }
    catch (error) {
        console.log("Erro ao selecionar venda: ", error);
        res.status(404).json("Venda não encontrada");
    }
});
exports.getSales = getSales;
const updateSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { sl_id } = _a, rest = __rest(_a, ["sl_id"]);
        const data = Object.assign({}, rest);
        const sale = yield saleService.updateSale(Number(sl_id), data);
        res.status(204).json(sale);
    }
    catch (error) {
        console.log("Erro ao atualizar venda", error);
        res.status(400).json("Erro ao atualizar venda");
    }
});
exports.updateSale = updateSale;
const deleteSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sl_id } = req.params;
        const sale = yield saleService.softDeleteSale(Number(sl_id));
        res.status(204).json(sale);
    }
    catch (error) {
        console.log("Erro ao deletar venda", error);
        res.status(400).json("Erro ao deletar venda");
    }
});
exports.deleteSale = deleteSale;
