import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../model/User';
import Locations from '../model/Location';
import Keys from '../../config/keys';
import validateSignUpInput from '../utill/validators/singup';
import validateLoginInput from '../utill/validators/login';
import validateLocationInput from '../utill/validators/location';

dotenv.config();

export default class PopulationManager {
  /**
   * @description sign up user
   * @param {object}req
   * @param {object}res
   * @return {void}
   */
  static signUp(req, res) {
    const { errors, isValid } = validateSignUpInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.status(400).json({ email: 'Email already exist' });
      }
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.status(200).json({
              userId: user._id,
              userName: user.name,
              email: user.email,
              status: 'success',
            }))
            .catch(err => res.status(500).json({ err }));
        });
      });
    });
  }

  /**
   * Routes: POST: /api/v1/login
   * @description Login to the application
   * @param {object} req
   * @param {object} res
   * @returns {void}
   */
  static login(req, res) {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ msg: 'email or password is Incorrect' });
        }
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            return res
              .status(400)
              .json({ status: 'fail', msg: 'email or password is Incorrect' });
          }
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
          jwt.sign(
            payload,
            Keys.secretorkey,
            { expiresIn: 3600 },
            (err, token) => {
              res.status(200).json({
                token,
                status: 'success',
              });
            },
          );
        });
      })
      .catch(err => res.status(500).json({ err }));
  }

  /**
   * Routes: POST: /api/v1/createlocations
   * @description create location
   * @param {object} req
   * @param {object} res
   * @returns {void}
   */
  static createLocations(req, res) {
    const { errors, isValid } = validateLocationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const locations = (req.body.location).trim().toLowerCase();
    Locations.findOne({ location: locations })
      .then((location) => {
        if (location) {
          return res.status(409).json({
            status: 'fail',
            msg: 'Location already exist',
          });
        }
        const male = (req.body.sex === 'male') ? 'male' : '';
        const female = (req.body.sex === 'female') ? 'female' : '';
        const newLocation = new Locations({
          location: locations,
          sex: {
            male,
            female,
          },
          creator: {
            id: req.decoded.id,
            name: req.decoded.name,
          },
        });
        newLocation.save().then((createdLocation) => {
          if (!createdLocation) {
            return res.status(500).json({
              status: 'fail',
              error: 'Internal server error',
            });
          }
          return res.status(201).json({
            status: 'success',
            msg: 'location created successfully',
            createdLocation,
          });
        }).catch(() => res.status(500).json({ msg: 'oops something went wrong', status: 'fail' }));
      }).catch(() => res.status(500).json({ error: 'ops something went wrong', status: 'fail' }));
  }

  /**
   * Routes: PUT: /api/v1/locations/:id
   * @description This allow editing of location
   * @param {any} res
   * @param {any} res
   * @return {void}
   */
  static editLocations(req, res) {
    const { errors, isValid } = validateLocationInput(req.body);
    const locations = (req.body.location).trim().toLowerCase();
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const male = (req.body.sex === 'male') ? 'male' : '';
    const female = (req.body.sex === 'female') ? 'female' : '';
    Locations.findOneAndUpdate({ _id: req.params.id },
      {
        $set: { location: locations },
        sex: {
          male,
          female,
        },
      }, { upsert: true }).then(updatedLocation => res.status(200).json({
      status: 'success',
      message: 'Location updated successfully',
      updatedLocation: {
        location: updatedLocation.location,
        sex: {
          male: updatedLocation.sex.male,
          female: updatedLocation.sex.female,
        },
      },
    })).catch(() => res.status(500).json({ msg: 'oops something went wrong', status: 'fail' }));
  }

  /**
   * Routes: GET: /api/v1/locations
   * @description This fetch all location
   * @param {any} req
   * @param {any} res
   * @return {void}
   */
  static getLocation(req, res) {
    if (req.query.id) {
      Locations.findOne({ _id: req.query.id.trim() }).then(location => res.status(200).json({
        response: {
          _id: location._id,
          name: location.location,
          status: 'success',
        },
      })).catch(() => res.status(404).json({ msg: 'Invalid message location', status: 'fail' }));
    }
    Locations.estimatedDocumentCount({}, (err, isCount) => {
      const count = isCount;
      Locations.find({})
        .then(locations => res.status(200).json({
          locations,
          count,
        })).catch(() => res.status(500).json({ msg: 'oops something went wrong' }));
    });
  }

  /**
  * Routes: DELETE: /api/v1/location/:id
  * @param {any} req
  * @param {any} res
  * @return {void}
  */
  static deleteLocations(req, res) {
    Locations.findById({ _id: req.params.id }).then((location) => {
      if (location) {
        Locations.deleteOne({
          _id: req.params.id,
        }).then(() => res.status(202).json({
          status: 'success',
          msg: 'Location deleted successfully',
        })).catch(err => res.status(500).json({
          status: 'fail',
          msg: err.message,
        }));
      }
    }).catch(() => res.status(401).json({ msg: 'Unathorized, invalid location identity', status: 'fail' }));
  }
}
