import { shallowMount, mount } from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage'
import PokemonPicture from '@/components/PokemonPicture'
import PokemonOptions from '@/components/PokemonOptions'
import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonPage component', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(PokemonPage)
    })

    test('debe de hacer match con el snapshot', () => {
        //
    })
    
    
    test('debe de llamar mixPokemonArray al montar', () => {
        
        const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixedPokemonsArray')
        const wrapper = shallowMount(PokemonPage)

        expect(mixPokemonArraySpy).toHaveBeenCalled()
    })
    
    
    test('debe de hacer match con el snapshot cuando cargan los pokemons', () => {
        
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[1],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })


    test('debe de mostrar los componentes PokemonPicture y PokemonOptions', () => {

        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[3],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        const componentPicture = wrapper.findComponent(PokemonPicture);
        const componentOptions = wrapper.findComponent(PokemonOptions);

        // PokemonPicture debe existir
        expect(componentPicture.exists()).toBe(true)
        // PokemonOptions debe existir
        expect(componentOptions.exists()).toBe(true)
        
        // PokemonPicture attribute pokemonid === 5
        expect(componentPicture.attributes('pokemonid')).toBe('4')
        // PokemonOptions attribte pokemons toBe(true)
        expect(componentOptions.attributes('pokemons')).toBe('[object Object],[object Object],[object Object],[object Object]')
    })


    test('pruebas checkAnswer', async () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[3],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        await wrapper.vm.checkAnswer(4)

        expect(wrapper.find('h2').exists()).toBeTruthy()
        expect(wrapper.vm.showPokemon).toBe(true)
        expect(wrapper.find('h2').text()).toBe(`Correcto, es ${pokemons[3].name}`)
    })


    test('pruebas checkAnswer - error', async () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[3],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        await wrapper.vm.checkAnswer(10)

        expect(wrapper.vm.message).toBe(`Oops, era ${pokemons[3].name}`)
    })
})