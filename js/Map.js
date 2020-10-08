// strict mode
" use strict";

 // creation de l'objet Map

class Map {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
        this.zoom= 14;
    }
// initialisation de la Carte

    initMap() {
        let mymap = L.map("mapid").setView([this.lat, this.lng], this.zoom);
// initialisation des tuiles
        L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            minZom: 14,
            maxZoom: 18,
            zoomDelta: 0.25,
            zoomSnap: 0,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken: "pk.eyJ1Ijoic2FteW5hIiwiYSI6ImNrZWNzN242MTBsdGgyenBnbDFhcXRycmoifQ.KW6ntl4LiqCbqkQgFMWFoA"
        }).addTo(mymap);

        // on recupere les stations

        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=a1bb8a2d6bce79ce80f96e68686478140bfc9616 ", function (reponse) {
            console.log(reponse);
            let stationsList = JSON.parse(reponse);
            console.log(stationsList);

            //Affichage des infos de la station lors d'un clic sur son marker
            stationsList.forEach(function (station) {
                console.log(station);
                //---variables de déclaration

                const form = document.querySelector("form");
                const title = document.getElementById("title");
                const address = document.getElementById("address");
                const places = document.getElementById("places");
                const bikes = document.getElementById("bikes");
                const dispos = document.getElementById("disponibility");

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
                    }
                    else {
                        dispo.classList.replace("dispo_off", "dispo_on");
                    }
                }
                // creation des markers

                let redMarker = L.icon({
                    iconUrl: "images/redMark.png",
                    iconSize: [35, 35],
                    shadowSize:   [70, 70],
                    iconAnchor: [25, 50],
                    shadowAnchor: [0, 0],
                    popupAnchor: [-5, -40]
                });

                let greenMarker= L.icon({
                    iconUrl: "images/greenMark.png",
                    shadowSize:   [70, 70],
                    iconSize: [35, 35],
                    iconAnchor: [22, 50],
                    shadowAnchor: [0, 0],
                    popupAnchor: [-5, -40]
                });

                let marker = "";

                if (station.status === "OPEN") {
                    marker = L.marker([station.position.lat, station.position.lng], {icon:greenMarker }).addTo(mymap);
                }
                else {
                    marker = L.marker([station.position.lat, station.position.lng], {icon: redMarker}).addTo(mymap);
                }
                marker.bindPopup(station);
                if (station.available_bikes !== 0) {
                    let marker = L.marker(station.position).on("click", pop).addTo(mymap);
                }
                else {
                    let marker = L.marker(station.position, {icon: redMarker}).on("click", pop).addTo(mymap);
                }

            });
        });

    };
}
let mapLyon = new Map(45.7578137,4.8320114);
mapLyon.initMap()

