import { DocumentSnapshot } from "@angular/fire/compat/firestore";
import { Usuario } from "../usuario/usuario";

export class Logger {

    constructor(
        public eventLog : string,
        public hora : Date,
        public usuario : any
    ){}

}
