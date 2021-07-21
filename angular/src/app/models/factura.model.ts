export class factura{
    constructor(
        public _id: String,
        public trabajo: String,
        public fechaInicio: Date,
        public descripcion: String,
        public trabajador: String,
        public contratante: String,
        public precio: Number,
        public fechaFinal: Date,
    ){}
}