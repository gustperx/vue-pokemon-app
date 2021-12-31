<template>
    <h1 v-if="!pokemon">Espere por favor...</h1>
    <div v-else>
        <h1>¿Quien es este Pokemón?</h1>
        <PokemonPicture 
            :pokemon-id="pokemon.id" 
            :show-pokemon="showPokemon" />

        <PokemonOptions 
            :pokemons="pokemonArr" 
            @selection-pokemon="checkAnswer" />

        <template v-if="showAnswer">
            <h2>{{ message }}</h2>
            <button @click="newGame">
                Nuevo Juego
            </button>
        </template>
    </div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture'
import PokemonOptions from '@/components/PokemonOptions'

import { getPokemonOptions } from '@/helpers/getPokemonOptions'

export default {
    name: "PokemonPage",

    data() {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''
        }
    },

    components: {
        PokemonPicture, 
        PokemonOptions
    },

    methods: {
        async mixedPokemonsArray() {
            this.pokemonArr = await getPokemonOptions()
            const rndInt = Math.floor(Math.random() * 4)
            this.pokemon = this.pokemonArr[rndInt]
        },
        checkAnswer(selectedId) {
            this.showPokemon = true
            this.showAnswer = true

            if (selectedId === this.pokemon.id) {
                this.message = `Correcto, es ${this.pokemon.name}`
            } else {
                this.message = `Oops, era ${this.pokemon.name}`
            }
        },
        newGame() {
            this.showPokemon = false
            this.showAnswer = false
            this.message = ''
            this.pokemon = null;
            this.pokemonArr = []
            this.mixedPokemonsArray()
        }
    },

    mounted() {
        this.mixedPokemonsArray()
    }
}
</script>
