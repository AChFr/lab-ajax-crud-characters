class APIHandler {


    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://minions-api.herokuapp.com'
        })
    }

    getAllCharacters() {
        return this.axiosApp.get('/characters')
    }

    getOneCharacter(characterId) {
        return this.axiosApp.get(`/characters/${characterId}`)
    }

    saveCharacter(characterInfo) {
        console.log("este es el bueno ", characterInfo)
        return this.axiosApp.post('/characters', characterInfo)
    }

    editCharacter(characterId, characterInfo) {
        return this.axiosApp.put(`/characters/${characterId}`, characterInfo)
    }

    deleteCharacter(characterId) {
        return this.axiosApp.delete(`/characters/${characterId}`)
    }

}
