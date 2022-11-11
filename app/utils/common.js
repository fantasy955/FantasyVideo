const faker = require('faker')
const seedrandom = require('seedrandom')

let useSeededRNG = false
let rng = seedrandom()

if (useSeededRNG) {
    let randomSeedString = localStorage.getItem('randomTimestampSeed')
    let seedDate

    if (randomSeedString) {
        seedDate = new Date(randomSeedString)
    } else {
        seedDate = new Date()
        randomSeedString = seedDate.toISOString()
        localStorage.setItem('randomTimestampSeed', randomSeedString)
    }

    rng = seedrandom(randomSeedString)
    faker.seed(seedDate.getTime())
}


function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(rng() * (max - min + 1)) + min
}

async function sleep(n) {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('time out')
        }, n)
    })
}

module.exports = { getRandomInt, sleep }
