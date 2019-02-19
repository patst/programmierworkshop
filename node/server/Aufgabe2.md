async function blinkeLED(anzahl) {
  let zaehler = 0;
  while(zaehler < anzahl) {
    schalteGelb('on');
    await sleep(1);
    schalteGelb('off');
    await sleep(1);
    zaehler = zaehler + 1;
  }
}