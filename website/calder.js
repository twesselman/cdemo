$(document).ready(function() {
//    $('#appbar').style.visibility = visible;
    $('#login').css('opacity', 1.0);
    
    $('#loginnow').click(function(event) {
        event.preventDefault();
        $('#mainmenu').css('opacity', 1.0 );
        $('#appbar').css('opacity', 0.0 );
        $('#apptablesection').css('opacity', 1.0 );
        $('#login').hide();
        readApps();
    });
    $('.exec_mspaint').click(function(event) {
        event.preventDefault();
        launchpopup('/launch/mspaint');
    })
 });
 
var myApps = {"apps": [
        {"name": "Outlook", "imagefile": "outlook.png", "exe": "/launch/outlook"},        
        {"name": "Word", "imagefile": "word.png", "exe": "/launch/word"},        
        {"name": "Excel", "imagefile": "excel.png", "exe": "/launch/excel"},        
        {"name": "Paint", "imagefile": "mspaint.png", "exe": "/launch/mspaint"},        
        {"name": "Aptana", "imagefile": "aptana.png", "exe": "/launch/aptana"}
    ]
};

 function readApps() {
     
    var arrayApps = myApps.apps;//JSON.parse(myApps);  
    
    var r = [];
    var i = 0;
    
    r[i++] = '<tr>';
    for (var index in arrayApps) {
        r[i++] = '<td>';  
        r[i++] = '<button class="appbutton" title="' + arrayApps[index].name + '" ';
        r[i++] = 'onclick="launchpopup(\'' + arrayApps[index].exe + '\')">';
        r[i++] = '<img class="appimg" src="' + arrayApps[index].imagefile + '"/>';        
        r[i++] = '<br><span class="apptext" >' + arrayApps[index].name + '</span>';        
        r[i++] = '</button>';
        r[i++] = '</td>';    
    }
    r[++i] = '</tr>';
    
    $('#apptable').html(r.join(''));     
 };


function launchpopup(url) {
    alert(url);
 //   newwindow=window.open(url, "popup", "status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=0,scrollbars=0,height=800,width=1024");
}