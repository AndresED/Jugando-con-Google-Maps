$(document).ready(function(){
    if($("#contenedor_mapa"))
    {
        init();
    }
});
var nombre="marker";
var center;
var map = null;
var markers=[];
var markerLat = [];
var markerLng = [];
var address=[];
 var counter=-1;
 var container_place=$("#list_place");
 container_place.empty();
/***********************************************
    Control del redimensionamiento de la ventana
***********************************************/
 
window.onresize = function(){
    document.getElementById("contenedor_mapa").style.height = (window.innerHeight) + "px";
}
 
/***********************************************
    Función de inicio.
    Creo el mapa, y lo centro en las coordenadas de España
***********************************************/
 
function init(){
    var mapdivMap = $("#contenedor_mapa");
    mapdivMap.css('width','100%');
    mapdivMap.css('height',(window.innerHeight)+"px");
    
    center = new google.maps.LatLng(-8.1117766, -79.0286943);
    var myOptions = {
        zoom: 16,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("contenedor_mapa"), myOptions);
    //drawMarker(-8.1117766, -79.0286943);
    
    
    map.addListener('click', function(event) {
    	

    	
        addDeleteMarker(event.latLng);
    });
}
 function updateList(place)
 {
 	$('<li id="list">'+place+' <a class="btn btn-primary">X</a></li>').appendTo(container_place);

 }
/***********************************************
    Función de Dibujar marcador.
    Dibuja un marcador en el mapa
***********************************************/
function addDeleteMarker(location) {

	var geocoder = new google.maps.Geocoder;
	var infowindow = new google.maps.InfoWindow;
	latlng={lat:location.lat(), lng:location.lng()};
	geocoder.geocode({'location': latlng}, function(results, status) {
	   	if (status === 'OK') {
	      if (results[1]) {
	        map.setZoom(11);
	        var marker = new google.maps.Marker({
	          position: latlng,
	          map: map
	        });
	        infowindow.setContent('<center>'+results[1].formatted_address+'<br><a href="#" class="btn btn-primary">Quitar marcador</a></center>');
	        marker.addListener('mouseover', function() {	        	
			    infowindow.open(map, marker);
			});
			marker.addListener('mouseout', function() {
			    infowindow.close();
			});
	        console.log(results[1].formatted_address);
	        updateList(results[1].formatted_address);
	        markers.push(marker);
	        var markerLatLng = marker.getPosition();
	        markerLat.push(markerLatLng.lat());
	        markerLng.push(markerLatLng.lng());
	        console.log(markerLatLng.lat()+"  " +markerLatLng.lng());
	      } else {
	        window.alert('No results found');
	      }
	    } else {
	      window.alert('Geocoder failed due to: ' + status);
	    }
	  });
        
      }

/***********************************************
    Función de Mostrar .
    Dibuja un marcador en el mapa
***********************************************/
function showMsjDeleteMarker()
{
	
}
/***********************************************
    Función de Limpiar mapa
    Quita a un marcador del mapa
***********************************************/
function setMapOnAll(map) 
{
    for (var i = 0; i < markers.length; i++) 
    {
        markers[i].setMap(map);
    }
}
/***********************************************
    Función de Dibujar marcador.
    Dibuja un marcador en el mapa
***********************************************/
function deleteMarker()
{

}
google.maps.event.addListener(markers, 'dragstart', function() 
	{
	   alert('mueveme con cariño!');
	});