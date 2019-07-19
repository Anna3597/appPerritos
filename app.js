const express = require('express');
const bodyParser = require('body-parser');
const moongose = require('mongoose');
const mongoURL='mongodb+srv://annalau:5h2ikMuxkjyCKWcp@cluster0-crkgf.mongodb.net/test?retryWrites=true&w=majority' ;
const {Perrito} = require('./models/perrito');
const cors = require('cors')


app.use(cors());

moongose.connect(mongoURL, {useNewUrlParser: true}, (err)=>{
    if(!err){
        console.log('todo cool en mongo')
    }
})

const PORT = process.env.PORT || 3000
const app= express();

app.use(bodyParser.urlencoded({extended:true}));  
app.use(bodyParser.json());

app.get('/',(request,respond)=>{
    respond.send('<h1> ejercicio </h1>');
});

app.post('/new/perrito',(req,res)=>{
    const params= req.body;
    
    let newPerrito = Perrito ({
        perritoName: params.perritoName,
        tamaño: params.tamaño,
        sexo: params.sexo,
        edad:params.edad,
        ingreso:params.ingreso
    });
   newPerrito.save((err, user) => {
        if(err) {
           return res.status(500).json({message: 'Ocurrio un error'});
        }
        else if(user){
            return res.status(201).json({data: params})

        }
    });
});

app.get('/perritos',(req, res)=>{
    Perrito.find().exec((err,perrito)=>{
        if(err){
            return res.status(404).json({message:'usuario no encontrado'});

        } else{
            return res.status(200).json({perrito});
        }
    })
});

    
// bcrypt hashea la informacion y ya hasheada la guarda


app.listen(PORT, ()=>{
    console.log(`Corriendo en puerto${PORT}`);
});


