var express = require ('express');
var server = express();
  
var ericomServer='http://10.81.108.10:8080/AccessNow/start.html';

server.configure(function() {
    server.use(express.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({secret: 'my super secret'}));
    });

server.use(express.static(__dirname + '/website'));
server.use(express.static(__dirname + '/scripts'));

server.post('/set', function (req, res) {
    console.log('test called');
    req.session.username = req.body.name;
    res.send('set ok');
});

server.get('/read', function(req, res) {
   if(req.session.username)
   {
       res.send(req.session.username);
   } 
   else
   {
       res.send('no data');
   }  
});

server.post('/login', function(req, res) {
    console.log('login');
    // do login stuff

    res.redirect('/calder.html');
});

server.get('/launch/:app', function(req, res) {
    console.log('launch called');
    console.log('Cookies: '+req.cookies);
    console.log('App: '+req.params.app);

    res.cookie('EAN_username', 'administrator');
    res.cookie('EAN_password', 'cisco123!');
    res.cookie('EAN_autostart', 'true');
    res.cookie('EAN_remoteapplicationmode', 'true');

    var appPath;
    switch (req.params.app) {
        case 'aptana': {
            appPath = '"C:\\Users\\Administrator\\AppData\\Local\\Aptana Studio 3\\AptanaStudio3.exe"';
            break;
        };
	case 'desktop': {
	    res.cookie('EAN_remoteapplicationmode', 'false');
            console.log('Launching: desktop');
	    break;
	}
	default: {
	    appPath = req.params.app;
	};
    };

    if (appPath) {
	console.log('Launching: ' + appPath);
        res.cookie('EAN_alternate_shell', appPath);
    }

    res.redirect(ericomServer);
});


// listen
var port = process.env.PORT || 3000;
server.listen(port, function () {
	console.log('Calder Demo - listening on '+port);
});

