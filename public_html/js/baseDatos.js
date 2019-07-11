
//Listas globales
var listAdmins = [];
var listSocios = [];
var listCompetencias = [];
var listEquipo = [];
var listInscripciones = [];

//Variables globales que usamos auxiliares

var tipoUsuario = 0;   // si es admin es 1 si es socio es 2
var usuarioActivo = null;
var mostrarMensaje = 0;

//Ingresos iniciales de administradores, socios, equipos, competiciones e inscripciones

listAdmins.push(new Admin("admin1", "clave1", "admin1@natacion.com"));
listAdmins.push(new Admin("admin2", "clave1", "admin2@natacion.com"));

listSocios.push(new Socio("Maria Flores", "clave1", "maria@gmail.com", "", true));
listSocios.push(new Socio("Juan Casas", "clave1", "juan@gmail.com", "", true));
listSocios.push(new Socio("Analía Perez", "123a", "analia@hotmail.com", "", true));
listSocios.push(new Socio("Belén Martínez", "clave1", "belen@gmail.com", "", true));

listCompetencias.push(new Competencia("Copa Libertadores"));
listCompetencias.push(new Competencia("Copa Sudamericana"));

listEquipo.push(new Equipo("Peñarol", "1.PNG"));
listEquipo.push(new Equipo("Nacional", "2.PNG"));
listEquipo.push(new Equipo("Cerro", "3.PNG"));


// Funciones de cada uno de los objetos 

function Socio(pNombre, pPass, pMail, pEquipo, pEstado) {
    this.nombre = pNombre;
    this.pass = pPass;
    this.mail = pMail;
    this.equipo = pEquipo;
    this.estado = pEstado;
}

function Admin(pNombre, pPass, pMail) {
    this.nombre = pNombre;
    this.pass = pPass;
    this.mail = pMail;    
}

function Competencia(pNombre)
{
    this.nombre = pNombre;
}

function Equipo(pNombre, pLogo)
{
    this.nombre = pNombre;
    this.logo = pLogo;
}

function Inscripcion(pCompetencia, pEquipo, pMetros, pSocio, pNombre)
{
    this.competencia = pCompetencia;
    this.equipo = pEquipo;
    this.metros = pMetros;
    this.socio = pSocio;
    this.nombre = pNombre;
}

