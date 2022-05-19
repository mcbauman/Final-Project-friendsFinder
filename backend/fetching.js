import crypto from "crypto"
import dotenv from "dotenv"
import axios from "axios"

dotenv.config()

let date=Date.now()
let tobehashed=`${date}${process.env.REACT_APP_MARVEL_PRIVATE_KEY}${process.env.REACT_APP_MARVEL_PUBLIC_KEY}`
console.log(tobehashed);
let hash=crypto.createHash("md5").update(tobehashed).digest("hex");
console.log(hash);

let connectionString=`${process.env.REACT_APP_MARVELAPI}${process.env.REACT_APP_ADRESS}?ts=${date}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&hash=${hash}`
console.log(connectionString);

axios.get(connectionString)
.then(function (response) {
    console.log(response);
  })
