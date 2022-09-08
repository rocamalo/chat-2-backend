const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');


const validarJWT = ( req, res = response, next ) => {

    const token = req.header('x-token');

    if( !token  ) {
        return res.status(401).json({
            ok: false,
            msg: 'Error on token'
        });
    }

    try {

        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED );
        req.uid  = uid;
        req.name = name;

        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Not valid Token'
        });
    }



    // TODO OK!
    next();
}


const varlidarADMIN_ROLE = async(req, res, next)  => {

    const uid = req.uid;
    
    try {
        
        const usuarioDB = await Usuario.findById(uid);

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'User does not exist'
            });
        }

        if ( usuarioDB.role !== 'admin' ) {
            return res.status(403).json({
                ok: false,
                msg: 'Unsuficient priviliges'
            });
        }

        next();


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to the administrador, error on method validate role'
        })
    }

}

const varlidarADMIN_ROLE_o_MismoUsuario = async(req, res, next)  => {

    const uid = req.uid;
    const id  = req.params.id;
    
    try {
        
        const usuarioDB = await Usuario.findById(uid);

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if ( usuarioDB.role === 'admin' || uid === id ) {
        
            next();
            
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'Unsuficient priviliges'
            });
        }

        


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to the server admin'
        })
    }

}


module.exports = {
    validarJWT,
    varlidarADMIN_ROLE,
    varlidarADMIN_ROLE_o_MismoUsuario
}

