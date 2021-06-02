import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { DataService } from "../service/data.service"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.dataService.getAll().subscribe(data2 =>{
      console.log(data2);   
      data2.results.forEach(element => {
        console.log(element.url);
        console.log(element.name);
        this.dataService.getRemoteData(element.url).subscribe(data => {
          console.log(data);
          document.getElementById("name").innerHTML =
            '<ion-card-header><ion-card-title class="ion-text-capitalize">' + data.name + '</ion-card-title></ion-card-header>';
          let moveList = "";
          data.moves.forEach(move => {
            moveList = moveList + "<ion-card-content>" + move.move.name + "</ion-card-content>"
          });
          document.getElementById("moves").innerHTML = moveList;
          document.getElementById("sprite").innerHTML = "<img src=\"" + data.sprites.front_default + "\">";
        });
      });    
    });
  }
}