import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import multer from "multer";
import {v4 as uuid} from "uuid";

//importacion de rutas 
import routes from "./routes"

//conexcion a la base de datos
mongoose.Promise=global.Promise;
const dbUrl='mongodb://127.0.0.1:27017/webstore';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("--------conectado al puerto 27017 a su servicio--------"))
  .then(() => console.log("_______________________________________________________"))
  .catch(err => console.log(err));
//inicia nuestra servidor de aplicaciones ApiRest
const app=express();

//definir el puerto del servidor 
app.set ('port', process.env.PORT || 4000);

//midlleware
app.use(cors());

//servidor en ejecucion 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//imagenes
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,'public/images')
  },
  filename:(req,file,cb)=>{
      cb(null,uuid()+path.extname(file.originalname))
  }
})
app.use(multer({storage:storage}).single('image'));

//rutas
app.use('/api',routes)

app.listen(app.get("port"), () => {
    console.log("Servidor ejecutándose en el puerto " + app.get("port"));
  });