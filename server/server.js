const express = require("express")
const app = express()

const wordsRouter = require("./controllers/words_controller")
const oedRouter = require("./controllers/oed_controller")
const audioRouter = require("./controllers/audio_controller")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/../client/build"))

app.use("/api/words", wordsRouter)
app.use("/api/oed", oedRouter)
app.use("/api/audio", audioRouter)

app.listen(process.env.PORT || 3000)
