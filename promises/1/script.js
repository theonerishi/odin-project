let promise = new Promise(function(resolve, reject) {
    resolve(1);
    setTimeout(() => resolve(2), 1000);

})
promise.then(alert);
// the output is 1 because further calls are ignored
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    
}
delay(3000).then(() => alert('runs after 3 seconds'));
