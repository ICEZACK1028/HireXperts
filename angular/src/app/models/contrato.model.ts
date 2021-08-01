export class contrato{
    constructor(
        public _id: String,
        public titulo: String,
        public fechaInicio: Date,
        public descripcion: String,
        public trabajador: String,
        public contratante: String,
        public descripcionR: String,
        public status: String,
        public fechaFinal: Date,
        public precio: Number,
    ){}
}