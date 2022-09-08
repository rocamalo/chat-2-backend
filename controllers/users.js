const { response } = require('express');
const Usuario = require('../models/Usuario');


const getAllUsers = async(req, res = response ) => {

    const users = await Usuario.find();

    return res.json({
        ok: true,
        users: users
    });

}

const updateUser = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;


    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
       
        const campos = req.body;

        //aqui metemos los campos que no queremos actualizar
       // delete campos.role;

        if ( usuarioDB.email !== campos.email ) {

            const existeEmail = await Usuario.findOne({email: campos.email});
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        
        // if ( !usuarioDB.google ){
        //     campos.email = email;
        // } else if ( usuarioDB.email !== email ) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'Usuario de google no pueden cambiar su correo'
        //     });
        // }

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado,
            msg: 'Succesfully updated the user'
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const deleteUser = async(req, res = response ) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}


module.exports = {
    getAllUsers,
    updateUser,
    deleteUser
}