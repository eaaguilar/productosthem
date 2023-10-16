//Importamos el modelo de datos
import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import {createAccessToken} from '../libs/jwt.js'

//Función para registrar usuarios
export const register = async (req, res)=>{
    const {username, email, password} = req.body;
    //console.log(name, email, password);

    try {

        //Validamos que el email no esté registrado en la base de datos
        const userFound = await User.findOne({email});
        if (userFound) //Si encontró un usuario que ya tenga ese email
            return res.status(400) //Retorna un mensaje de error.
                      .json({ message: ["El email ya esta en uso"]})

        const passwordHash = await bcryptjs.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: passwordHash
        });
    
        const userSaved = await newUser.save()
        //console.log(userSaved);
        const token = await createAccessToken({id: userSaved._id})
        res.cookie('token', token)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
    } catch (error) {
        console.log(error);
    }
}

//Función para iniciar sesión
export const login = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const userFound = await User.findOne({email});
        if (!userFound){
            return res.status(400).json({message: ['Usuario no encontrado']})
        }
        //Comparamos el password que envió el usuario con el de la base de datos
        const isMatch = await bcryptjs.compare(password, userFound.password);
        if (!isMatch){
            return res.status(400).json({message: ['Password no coincide']})
        }
        const token = await createAccessToken({id: userFound._id})
        res.cookie('token', token)
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        console.log(error);
    }
}

export const logout = (req, res) =>{
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
}

export const profile = async (req, res)=>{
    const userFound =  await User.findById(req.user.id);

    if (!userFound)
        return res.status(400).json({message: ["User not found"]});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    })
}//Fin de profile
     