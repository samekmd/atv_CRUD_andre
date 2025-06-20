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
exports.getItensSale = exports.createItemSale = void 0;
const itemSaleService_1 = __importDefault(require("../services/itemSaleService"));
const itemSaleService = new itemSaleService_1.default();
const createItemSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = Object.assign({}, req.body);
        const itemSale = yield itemSaleService.createItemSale(data);
        res.status(201).json(itemSale);
    }
    catch (error) {
        console.log("Erro ao atribuir produtos a venda ", error);
        res.status(400).json("Erro ao atribuir produtos a venda");
    }
});
exports.createItemSale = createItemSale;
const getItensSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sl_id } = req.params;
        const itensSale = yield itemSaleService.getItensSale(Number(sl_id));
        res.status(201).json(itensSale);
    }
    catch (error) {
        console.log("Erro ao selecionar itens da venda", error);
        res.status(400).json("Erro ao selecionar itens da venda");
    }
});
exports.getItensSale = getItensSale;
