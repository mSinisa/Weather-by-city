const app = new Vue({

    el: "#app",

    data: {

        url: "",
        city: "Barcelona",
        dataWeather: [],
        weatherForecast: [],
        fiveDays: false
    },

    methods: {

        getData () {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&APPID=2f3c378e991f5719f81ce9b07aaf6bb9`, {
                    method: "GET",
                })
                .then(res => {
                    if (!res.ok) {
                        throw Error(res.status);
                    }
                    return res;
                })
                .then(data => {
                    return data.json();
                })
                .then(myData => {
                    app.dataWeather = myData;
                    app.city = ""
                })
                .catch(err => {
                   if(err.message == 404){
                       document.getElementById("searchInput").value="";
                       document.getElementById("mainHeader").innerText = "City Not Found. Check Spelling Please";
                       setTimeout(() => document.getElementById("mainHeader").innerText = "City Weather", 3000);
                   }
                })
        },

        getForecast() {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&APPID=2f3c378e991f5719f81ce9b07aaf6bb9`, {
                    method: "GET",
                })
                .then(res => {
                    if (!res.ok) {
                        throw Error(res.status);
                    }
                    return res;
                })
                .then(data => {
                    return data.json();
                })
                .then(myData => {
                    app.weatherForecast = myData.list;
                })
                .catch(err => {
                    console.log(err);
                })
        },

        getIcon(description) {
            if (description.match(/01d/g)) {
                return "styles/images/sun.png";
            } else if (description.match(/01n/g)) {
                return "styles/images/moon.png";
            } else if (description.match(/02d/g)) {
                return "styles/images/cloudy-day-outlined-weather-interface-symbol.png";
            } else if (description.match(/02n/g)) {
                return "styles/images/night.png";
            } else if (description.match(/03d/g) || description.match(/03n/g)) {
                return "styles/images/onecloud.png";
            } else if (description.match(/04d/g) || description.match(/04n/g)) {
                return "styles/images/cloud.png";
            } else if (description.match(/09d/g) || description.match(/09n/g)) {
                return "styles/images/showerrain.png";
            } else if (description.match(/10d/g)) {
                return "styles/images/sun-and-rain.png";
            } else if (description.match(/10n/g)) {
                return "styles/images/rainy-cloud-at-night.png";
            } else if (description.match(/11d/g) || description.match(/11n/g)) {
                return "styles/images/storm.png";
            } else if (description.match(/13d/g) || description.match(/13n/g)) {
                return "styles/images/snowing.png";
            } else if (description.match(/50d/g) || description.match(/50n/g)) {
                return "styles/images/haze.png";
            }
        },

        fiveDayForecast () {
            let every24hrs = [];
            for (let i = 0; i < this.weatherForecast.length; i += 8) {
                every24hrs.push(this.weatherForecast[i]);
            }
            return every24hrs;
        }

    },

    computed: {

    },

    created() {
        this.getData();
        this.getForecast();
    }

})