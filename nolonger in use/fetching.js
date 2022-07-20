import crypto from "crypto"
import dotenv from "dotenv"
import axios from "axios"

dotenv.config()

let howManyToFetch=50
let howManyToSkip=0
let characters

let date=Date.now()
let tobehashed=`${date}${process.env.REACT_APP_MARVEL_PRIVATE_KEY}${process.env.REACT_APP_MARVEL_PUBLIC_KEY}`
let hash=crypto.createHash("md5").update(tobehashed).digest("hex");
let connectionString=`${process.env.REACT_APP_MARVELAPI}${process.env.REACT_APP_ADRESS}?ts=${date}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&hash=${hash}&limit=${howManyToFetch}&offset=${howManyToSkip}`

axios.get(connectionString)
.then(function (response) {
    characters=response.data.data.results
  })
