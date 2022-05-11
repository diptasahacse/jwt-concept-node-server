const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config();
const jwt = require('jsonwebtoken') // step 1
const port = process.env.PORT || 5000;



// Middleware
app.use(cors())
app.use(express.json())


// JWT
/*
const jwt = require('jsonwebtoken');
const accessToken = jwt.sign({accessInfo}, secretCode, {expireInfo});

*/



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/login', (req, res) => {
    const user = req.body;
    if(user.email === 'diptasaha.lpu.cse@gmail.com' && user.pass == '1234567'){
        const accessToken = jwt.sign({email: user.email}, process.env.ACCESS_TOKEN,{expiresIn: "1h"} );
        res.send(
            {
                success: true,
                accessToken
            }
        )

    }
    else{
        res.send({ success: false })

    }
    
    

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})