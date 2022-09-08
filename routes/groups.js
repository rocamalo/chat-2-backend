//ruta /api/users
const { Router } = require("express");
const { check } = require("express-validator");
const { addGroup, getAllGroups, updateGroup, deleteGroup } = require("../controllers/groups");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  validarJWT,
  varlidarADMIN_ROLE,
  varlidarADMIN_ROLE_o_MismoUsuario
} = require("../middlewares/validar-jwt");

const router = Router();

// get all Users
router.get("/", [validarJWT, varlidarADMIN_ROLE], getAllGroups);


// Create a new group
router.post( '/new', [
    check('name', 'Name is mandatory').not().isEmpty(),
    validarJWT,
    validarCampos,
    varlidarADMIN_ROLE,
], addGroup );

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
    updateGroup
);

//delete user
router.delete( '/:id',
    [ validarJWT, varlidarADMIN_ROLE ],
    deleteGroup
);

module.exports = router;
