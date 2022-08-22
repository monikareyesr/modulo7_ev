const express = require('express');
const app = express()
const port = 3000
const { getForm, crearUsuario, mostrarUsuario, editarUsuario, eliminarUsuario, crearTransferencia, historialTransferencias, formatDate } = require('./function.js')
//pagina principal
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) //rutas

app.post('/usuario', async (req, res) => {
    const datos = await getForm(req);
    const nombre = datos.nombre;
    const balance = datos.balance;
    if (isNaN(balance) || !balance) {
        res.status = 400
        return res.redirect(res.status = 400)
    }
    await crearUsuario(nombre.trim(), balance)
    res.end()
});

app.get('/usuarios', async (req, res) => {
    const usuarios = await mostrarUsuario()
    res.json(usuarios);
});

//actualizar
app.put('/usuario', async (req, res) => {
    const id = req.query.id;
    const datos = await getForm(req)
    const nombre = datos.name;
    const balance = datos.balance;
    const resp = await editarUsuario(nombre, balance, id)
    res.json(resp)
    // res.end()
});
//recibe por id el usuario a eliminar
app.delete('/usuario', async (req, res) => {
    const id = req.query.id;
    await eliminarUsuario(id)
    //res.end()
    res.json({})
   
});


app.post('/transferencia', async (req, res) => {
    const datos = await getForm(req)
    console.log(datos)
    const emisor = datos.emisor;
    const receptor = datos.receptor;
    const monto = datos.monto;
    var date = new Date();

    await crearTransferencia(emisor, receptor, monto, formatDate(date))
    res.json({})
})

app.get('/transferencias', async (req, res) => {
    let datos = await historialTransferencias()
    res.json(datos)
})

app.get('/*', (req, res) => {
    res.send('pagina No implementada')
})
app.listen(3000, () => {
    console.log(`Servidor en puerto 3000`);
});
