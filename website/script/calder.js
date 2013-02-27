$(document).ready(function() {
    readApps();
    });

function readApps() {
    var xmlHttp = null;
	var sUrl = "/myapps";
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", sUrl, false );
    xmlHttp.send( null );
    var myapps=xmlHttp.responseText;
    console.log(myapps);
    var arrayApps = JSON.parse(myapps).apps;
     
    var htmlTable = [];
    var iTable = 0;
        
    var htmlMenu = [];
    var iMenu = 0;
    
    htmlTable[iTable++] = '<tr>';
    for (var index in arrayApps) {
        htmlTable[iTable++] = '<td>';  
        htmlTable[iTable++] = '<button class="appbutton" title="' + arrayApps[index].name + '" ';
        htmlTable[iTable++] = 'onclick="launchpopup(\'' + arrayApps[index].exe + '\')">';
        htmlTable[iTable++] = '<img class="appimg" src="' + arrayApps[index].imagefile + '"/>';        
        htmlTable[iTable++] = '<br><span class="apptext" >' + arrayApps[index].name + '</span>';        
        htmlTable[iTable++] = '</button>';
        htmlTable[iTable++] = '</td>';   
        
        if (((parseInt(index)+1)%4) === 0) {
            htmlTable[++iTable] = '</tr>';
            htmlTable[iTable++] = '<tr>';
        }
        
        htmlMenu[iMenu++] = '<li><a href="" ';
        htmlMenu[iMenu++] = 'onclick="launchpopup(\'' + arrayApps[index].exe + '\')">';
        htmlMenu[iMenu++] = '<img class="menuappimg" src="' + arrayApps[index].imagefile + '"/>'; 
        htmlMenu[iMenu++] = arrayApps[index].name + '</a></li>';
    }
    htmlTable[++iTable] = '</tr>';
    
    $('#apptable').html(htmlTable.join(''));     
    $('#appmenu').html(htmlMenu.join(''));     
 };


function launchpopup(url) {
    alert(url);
 //   newwindow=window.open(url, "popup", "status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=0,scrollbars=0,height=800,width=1024");
}