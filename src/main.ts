import './style.css'
import { setupBuzzer } from './buzzer.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="buzzer" class="buzzer"></div>
    <div id="reset" class="reset">RESET</div>
  </div>
`

setupBuzzer(document.querySelector<HTMLDivElement>('#buzzer')!, document.querySelector<HTMLDivElement>('#reset')!)

let wakelock: any;

function releaseWakeState() {
  if(wakelock) wakelock.release();
  wakelock = null;
}

const canWakeLock = () => 'wakeLock' in navigator;

async function lockWakeState() {
  if(!canWakeLock()) return;
  try {
    wakelock = await navigator.wakeLock.request();
    wakelock.addEventListener('release', () => {
      console.log('Screen Wake State Locked:', !wakelock.released);
    });
    console.log('Screen Wake State Locked:', !wakelock.released);
  } catch(e) {
    console.error('Failed to lock wake state with reason:', e.message);
  }
}

await lockWakeState();