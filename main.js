var app = new Vue({

    el: "#app",

    data: {
        //&APPID=2f3c378e991f5719f81ce9b07aaf6bb9
        //"http://api.openweathermap.org/data/2.5/weather?q=' + city +'&APPID=2f3c378e991f5719f81ce9b07aaf6bb9"
        //        url: "http://api.openweathermap.org/data/2.5/weather?q= ' + city + ' &APPID=2f3c378e991f5719f81ce9b07aaf6bb9",
        //        url: "https://api.myjson.com/bins/i8run&APPID=2f3c378e991f5719f81ce9b07aaf6bb9",
        //        url: "http://api.openweathermap.org/data/2.5/weather?q=London&APPID=2f3c378e991f5719f81ce9b07aaf6bb9",
        //        url: "https://api.myjson.com/bins/i8run&APPID=2f3c378e991f5719f81ce9b07aaf6bb9",
        url: "",
        city: "Barcelona",
        dataWeather: [],
        weatherForecast:[]



    },

    methods: {

        getData: function () {
            fetch("http://api.openweathermap.org/data/2.5/weather?q=" + this.city + "&units=metric&APPID=2f3c378e991f5719f81ce9b07aaf6bb9", {
                    method: "GET",
                })
                .then(function (data) {
                    return data.json();
                })
                .then(function (myData) {
                    app.dataWeather = myData;
                    app.city = ""
                })
            //            .catch
        },

        getForecast: function () {
            fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + this.city + "&units=metric&APPID=2f3c378e991f5719f81ce9b07aaf6bb9", {
                    method: "GET",
                })
                .then(function (data) {
                    return data.json();
                })
                .then(function (myData) {
                app.weatherForecast = myData.list;
                })

        },

        getIcon: function (description) {
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
        }


    },

    computed: {

    },

    created: function () {
        this.getData();
        this.getForecast();
    }

})
