"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = middleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function middleware(req, res, next) {
    var _a;
    const authHeader = req.headers['authorization'];
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: "Token not found" });
        return;
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "");
        if (verified.username) {
            req.username = verified.username;
            next();
            return;
        }
    }
    catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
    res.status(403).json({ message: "Authorization failed" });
}
