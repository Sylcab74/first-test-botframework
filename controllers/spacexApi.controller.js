//Personnal Wrapper with promises for better asynchronous gestion

const axios = require('axios')

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

exports.getLaunchesByYears = async (year = "2018") => {

    return new Promise((resolve, reject) => {
        axios.get( `${options.url}launches?launch_year=${year}`)
           
            .then((response) => {
                resolve(response.data)
            })
           
            .catch((error) => {
                reject(error)
            })
    })
}

exports.getCompanyInfo = async () => {

    return new Promise((resolve, reject) => {
        axios.get(`${options.url}info`)
            
            .then((response) => {
                resolve(response.data)
            })

            .catch((error) => {
                reject(error)
            })
    })
}