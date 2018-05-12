export class Usuario {

    // Para no crear atributos y luego pasarlos al contructor en typeScrip podemos hacer
    // la inyeccion directa en el contructor, el orden SI importa, porq si hacemos img opcional (img?)
    // las q siguen TIENEN q ser opcional o ponerle un valor por defecto.

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ){}

}