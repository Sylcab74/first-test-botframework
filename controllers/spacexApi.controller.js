const axios = require('axios')
const adaptivecards = require('adaptivecards') 

const options = {
    url: "https://api.spacexdata.com/v2/"
}

exports.getLastLaunch = async () => {

    return new Promise((resolve, reject) => {
        axios.get(options.url + "launches/latest")
           
            .then((response) => {
                resolve(response.data)
            })
           
            .catch((error) => {
                reject(error)
            })
    })

}

exports.getAllLaunches = async () => {

    return new Promise((resolve, reject) => {
        axios.get(options.url + "launches?launch_year=2018")
           
            .then((response) => {
                resolve(response.data)
            })
           
            .catch((error) => {
                reject(error)
            })
    })

}