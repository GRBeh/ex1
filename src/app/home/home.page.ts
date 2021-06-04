import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Component, OnInit } from '@angular/core';
import { resolve } from 'dns';
import { element } from 'protractor'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  detailsList: any

  constructor() {
    //this.getAll();
  }
  ngOnInit() {
  this.fetchPokemon();
  }

  fetchPokemon(){
    const promises = [];
    let promise;
    let idMax = 15; 
     for (let id = 1; id <= idMax; id++) {
       const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
       promises.push(fetch(url).then((res) => res.json()));
     }
    Promise.all(promises).then((results) => {
      const pokemon = results.map((result) => ({
        name: result.name,
        images: result.sprites['front_default'],
        moves: result.moves,
        type: result.types.map((type) => type.type.name).join(', '),
        id: result.id
      }));
      this.detailsList = pokemon;
    });
  };
 }