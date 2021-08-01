export class Usuario {
    constructor(
        public _id: String,
        public usuario: String,
        public password: String,
        public rol: String,
        public nombre: String,
        public apellido: String,
        public telefono: String,
        public correo: String,
        public nacimiento: String,
        public dpi: String,
        public direccion: String,
        public pais: String,
        public ciudad: String,
        public estrellas: Number,
        public imagen: String,
        public profesion:String,
        public descripcionP: String,
        public direccionP: String,
        public verificado: Boolean,
        public estrellasP: Number,
        public disponible: Boolean
    ){}
}
