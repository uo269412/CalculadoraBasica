"use strict";
class CotizacionBolsa {
    constructor(){
        this.url = 'http://api.marketstack.com/v1/tickers?access_key=d79b29074f62f6f94440e6d2a38b5f74';
    } 
    // debido a un plan de suscripción, si se utiliza mucho la aplicación web, dejarán de cargar los datos
    cargarDatos(){
        $.ajax({
            url: this.url,
            dataType: 'json',
            method: 'GET',
            success: function(apiResponse) {
                
                if (Array.isArray(apiResponse['data'])) {
                    apiResponse['data'].forEach(stockData => {  
                       
                        var nombre = stockData['name'];
                        var simbolo = stockData['symbol'];   
                        var exchanges = stockData['stock_exchange'];  
                        var nombreCambio = exchanges['name'];
                        var acronimo = exchanges['acronym'];
                        var pais = exchanges['country'];
                        var ciudad = exchanges['city'];
                        var web = exchanges['website'];                 
                        $("#datos").append("<h2>Nombre del ticker: " + nombre +  "</h2>");
                        $("#datos").append("<p>Símbolo: " + simbolo +  "</p>");     
                        $("#datos").append("<a href=" + "\"" + web + "\"" + "> Página web de la cotización donde se puede ver esta bolsa </a>");                
                        $("#datos").append("<ul>");
                        $("#datos").append("<li>Nombre de la bolsa asociada con el ticker: " + nombreCambio + " </li>");
                        $("#datos").append("<li>Acrónimo: " + acronimo + " </li>");
                        $("#datos").append("<li>País donde se encuentra esa bolsa: " + pais + " </li>");
                        $("#datos").append("<li>Ciudad en específico: " + ciudad + " </li>");
                        $("#datos").append("</ul>");
                        $("#datos").append("<p id = " + "\"" + simbolo + "\"" + "> Aquí se verá la información de 10 de los informes de bolsa </p>");


                        var nuevaUrl = 'http://api.marketstack.com/v1/eod?access_key=d79b29074f62f6f94440e6d2a38b5f74&symbols=' + simbolo;
                        var aperturaTotal = 0;
                        var cierreTotal = 0;
                        var altoTotal = 0;
                        var bajoTotal = 0;

                        $.ajax({
                            url: nuevaUrl,
                            dataType: 'json',
                            method: 'GET',
                            success: function(respuesta) {
                                var datos = respuesta['data'];
                                var primero = datos[0];
                                $("#" + simbolo).append("<h3>Informe de la bolsa de " + nombre +  "</h3>");

                                for (var step = 0; step < 10; step++) {
                                    var datosBolsa = datos[step];
                                    var apertura = datosBolsa['open'];
                                    aperturaTotal += apertura;
                                    var alto = datosBolsa['high'];  
                                    altoTotal += alto; 
                                    var bajo = datosBolsa['low'];  
                                    bajoTotal += bajo;
                                    var cierre = datosBolsa['close'];
                                    cierreTotal += cierre;
                                    var volumen = datosBolsa['volume'];
                                    var fecha = datosBolsa['date'];    


                                    $("#" + simbolo).append("<h4> Informe " + (step+1) + "</h4>");   
                                    $("#" + simbolo).append("<ul>");    
                                    $("#" + simbolo).append("<li>Apertura: " + apertura + " </li>");
                                    $("#" + simbolo).append("<li>Cierre: " + cierre + " </li>");
                                    $("#" + simbolo).append("<li>Alto: " + alto + " </li>");
                                    $("#" + simbolo).append("<li>Bajo: " + bajo + " </li>");
                                    $("#" + simbolo).append("<li>Volumen: " + volumen + " </li>");
                                    $("#" + simbolo).append("<li>Fecha: " + fecha + " </li>");
                                    $("#" + simbolo).append("</ul>");

                                  }

                                  $("#" + simbolo).append("<h3>Cómputos totales</h3>");
                                  $("#" + simbolo).append("<p> La apertura total de estos informes acaba computada en un total de "+ aperturaTotal + ", mientras que el cierre se posiciona en " + cierreTotal + " lo que convertiría la diferencia apertura - cierre en un total de " + (aperturaTotal - cierreTotal) + "</p>");
                                  $("#" + simbolo).append("<p> De misma manera, el alto total de estos informes sería "+ altoTotal + ", mientras que el bajo se mantendría en " + bajoTotal + "</p>");
                          
                            }
                          });

                    });
                  } 
            }
          });
    }

}

var stockMarket = new CotizacionBolsa();