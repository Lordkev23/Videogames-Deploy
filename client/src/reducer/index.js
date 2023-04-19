
const initialState = {
    videogames_Global : [],
    allVideogames_Global : [],
    genres_Global: [],
    details_Global: [],
    platforms_Global: [],
    gamePerId_Global: [],
    gamesCreated_Global: []
}

function rootReducer (state = initialState, action){
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            if(action.payload){
                return {
                    ...state,
                    videogames_Global: action.payload,
                    allVideogames_Global : action.payload,
                    gamesCreated_Global : action.payload.slice(100)
                }
            } else {
                return {
                    ...state,
                    videogames_Global: []
                }
            }

        case 'GET_VIDEOGAMES_PER_NAME':
            return {
                ...state,
                videogames_Global:action.payload
            }

        case 'GET_VIDEOGAMES_PER_ID':
            return {
                ...state,
                details_Global: action.payload
            }

        case 'GET_GENRE':
            let genree = action.payload
            genree.unshift('All')
                return{
                    ...state,
                    genres_Global:genree
                }

        case 'GET_PLATFORMS':
            return{
                ...state,
                platforms_Global: action.payload
            }

        case 'FILTER_VIDEOGAME_PER_GENRE':
            const allVideogames = state.allVideogames_Global;
            const createFilter = action.payload === 'All' ? allVideogames : allVideogames.filter(element => element.genres.includes(action.payload))
            if(createFilter.length === 0){
                alert(`No videogames found for ${action.payload} genre`)
                return state
            } else {
                return{
                ...state,
                videogames_Global: createFilter
               }
            }
            
        case 'POST_VIDEOGAME':
            return{
                ...state
            }

        case 'DELETE_VIDEOGAME':
            return{
                ...state
            }

        case 'VIDEOGAMES_ORIGIN':
            const originOfVideogame = state.allVideogames_Global
            const originOfFilter = action.payload === 'DB' ? originOfVideogame.filter(element => element.origin === 'DB') : originOfVideogame.filter(element => element.origin === 'API')
            return{
                ...state,
                videogames_Global: action.payload === 'All' ? state.allVideogames_Global : originOfFilter
            }

        case 'SORT_VIDEOGAMES':
            if(action.payload === 'rating'){
                let sortVideogames =state.videogames_Global.sort(function(a, b){
                    if(a.rating > b.rating){
                        return -1;
                    }
                    if(b.rating > b.rating){
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    videogames_Global: sortVideogames
                }
            } else {
                let sortVideogames = action.payload === 'asc' ? state.videogames_Global.sort(function(a, b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                }) : state.videogames_Global.sort(function(a, b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
                return{
                    ...state,
                    videogames_Global: sortVideogames
                }
            }
            
        case 'GET_GAMES_CREATED':
            const creados = action.payload === 'DB' ? state.gamesCreated_Global  : 
            action.payload === 'API' ? state.allVideogames_Global.slice(0,100):state.allVideogames_Global
            return{
                ...state,
                videogames_Global: creados
            }
        default:
            return state;
    }
}

export default rootReducer;
