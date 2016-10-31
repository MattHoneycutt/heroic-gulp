(function() {
    console.log('Hello there!');
    
    angular.module('app',[])
        .config($provide => {
            console.log('got $provide!', $provide);
        });

})();