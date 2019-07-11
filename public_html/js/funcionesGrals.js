//FUNCIONES Generales 

//Funcion que realiza el inicio de sesion de los usuarios
function IniciarSesion()
{   
    
    var user = $("#user").val();
    var pass = $("#psw").val();

    var usuario = devolverUsuario(user); //Se busca el usuario a partir del mail ingresado

    if (usuario !== null) //Se pregunta si el usuario devuelto no es null, ya que la funcion devolverUsuario si no encuentra el usuario devuelve null.
    {
        //Se consulta por la contraseña y el tipo del usuario para saber que menu mostrar, luego se guarda el usuario en una variable global 
        //y se muestra un mensaje de bienvenida, en caso de que la contraseña este mal ingresada se muestra el cartel de error.
        
        if (usuario.pass === pass) 
        {
            if (tipoUsuario === 1) 
            {
                MenuAdmin();
                $("#pie").html("Tipo de usuario: Administrador");
            } else if (tipoUsuario === 2) 
            {
                MenuSocio();
                $("#pie").html("Tipo de usuario: Socio");
            }

            usuarioActivo = usuario;
            MostrarMensaje("Bienvenido/a " + usuarioActivo.nombre);
            CerrarLogin();

        } else
        {
            $("#divErrorLogin").show();
            $("#divMenErrorLog").html("Contraseña Invalida.");
            $("#btnAceptar").focus();
        }
    } else
    {
        $("#divErrorLogin").show();
        $("#divMenErrorLog").html("Error el usuario no existe.");
        $("#btnAceptar").focus();
    }

}

//Devuelve un usuario a partir del correo
function devolverUsuario(pMail)
{
    var encontre = false;
    var usuario = null;
    var indice = 0;
    
    //Recorremos la lista de admins y de socios consultando si existe el usuario con este correo para devolver el mismo, 
    //se utiliza una bandera (boolean) para confirmar que se encontro y no seguir recorriendo las estructuras repetitivas
    //En caso de encontrar el usuario se indica en la variable global el tipo del mismo y se devuelve el usuario como objeto.
    
    while (indice < listAdmins.length && !encontre) {

        if (listAdmins[indice]["mail"] === pMail) {
            usuario = listAdmins[indice];
            encontre = true;
            tipoUsuario = 1;
        } else
            indice++;
    }

    if (!encontre)
    {
        var indice2 = 0;
        while (indice2 < listSocios.length && !encontre) {

            if (listSocios[indice2]["mail"] === pMail) {
                usuario = listSocios[indice2];
                encontre = true;
                tipoUsuario = 2;
            } else
                indice2++;
        }
    }
    return usuario;
}

//Devuelve un objeto a partir de una lista y un campo a comparar
function devolverObjeto(lista, campo, clave)
{
    var encontre = false;
    var contador = 0;
    var objeto = null;
    
    //Se recorre la lista pasada por parametro con una bandera, en la cual se busca la clave pasada por parametro comparandola con el campo
    //pasado por parametro, si se encuentra el objeto se guarda en una variable y se cambia la bandera para que no siga recorriendo la lista
    //se retorna el objeto encontrado
    
    while (contador < lista.length && !encontre) {

        if (lista[contador][campo] === clave)
        {
            objeto = lista[contador];
            encontre = true;
        }

        contador++;
    }

    return objeto;
}
//Filtra una lista a partir de un campo, dependiendo del parametro "opuesta" devuelve la lista opuesta o no.
function filtrarLista(lista, campo, valor, opuesta)
{
    var retorno = [];

    //Se realiza un recorrido por la lista pasada por parametro en la cual se analiza si el valor pasado por parametro se encuentra en la lista 
    //Comprandolo con el campo pasado por parametro, se va guardando cada uno de los registros que cumplen con la condicion
    //El parametro opuesta es un booleano que en caso de que sea true, el filtro se hace negando la igualdad para retornar la lista que no tenga 
    //el valor pasado por parametro en el campo especificado.
    
    for (var i = 0; i < lista.length; i++)
    {

        if (lista[i][campo] !== valor && opuesta)
        {
            retorno.push(lista[i]);
        }

        if (lista[i][campo] === valor && !opuesta)
        {
            retorno.push(lista[i]);
        }
    }

    return retorno;
}
//Elimina los duplicados de una lista especificando el campo a comparar
function eliminarDuplicado(lista, campo)
{
    var retorno = [];
    var encontre = false;
    
    retorno[0] = lista[0];
    
    //Se reliaza un recorrido por la lista especificada, guardando cada registro en una lista nueva con la condicion de que 
    //el registro con el campo especificado a guardar en la nueva lista no este ya guardado, asi eliminamos los duplicados.
    
    for (var i = 0; i < lista.length; i++)
    {
        encontre = false;

        for (var h = 0; h < retorno.length; h++)
        {
            if (lista[i][campo] === retorno[h][campo])
            {
                encontre = true;
            }
        }

        if (!encontre)
            retorno.push(lista[i]);
    }

    return retorno;
}
//Devuelve el indice de un objeto en una lista
function devolverIndice(lista, campo, valor)
{
    var encontre = false;
    var i = 0;
    var indice = -1;
    
    //Recorremos la lista pasada por parametro comparando el valor y campo especificados para devolver el indice del registro encontrado en 
    //la lista especificada
    
    while (i < lista.length && !encontre) {

        if (lista[i][campo] === valor) {
            encontre = true;
            indice = i;
        } else
            i++;
    }

    return indice;
}
//Devuelve una inscripcion a partir de la competencia, equipo y socio
function devolverInscripcion(competencia, equipo, socio)
{
    var index = 0;
    
    //Recorremos la lista de inscripciones comparando los 3 parametros para devolver el indice de la lista del registro encontrado 
    
    for (var i = 0; i < listInscripciones.length; i++)
    {
        if (listInscripciones[i].competencia === competencia && listInscripciones[i].equipo === equipo && listInscripciones[i].socio === socio)
        {
            index = i;
        }
    }

    return index;
}
//Devuelve una lista de competencias disponibles para el equipo pasado por parametro
function competenciaDisponibles(equipo)
{
    var compdisponibles = [];
    var encontre = false;
    
    //Filtramos las inscripciones por equipo, esto nos retorna una lista con 3 registros por cada competencia a la que esta inscripto el mismo
    
    var inscripciones = filtrarLista(listInscripciones, "equipo", equipo, false);
    
    //Consultamos si es que existen inscripciones del equipo en caso de que no existan devolvemos la lista completa de competencias, 
    //ya que estarian todas disponibles
    
    if (inscripciones.length !== 0)
    {
        //Eliminamos los registros duplicados del campo competencias, para obtener todas las competencias a las que esta inscripto
        //el equipo sin duplicarse
        inscripciones = eliminarDuplicado(inscripciones, "competencia");

        //Recorremos la lista de competencias comparando con la lista de inscripciones del equipo sin duplicados, si la competencia se encuentra 
        //en la lista de inscripciones no la agregamos a la lista que retornamos, ya que solo preciamos las disponibles.
        
        for (var i = 0; i < listCompetencias.length; i++)
        {
            encontre = false;

            for (var h = 0; h < inscripciones.length; h++)
            {
                if (listCompetencias[i].nombre === inscripciones[h].competencia)
                    encontre = true;
            }

            if (!encontre)
            {
                compdisponibles.push(listCompetencias[i]);
            }
        }
        return compdisponibles;
        
    }

    return listCompetencias;
}

//Devuelve una lista de equipos sin datos ingresados en la competencia especificada
function equiposEnCompSinDatos(competencia)
{
    //Guardamos en una variable la lista de registros por equipo, que estan inscriptos en la competencia especificada 
    var listaEquiposEnComp = equiposEnComp(competencia);
    var listaFinal = [];
    
    // si la lista esta vacia devolvemos la misma 
    if (listaEquiposEnComp.length === 0)
    {
        return listaEquiposEnComp;
    } else
    { 
        //En caso de que la lista de equipos inscriptos no sea vacia recorremos la misma y comparamos para ver si los metros aun no fueron
        //ingresados en caso de que no se hayan ingresado los agregamos a la lista y devolvemos la lista luego de recorrer todos los equipos.
        
        for (var i = 0; i < listaEquiposEnComp.length; i++)
        {
            if (listaEquiposEnComp[i].metros === 0)
            {
                listaFinal.push(listaEquiposEnComp[i]);
            }
        }
        return listaFinal;
    }
}

//Devuelve todos los equipos sin duplicados que estan inscriptos en una competencia
function equiposEnComp(competencia)
{
    var listaEquiposEnComp = filtrarLista(listInscripciones, "competencia", competencia, false);

    listaEquiposEnComp = eliminarDuplicado(listaEquiposEnComp, "equipo");

    return listaEquiposEnComp;

}
//Chequea si una competencia esta finalizada
function finalizoCompetencia(competencia)
{
    var finalizada = true;

    var listaInscripComp = filtrarLista(listInscripciones, "competencia", competencia);

    for (var i = 0; i < listaInscripComp.length; i++)
    {
        if (listaInscripComp[i].metros === 0)
        {
            finalizada = false;
        }
    }

    return finalizada;
}
//Devulve una lista de las competencias activas
function competenciasActivas()
{
    var compActivas = [];

    for (var i = 0; i < listCompetencias.length; i++)
    {
        if (!finalizoCompetencia(listCompetencias[i].nombre))
        {
            compActivas.push(listCompetencias[i]);
        }
    }

    return compActivas;
}
//Devuelve los metros totales de un equipo en una competencia
function totalMetrosXcomp(competencia, equipo)
{
    var listaCompetenciaXequipo = filtrarLista(filtrarLista(listInscripciones, "competencia", competencia, false), "equipo", equipo, false);

    var metrosTotales = 0;

    for (var i = 0; i < listaCompetenciaXequipo.length; i++)
    {
        metrosTotales += parseInt(listaCompetenciaXequipo[i].metros);
    }

    return metrosTotales;
}
//Devuelve una tabla con los metros del equipo especificado en cada competencia
function listaTablaMetrosXequipo(equipo)
{
    var retorno = [];

    for (var i = 0; i < listCompetencias.length; i++)
    {
        var metros = totalMetrosXcomp(listCompetencias[i].nombre, equipo);

        if (metros !== 0)
        {
            var puntaje = new Object();
            puntaje.Competencia = listCompetencias[i].nombre;
            puntaje.MetrosTotales = metros;

            retorno.push(puntaje);
        }
    }

    return retorno;
}
//Devuelve los equipos disponibles para poder inscribirse
function EquiposDisponibles()
{
    var listEquipoDisponibles = [];
    var cantSocios = 0;
    
    for (var h = 0; h < listEquipo.length; h++)
    {
        cantSocios = 0;
        for (var i = 0; i < listSocios.length; i++)
        {
            if (listSocios[i].equipo === listEquipo[h].nombre)
            {
                cantSocios++;
            }
        }
        if (cantSocios < 3 && usuarioActivo.equipo !== listEquipo[h].nombre)
        {
            listEquipoDisponibles.push(listEquipo[h]);
        }
    }
    return listEquipoDisponibles;
}
//Valido contraseña
function ValidarContraseña(contraseña)
{
    var tieneNumero = false;
    var tieneLetra = false;
    for (var i = 0; i < contraseña.length; i++)
    {
        if (!isNaN(parseInt(contraseña[i])))
        {
            tieneNumero = true;
        } else
        {
            tieneLetra = true;
        }
    }

    if (tieneNumero && tieneLetra)
    {
        return 3;
    } else if (!tieneLetra && tieneNumero)
    {
        return 1;
    } else if (!tieneNumero && tieneLetra)
    {
        return 2;
    }
}
//A partir de un string devuelvo el mismo con la primer letra mayuscula
function ArreglarString(palabra)
{
    var newPalabra = "";
    for (var i = 0; i < palabra.length; i++)
    {
        if (i === 0)
        {
            newPalabra += palabra[i].toUpperCase();
        } else
        {
            newPalabra += palabra[i].toLowerCase();
        }
    }

    return newPalabra;
}
//Creo un select a partir de una lista
function CrearCombo(lista, clave, dato, primer)
{

    var select = "";

    if (primer !== undefined)
    {
        select += "<option value='-1' disabled selected hidden>" + primer + "</option>";
    }

    for (var i = 0; i < lista.length; i++) {
        select += "<option value='" + lista[i][clave] + "'>" + lista[i][dato] + "</option>";
    }
    return select;
}
//Creo una tabla a partir de una lista
function armarTabla(listaObj, listaIgnorar)
{
    var listaDeAtributos = Object.keys(listaObj[0]);

    var tabla = "<table border='1'><tr>";
    var linea = [];
    for (var x = 0; x < listaDeAtributos.length; x++)
        if (listaIgnorar.indexOf(x) === -1)
            tabla += "<th>" + ArreglarString(listaDeAtributos[x]) + "</th>";
    tabla += "</tr>";
    for (var x = 0; x < listaObj.length; x++) {
        linea = listaObj[x];
        tabla += "<tr>";
        for (var y = 0; y < listaDeAtributos.length; y++)
            if (listaIgnorar.indexOf(y) === -1)
                tabla += "<td>" + linea[listaDeAtributos[y]] + "</td>";
        tabla += "</tr>";
    }
    tabla += "</table>";
    return tabla;
}


//Funciones menu generales
function MostrarUnicamente(ElementoMostrar)
{
    if (mostrarMensaje === 1)
    {
        $("#divMensaje").html("");
        mostrarMensaje = 0;
    }
    $(".clSocio").hide();
    $(".clAdmin").hide();
    $("#divRegistro").hide();
    $(ElementoMostrar).show();

}

function PaginaPrincipal()
{
    $("#divMensaje").html("");
    $(".clSocio").hide();
    $(".clAdmin").hide();
    $(".clAdminMenu").hide();
    $(".clSocioMenu").hide();
    $("#cabezalAdmin").hide();
    $("#cabezalSocio").hide();
    $("#cabezal").show();
    BorrarTxt();
}

function Limpiar()
{
    $("#divMensaje").html("");
    $(".clSocio").hide();
    $(".clAdmin").hide();
    BorrarTxt();
}

function ActivarLogin()
{
    $("#user").val("");
    $("#psw").val("");
    $("#id01").show();
    $("#user").focus();
}

function CerrarLogin()
{
    $("#id01").hide();
    BorrarTxt();
}

function CerrarError()
{
    $("#divErrorLogin").hide();
    $("#psw").val("");
    $("#usr").focus();
}

function MenuAdmin()
{
    MostrarUnicamente(".clAdminMenu");
    $("#cabezal").hide();
    $("#cabezalAdmin").show();
}

function MenuSocio()
{
    MostrarUnicamente(".clSocioMenu");
    $("#cabezal").hide();
    $("#cabezalSocio").show();
}

function CerrarSesion()
{
    PaginaPrincipal();
    tipoUsuario = 0;
    mostrarMensaje = 0;
    $("#pie").html("");
}

function BorrarTxt()
{
    $("#txtNombreRegistro").val("");
    $("#txtMailRegistro").val("");
    $("#txtPassRegistro").val("");
    $("#txtNombreComp").val("");
    $("#txtNombreEquipo").val("");
    $(".clPass").val("");
    $("#user").val("");
    $("#psw").val("");
    $(".checkSocio").prop("checked", false);
    $("#txtSocio1").val("");
    $("#txtSocio2").val("");
    $("#txtSocio3").val("");
}

function MostrarMensaje(mensaje)
{
    $("#divMensaje").html("<br>" + mensaje);
    mostrarMensaje = 1;
}
