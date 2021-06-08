import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  detailsList: any 

  constructor(private socialSharing:SocialSharing){
  }

  ngOnInit() {
    this.fetchPokemon();
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

  fetchPokemon() {
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
        moves: result.moves.map((moves) => moves.move.name),
        type: result.types.map((type) => type.type.name).join(', '),
        id: result.id
      }));
      this.detailsList = pokemon;
      console.log(this.detailsList)
    });
  };
}