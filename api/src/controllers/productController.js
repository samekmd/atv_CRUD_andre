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
exports.softDeleteProduct = exports.updateProduct = exports.getProducts = exports.getProduct = exports.createProduct = void 0;
const productService_1 = __importDefault(require("../services/productService"));
const productService = new productService_1.default();
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = Object.assign({}, req.body);
        const product = yield productService.createProduct(data);
        res.status(201).json(product);
    }
    catch (error) {
        console.log("Erro ao cadastrar produto ", error);
        res.status(400).json(error);
    }
});
exports.createProduct = createProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pr_id } = req.params;
        const product = yield productService.getProduct(Number(pr_id));
        res.status(200).json(product);
    }
    catch (error) {
        console.log("Erro ao listar produto: ", error);
        res.status(400).json(error);
    }
});
exports.getProduct = getProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        const products = yield productService.getProducts(Number(user_id));
        res.status(200).json(products);
    }
    catch (error) {
        console.log("Erro ao listar vários produtos: ", error);
        res.status(400).json(error);
    }
});
exports.getProducts = getProducts;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { pr_id } = _a, rest = __rest(_a, ["pr_id"]);
        const data = Object.assign({}, rest);
        const product = yield productService.updateProduct(Number(pr_id), data);
        res.status(204).json("Produto atualizado com sucesso!");
    }
    catch (error) {
        console.log("Erro ao atualizar produto: ", error);
        res.status(400).json(error);
    }
});
exports.updateProduct = updateProduct;
const softDeleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pr_id } = req.params;
        const data = {
            pr_is_delete: true
        };
        const product = yield productService.updateProduct(Number(pr_id), data);
        res.status(204).json("Produto deletado com sucesso!");
    }
    catch (error) {
        console.log("Erro ao deletar produto: ", error);
        res.status(400).json(error);
    }
});
exports.softDeleteProduct = softDeleteProduct;
