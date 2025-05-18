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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router_1 = __importDefault(require("./router"));
const config_1 = require("./config");
const bcryptjs_1 = require("bcryptjs");
const middleware_1 = __importDefault(require("./middleware"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'https://open-qr.vercel.app/',
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('backend is running');
});
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const hashedPassword = yield (0, bcryptjs_1.hash)(password, 2);
    yield config_1.prismaClient.user.create({
        data: {
            username,
            password: hashedPassword
        }
    });
    res.json({
        message: "User created"
    });
}));
app.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { username, password } = req.body;
    const user = yield config_1.prismaClient.user.findFirst({
        where: {
            username,
        }
    });
    if (!user) {
        res.status(401).json({ message: 'User not found' });
        return;
    }
    const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password);
    if (!passwordMatch) {
        res.status(401).json({
            message: "Password invalid"
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "");
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
    });
    res.json({
        message: "Signin success",
        token
    });
}));
app.post('/logout', (req, res) => {
    console.log(req.cookies.token);
    res.clearCookie('token');
    res.json({
        message: "logout success"
    });
});
app.use('/', middleware_1.default, router_1.default);
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
