import { Component } from '@angular/core';
import { AlertController, TextInput } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  words: string[] = [];
  typeOfTag: string = "i";
  source: string = "";
  constructor(
    private alertCtrl: AlertController
  ) {

  }

  verifyKeyboardEnter(event: KeyboardEvent, input: TextInput) {
    if (event.keyCode === 13) this.addWord(input);
  }

  addWord(input: TextInput) {
    let wordTreated = input.value.trim();
    if(!wordTreated) return;

    this.words.push(wordTreated);
    this.cleanInput(input);
    this.convertSource(wordTreated);
  }

  cleanInput(input: TextInput) {
    input.value = "";
  }

  convertSource(word: string) {
    this.addReplace(word)
  }

  addReplace(word: string) {
    let regex = new RegExp(`\\b${word}\\b`, 'gm');
    this.source = this.source.replace(regex, `<${this.typeOfTag}>${word}</${this.typeOfTag}>`);
  }

  removeReplace(word: string) {
    let regex = new RegExp(`<${this.typeOfTag}>${word}<\/${this.typeOfTag}>`, 'gm');
    this.source = this.source.replace(regex, word);
  }

  removeWords() {
    this.alertCtrl.create({
      title: 'Are you sure?',
      subTitle: 'Are you want do this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          role: 'yes',
          handler: () => {
            this.words.forEach((word) => this.removeReplace(word));
            this.words = [];
          }
        }
      ]
    })
    .present();
  }

  removeWord(index: number) {
    this.removeReplace(this.words[index]);
    this.words.splice(index, 1);
  }

}
