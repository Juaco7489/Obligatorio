
// FUNCIONES ADMINISTRADOR

//Funcion crear competencia
//
//Funcion que muestra formulario para crear una competencia nueva
function MostrarCrearComp()
{
    MostrarUnicamente("#divCrearCompetencia");
}
//Funcion que carga la competencia nueva
function CrearCompetencia()
{
    var nombre = $("#txtNombreComp").val();
    nombre = ArreglarString(nombre);

    if (devolverObjeto(listCompetencias, "nombre", nombre) === null)
    {
        var competencia = new Competencia(nombre);
        listCompetencias.push(competencia);
        $("#divMensaje").html("La competencia se agrego correctamente");
    } else
    {
        $("#divMensaje").html("Ya existe competencia con este nombre");
    }

    BorrarTxt();
}

//Funciones Cambiar Estado de Socio
//
//Funcion Mostrar formulario para cambiar estado de socio
function MostrarCambiarEstado()
{
    MostrarUnicamente("#divCambEstSocio");
    $("#selSociosAd").html(CrearCombo(listSocios, "mail", "mail"));
    EstaHabilitadoRadio();
}
//Funcion para mostrar si el Socio esta habilitado
function EstaHabilitadoRadio()
{
    var socio = devolverUsuario($("#selSociosAd").val());
    if (socio.estado)
    {
        $("input[name=rdEstado][value=1]").prop('checked', true);
    } else
    {
        $("input[name=rdEstado][value=0]").prop('checked', true);
    }
}
//Funcion cambiar el estado
function CambiarEstado()
{
    var socioSelect = $("#selSociosAd").val();
    var socio = devolverIndice(listSocios, "mail", socioSelect);
    var estadoSele = $('input[name=rdEstado]:checked').val();
    if (estadoSele === "1")
    {
        listSocios[socio].estado = true;
    } else
    {
        listSocios[socio].estado = false;
    }

    MostrarMensaje("El estado del socio se cambio correctamente");
    $("#selSociosAd").html(CrearCombo(listSocios, "mail", "nombre"));
    EstaHabilitadoRadio();
}


//Funciones Iniciar una competencia e ingresar los metros de los socios
//
//Funcion mostrar formulario de inicio de comptencia
function MostrarIniciarComp()
{
    MostrarUnicamente("#divIniciarCompetencia");

    $("#divReporteFinalizado").hide();
    var listaCompActivas = competenciasActivas();

    if (listaCompActivas.length !== 0)
    {
        var compe = CrearCombo(listaCompActivas, "nombre", "nombre", "Seleccione una Competencia");

        $("#selComp").html(compe);

        cargaEquiposComp();
    } else
    {
        $("#selComp").html("<option value='-1'>No hay competencias activas</option>");
        $("#trEquipo").hide();
        $("#divEquiposEnComp").hide();
        $("#divLogoReporte").hide();
    }


}
//Funcion que carga los equipos disponibles en la competencia seleccionada
function cargaEquiposComp()
{
    var competencia = $("#selComp").val();
    $("#divReporteFinalizado").hide();
    if (competencia !== null)
    {
        $("#trEquipo").show();

        var equipos = equiposEnCompSinDatos(competencia);

        if (equipos.length === 0)
        {
            $("#selEquipComp").html("<option value='-1'>No hay equipos disponibles</option>");
        } else
        {
            var equip = CrearCombo(equipos, "equipo", "equipo", "Seleccione un equipo");
            $("#selEquipComp").html(equip);
        }

        cambiaEquipo();
    } else
    {
        $("#trEquipo").hide();
        $("#divEquiposEnComp").hide();
        $("#divLogoReporte").hide();
    }

}
//Funcion que carga el formulario para cargar metros a los socios del equipo seleccionado
function cambiaEquipo()
{
    $("#divMensaje").html("");

    var equipo = $("#selEquipComp").val();

    if (equipo !== "-1" && equipo !== null)
    {
        var socios = filtrarLista(listSocios, "equipo", equipo);

        for (var i = 0; i < socios.length; i++)
        {
            var nombreP = "#socio" + (i + 1);
            $(nombreP).html(socios[i].nombre);
        }

        $("#divEquiposEnComp").show();
    } else
    {
        $("#divEquiposEnComp").hide();
    }



}
//Funcion ingresar metros a la competencia
function ingresarMetros()
{
    var metrosSocio1 = $("#txtSocio1").val();
    var metrosSocio2 = $("#txtSocio2").val();
    var metrosSocio3 = $("#txtSocio3").val();

    if (metrosSocio1 === "" || metrosSocio2 === "" || metrosSocio3 === "")
    {
        MostrarMensaje("Debe ingresar metros en los 3 campos");
    } else
    {
        if (metrosSocio1 % 25 === 0 && metrosSocio2 % 25 === 0 && metrosSocio3 % 50 === 0)
        {
            var equipo = $("#selEquipComp").val();
            var competencia = $("#selComp").val();

            var socios = filtrarLista(listSocios, "equipo", equipo);

            for (var i = 0; i < socios.length; i++)
            {
                var index = devolverInscripcion(competencia, equipo, socios[i].mail);
                var txtSocio = "#txtSocio" + (i + 1);

                listInscripciones[index].metros = $(txtSocio).val();

            }

            MostrarIniciarComp();
            BorrarTxt();

            if (finalizoCompetencia(competencia))
            {
                var reporte = reporteCompetenciaFinalizada(competencia);

                function comparador(a, b) {
                    if (a.metros < b.metros)
                        return 1;
                    if (a.metros > b.metros)
                        return -1;
                    return 0;
                }

                var reporteEquipos = reporte.sort(comparador);
                var reporteXsocio = filtrarLista(listInscripciones, "competencia", competencia);

                reporteXsocio = reporteXsocio.sort(comparador);

                $("#divReporteFinalizado").html("<br><h2>Competencia " + competencia + "</h2><h3>Reporte de Metros por socio</h3>" + armarTabla(reporteXsocio, [0, 1, 4]) + "<h3>Reporte de Metros por equipo</h3>" + armarTabla(reporteEquipos, ""));
                $("#divReporteFinalizado").show();

            } else
            {
                MostrarMensaje("Se ingresaron los metros correctamente");
            }
        }
        else
        {
            MostrarMensaje("Los metros del primer nadador y el segundo nadador <br>deben ser multiplos de 25 y los del tercer nadador debe ser multiplo de 50");
        }
    }
}
//Reporte a mostrar cuando la competencia se finaliza luego de ingresar datos
function reporteCompetenciaFinalizada(competencia)
{
    var listaMetrosXequipo = [];
    var metros = 0;

    var listaInscripcionesDeComp = filtrarLista(listInscripciones, "competencia", competencia);

    var equipos = equiposEnComp(competencia);

    for (var i = 0; i < equipos.length; i++)
    {
        metros = 0;
        for (var h = 0; h < listaInscripcionesDeComp.length; h++)
        {
            if (equipos[i].equipo === listaInscripcionesDeComp[h].equipo)
            {
                metros += parseInt(listaInscripcionesDeComp[h].metros);
            }
        }

        var puntaje = new Object();
        puntaje.equipo = equipos[i].equipo;
        puntaje.metros = metros;

        listaMetrosXequipo.push(puntaje);
    }

    return listaMetrosXequipo;
}

// Funciones del formulario del Reporte de metros por competencias del equipo seleccionado
//
//Funcion que muestra los equipos disponibles con datos de competencias
function MostrarReporteAdmin()
{
    MostrarUnicamente("#divReporteAdmin");
    
    var equipos = eliminarDuplicado(listInscripciones, "equipo");

    if (equipos.length === 0 || listInscripciones.length === 0)
    {
        $("#selEquiReporte").html("<option value='-1'>No hay equipos disponibles</option>");
    } else
    {
        var equip = CrearCombo(equipos, "equipo", "equipo", "Seleccione un equipo");
        $("#selEquiReporte").html(equip);
    }
}
//Funcion que carga los datos del equipo seleccionado 
function cambiarEquipoReporte()
{
    var equipo = $("#selEquiReporte").val();

    var listaMetros = listaTablaMetrosXequipo(equipo);

    if (listaMetros.length !== 0)
    {
        var listas = "<br> <h3>Metros totales por competencia</h3> <br>" + armarTabla(listaTablaMetrosXequipo(equipo), "");

        listas += "<br><h3> Socios en equipo: </h3><br>";
        listas += armarTabla(filtrarLista(listSocios, "equipo", equipo), [1, 3, 4]);

        $("#divTablaReport").html(listas);
        $("#divTablaReport").show();

        var equipoLogo = devolverObjeto(listEquipo, "nombre", equipo);

        var logo = "<img src='img/" + equipoLogo.logo + "'/>";

        $("#divLogoReporte").html(logo);
        $("#divLogoReporte").show();
        MostrarMensaje("");
    } else
    {
        $("#divTablaReport").hide();
        $("#divLogoReporte").hide();

        MostrarMensaje("Aun no se ingresaron los metros del equipo en las competencias.")
    }

}

