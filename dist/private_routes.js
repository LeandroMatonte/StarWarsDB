"use strict";
/**
 * Pivate Routes are those API urls that require the user to be
 * logged in before they can be called from the front end.
 *
 * Basically all HTTP requests to these endpoints must have an
 * Authorization header with the value "Bearer <token>"
 * being "<token>" a JWT token generated for the user using
 * the POST /token endpoint
 *
 * Please include in this file all your private URL endpoints.
 *
 */
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
// declare a new router to include all the endpoints
var router = express_1.Router();
router.get('/user', verifyToken, utils_1.safe(actions.getUsers));
router.post('/favorite/people/:userid/:characterid', verifyToken, utils_1.safe(actions.addFavoriteCharacter));
router["delete"]('/favorite/people/:userid/:characterid', verifyToken, utils_1.safe(actions.deleteFavoriteCharacter));
router.post('/people', verifyToken, utils_1.safe(actions.createCharacter));
//Editar base de datos
router.put('/people/:id', verifyToken, utils_1.safe(actions.updatePeople));
router["delete"]('/people', verifyToken, utils_1.safe(actions.deletePeople));
router.post('/favorite/planet/:userid/:planetid', verifyToken, utils_1.safe(actions.addFavoritePlanet));
router["delete"]('/favorite/planet/:userid/:planetid', verifyToken, utils_1.safe(actions.deleteFavoritePlanet));
router.post('/planets', verifyToken, utils_1.safe(actions.createPlanet));
//Editar base de datos
router.put('/planets/:id', verifyToken, utils_1.safe(actions.updatePlanet));
router["delete"]('/planets', verifyToken, utils_1.safe(actions.deletePlanet));
exports["default"] = router;
