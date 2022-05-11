const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config();
const jwt = require('jsonwebtoken'); // step 1
const { decode } = require('jsonwebtoken');
const port = process.env.PORT || 5000;



// Middleware
app.use(cors())
app.use(express.json())


// JWT
/*
const jwt = require('jsonwebtoken');
const accessToken = jwt.sign({accessInfo}, secretCode, {expireInfo});

*/
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: "Unauthorized" })
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) =>{
        if(err){
            return res.status(403).send({ message: "forbidden" })
        }
        req.decoded = decoded;
        next();
        

    })
    // console.log("inside functionn", authHeader)

}

const fakeDbData = [
    {
        id: 1,
        productName: "Imac M1 Pro 32GB 500GB",
        price: "1000"
    },
    {
        id: 2,
        productName: "Samsung 48 inch monitor",
        price: "1200"
    },
    {
        id: 3,
        productName: "iPhone 13 pro",
        price: "1400"
    },
    {
        id: 4,
        productName: "iPhone 14 pro",
        price: "1600"
    },
    {
        id: 5,
        productName: "iPhone 12 pro",
        price: "800"
    }
]


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/login', (req, res) => {
    const user = req.body;
    if (user.email === 'diptasaha.lpu.cse@gmail.com' && user.pass == '1234567') {
        const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN, { expiresIn: "1h" });
        res.send(
            {
                success: true,
                accessToken
            }
        )

    }
    else {
        res.send({ success: false })

    }



})

// GET - for orders
app.get('/orders', verifyJWT, (req, res) => {
    // console.log(req.headers.authorization)
    res.send(fakeDbData)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})