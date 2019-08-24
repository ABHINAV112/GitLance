const express = require("express");
const router = express.Router();
const companyRoute = require("./company");
const freelancerRoute = require("./freelancer");

module.exports = () => {
    router.get("/", (req, res) => {
        return res.send("home page");
    });
    router.use("/company", companyRoute());
    router.use("/freelancer", freelancerRoute());
    return router;
};