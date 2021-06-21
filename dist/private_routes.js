"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var utils_1 = require("./utils");
var actions = __importStar(require("./actions"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyToken = function (req, res, next) {
    var token = req.header('Authorization');
    if (!token)
        return res.status(400).json('ACCESS DENIED');
    var decoded = jsonwebtoken_1["default"].verify(token, process.env.JWT_KEY);
    req.user = decoded;
    console.log(decoded);
    next();
};
var router = express_1.Router();
router.get('/users', verifyToken, utils_1.safe(actions.getUsers));
router.get('/user', verifyToken, utils_1.safe(actions.getUser));
router.get('/favorites', verifyToken, utils_1.safe(actions.getFavorites));
//Character
router.post('/people', verifyToken, utils_1.safe(actions.createCharacter));
router.put('/people/:id', verifyToken, utils_1.safe(actions.updatePeople));
router["delete"]('/people', verifyToken, utils_1.safe(actions.deletePeople));
//Favorite routes
router.post('/favorite/people/:characterid', verifyToken, utils_1.safe(actions.addFavoriteCharacter));
router["delete"]('/favorite/people/:characterid', verifyToken, utils_1.safe(actions.deleteFavoriteCharacter));
//Planet
router.post('/planets', verifyToken, utils_1.safe(actions.createPlanet));
router.put('/planets/:id', verifyToken, utils_1.safe(actions.updatePlanet));
router["delete"]('/planets', verifyToken, utils_1.safe(actions.deletePlanet));
//Favorite routes
router.post('/favorite/planet/:planetid', verifyToken, utils_1.safe(actions.addFavoritePlanet));
router["delete"]('/favorite/planet/:planetid', verifyToken, utils_1.safe(actions.deleteFavoritePlanet));
exports["default"] = router;
