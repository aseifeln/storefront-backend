"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;
const hashPassword = (password) => {
    return bcrypt_1.default.hashSync(password + pepper, Number(saltRounds));
};
exports.hashPassword = hashPassword;
const comparePassword = (password, storedPassword) => {
    return bcrypt_1.default.compareSync(password + pepper, storedPassword);
};
exports.comparePassword = comparePassword;
