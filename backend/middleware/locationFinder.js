import express from "express";
import axios from "axios";
const locationFinder = (req, res, next) => {
  console.log(req.body);
  const address = `${req.body.zipCode} ${req.body.street} ${req.body.number}`;
  console.log(address);
  const params = {
    access_key: "229ab8769d8adc30d265ad75a63be0f0",
    query: address,
    country: "DE",
    region: req.body.city,
  };
  axios
    .get("http://api.positionstack.com/v1/forward", { params })
    .then((response) => {
      

      const userCoordinate = {
        latitude: response.data.data[0].latitude,
        longitude: response.data.data[0].longitude,
    
      };
      console.log(userCoordinate)
      req.userCoordinate=userCoordinate
      next()
    })
    .catch((error) => {
      console.log(error);
    });
};

export default locationFinder;
