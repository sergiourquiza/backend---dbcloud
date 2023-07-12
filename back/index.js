import  express  from "express";
import { sequelize } from "./database/database.js";
import {Producto} from "./models/Producto.js";
import cors from "cors";

const app = express()
const port = process.env.PORT || 3001   

app.use(cors())

async function conexionDB() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({force: true});
        console.log("Conexion exitosa");
    } catch (error) {
        console.log("Error en la conexion");
    }
}

app.get('/crear-producto/:codigo/:nombre/:precio/:cantidad', async (req, res) => {
    let codigo = req.params.codigo
    let nombre = req.params.nombre
    let precio = req.params.precio
    let cantidad = req.params.cantidad
    await Producto.create({
        codigo: codigo,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
    })
    res.send(`Producto creado satisfactoriamente`)
})


app.get('/listar-productos/:codigo', async (req, res) => {
    let code = req.params.codigo
    const producto = await Producto.findAll({
        where: {
            codigo: code
        }
    })
    res.json("El producto es" + JSON.stringify(producto))
})

app.get("/eliminar-producto/:codigo", async (req, res) => {
    let code = req.params.codigo
    await Producto.destroy({
        where: {
            codigo: code
        }
    })
    res.send(`Producto eliminado satisfactoriamente`)
});





app.get('/', (req, res) => {
    res.send('Server cumiado')
})

app.listen(port, () => {
    console.log(`Activado en el puerto: ${port}`)
    conexionDB()
})