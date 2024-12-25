import './style.css'
import { setupBuzzer } from './buzzer.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>

    <div id="buzzer" class="buzzer"></div>
  
  </div>
`


setupBuzzer(document.querySelector<HTMLButtonElement>('#buzzer')!)
