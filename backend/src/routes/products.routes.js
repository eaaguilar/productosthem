import {Router} from 'express';
import { authRequired } from '../middlewares/validateToken.js'
import {
    getProducts,
    createProduct,
    getProduct,
    deleteProduct,
    editProduct
} from '../controllers/products.contoller.js'

//Importamos el validatorSchema
import {validateSchema} from '../middlewares/validator.middleware.js'
//Importamos los esquemas de validación
import { productSchema} from '../schemas/product.schemas.js';

const router = Router();

//Obtener todos los productos
router.get ('/productos', authRequired, getProducts );

//Agregar un producto
router.post('/productos', authRequired, validateSchema(productSchema), createProduct);

//Obtener un producto por id
router.get ('/productos/:id', authRequired, getProduct);

//Eliminar un producto
router.delete('/productos/:id', authRequired, deleteProduct);

//Actualizar un producto
router.put('/productos/:id', authRequired, editProduct);

export default router;