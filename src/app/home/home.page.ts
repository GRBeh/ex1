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
arr1 : any
arr2 = []

  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.dataService.getAll().subscribe(response => { 
      this.pokemons = response.results;
      //console.log(this.pokemons);
      this.detailsList = [];
      let i = 0;
       response.results.forEach(element => {
       this.dataService.getRemoteData(element.url).subscribe(details =>{
        this.detailsList.push(details);
        console.log(details.name)
       // this.arr1[i] = details.name;
       // this.arr2[i] = details.moves;
        i++
       });
      
      }); 
      this.detailsList
    });
     

    // this.dataService.getAll().subscribe(data2 => {
    //   let dt = "";
    //   data2.results.forEach(element => {
    //     dt = dt + '<ion-card>'
    //       + '<p id = "name-' + element.name + '">filler</p>'
    //       + '<p id = "sprite-' + element.name + '">filler</p>'
    //       + '<p id = "moves-' + element.name + '">filler</p>'
    //       + '</ion-card>'
    //   });
    //   document.getElementById("pokemon").innerHTML = dt;
    //   data2.results.forEach(element => {
    //     this.dataService.getRemoteData(element.url).subscribe(data => {
    //       document.getElementById("name-" + data.name + "").innerHTML =
    //         '<ion-card-header><ion-card-title class="ion-text-capitalize">' + data.name + '</ion-card-title></ion-card-header>';
    //       let moveList = "";
    //       data.moves.forEach(move => {
    //         moveList = moveList + "<ion-card-content>" + move.move.name + "</ion-card-content>"
    //       });
    //       document.getElementById("moves-" + data.name + "").innerHTML = moveList;
    //       document.getElementById("sprite-" + data.name + "").innerHTML = "<img src=\"" + data.sprites.front_default + "\">";
    //     });
    //   });
    // });
    
  }
}