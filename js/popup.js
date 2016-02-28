$(document).ready(function() {
  var target = document.getElementById('spinner');
  var spinner = new Spinner().spin(target);

  var usd_eur = "https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDRUB,EURRUB%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback="

  $.ajax({
    url: usd_eur,
    success: (function(retval) {
      $('#dollar-text').text(retval.query.results.rate[0].Rate);
      $('#euro-text').text(retval.query.results.rate[1].Rate);
    })
  }).then(function() {
    $.ajax({
      url: "https://btc-e.com/api/2/btc_usd/ticker",
      success: (function(retval) {
        var bitcoin = JSON.parse(retval);
        $('#bitcoin-text').text(bitcoin.ticker.last + "$")
      })
    }).then(function() {
      spinner.stop();
      $('#currency').show();
    })
  })

})