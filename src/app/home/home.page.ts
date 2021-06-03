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

detailsList =[]

  constructor(private dataService: DataService) {
    this.getAll();
   }
  ngOnInit() { }

  getAll(){
    this.dataService.getAll().subscribe( response => { 
     this.getById(response)
   }); 
  }
  
  getById(response){
    response.results.forEach(pokemon => {
      this.dataService.getById(pokemon.url).subscribe(details =>{
       this.detailsList.push(details);
      });
     }); 
  }
  
}