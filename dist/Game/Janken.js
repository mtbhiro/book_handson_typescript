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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Utility_1 = require("../Utility/Utility");
var jankenOptions = ["rock", "paper", "scissors"];
var Janken = /** @class */ (function () {
    function Janken() {
        this.rounds = 0;
        this.currentRound = 1;
        this.result = {
            win: 0,
            lose: 0,
            draw: 0
        };
    }
    Janken.prototype.setting = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rounds, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, (0, Utility_1.promptInput)("??????????????????????????????")];
                    case 1:
                        rounds = _a.apply(void 0, [_b.sent()]);
                        if (!(Number.isInteger(rounds) && 0 < rounds)) return [3 /*break*/, 2];
                        this.rounds = rounds;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.setting()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Janken.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userSelected, randomSelected, result, resultText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, Utility_1.promptSelect)("\u3010".concat(this.currentRound, "\u56DE\u6226\u3011\u9078\u629E\u80A2\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002"), jankenOptions)];
                    case 1:
                        userSelected = _a.sent();
                        randomSelected = jankenOptions[Math.floor(Math.random() * 3)];
                        result = Janken.judge(userSelected, randomSelected);
                        switch (result) {
                            case "win":
                                this.result.win += 1;
                                resultText = "??????";
                                break;
                            case "lose":
                                this.result.lose += 1;
                                resultText = "??????";
                                break;
                            case "draw":
                                this.result.draw += 1;
                                resultText = "?????????";
                                break;
                        }
                        (0, Utility_1.printLine)("---\n\u3042\u306A\u305F: ".concat(userSelected, "\n\u76F8\u624B").concat(randomSelected, "\n").concat(resultText, "\n---"));
                        if (!(this.currentRound < this.rounds)) return [3 /*break*/, 3];
                        this.currentRound += 1;
                        return [4 /*yield*/, this.play()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Janken.prototype.end = function () {
        (0, Utility_1.printLine)("\n".concat(this.result.win, "\u52DD").concat(this.result.lose, "\u6557").concat(this.result.draw, "\u5F15\u304D\u5206\u3051\u3067\u3057\u305F\u3002"));
        this.reset();
    };
    Janken.prototype.reset = function () {
        this.rounds = 0;
        this.currentRound = 1;
        this.result = {
            win: 0,
            lose: 0,
            draw: 0
        };
    };
    Janken.judge = function (userSelected, randomSelected) {
        if (userSelected === "rock") {
            if (randomSelected === "rock")
                return "draw";
            if (randomSelected === "paper")
                return "lose";
            return "win";
        }
        else if (userSelected === "paper") {
            if (randomSelected === "rock")
                return "win";
            if (randomSelected === "paper")
                return "draw";
            return "lose";
        }
        else {
            if (randomSelected === "rock")
                return "lose";
            if (randomSelected === "paper")
                return "win";
            return "draw";
        }
    };
    return Janken;
}());
exports["default"] = Janken;
