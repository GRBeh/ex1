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
    let promise = new Promise((resolve,reject)=>{
      this.dataService.getAll().subscribe( item => { 
        resolve(item)
      })
    });   
    promise.then(res => this.getById(res));
  }
  

  getById(item){
    item.results.forEach(pokemon => {
        this.dataService.getById(pokemon.url).subscribe(details =>{
        this.detailsList.push(details);
        });
    }); 
  }
  
}