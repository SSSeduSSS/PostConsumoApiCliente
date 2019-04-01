$(document).ready(function () {
    ajaxTemporadas();
    $(document).on('change', "#temporadas", function () {
        
        cargaDatosTemporada(this.value);
        
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
        url: 'https://ergast.com/api/f1/'+temp+'.json',
        dataType: "json",
        success: function (respuesta) {
            //console.log(respuesta);
            $.each(respuesta, function (key, value) {
                //Recojo todo el JSON que me devuelve la API
                $.each(value, function (key, value) {
                   //Recorro el json para buscar el nodo RaceTable
                    console.log(value);
                    if (key === "RaceTable") {                        
                        //De todas la propiedades del objeto MrData recojo el valor del array SeasonTable
                        $.each(value, function (key, value) {
                            
                            if (key === "Races") {
                                
                                //Aquí estoy en el array de los datos de la carrera
                                var html = "<tr>";
                                $.each(value, function (key, value) {
                                    
                                    html += "<th scope='row'>" + value.Circuit.circuitId+"</th>";
                                    html += "</tr>";
                                    alert("añadir los datos de las carreras");
                                    //console.log(value.Circuit.circuitId);

                                });
                                alert(html);
                                
                            }
                            
                           
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