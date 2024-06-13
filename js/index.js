var contactLink = document.getElementById("contactLink");
var homeLink = document.getElementById("homeLink");
var header = document.getElementById("header");
var forecastTable = document.getElementById("forecastTable");
var contactSection = document.getElementById("contact");

var SearchInput = document.getElementById("Search");

/* Current forecast elements */
var currentDateElement = document.getElementById("current-date");
var currentDayElement = document.getElementById("current-day");
var currentDegreeElement = document.getElementById("current-degree");
var currentIconElement = document.getElementById("current-icon");
var currentStatusElement = document.getElementById("current-status");
var currentLocationElement = document.getElementById("location");

/* future forecast elements */
var futureDayElements = document.querySelectorAll("#future-day");
var futureMaxDegreeElements = document.querySelectorAll("#future-max-degree");
var futureMinDegreeElements = document.querySelectorAll("#future-min-degree");
var futureStatusElements = document.querySelectorAll("#future-status");
var futureIconElements = document.querySelectorAll("#future-icon");

var Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var mounths = [
  "Januarry",
  "Februarry",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Augest",
  "September",
  "October",
  "Novambner",
  "December",
];


/* geolocation api function that ask for allow to access user location*/
(function getUserLocation() {
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition); // when user allow it call showposition that send the user loaction lat and lon 
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  console.log("hellooooooo")
})();

async function showPosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  var res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=d2ddee026b0540eea6d133511241006&q=${lat},${lon}&days=3`
  ); //api request with lat & lon

  var data = await res.json();
  if (res.status != 400) {
    console.log(data);
    displayLocationData(data);
  }
}

/* contact link navigation */
contactLink.addEventListener("click", function (e) {
  header.classList.add("d-none");
  forecastTable.classList.add("d-none");
  contactSection.classList.replace("d-none", "d-block");
  contactLink.classList.add("active");
  homeLink.classList.remove("active");
  document.body.style.cssText = `  background-color: #1e202b;
  `;
});

/* home link navigation */
homeLink.addEventListener("click", function (e) {
  header.classList.remove("d-none");
  forecastTable.classList.remove("d-none");
  contactSection.classList.replace("d-block", "d-none");
  homeLink.classList.add("active");
  contactLink.classList.remove("active");
  document.body.style.cssText = `  background-color: white;
  `;
});

/*search on input*/
SearchInput.addEventListener("input", function (e) {
  console.log(SearchInput.value);
  Search(SearchInput.value);
});

async function Search(searchValue) {
  var res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=d2ddee026b0540eea6d133511241006&q=${searchValue}&days=3`
  );
  var data = await res.json();

  if (res.status != 400) {
    console.log(data);
    displayLocationData(data);
  }

  // var res = await fetch(
  //   `https://api.weatherapi.com/v1/search.json?key=d2ddee026b0540eea6d133511241006&q=${searchValue}`
  // );
  // console.log(data.length);

  // if (data.length !== 0) {
  //   // console.log(data[0]);
  // }
}

function displayLocationData(LocationData) {
  setCurrentData(LocationData);
  setFutureData(LocationData);
}

function setCurrentData(LocationData) {
  console.log(LocationData);
  //console.log(LocationData.current);

  var firstInforecast = LocationData.forecast.forecastday[0];
  var current = LocationData.current;

  var d = new Date(firstInforecast.date);
  currentDateElement.innerHTML = d.getDate() + "  " + mounths[d.getMonth()]; // ex 12 june
  currentDayElement.innerHTML = Days[d.getDay()]; //ex tuesday
  currentLocationElement.innerHTML = LocationData.location.name;

  currentDegreeElement.innerHTML = current.temp_c;
  currentStatusElement.innerHTML = current.condition.text;
  var iconSrc = "https:" + current.condition.icon;
  currentIconElement.innerHTML = `<img src=${iconSrc} class="w-25" alt="${current.condition.text}" />`;
}

function setFutureData(LocationData) {
  var forecastArr = LocationData.forecast.forecastday.splice(1, 2);
  //splice return deleted indeces in forecast arr , return the future data only index 1 , 2 in forecastday
  console.log(forecastArr);

  for (var i = 0; i < forecastArr.length; i++) {
    var d = new Date(forecastArr[i].date);
    futureDayElements[i].innerHTML = Days[d.getDay()];
    futureMaxDegreeElements[i].innerHTML = forecastArr[i].day.maxtemp_c;
    futureMinDegreeElements[i].innerHTML = forecastArr[i].day.mintemp_c;
    futureStatusElements[i].innerHTML = forecastArr[i].day.condition.text;
    var iconSrc = "https:" + forecastArr[i].day.condition.icon;
    futureIconElements[
      i
    ].innerHTML = `<img src=${iconSrc} class="w-25" alt="${forecastArr[i].day.condition.text}" />`;
  }
}
