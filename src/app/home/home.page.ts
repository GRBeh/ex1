import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { DataService } from "../service/data.service"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

pokemons : Object
detailsList : any

  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.dataService.getAll().subscribe(response => { 
      this.pokemons = response.results;
      this.detailsList = [];
       response.results.forEach(pokemon => {
       this.dataService.getRemoteData(pokemon.url).subscribe(details =>{
        this.detailsList.push(details);
       });
      }); 
    }); 
  }
}