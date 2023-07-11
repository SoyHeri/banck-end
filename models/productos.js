import mongoose,{Schema} from "mongoose";

const productos=new Schema({
    nombre:String,
    categoria:String,
    talla:String,
    precio:Number,
    cantidad:Number,
    descripcion:String,
    filename:String,
    path:String,
    createArt:{type:Date, default:Date.now}
});

const Producto=mongoose.model('productos',productos);
export default Producto;
