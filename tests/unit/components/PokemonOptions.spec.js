import { shallowMount } from '@vue/test-utils'
import PokemonOptions from '@/components/PokemonOptions'

import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonOptions component', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(PokemonOptions, {
            props: {
                pokemons
            }
        })
    })

    test('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })


    test('debe de mostrar las 4 optiones correctamente', () => {

        const liTags = wrapper.findAll('li')
        const [item1, item2, item3, item4] = liTags

        expect(liTags.length).toBe(4)
        expect(item1.text()).toBe('bulbasaur');
        expect(item2.text()).toBe('ivysaur');
        expect(item3.text()).toBe('venusaur');
        expect(item4.text()).toBe('charmander');
    })


    test('debe de emitir "selectionPokemon" con sus respectivos parámetros al hacer click', () => {
        
        const [item1, item2, item3, item4] = wrapper.findAll('li')

        item1.trigger('click')
        item2.trigger('click')
        item3.trigger('click')
        item4.trigger('click')

        expect(wrapper.emitted('selectionPokemon').length).toBe(4)
        expect(wrapper.emitted('selectionPokemon')[0]).toEqual([1])
        expect(wrapper.emitted('selectionPokemon')[1]).toEqual([2])
        expect(wrapper.emitted('selectionPokemon')[2]).toEqual([3])
        expect(wrapper.emitted('selectionPokemon')[3]).toEqual([4])

    })

})