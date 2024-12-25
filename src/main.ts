import './style.css'
import { setupBuzzer } from './buzzer.ts'
import NoSleep from '@uriopass/nosleep.js';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="buzzer" class="buzzer"></div>
    <div id="reset" class="reset">RESET</div>
  </div>
`
var noSleep = new NoSleep();
noSleep.enable();

setupBuzzer(document.querySelector<HTMLDivElement>('#buzzer')!, document.querySelector<HTMLDivElement>('#reset')!)

