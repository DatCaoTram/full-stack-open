import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)  
                .then(response => response.data)
                .catch(error => console.log("fail"))
    return request
}

const create = newPerson => {
    const response = axios.post(baseUrl, newPerson)
    .then(response => {
        console.log("create succesful") 
        return response.data
    })
    .catch(error => console.log("fail"))
    return response 
}

const update = updatePerson => {
    axios.put(`${baseUrl}/${updatePerson.id}`, updatePerson)
    .then(response => console.log("update succesful"))
    .catch(error => console.log("fail"))
}

const remove = personId => {
    const response = axios.delete(`${baseUrl}/${personId}`)
    .then(response => {
        return Promise.resolve()
    })
    .catch(error => {
        return Promise.reject()
    })
    return response
}

export default { create, getAll, update, remove }