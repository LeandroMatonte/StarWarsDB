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

import { Router, Request, Response, NextFunction } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if(!token) return res.status(400).json('ACCESS DENIED');

    const decoded = jwt.verify(token as string, process.env.JWT_KEY as string);
    req.user = decoded;
    console.log(decoded);

    next();
}

// declare a new router to include all the endpoints
const router = Router();

router.get('/user' , verifyToken, safe(actions.getUsers));

router.post('/favorite/people/:userid/:characterid', verifyToken, safe(actions.addFavoriteCharacter));
router.delete('/favorite/people/:userid/:characterid', verifyToken, safe(actions.deleteFavoriteCharacter));
router.post('/people', verifyToken , safe(actions.createCharacter));

//Editar base de datos
router.put('/people/:id', verifyToken, safe(actions.updatePeople));
router.delete('/people', verifyToken, safe(actions.deletePeople));

router.post('/favorite/planet/:userid/:planetid', verifyToken, safe(actions.addFavoritePlanet));
router.delete('/favorite/planet/:userid/:planetid', verifyToken, safe(actions.deleteFavoritePlanet));
router.post('/planets', verifyToken , safe(actions.createPlanet));

//Editar base de datos
router.put('/planets/:id', verifyToken, safe(actions.updatePlanet));
router.delete('/planets', verifyToken, safe(actions.deletePlanet));


export default router;
