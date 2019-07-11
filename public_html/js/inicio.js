
$().ready(Inicio);

function Inicio()
{
    MostrarMensaje("Bienvenido a la Federacion Uruguaya de Natación")
    //Menu Principal
    //
    //Home principal 
    $("#liHome").click(PaginaPrincipal);

    //Formulario login
    $("#login").click(ActivarLogin);
    
    //Boton Iniciar Sesion
    $("#btnIngresar").click(IniciarSesion);
    
    //Boton cerrar el popup login 
    $("#btnCerrarLogin").click(CerrarLogin);
    $("#btnCancel").click(CerrarLogin);
    //Boton aceptar en el mensaje de error en caso de inicio de sesion erroneo
    $("#btnAceptar").click(CerrarError);
    
    // Si se presiona el boton enter en el login cuando se esta posicionado en la contraseña tambien ejecuta la funcion.
    $("#id01").on('keypress', function (e) {
        if (e.which === 13 && !($("#btnIngresar").is(":focus")) && !($("#btnAceptar").is(":focus")))
        {
            IniciarSesion();
        }
    });

    //Formulario Registro
    $("#liRegistro").click(ActivarRegistro);
    //Boton registrarse
    $("#btnRegistrarse").click(RegistrarUsuario);
    //Mientras ingresa mail confirmar si ya existe
    $("#txtMailRegistro").keyup(ExisteSocio);
    //Mientras ingresa contraeña confirmar si cumple
    $("#txtPassRegistro").keyup(ValidarContrRegistro);


    //Menu Admin
    //Boton cerrar sesion admin
    $("#liCerrarSesionAdmin").click(CerrarSesion);
    
    //Boton Home admin
    $("#liHomeAdmin").click(Limpiar);
    
    //Formulario crear competencia
    $("#liCrearCompe").click(MostrarCrearComp);
    //Boton crear competencia
    $("#btnIngresarComp").click(CrearCompetencia);
    
    //Formulario cambiar estado de un socio
    $("#liCambiarEstado").click(MostrarCambiarEstado);
    //Al cambiar el socio en el select mostrar el estado del socio en el radio button
    $("#selSociosAd").change(EstaHabilitadoRadio);
    //Boton cambiar estado del socio
    $("#btnCambiarEstado").click(CambiarEstado);
    
    //Formulario Reporte Administraor
    $("#liReporteAdmin").click(MostrarReporteAdmin);
    //Al seleccionar equipo o cambiar la seleccion se cargan las tablas y los datos.
    $("#selEquiReporte").change(cambiarEquipoReporte);
    
    
    //Formulario ingresar datos en competencias
    $("#liComp").click(MostrarIniciarComp);
    //Al seleccionar una competencia mostramos los equipos inscriptos para ingresar datos
    $("#selComp").change(cargaEquiposComp);
    //Al seleccionar el equipo mostramos los socios
    $("#selEquipComp").change(cambiaEquipo);
    //Boton ingresar los datos en la competencia
    $("#btnCargarDatosMetros").click(ingresarMetros);    
    
    
    //Menu socio

    //Cerrar Sesion Socio
    $("#liCerrarSesionSocio").click(CerrarSesion);
    
    //Home Socio
    $("#liHomeSocio").click(Limpiar);
    
    //Formulario Cambiar contraseña 
    $("#liCambiarContraseña").click(cambioPsw);
    //Mostramos en pantalla mientras escribe las contraseñas
    $("#txtPswRep").keyup(validarDobleCon);
    $("#txtPswNuevo").keyup(validarDobleCon);
    
    //Forulario Ingresar Equipo
    $("#liIngresarEquipo").click(MenuIngresarEquipo);
    //Boton Ingresar un equipo
    $("#btnIngresarEquipo").click(IngresarEquipo);


    //Formulario Mostrar Inscripcion a un equipo
    $("#liInscriEquipos").click(MostrarInscripcion);
    //Boton inscribirse a un equipo
    $("#btnAsignarEquip").click(InscripcionEquipo);
    //Boton salir de un equipo
    $("#btnSalirEquipo").click(SalirDeEquipo);

    //Formulario de Inscripcion de un equipo en competencia
    $("#liInscriEquipComp").click(MostrarEquipComp);
    //Boton inscripcion del equipo en competencia
    $("#btnCompEquipo").click(InscripcionEquipComp);
    
    //Formulario Reportes Socio
    $("#liReporteSocio").click(mostrarReporteSocio);
    //Formulario Reporte historial competencias
    //$("#liHistorialComp").click(historialComp);
     //Formulario Reporte competencias activas
    //$("#liCompActivas").click(actividadComp);
}
