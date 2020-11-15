window.onload = function() {
    var html = document.documentElement;

    var fontsfile = document.createElement('link');
    fontsfile.href = pathTemplate + 'css/fonts.css';
    fontsfile.rel = 'stylesheet';
    document.head.appendChild(fontsfile);

    if (sessionStorage.fontsLoaded) {
        html.classList.add('fonts-loaded');
    } else {
        var script = document.createElement('script');
        script.src = pathTemplate + 'js/fontfaceobserver.js';
        script.async = true;

        script.onload = function () {
            var Inter300 = new FontFaceObserver('Inter', {
                weight: '300'
            });
            var Inter400 = new FontFaceObserver('Inter', {
                weight: 'normal'
            });
            var Inter500 = new FontFaceObserver('Inter', {
                weight: '500'
            });
            var Inter600 = new FontFaceObserver('Inter', {
                weight: '600'
            });
            var FiraSans300 = new FontFaceObserver('FiraSans', {
                weight: '300'
            });
            var FiraSans400 = new FontFaceObserver('FiraSans', {
                weight: 'normal'
            });
            var FiraSans500 = new FontFaceObserver('FiraSans', {
                weight: '500'
            });
            var FiraSans600 = new FontFaceObserver('FiraSans', {
                weight: '600'
            });
            var FiraSans700 = new FontFaceObserver('FiraSans', {
                weight: 'bold'
            });
            var FiraSans800 = new FontFaceObserver('FiraSans', {
                weight: '800'
            });
            var JetBrainsMono500 = new FontFaceObserver('JetBrainsMono', {
                weight: '500'
            });
            var JetBrainsMono700 = new FontFaceObserver('JetBrainsMono', {
                weight: 'bold'
            });

            Promise.all([
                Inter300.load(),
                Inter400.load(),
                Inter500.load(),
                FiraSans300.load(),
                FiraSans400.load(),
                FiraSans600.load(),
                FiraSans700.load(),
                FiraSans800.load(),
                JetBrainsMono500.load(),
                JetBrainsMono700.load()
            ]).then(function () {
                html.classList.add('fonts-loaded');
                sessionStorage.fontsLoaded = true;
            });
        };
        document.head.appendChild(script);
    }
}