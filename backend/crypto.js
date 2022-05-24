import bcrypt from "bcrypt"

function hash(password){
    return bcrypt.hash(password,3)
}

function compareHashes(password, hash){
    return bcrupt.compare(password, hash)
}

export {hash,compareHashes}