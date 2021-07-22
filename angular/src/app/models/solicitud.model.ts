export class solicitud{
    constructor(
        public _id: String,
        public trabajo: String,
        public descripcion: String,
        public fechaInicio: Date,
        public trabajador: String,
        public contratante: String,
    ){}
}