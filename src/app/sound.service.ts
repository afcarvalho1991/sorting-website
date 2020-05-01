import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  audio
  constructor()
  {
    this.audio =new Audio('https://freesound.org/people/Bertrof/sounds/131660/download/131660__bertrof__game-sound-correct.wav');
  }

  async play()
  {
    this.audio.play()
  }
}
