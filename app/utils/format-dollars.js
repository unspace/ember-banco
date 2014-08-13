export default function(cents) {
  var isNeg   = cents < 0;
  var dollars = (Math.abs(cents) / 100).toFixed(2);

  return isNeg ? '(-$' + dollars + ')' : '$' + dollars;
}
