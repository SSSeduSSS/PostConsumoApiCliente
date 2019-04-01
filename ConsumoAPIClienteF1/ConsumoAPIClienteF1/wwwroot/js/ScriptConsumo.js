$(document).ready(function () {
    $.ajax({
        //El limit es para que me lo saque todo sin paginar
        url: 'https://ergast.com/api/f1/seasons.json?limit=80',
        dataType: "json",
        success: function (respuesta) {            
            console.log(respuesta);

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
});