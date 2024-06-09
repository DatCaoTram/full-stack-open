import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)  
                .then(response => response.data)
                .catch(error => console.log("fail"))
    return request
}

const create = newPerson => {
    axios.post(baseUrl, newPerson)
    .then(response => {
        console.log("succesful")
    })
    .catch(error => {
        console.log("fail")
    })
}

const update = updatePerson => {
    axios.put(`${baseUrl}/${updatePerson.id}`, updatePerson)
    .then(response => console.log("update succesful"))
    .catch(error => console.log("fail"))
}

const remove = personId => {
    axios.delete(`${baseUrl}/${personId}`)
    .then(response => console.log("delete succesfully"))
    .catch(error => console.log("fail"))
}

export default { create, getAll, update, remove }