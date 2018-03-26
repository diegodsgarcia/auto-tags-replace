import { Component } from '@angular/core';
import { NavController, TextInput } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  words: string[] = [];
  typeOfTag: string = "i";
  constructor(public navCtrl: NavController) {

  }

  verifyKeyboardEnter(event: KeyboardEvent, input: TextInput) {
    if (event.keyCode === 13) this.addWord(input);
  }

  addWord(input: TextInput) {
    let wordTreated = input.value.trim();
    if(wordTreated) this.words.push(wordTreated);

    this.cleanInput(input);
  }

  cleanInput(input: TextInput) {
    input.value = "";
  }

  removeWord(index: number) {
    this.words.splice(index, 1);
  }

  convert(source: string) {
    if(!this.words.length) return;
    this.words.forEach((word) => {
      this.executeRegex(word);
    })
  }

  executeRegex(word: string) {
    let regex = new RegExp(`\b${word}\b`);
    console.log(regex);
  }


}
