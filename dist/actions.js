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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deletePlanet = exports.updatePlanet = exports.deletePeople = exports.updatePeople = exports.deleteFavoritePlanet = exports.deleteFavoriteCharacter = exports.addFavoritePlanet = exports.addFavoriteCharacter = exports.createToken = exports.getPlanet = exports.getPlanets = exports.createPlanet = exports.getCharacter = exports.getCharacters = exports.createCharacter = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var User_1 = require("./entities/User");
var utils_1 = require("./utils");
var Characters_1 = require("./entities/Characters");
var Planets_1 = require("./entities/Planets");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(User_1.User).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).find({ relations: ["Characters", "Planets"] })];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
var createCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var charRepo, arrayCharacters;
    return __generator(this, function (_a) {
        charRepo = typeorm_1.getRepository(Characters_1.Characters);
        arrayCharacters = [];
        req.body.forEach(function (element) {
            if (!element.name)
                throw new utils_1.Exception("Some character name is missing");
            if (!element.birth_year)
                throw new utils_1.Exception("Character birth_year is missing");
            if (!element.gender)
                throw new utils_1.Exception("Some character gender is missing");
            if (!element.height)
                throw new utils_1.Exception("Some character height is missing");
            if (!element.skin_color)
                throw new utils_1.Exception("Some character skin_color is missing");
            if (!element.eye_color)
                throw new utils_1.Exception("Some character eye_color is missing");
            if (!element.image_url)
                throw new utils_1.Exception("Some character image_url is missing");
            var newCharacter = charRepo.create(element);
            arrayCharacters.push(newCharacter);
        });
        arrayCharacters.forEach(function (element) {
            charRepo.save(element);
        });
        return [2 /*return*/, res.json(arrayCharacters)];
    });
}); };
exports.createCharacter = createCharacter;
var getCharacters = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var characters;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).find()];
            case 1:
                characters = _a.sent();
                return [2 /*return*/, res.json(characters)];
        }
    });
}); };
exports.getCharacters = getCharacters;
var getCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var character;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).findOne({ where: { id: req.params.id } })];
            case 1:
                character = _a.sent();
                return [2 /*return*/, res.json(character)];
        }
    });
}); };
exports.getCharacter = getCharacter;
var createPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planetRepo, arrayPlanets;
    return __generator(this, function (_a) {
        planetRepo = typeorm_1.getRepository(Planets_1.Planets);
        arrayPlanets = [];
        req.body.forEach(function (element) {
            if (!element.name)
                throw new utils_1.Exception("Some Planet name is missing");
            if (!element.climate)
                throw new utils_1.Exception("Some Planet climate is missing");
            if (!element.diameter)
                throw new utils_1.Exception("Some Planet diameter is missing");
            if (!element.gravity)
                throw new utils_1.Exception("Some Planet gravity is missing");
            if (!element.population)
                throw new utils_1.Exception("Some Planet population is missing");
            if (!element.terrain)
                throw new utils_1.Exception("Some Planet terrain is missing");
            if (!element.image_url)
                throw new utils_1.Exception("Some Planet image_url is missing");
            var newCharacter = planetRepo.create(element);
            arrayPlanets.push(newCharacter);
        });
        arrayPlanets.forEach(function (element) {
            planetRepo.save(element);
        });
        return [2 /*return*/, res.json(arrayPlanets)];
    });
}); };
exports.createPlanet = createPlanet;
var getPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).find()];
            case 1:
                planets = _a.sent();
                return [2 /*return*/, res.json(planets)];
        }
    });
}); };
exports.getPlanets = getPlanets;
var getPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne({ where: { id: req.params.id } })];
            case 1:
                planet = _a.sent();
                return [2 /*return*/, res.json(planet)];
        }
    });
}); };
exports.getPlanet = getPlanet;
var createToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    throw new utils_1.Exception('Please specify an email', 400);
                if (!req.body.password)
                    throw new utils_1.Exception('Please specify the password', 400);
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email, password: req.body.password } })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception('Invalid email or password', 400);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.createToken = createToken;
var addFavoriteCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, character, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({ relations: ["Characters"], where: { id: req.params.userid } })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).findOne({ where: { id: req.params.characterid } })];
            case 2:
                character = _a.sent();
                result = { error: "user or character is undefined" };
                if (!(user && character)) return [3 /*break*/, 4];
                user.Characters = __spreadArray(__spreadArray([], user.Characters), [character]);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(user)];
            case 3:
                _a.sent();
                result = user;
                _a.label = 4;
            case 4: return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.addFavoriteCharacter = addFavoriteCharacter;
var addFavoritePlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, planet, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({ relations: ["Planets"], where: { id: req.params.userid } })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne({ where: { id: req.params.planetid } })];
            case 2:
                planet = _a.sent();
                result = { error: "user or planet is undefined" };
                if (!(user && planet)) return [3 /*break*/, 4];
                user.Planets = __spreadArray(__spreadArray([], user.Planets), [planet]);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(user)];
            case 3:
                _a.sent();
                result = user;
                _a.label = 4;
            case 4: return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.addFavoritePlanet = addFavoritePlanet;
var deleteFavoriteCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, characterToDelete, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({ relations: ["Characters"], where: { id: req.params.userid } })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).findOne({ where: { id: req.params.characterid } })];
            case 2:
                characterToDelete = _a.sent();
                result = { error: "user or character doesn't exist" };
                if (!(user && characterToDelete)) return [3 /*break*/, 4];
                user.Characters = user.Characters.filter(function (character) {
                    return character.id !== characterToDelete.id;
                });
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(user)];
            case 3:
                result = _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.deleteFavoriteCharacter = deleteFavoriteCharacter;
var deleteFavoritePlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, planetToDelete, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({ relations: ["Planets"], where: { id: req.params.userid } })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne({ where: { id: req.params.planetid } })];
            case 2:
                planetToDelete = _a.sent();
                result = { error: "user or character doesn't exist" };
                if (!(user && planetToDelete)) return [3 /*break*/, 4];
                user.Planets = user.Planets.filter(function (character) {
                    return character.id !== planetToDelete.id;
                });
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(user)];
            case 3:
                result = _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.deleteFavoritePlanet = deleteFavoritePlanet;
var updatePeople = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var character;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).findOne({ where: { id: req.params.id } })];
            case 1:
                character = _a.sent();
                if (!character)
                    throw new utils_1.Exception("character not found");
                if (!req.body)
                    throw new utils_1.Exception("Body is empty");
                character.name = req.body.name;
                character.birth_year = req.body.birth_year;
                character.gender = req.body.gender;
                character.height = req.body.height;
                character.skin_color = req.body.skin_color;
                character.eye_color = req.body.eye_color;
                character.image_url = req.body.image_url;
                return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).save(character)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json(character)];
        }
    });
}); };
exports.updatePeople = updatePeople;
var deletePeople = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var characters;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).find()];
            case 1:
                characters = _a.sent();
                characters.forEach(function (character) {
                    typeorm_1.getRepository(Characters_1.Characters).remove(character);
                });
                return [2 /*return*/, res.json(characters)];
        }
    });
}); };
exports.deletePeople = deletePeople;
var updatePlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne({ where: { id: req.params.id } })];
            case 1:
                planet = _a.sent();
                if (!planet)
                    throw new utils_1.Exception("planet not found");
                if (!req.body)
                    throw new utils_1.Exception("Body is empty");
                planet.name = req.body.name;
                planet.climate = req.body.climate;
                planet.diameter = req.body.diameter;
                planet.gravity = req.body.gravity;
                planet.population = req.body.population;
                planet.terrain = req.body.terrain;
                planet.image_url = req.body.image_url;
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).save(planet)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json(planet)];
        }
    });
}); };
exports.updatePlanet = updatePlanet;
var deletePlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).find()];
            case 1:
                planets = _a.sent();
                planets.forEach(function (planet) {
                    typeorm_1.getRepository(Planets_1.Planets).remove(planet);
                });
                return [2 /*return*/, res.json(planets)];
        }
    });
}); };
exports.deletePlanet = deletePlanet;
