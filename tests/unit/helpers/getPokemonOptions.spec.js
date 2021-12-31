import { getPokemons, getPokemonsName, getPokemonOptions } from '@/helpers/getPokemonOptions'

describe('getPokemonOptions helpers', () => {

    test('debe regresar un arreglo de numeros', () => {
        
        const pokemons = getPokemons()

        expect(pokemons.length).toBe(650)
        expect(pokemons[0]).toBe(1)
        expect(pokemons[250]).toBe(251)
        expect(pokemons[500]).toBe(501)
        expect(pokemons[649]).toBe(650)
    })


    test('debe de retornar un arreglo de 4 elementos con los nombre de pokemons', async () => {

        const pokemonsExpected = [
            { id: 1, name: 'bulbasaur' },
            { id: 2, name: 'ivysaur' },
            { id: 3, name: 'venusaur' },
            { id: 4, name: 'charmander' }
        ]

        const pokemons = await getPokemonsName([1,2,3,4])

        expect(pokemons).toEqual(expect.arrayContaining(pokemonsExpected))
    })


    test('getPokemonOptions debe de retornar un arreglo mezclado', async () => {

        const pokemons = await getPokemonOptions()

        expect(pokemons.length).toBe(4)

        expect(pokemons).toEqual([
            { 
                id: expect.any(Number), 
                name: expect.any(String) 
            },
            { 
                id: expect.any(Number), 
                name: expect.any(String) 
            },
            { 
                id: expect.any(Number), 
                name: expect.any(String)
            },
            { 
                id: expect.any(Number), 
                name: expect.any(String)
            }
        ])

    })
})