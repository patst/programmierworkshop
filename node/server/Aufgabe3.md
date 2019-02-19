async function schalteAmpelZu(ledName) {
  if ('rot' === ledName) {
    if (getState('rot') === 'off') {
      schalteLED('gelb', 'on');
      schalteLED('gruen', 'off');
      await sleep(3);
      schalteLED('rot', 'on');
      schalteLED('gelb', 'off');
    }
  } else if ('gruen' === ledName) {
    if (getState('gruen') === 'off') {
      schalteGelb('on');
      await sleep(3);
      schalteRot('off');
      schalteGelb('off')
      schalteGruen('on');
    }
  }
}