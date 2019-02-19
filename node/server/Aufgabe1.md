function schalteLED(ledName, status) {
  if ('rot' === ledName) {
    schalteRot(status);
  } else if ('gelb' === ledName) {
    schalteGelb(status);
  } else if ('gruen' === ledName) {
    schalteGruen(status);
  }
}