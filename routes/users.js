//ruta /api/users
const { Router } = require("express");
const { check } = require("express-validator");
const { getAllUsers, updateUser, deleteUser } = require("../controllers/users");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  validarJWT,
  varlidarADMIN_ROLE,
  varlidarADMIN_ROLE_o_MismoUsuario
} = require("../middlewares/validar-jwt");

const router = Router();

// get all Users
router.get("/", [validarJWT, varlidarADMIN_ROLE], getAllUsers);

//update user
router.put( '/:id',
    [
        validarJWT,
        varlidarADMIN_ROLE_o_MismoUsuario,
        // check('name', 'El nombre es obligatorio').not().isEmpty(),
        // check('email', 'El email es obligatorio').isEmail(),
        // check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    updateUser
);

//delete user
router.delete( '/:id',
    [ validarJWT, varlidarADMIN_ROLE ],
    deleteUser
);

module.exports = router;
