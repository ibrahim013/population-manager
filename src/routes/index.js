import express from 'express';

import PopulationManager from '../controller/index';
import verifyToken from '../middlewares/verifyToken';


const router = express.Router();
const {
  signUp,
  login,
  createLocations,
  editLocations,
  getLocation,
  deleteLocations,
  sensorData,
} = PopulationManager;

router.post('/soil-data', sensorData)
router.post('/signup', signUp);
router.post('/login', login);
router.post('/createlocation', verifyToken, createLocations);
router.put('/locations/:id', verifyToken, editLocations);
router.get('/locations', verifyToken, getLocation);
router.get('/locations/:id', verifyToken, getLocation);
router.delete('/locations/:id', verifyToken, deleteLocations);
export default router;
