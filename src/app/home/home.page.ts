import { ViewChild } from '@angular/core';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  detailsList: any 
  idMin = 1
  value:number = 1
  numPerPage = 1;

  constructor(private socialSharing:SocialSharing){
  }

  ngOnInit() {
    this.fetchPokemon(this.idMin);
  }

  shareWhatsapp(value) {
    this.socialSharing.shareViaWhatsApp(value, null, null);
  }
  shareEmail(value) {
    this.socialSharing.shareViaEmail(value, "Pokeapi", null, null, null, null);
  }
  shareTwitter(value) {
    this.socialSharing.shareViaTwitter(value, null, null);
  }

  fetchPokemon(idMin:number) {
    const promises = [];
    let promise;
    
    if(idMin<1)idMin = 1;
    let idMax = idMin + this.numPerPage;
    

    for (let id = idMin; id < idMax; id++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
      const pokemon = results.map((result) => ({
        name: result.name,
        images: result.sprites['front_default'],
        moves: result.moves.map((moves) => moves.move.name),
        type: result.types.map((type) => type.type.name).join(', '),
        id: result.id
      }));
      this.detailsList = pokemon;
      console.log(this.detailsList)
    });
  };

  nextPage(){
    console.log("nextpage");
   
    if((this.idMin+this.numPerPage )<600){
      this.idMin = this.idMin + this.numPerPage;
      this.fetchPokemon(this.idMin);      
      this.content.scrollToTop(1000);
    console.log("+",this.idMin);
    }
  }

  previousPage(){
    console.log("previouspage");
    if((this.idMin-this.numPerPage )>1){
    this.idMin = this.idMin - this.numPerPage;
    this.fetchPokemon(this.idMin);
    this.content.scrollToTop(1000);
    console.log("-",this.idMin);
    }
  }

  setIdMin(){
    if(this.value>0 && this.value != this.idMin){
      this.idMin = this.value;
      this.fetchPokemon(this.idMin);
      this.content.scrollToTop(1000);
    }
  }
}
