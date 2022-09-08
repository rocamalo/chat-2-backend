const { response } = require('express');
const Group = require('../models/Group');


const getAllGroups = async(req, res = response ) => {

    const groups = await Group.find();

    return res.json({
        ok: true,
        groups: groups
    });

}

const addGroup = async(req, res = response) => {

    const { name, status } = req.body; 

    try {
        // Verificar el name si ya existe
        const group = await Group.findOne({ name });

        if ( group ) {
            return res.status(400).json({
                ok: false,
                msg: 'Name already taken'
            });
        }

        // Crear group con el modelo
        const dbGroup = new Group( req.body );
        // Crear Group de DB
        await dbGroup.save();
        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            msg: 'Group created succesfully',
            group: dbGroup
            
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const updateGroup = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const groupDB = await Group.findById( uid );

        if ( !groupDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No such group with id provided'
            });
        }

        // Actualizaciones
       
        const campos = req.body;

        //aqui metemos los campos que no queremos actualizar
       // delete campos.role;

        if ( groupDB.name !== campos.name ) { //condition to don't check the same name coming from request 

            const nameTaken = await Group.findOne({name: campos.name});
            if ( nameTaken ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Name already taken'
                });
            }
        }

        const groupUpdated = await Group.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            group: groupUpdated,
            msg: 'Succesfully updated the group'
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error at updating the group'
        })
    }

}


const deleteGroup = async(req, res = response ) => {

    const uid = req.params.id;

    try {

        const groupDB = await Group.findById( uid );

        if ( !groupDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No such group with id provided'
            });
        }

        await Group.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Group deleted'
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
    getAllGroups,
    updateGroup,
    deleteGroup,
    addGroup
}