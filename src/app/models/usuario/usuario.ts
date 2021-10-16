export class Usuario {
    // EL USUARIO NO DEBERÍA TENER QUE TENER ESTE ERROR, PERO NO LE ENCONTRÉ ALTERNATIVA.
    constructor(
        public nombre? : string,
        public apellido? : string,
        public edad? : number,
        public dni? : number,
        public obraSocial? : string,
        public email? : string,
        public contrasenia? : string,
        public imagenUnoUrl? : string,
        public imagenDosUrl? : string
    ) {}
}