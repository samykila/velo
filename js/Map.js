// strict mode

" use strict";

 // creation de l'objet Map

class Map {
    constructor(lat, long, mapid) {
        this.lat = lat;
        this.long = long;

    }


// initialisation de la Carte

    initMap() {

        let mymap = L.map('mapid').setView([this.lat, this.long], 10);
// initialisation des tuiles
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            minZom: 1,
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoic2FteW5hIiwiYSI6ImNrZWNzN242MTBsdGgyenBnbDFhcXRycmoifQ.KW6ntl4LiqCbqkQgFMWFoA'
        }).addTo(mymap);

        //---variables de déclaration

        const form = document.querySelector("form");
        const title = document.getElementById("title");
        const address = document.getElementById("address");
        const places = document.getElementById("places");
        const bikes = document.getElementById("bikes");
        const dispos = document.getElementById("disponibility");

// on appelle la fonction ajax

        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=a1bb8a2d6bce79ce80f96e68686478140bfc9616 ", function (reponse) {
            let stations = JSON.parse(reponse);
            stations.forEach(function (station) {

                let pop = function () {

                    form.classList.replace("infos", "showinfo");
                    marker.bindPopup(station.name).openPopup();
                    sessionStorage.setItem("stationName", station.name);

                    title.innerHTML = "<strong>Nom de la station</strong> : " + station.name;
                    address.innerHTML = "<strong>Adresse</strong> : " + station.address;
                    places.innerHTML = "<strong>Place(s) disponible(s)</strong> : " + station.available_bike_stands;
                    bikes.innerHTML = "<strong>Vélo(s) disponible(s)</strong> : " + station.available_bikes;


                    if (station.available_bikes === 0) {
                        dispo.classList.replace("dispo_on", "dispo_off");
                    } else {
                        dispo.classList.replace("dispo_off", "dispo_on");
                    }


                };
                //---CREATE N0 DISPO MARKER

                let redMarker = L.icon({
                    iconUrl: "images/redMarker.png",
                    iconSize: [25, 38],
                    iconAnchor: [22, 94],
                    popupAnchor: [-10, -95]
                });

                //--creation des markers

                if (station.available_bikes !== 0) {
                    let marker = L.marker(station.position).on("click", pop).addTo(mymap);
                } else {
                    let marker = L.marker(station.position, {icon: redMarker}).on("click", pop).addTo(mymap);
                }
                ;


            });
        });

    };
}