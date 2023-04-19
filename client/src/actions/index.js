import axios from 'axios';

//connection between front and back
export function getVideogames(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/videogamesRoutes');
        console.log(json)
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
            
        })
    }
}

export function getGenres(){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/genresRoutes');
        // console.log(json.data)
        const filerGenres = json.data.map(element => element.name)
        console.log(filerGenres)
        return dispatch({
            type: 'GET_GENRE',
            payload: filerGenres
            
        })
    }
}

export function getPlatforms(){
    return async function(dispatch){
        const result = await axios.get('http://localhost:3001/platform');
        return dispatch({
            type: 'GET_PLATFORMS',
            payload: result.data
        })
    }
}

export function getVideogamesId(id){
    return async function(dispatch){
        try{
            const result = await axios.get(`http://localhost:3001/videogameRoutes/${id}`)
            return dispatch({
                type: 'GET_VIDEOGAMES_PER_ID',
                payload: result.data
            })
        } catch(error){
            console.log('Error in action GET_VIDEOGAMES_PER_ID: ', error);
        }
    }
}

export default function getVideogameName(name){
    return async function(dispatch){
        try {
            const result = await axios.get(`http://localhost:3001/videogamesRoutes?name=${name}`);
            console.log(result);
            return dispatch({
                type: 'GET_VIDEOGAMES_PER_NAME',
                payload: result.data
            })
        } catch (error) {
            console.log('Error in action GET_VIDEOGAMES_PER_NAME: ', error);
        }
    }
}

// export function postVideogame(payload){
//     return async function(dispatch){
//         const result = await axios.post('http://localhost:3001/videogamesRoutes', payload);
//         return result
//     }
// }
export const postVideogame = (payload) => {
    return async function () {

        const postRecipe = await axios.post("http://localhost:3001/videogamesRoutes", payload)
        return postRecipe

    }
}
//

export function deleteVideogame(payload){
    return async function(dispatch){
        const result = await axios.post(`http://localhost:3001/videogamesRoutes/delete/:${payload}`)
        return result;
    }
}

export function filterVideogamesPerGenre(payload){
    return{
        type:'FILTER_VIDEOGAME_PER_GENRE',
        payload
    }
}

export function sortVideogames(payload){
    return{
        type: 'SORT_VIDEOGAMES',
        payload
    }
}

export function videogamesOrigin(payload){
    return{
        type: 'VIDEOGAMES_ORIGIN',
        payload
    }
}

export function getGamesCreated(payload){
    return{
        type: 'GET_GAMES_CREATED',
        payload
    }
}