

//Funcion Registro 
//Funcion mostrar formulario de registro de nuevo socio
function ActivarRegistro()
{
    $("#divRegistro").show();
    $("#divMensaje").html("");
    $("#divRespRegistro").html("");
}
//Validar contraseña en registro
function ValidarContrRegistro()
{
    var contraseña = $("#txtPassRegistro").val();

    if (ValidarContraseña(contraseña) === 1)
    {
        $("#divRespRegistro").html("Ingresar al menos al menos una letra.");
    } else if (ValidarContraseña(contraseña) === 2)
    {
        $("#divRespRegistro").html("Ingresar al menos al menos un numero.");
    } else
    {
        $("#divRespRegistro").html("");
    }
}
//Funcion para mostrar si el correo ya existe y mostrar mensaje en tiempo actual
function ExisteSocio()
{
    var mail = $("#txtMailRegistro").val();
    mail = mail.toLowerCase();
    if (devolverUsuario(mail) !== null)
    {
        $("#divRespRegistro").html("El mail ya existe.");
    } else
    {
        $("#divRespRegistro").html("");
    }
}
//Registrar nuevo socio
function RegistrarUsuario()
{
    $("#divRespRegistro").html("");
    var nombre = $("#txtNombreRegistro").val();
    var mail = $("#txtMailRegistro").val();
    var contraseña = $("#txtPassRegistro").val();
    mail = mail.toLowerCase();
    BorrarTxt();
    
    if (nombre === "" || mail === "" || contraseña === "")
    {
        $("#divRespRegistro").html("Hay campos vacios.");
    } 
    else
    {
        if (devolverUsuario(mail) === null)
        {
            if (ValidarContraseña(contraseña) === 3)
            {
                var socio = new Socio(nombre, contraseña, mail, "", true);
                listSocios.push(socio);
                BorrarTxt();
                MostrarMensaje("El socio se registro correctamente");
            } else
            {
                $("#divRespRegistro").html("La contraseña debe tener al menos un numero y una letra.");
            }

        } else
        {
            $("#divRespRegistro").html("El usuario ya existe.");
        }
        BorrarTxt();
    }
}
//Funciones cambiar contraseña
//
//Funcion para cambiar contraseña
function cambioPsw()
{
    MostrarUnicamente($("#divCambiarPsw"));
    $("#divMensaje").html("");
    $("#chPass").change(function () {
        if ($(this).is(":checked")) {
            $("#txtPswActual").attr("type", "text");
        } else {
            $("#txtPswActual").attr("type", "password");
        }
    });
    $("#chNuevoPass").change(function () {
        if ($(this).is(":checked")) {
            $("#txtPswNuevo").attr("type", "text");
        } else {
            $("#txtPswNuevo").attr("type", "password");
        }
    });
    $("#chRepPass").change(function () {
        if ($(this).is(":checked")) {
            $("#txtPswRep").attr("type", "text");
        } else {
            $("#txtPswRep").attr("type", "password");
        }
    });
    $("#btPassChange").click(function () {        
        if (($("#txtPswActual").val() === usuarioActivo.pass) && $("#txtPswNuevo").val() === $("#txtPswRep").val()) 
        {
            if(ValidarContraseña($("#txtPswNuevo").val())===3)
            {
                usuarioActivo.pass = $("#txtPswNuevo").val();
                MostrarMensaje("La contraseña se cambio correctamente.");
            }
            else
            {
                MostrarMensaje("La contraseña no es valida, debe conetener numero y letra.");
            }
        } else
        {
            MostrarMensaje("Los datos ingresados no son correctos.");
        }
        BorrarTxt();
    });
}
//Verificar que la contraseña nueva y su verificacion sean iguales
function validarDobleCon()
{
    if ($("#txtPswNuevo").val() !== $("#txtPswRep").val())
    {
        MostrarMensaje("Las contraseña y verificacion deben ser iguales.");
    } else
    {
        MostrarMensaje("");
    }
}


//Funciones Ingresar equipo nuevo
//
//Funcion mostrar formulario para ingresar equipo nuevo
function MenuIngresarEquipo()
{
    if (usuarioActivo.equipo !== "")
    {
        Limpiar();
        MostrarMensaje("Ya perteneces al equipo " + usuarioActivo.equipo + ", no puedes ingresar uno nuevo.");
    } else
    {
        MostrarUnicamente("#divIngresarEquip");
    }

}
//Funcion para ingresar un equipo nuevo
function IngresarEquipo()
{
    var nombre = $("#txtNombreEquipo").val();

    if (nombre !== "")
    {

        var num = parseInt(devolverIndice(listEquipo, "nombre", nombre));

        var logo = $("#fiLogo").val();

        if (logo === "")
        {
            MostrarMensaje("Debe seleccionar un logo.");
        } else
        {
            var nombrelogo = logo.split("\\").pop();
            var nombreArchivo = nombrelogo;

            if (num === -1) //si devolver indice devuelve -1 quiere decir que el nombre de equipo no existe 
            {
                var equipo = new Equipo(nombre, nombreArchivo);
                listEquipo.push(equipo);
                usuarioActivo.equipo = equipo.nombre;
                MostrarMensaje("El equipo se ingreso correctamente.");
                BorrarTxt();
            } else
            {
                MostrarMensaje("El nombre ya esta en uso.");
            }
        }
    } else
    {
        MostrarMensaje("Debe ingresar un nom.");
    }

}

//Funciones inscribirse a un equipo 
//
//Funcion mostrar formulario para inscribirse a un equipo
function MostrarInscripcion()
{
    $("#btnSalirEquipo").hide();
    $("#divMenEquipo").html("");
    $("#btnAsignarEquip").attr('value', 'Entrar en equipo');
    MostrarUnicamente("#divCambiarEquipo");
    if (usuarioActivo.equipo !== "")
    {
        $("#btnAsignarEquip").attr('value', 'Cambiar de equipo');
        $("#btnSalirEquipo").show();
        $("#divMenEquipo").html("Ud ya pertence al equipo " + usuarioActivo.equipo + ", si quiere salir, presione el boton salir.");
    }

    var equipos = EquiposDisponibles();
    var select = "";
    if (equipos[0] !== undefined)
    {
        select = CrearCombo(equipos, "nombre", "nombre");
    } else
    {
        select = "<option value=" + -1 + ">No hay Equipos Disponibles</option>";
    }


    $("#selEquipoDisp").html(select);
}
//Funcion para incribir un socio a un equipo
function InscripcionEquipo()
{

    if ($("#selEquipoDisp").val() !== "-1")
    {
        if (usuarioActivo.equipo === "")
        {
            var opcion = confirm("Esta seguro que desea ingresar al equipo " + $("#selEquipoDisp").val() + " ?");
            if (opcion)
            {
                MostrarMensaje("Ha ingresado al equipo correctamente, su equipo actual es: " + usuarioActivo.equipo);
            }
        } else
        {
            var opcion = confirm("Esta seguro que desea cambairse al equipo " + $("#selEquipoDisp").val() + "?");
            if (opcion)
            {
                MostrarMensaje("Ha cambiado de equipo, su equipo actual es: " + usuarioActivo.equipo);
            }
        }

        usuarioActivo.equipo = $("#selEquipoDisp").val();
        MostrarInscripcion();

    } else
    {
        MostrarMensaje("No hay equipo disponible.");
    }
}
//Funcion para salir de un equipo
function SalirDeEquipo()
{
    var opcion = confirm("Esta seguro que desea salir del equipo " + usuarioActivo.equipo + " ?");
    if (opcion)
    {
        usuarioActivo.equipo = "";
        MostrarInscripcion();
        MostrarMensaje("Se salio del equipo correctamente.");
    }
}


//Funciones para inscribir un equipo en una competencia
//
//Funcion mostrar formulario de inscripcion de equipo en comptenecia
function MostrarEquipComp()
{
    if (usuarioActivo.equipo !== "")
    {
        var sociosEnEquipo = filtrarLista(listSocios, "equipo", usuarioActivo.equipo, false);

        if (sociosEnEquipo.length === 3)
        {
            MostrarUnicamente("#divEquipoComp");
            $("#divEquipoUsu").html("El equipo al que pertenece es: " + usuarioActivo.equipo);

            if (competenciaDisponibles(usuarioActivo.equipo).length === 0)
            {
                Limpiar();
                MostrarMensaje("No hay competencias disponibles");
            } else
            {
                //var select = CrearCombo(competenciaDisponibles(usuarioActivo.equipo), "nombre", "nombre");
                var select = CrearCombo(competenciaDisponibles(usuarioActivo.equipo), "competencia", "competencia");
                $("#selCompEquipo").html(select);
            }

        } else
        {
            Limpiar();
            MostrarMensaje("El equipo al que pertenece aun no cuenta con 3 participantes para competir");
        }
    } else
    {
        Limpiar();
        MostrarMensaje("No pertenece a ningun equipo");
    }

}
//Funcion incribir equipo en competencia
function InscripcionEquipComp()
{
    var competencia = $("#selCompEquipo").val();

    var desa = false;
    var socios = filtrarLista(listSocios, "equipo", usuarioActivo.equipo);
    var sociosDesa = [];

    for (var i = 0; i < socios.length; i++)
    {
        if (socios[i].estado === false) {
            desa = true;
            sociosDesa.push(socios[i]);
        }
    }

    if (!desa)
    {
        for (var i = 0; i < socios.length; i++)
        {
            var unaInscripcion = new Inscripcion(competencia, usuarioActivo.equipo, 0, socios[i].mail);
            listInscripciones.push(unaInscripcion);
        }

        MostrarEquipComp();
        MostrarMensaje("El equipo " + usuarioActivo.equipo + " quedo inscripto en la competencia " + competencia);

    } else
    {
        var html = "El equipo no se puede inscribir en competencias porque \ntiene los siguientes miembros inhabilitados: ";
        for (var i = 0; i < sociosDesa.length; i++)
        {
            html += "\n" + sociosDesa[i].mail;
        }
        alert(html);
    }
}

//Funcion mostrar reporte de metros del socio
function mostrarReporteSocio()
{
    var listCompSoc = filtrarLista(listInscripciones, "socio", usuarioActivo.mail);
    var retorno = [];

    for (var h = 0; h < listCompSoc.length; h++)
    {
        for (var j = 0; j < listCompetencias.length; j++)
        {
            if (listCompSoc[h].competencia === listCompetencias[j].nombre && listCompSoc[h].metros !== 0) {
                retorno.push(listCompSoc[h]);
            }
        }
    }

    if (retorno.length !== 0)
    {
        $("#divTablaSocio").html(armarTabla(retorno, [3, 4]));
        MostrarUnicamente("#divRepSocios");
    } else
    {
        Limpiar();
        MostrarMensaje("No hay datos ingresados en competencias");
    }

}