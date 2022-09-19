<template>
  <h1 v-if="!pokemon">Por espere...</h1>
  <div v-else>
      <h1>Quien es el Pokemon?</h1>
      <PokemonPicture :pokemonID="pokemon.id" :showPokemon="showPokemon"/>
      <PokemonOptions :pokemons="pokemons"
        @selection="checkAwnser"/>
    <template v-if="showAwnser">
        <h2 class="fade-in">{{message}}</h2>
        <button @click="newGame">Nuevo Juego</button>
    </template>
  </div>
</template>
<script>
import PokemonOptions from '@/components/PokemonOptions'
import PokemonPicture from '@/components/PokemonPicture';
import getPokemonsOptions from '@/helpers/getPokemonOptions';
//console.log(getPokemonsOptions())

export default {
    components:{
        PokemonOptions,
        PokemonPicture,
    },
    data(){
        return{
            pokemons:[],
            pokemon:null,
            showPokemon:false,
            showAwnser:false,
            message:''
        }
    },
    methods:{
        async mixPokemons(){
            this.pokemons= await getPokemonsOptions()
            const randomIndex=Math.floor(Math.random()*4)
            this.pokemon=this.pokemons[randomIndex]
        },
        checkAwnser(pokemonID){
            if(pokemonID===this.pokemon.id){
                this.message='Correcto'
            }else{
                this.message=`Incorrecto , era ${this.pokemon.name}`
            }
            this.showPokemon=true;
            this.showAwnser=true;
            setTimeout(this.newGame, 1500);
        },
        newGame(){
            this.pokemons=[]
            this.pokemon=null
            this.message=''
            this.showAwnser=false;
            this.showPokemon=false 
            this.mixPokemons()
        }
    },
    mounted(){
        this.mixPokemons();
    }
}
</script>
