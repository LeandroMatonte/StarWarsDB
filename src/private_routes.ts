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

const router = Router();

router.get('/users' , verifyToken, safe(actions.getUsers));
router.get('/user', verifyToken, safe(actions.getUser));
router.get('/favorites', verifyToken, safe(actions.getFavorites));

//Character
router.post('/people', verifyToken , safe(actions.createCharacter));
router.put('/people/:id', verifyToken, safe(actions.updatePeople));
router.delete('/people', verifyToken, safe(actions.deletePeople));
//Favorite routes
router.post('/favorite/people/:characterid', verifyToken, safe(actions.addFavoriteCharacter));
router.delete('/favorite/people/:characterid', verifyToken, safe(actions.deleteFavoriteCharacter));

//Planet
router.post('/planets', verifyToken , safe(actions.createPlanet));
router.put('/planets/:id', verifyToken, safe(actions.updatePlanet));
router.delete('/planets', verifyToken, safe(actions.deletePlanet));
//Favorite routes
router.post('/favorite/planet/:planetid', verifyToken, safe(actions.addFavoritePlanet));
router.delete('/favorite/planet/:planetid', verifyToken, safe(actions.deleteFavoritePlanet));

export default router;