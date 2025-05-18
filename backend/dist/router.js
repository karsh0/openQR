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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = require("./config");
const router = (0, express_1.Router)();
router.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield config_1.prismaClient.user.findFirst({
        where: {
            id: req.userId
        }
    });
    res.json({
        username: user === null || user === void 0 ? void 0 : user.username
    });
}));
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, link } = req.body;
    yield config_1.prismaClient.card.create({
        data: {
            title,
            link,
            userId: req.userId
        }
    });
    res.json({
        message: "qr created"
    });
}));
router.get('/generate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const card = yield config_1.prismaClient.card.findMany({
        where: {
            userId: req.userId
        }
    });
    res.json({
        message: "qr card generated",
        card
    });
}));
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.query.title;
    const card = yield config_1.prismaClient.card.findFirst({
        where: { title }
    });
    res.json({ card });
}));
router.post('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    yield config_1.prismaClient.card.delete({
        where: { id }
    });
    res.json({
        message: "card deleted"
    });
}));
exports.default = router;
