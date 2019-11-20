const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000


// Define paths to configure Express
const publicDirPath = path.join(__dirname, "../public")
const aboutDirPath = path.join(publicDirPath, "about.html")
const viewsPath = path.join(__dirname, '../templates/views')
const partialPaths = path.join(__dirname, "../templates/partials")

//setup handlebar engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath) //By default its paths is setted to '../views' as folder name
hbs.registerPartials(partialPaths)

//setup static directory to serve
app.use(express.static(publicDirPath))


app.get("", (req, res) => {
    res.render("index", {
        heading: "Welcome to Linkbook!",
        author: "Shailendra kumar"
    })
})

app.get("/about", (Req, res) => {
    res.render("about", {
        heading: "About Linkbook!",
        author: "S K Sahil"
    })
})

app.get('/docs', (req, res) => {
    res.render("docs", {
        heading: "Linkbook Documentation!",
        author: "S K Jaisawal"
    })
})


app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide addres to search!"
        })
    }

    geocode(req.query.address, (error, {
        longitude,
        latitude,
        location
    } = {}) => {

        if (error) {
            res.send({
                error
            })
        } else {

            forecast(longitude, latitude, (error, forecastData) => {
                if (error) {

                    return res.send({
                        error
                    })
                }
                res.send({
                    "locationToServe": req.query.address,
                    foundLocation: location,
                    longitude,
                    latitude,
                    forecastData: forecastData.data
                })
            })
        }
    })

    // res.render("weather", {
    //     heading: "Weather Update!",
    //     author: "Darksky.net",
    //     weather: JSON.stringify(weather)
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.location) {
        res.send({
            error: "You must provide one location to search!"
        })
    }
    res.send({
        products: []
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        heading: "Error 404",
        message: "Page Not Found!"
    })
})


app.get('/weather/*', (req, res) => {
    res.render("404", {
        heading: "Error 404",
        message: "Article Not Found!"
    })
})



app.listen(port, () => {
    console.log("Server has been started on the port " + port)
})