const app = require("../app")

module.exports = (app) =>{
    app.get('/' , (req , res) =>{
        res.send('here')
    })
}