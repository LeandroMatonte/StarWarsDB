import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { User } from './entities/User'
import { Exception } from './utils'
import { Characters } from './entities/Characters'
import { Planets } from './entities/Planets'
import jwt from 'jsonwebtoken'

export const createUser = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if (!req.body.first_name) throw new Exception("Please provide a first_name")
    if (!req.body.last_name) throw new Exception("Please provide a last_name")
    if (!req.body.email) throw new Exception("Please provide an email")
    if (!req.body.password) throw new Exception("Please provide a password")

    const userRepo = getRepository(User)
    // fetch for any user with this email
    const user = await userRepo.findOne({ where: { email: req.body.email } })
    if (user) throw new Exception("Users already exists with this email")

    const newUser = getRepository(User).create(req.body);  //Creo un usuario
    const results = await getRepository(User).save(newUser); //Grabo el nuevo usuario 
    return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(User).find({relations: ["Characters", "Planets"]});
    return res.json(users);
}

export const createCharacter = async (req: Request, res: Response): Promise<Response> => {
    const charRepo = getRepository(Characters);
    let arrayCharacters: Characters[] = [];
    req.body.forEach((element: Characters) => {
        if (!element.name) throw new Exception("Some character name is missing");
        if (!element.birth_year) throw new Exception("Character birth_year is missing");
        if (!element.gender) throw new Exception("Some character gender is missing");
        if (!element.height) throw new Exception("Some character height is missing");
        if (!element.skin_color) throw new Exception("Some character skin_color is missing");
        if (!element.eye_color) throw new Exception("Some character eye_color is missing");
        if (!element.image_url) throw new Exception("Some character image_url is missing");

        const newCharacter = charRepo.create(element);
        arrayCharacters.push(newCharacter);
    });

    arrayCharacters.forEach(element => {
        charRepo.save(element);
    });
    return res.json(arrayCharacters);
}

export const getCharacters = async (req: Request, res: Response): Promise<Response> => {
    const characters = await getRepository(Characters).find();
    return res.json(characters);
}

export const getCharacter = async (req: Request, res: Response): Promise<Response> => {
    const character = await getRepository(Characters).findOne({ where: { id: req.params.id } });
    return res.json(character);
}

export const createPlanet = async (req: Request, res: Response): Promise<Response> => {
    const planetRepo = getRepository(Planets);
    let arrayPlanets: Planets[] = [];
    req.body.forEach((element: Planets) => {
        if (!element.name) throw new Exception("Some Planet name is missing");
        if (!element.climate) throw new Exception("Some Planet climate is missing");
        if (!element.diameter) throw new Exception("Some Planet diameter is missing");
        if (!element.gravity) throw new Exception("Some Planet gravity is missing");
        if (!element.population) throw new Exception("Some Planet population is missing");
        if (!element.terrain) throw new Exception("Some Planet terrain is missing");
        if (!element.image_url) throw new Exception("Some Planet image_url is missing");

        const newCharacter = planetRepo.create(element);
        arrayPlanets.push(newCharacter);
    });

    arrayPlanets.forEach(element => {
        planetRepo.save(element);
    });
    return res.json(arrayPlanets);
}

export const getPlanets = async (req: Request, res: Response): Promise<Response> => {
    const planets = await getRepository(Planets).find();
    return res.json(planets);
}

export const getPlanet = async (req: Request, res: Response): Promise<Response> => {
    const planet = await getRepository(Planets).findOne({ where: { id: req.params.id } });
    return res.json(planet);
}

export const createToken = async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.email) throw new Exception('Please specify an email', 400);
    if(!req.body.password) throw new Exception('Please specify the password', 400);

    const userRepo = getRepository(User);

    const user = await userRepo.findOne({where:{email: req.body.email, password: req.body.password}});

    if(!user) throw new Exception('Invalid email or password', 400);

    const token = jwt.sign({user}, process.env.JWT_KEY as string, {expiresIn: 60 * 5});

    return res.json({user, token});
}

export const addFavoriteCharacter = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne({relations:["Characters"], where:{id: req.params.userid}});
    const character = await getRepository(Characters).findOne({where: {id: req.params.characterid}})

    let result:any = {error: "user or character is undefined"};
    if(user && character){
        user.Characters = [...user.Characters, character];
        await getRepository(User).save(user);
        result = user;
    }
    
    return res.json(result);
}

export const addFavoritePlanet = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne({relations:["Planets"], where:{id: req.params.userid}});
    const planet = await getRepository(Planets).findOne({where: {id: req.params.planetid}})

    let result:any = {error: "user or planet is undefined"};
    if(user && planet){
        
        user.Planets = [...user.Planets, planet];
        await getRepository(User).save(user);
        result = user;
    }
    
    return res.json(result);
}

export const deleteFavoriteCharacter = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne({relations:["Characters"], where:{id: req.params.userid}});
    const characterToDelete = await getRepository(Characters).findOne({where: {id: req.params.characterid}})

    let result:any = { error: "user or character doesn't exist"};
    
    if( user && characterToDelete){
        user.Characters = user.Characters.filter( character => {
            return character.id !== characterToDelete.id;
        })
        result = await getRepository(User).save(user);
    }

    return res.json(result)
}

export const deleteFavoritePlanet = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne({relations:["Planets"], where:{id: req.params.userid}});
    const planetToDelete = await getRepository(Planets).findOne({where: {id: req.params.planetid}})

    let result:any = { error: "user or character doesn't exist"};
    
    if( user && planetToDelete){
        user.Planets = user.Planets.filter( character => {
            return character.id !== planetToDelete.id;
        })
        result = await getRepository(User).save(user);
    }

    return res.json(result);
}

export const updatePeople = async (req: Request, res: Response): Promise<Response> => {
    let character = await getRepository(Characters).findOne({where:{id:req.params.id}});
    if (!character) throw new Exception("character not found");
    if(!req.body) throw new Exception("Body is empty");

    character.name = req.body.name;
    character.birth_year = req.body.birth_year;
    character.gender = req.body.gender;
    character.height = req.body.height;
    character.skin_color = req.body.skin_color;
    character.eye_color = req.body.eye_color;
    character.image_url = req.body.image_url;
    
    await getRepository(Characters).save(character);
    
    return res.json(character);
}

export const deletePeople = async (req: Request, res: Response): Promise<Response> => {
    const characters = await getRepository(Characters).find();
    characters.forEach(character => {
        getRepository(Characters).remove(character);
    });
    return res.json(characters);
}

export const updatePlanet = async (req: Request, res: Response): Promise<Response> => {
    let planet = await getRepository(Planets).findOne({where:{id:req.params.id}});
    if (!planet) throw new Exception("planet not found");
    if(!req.body) throw new Exception("Body is empty");

    planet.name = req.body.name;
    planet.climate = req.body.climate;
    planet.diameter = req.body.diameter;
    planet.gravity = req.body.gravity;
    planet.population = req.body.population;
    planet.terrain = req.body.terrain;
    planet.image_url = req.body.image_url;
    
    await getRepository(Planets).save(planet);
    
    return res.json(planet);
}

export const deletePlanet = async (req: Request, res: Response): Promise<Response> => {
    const planets = await getRepository(Planets).find();
    planets.forEach(planet => {
        getRepository(Planets).remove(planet);
    });
    return res.json(planets);
}