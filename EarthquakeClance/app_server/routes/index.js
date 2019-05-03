var express = require("express");
var router = express.Router();
var ctrlMain = require("../controllers/main");
var ctrlEarthquakeApi = require("../controllers/earthquake_api");

// /* GET home page. */
router.get("/", ctrlMain.home);

router.get(
  "/api/num_earthquake_per_country",
  ctrlEarthquakeApi.get_num_earthquake_per_country
);

router.get(
  "/api/num_earthquake_per_year",
  ctrlEarthquakeApi.get_num_earthquake_per_year
);

router.get(
  "/api/earthquakes_with_top_deaths",
  ctrlEarthquakeApi.get_earthquakes_with_top_deaths
);

router.get("/api/top_losses", ctrlEarthquakeApi.get_earthquake_with_top_losses);
router.get("/api/get_earthquake_level", ctrlEarthquakeApi.get_earthquake_level);

router.get("/api/all_countries", ctrlEarthquakeApi.all_countries);

router.get("/api/get_first_date", ctrlEarthquakeApi.get_first_date);

router.get("/api/get_last_date", ctrlEarthquakeApi.get_last_date);

router.get("/api/get_statistics", ctrlEarthquakeApi.get_statistics);

module.exports = router;
