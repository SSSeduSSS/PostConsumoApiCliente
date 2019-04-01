$(document).ready(function () {

    //Métoddo que carga la lista de temporadas al iniciar la web
    ajaxTemporadas(); 

    //Añadimos eventos dinámicos para que al cambiar 
    $(document).on('change', "#temporadas", function () {
        cargaDatosTemporada(this.value); //llamada a la funci´´on para que traiga los detalles de esa temporada
    });

    $(document).on('click', "#detallesCarrera", function () {
        //Recupero los atributos de HTML5 con jquery
        var year = $(this).attr('data-year'); //Recupero el data de la celda
        var round = $(this).attr('data-event');//Recupero el data de la celda

        var nombre = $(this).attr('data-nombreCarrera');//Recupero el data de la celda
        cargarDetallesCarrera(year, round,nombre);//llamada a la función para cargar los detalles de esa carrera para el año seleccionado
    });
});




function ajaxTemporadas() {
    $.ajax({
        //El limit es para que me lo saque todo sin paginar
        url: 'https://ergast.com/api/f1/seasons.json?limit=80',
        dataType: "json",
        success: function (respuesta) {
            //console.log(respuesta);

            $.each(respuesta, function (key, value) {
                //Recorro toda la respuesta que me devuelve la API

                $.each(value, function (key, value) {
                    //Recorro las propiedades de MrData                   

                    if (key === "SeasonTable") {
                        //De todas la propiedades del objeto MrData recojo el valor del array SeasonTable
                        $.each(value, function (key, value) {
                            //Recorro el objeto SeasonTable para seleccionar su value que es un array                           

                            $.each(value, function (key, value) {
                                //Recorro todos los nodos de los objetos para recoger su values.season que es 
                                //donde tengo los datos que deseo recibir                                

                                $('#temporadas').append($('<option>', {
                                    value: value.season,
                                    text: 'Temporada ' + value.season
                                }));
                            });
                        });
                    }
                });
            });
        },
        error: function () {
            alert("No se ha podido obtener la información");
        }
    });
}

function cargaDatosTemporada(temp) {
    $.ajax({
        //El limit es para que me lo saque todo sin paginar
        url: 'https://ergast.com/api/f1/' + temp + '.json',
        dataType: "json",
        success: function (respuesta) {
            $.each(respuesta, function (key, value) {
                //Recojo todo el JSON que me devuelve la API
                $.each(value, function (key, value) {
                    //Recorro el json para buscar el nodo RaceTable
                    if (key === "RaceTable") {
                        //De todas la propiedades del objeto MrData recojo el valor del array SeasonTable
                        $.each(value, function (key, value) {
                            if (key === "Races") {                                
                                $("#tablaDetallesCarrera ").css("display", "none");
                                $("#tablaDetalles").css("display", "block");
                                $("#tablaDetalles tbody").html(""); //vacío el body de la tabla 
                                
                                var html = "";
                                $.each(value, function (key, value) {
                                    html += "<tr>";
                                    html += "<th scope='row'>" + value.raceName + "</th>";
                                    html += "<td>" + value.Circuit.circuitName + "</td>";
                                    html += "<td>" + value.Circuit.Location.locality + "</td>";
                                    html += "<td>" + value.Circuit.Location.country + "</td>";
                                    html += "<td  id = 'detallesCarrera' data-nombreCarrera='" + value.raceName + "' data-year='" + temp + "' data-event='" + value.round + "' > <i class='fas fa-info-circle'></i></td >";
                                    html += "</tr>";
                                });
                                $("#tablaDetalles").append(html);
                            }
                        });
                    }
                });
            });
        },
        error: function () {
            $("#tablaDetalles tbody").html(""); //vacío el body de la tabla 
            $("#tablaDetalles").css("display", "none");//hidden a la tabla
            alert("No se ha podido obtener la información");
        }
    });
}


function cargarDetallesCarrera(temporada, carrera, nombreCarrera) {

    $.ajax({        
        //El limit es para que me lo saque todo sin paginar
        url: 'https://ergast.com/api/f1/' + temporada + '/' + carrera + '/results.json?limit=80',
        dataType: "json",
        success: function (respuesta) {

            $("#tituloTablaDetallesCarrera").text(nombreCarrera + " de " + temporada); //titulo de la tabla
            $("#tablaDetallesCarrera tbody").html("");
            $("#tablaDetallesCarrera ").css("display", "block");

            $.each(respuesta, function (key, value) {
                //Recojo todo el JSON que me devuelve la API
                $.each(respuesta, function (key, value) {
                    //console.log(value);
                    $.each(value.RaceTable.Races, function (key, value) {
                        var html = "";
                        $.each(value.Results, function (key, value) {
                            var nombre = value.Driver.givenName;
                            nombre += " " + value.Driver.familyName;
                            html += "<tr>";
                            html += "<th scope='row'>" + value.position + "</th>";          
                            html += "<td>" + nombre + "</td>";
                            html += "<td>" + value.Constructor.name + " (" + value.Constructor.nationality + ")</td>";
                            html += "<td>" + value.points + "</td>";
                            html += "</tr>";                           
                        });                       
                        $("#tablaDetallesCarrera").append(html);
                    });
                });
            });
        },
        error: function () {
            $("#tablaDetallesCarrera").css("display", "none"); //hidden a la tabla
            $("#tablaDetalles tbody").html(""); //vacío el body de la tabla 
            $("#tablaDetalles").css("display", "none");//hidden a la tabla
            alert("No se ha podido obtener la información");
        }
    });
}