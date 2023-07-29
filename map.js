const select = document.getElementById("country-select");
const theMap = document.getElementById("map");
const url =

   "https://lielzilberman.github.io/countries_api/countries.json";
;
const options = {
  method: "GET",
  
};
var map;

createMap("israel");

select.addEventListener("change", () => {
  deleteMap();
  createMap(select.value);
});

async function createMap(country) {
  map = L.map("map");

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    result[`${country}`].forEach((element) => {
      L.marker([element.lat, element.lng])
        .addTo(map)
        .bindPopup(
          `Name: ${element.name}.<br> Location
        : ${element.region}.`
        );
      map.setView([element.lat, element.lng], 4);
    });
  } catch (error) {
    console.error(error);
  }

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://carto.com/">CartoDB</a> contributors',
    }
  ).addTo(map);
}

function deleteMap() {
  if (map) {
    map.remove();
    map = null;
    theMap.classList.remove("leaflet-container");
  }
}
