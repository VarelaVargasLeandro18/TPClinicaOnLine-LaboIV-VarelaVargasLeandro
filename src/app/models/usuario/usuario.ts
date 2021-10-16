export class Usuario {

    // EL USUARIO NO DEBERÍA TENER QUE TENER ESTE ERROR, PERO NO LE ENCONTRÉ ALTERNATIVA.
    constructor(
        public email? : string,
        public contrasenia? : string,
        public nombre? : string,
        public apellido? : string
    ) {}

}