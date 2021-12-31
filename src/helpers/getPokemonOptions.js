import { pokemonApi } from "@/services/pokemonApi"

const getPokemons = () => {
    const pokemonsArr = Array.from(Array(605))
    
    return pokemonsArr.map((_, index) => index + 1)
}


const getPokemonOptions = async () => {
    const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5)

    const pokemons = await getPokemonsName(mixedPokemons.splice(0,4))

    return pokemons;
}


const getPokemonsName = async ([a,b,c,d] = []) => {

    const promiseArr = [
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`),
    ]

    const [pokemonA, pokemonB, pokemonC, pokemonD ] = await Promise.all(promiseArr)

    return [
        {id: pokemonA.data.id, name: pokemonA.data.name},
        {id: pokemonB.data.id, name: pokemonB.data.name},
        {id: pokemonC.data.id, name: pokemonC.data.name},
        {id: pokemonD.data.id, name: pokemonD.data.name},
    ]

}


export {
    getPokemonOptions
}