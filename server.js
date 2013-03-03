var express = require ('express');
var app = express();
var http = require ('http');

app.use(express.cookieParser());
app.use(express.cookieSession({ secret: 'Calder Demo Secret', cookie: { maxAge: 60 * 60 * 1000 }}));

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'my super secret'}));
    app.use(express.static(__dirname + '/website'));    
    app.use(express.static(__dirname + '/website/script'));
    app.use(express.static(__dirname + '/website/content'));
    });

app.post('/set', function (req, res) {
    console.log('set called');
    req.session.username = req.body.name;
    res.cookie('mycookie', req.body.name);
    res.send('session.username set to ' + req.body.name);
});

app.get('/read', function(req, res) {
   if(req.session.username)
   {
       var result = 'session.username: ' + req.session.username + '<br>';
       result += 'cookie: ' + req.cookies.mycookie +'<br>';
       
       result += req.cookies;
       res.send(result);
   } 
   else
   {
       res.send('no data');
   }  
});

app.get('/workspace', function(req, res) {
    console.log('/workspace')
    console.log('id: '+req.query.csuserid);
    console.log('manager:'+req.query.csmanager);
    if (req.query.csmanager)
    {
        req.session.csuserid = req.query.csuserid;
        req.session.csmanager = req.query.csmanager;
    }
    
    res.redirect('/calder.html');
});

var myAppsLocal = {"apps": [
        {"name": "Outlook", "imagefile": "outlook.png", "exe": "/launch/outlook"},        
        {"name": "Word", "imagefile": "word.png", "exe": "/launch/word"},        
        {"name": "Excel", "imagefile": "excel.png", "exe": "/launch/excel"},        
        {"name": "Powerpoint", "imagefile": "powerpoint.png", "exe": "/launch/powerpoint"},        
        {"name": "Paint", "imagefile": "mspaint.png", "exe": "http://10.81.108.14:3000/launch/mspaint"},        
        {"name": "Aptana", "imagefile": "aptana.png", "exe": "10.81.108.14:3000/launch/aptana"},

    ]
};
    
app.get('/myapps', function(req, res) {
    console.log('/myapps');

    if (process.argv[2] == 'c9') {
        res.send(JSON.stringify(myAppsLocal));   
    }
    else {
//if (req.session.csmanager == undefined) {
        var options = {
          host: req.session.csmanager,
          path: '/myapps?id='+req.session.csuserid,  
          port: 3000,
          method: 'GET'
        };

        var callback = function(response) {
            console.log('callback');
          var str = '';
        
          //another chunk of data has been recieved, so append it to `str`
          response.on('data', function (chunk) {
            str += chunk;
          });
        
          //the whole response has been recieved, so we just print it out here
          response.on('end', function () {
                console.log(str);
                res.send(str);
          });
        };
        
        console.log('getting apps from: '+options.host + '  path:' + options.path);
        
        http.request(options, callback).end();    
    }
});

app.get('/launch/:app', function(req, res) {
    if (req.session.csmanager)
    {
        console.log('oops');
    }
    else
    {
        console.log('launch called: App: '+req.params.app);
        
        // set cookies (works only if Ericom is on the same server
    
        res.cookie('EAN_username', 'Tom');
        res.cookie('EAN_password', 'Cisco123!');
        res.cookie('EAN_autostart', 'true');
        res.cookie('EAN_remoteapplicationmode', 'true');
    
        var appPath;
        switch (req.params.app) {
        case 'aptana': 
            appPath = '"C:\\Users\\Administrator\\AppData\\Local\\Aptana Studio 3\\AptanaStudio3.exe"';
            break;
        case 'desktop': 
            res.cookie('EAN_remoteapplicationmode', 'false');
            console.log('Launching: desktop');
            break;
        default: 
            appPath = req.params.app;
        
        }
    
        if (appPath) {
            res.cookie('EAN_alternate_shell', appPath);
            console.log('Launching: ' + appPath);
        } 
        
        var url = ericomurl;
        if (appPath) {
            url += '?autostart=true&remoteapplicationmode=true&username=Tom&password=Cisco123!&alternate_shell=';
            url += appPath;        
        }    
        else {
            url += '?autostart=true&username=Tom&password=Cisco123!';
        }
        
        console.log(url);
        res.redirect(url);
    }

//    res.redirect(ericomurl);
});


// listen
var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Calder Demo - listening on '+port);
    console.log(process.argv);
});

