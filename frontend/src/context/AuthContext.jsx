import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest} from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context){
        throw new Error('useAuth debe estar definido en un contexto');
    }
    return context;
};

export const AuthProvider = ({ children}) =>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    const signup = async ( user )=>{
        try{
            const res = await registerRequest(user);
            //console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        }catch(error){            
            console.log(error.response.data.message);
            //Si existe un error al registrar el usuario
            //Guardamos el error en la variable error.
            setErrors(error.response.data.message);
        }    
    }//Fin de signup

    const signin = async ( user ) =>{
        try {
            const res = await loginRequest(user);
            //console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error)
            setErrors(error.response.data.message);
        }
    }//Fin de signin

    useEffect( ()=>{
        if (errors.length > 0){
            const timer = setTimeout( ()=>{
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect( ()=>{
        const cookies = Cookies.get();
        if (cookies.token){
            console.log(cookies.token)
        }
    }, []);

    return (
        <AuthContext.Provider value={ {
            signup,
            signin,
            user,
            isAuthenticated,
            errors,
        } } >
            {children}
        </AuthContext.Provider>
    )
}