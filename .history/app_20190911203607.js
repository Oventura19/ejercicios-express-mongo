$(document).ready(function() {
    var ua = navigator.userAgent.match(/(opera|chrome|safari|firefox)\/?\s*(\.?\d+(\.\d+)*)/i),
        browser;
    if (navigator.userAgent.match(/Edge/i) || navigator.userAgent.match(/Trident.*rv[ :]*11\./i)) {
        browser = "msie";
    } else {
        browser = ua[1].toLowerCase();
    }
    $('div.icon.' + browser).addClass("active");
});

app.listen(3000, () => console.log('listenig on port 3000'));