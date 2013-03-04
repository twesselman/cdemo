$(document).ready(function() {
    $('#addappbutton').click(launchAppStore);
    readApps();
    });

function launchpopup(url, x, y, width, height ) {
    x = x || 20;
    y = y || 20;
    width = width || 1024;
    height = height || 768

    newwindow=window.open(url, 'popup', 'left=' + x + ', top=' + y + ', height=' + height + ',width=' + width + ', status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=0,scrollbars=0');
}

function launchAppStore() {
    launchpopup('/appstore.html', 400,200, 600,400);
}

function readApps() {
    'use strict';
    var sUrl = "/myapps";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", sUrl, false);
    xmlHttp.send(null);
    var myapps=xmlHttp.responseText;
    console.log(myapps);
    var arrayApps = JSON.parse(myapps).apps;

    var htmlMenu = [], iMenu = 0,
        htmlTable = [], iTable = 0,
        index = 0;

    htmlTable[iTable++] = '<tr>';
    for (index in arrayApps) {
        // add table element
        htmlTable[iTable++] = '<td>';  
        htmlTable[iTable++] = '<button class="appbutton" title="' + arrayApps[index].exe + '" ';
        htmlTable[iTable++] = 'onclick="launchpopup(\'' + arrayApps[index].exe + '\')">';
        htmlTable[iTable++] = '<img class="appimg" src="' + arrayApps[index].imagefile + '"/>';
        htmlTable[iTable++] = '<br><span class="apptext" >' + arrayApps[index].name + '</span>';
        htmlTable[iTable++] = '</button>';
        htmlTable[iTable++] = '</td>';
        
        // add a row after every 4'th element
        if (((parseInt(index)+1)%4) === 0) {
            htmlTable[iTable++] = '</tr>';
            htmlTable[iTable++] = '<tr>';
        }
        
        // add menu item
        htmlMenu[iMenu++] = '<li><a href="" ';
        htmlMenu[iMenu++] = 'onclick="launchpopup(\'' + arrayApps[index].exe + '\')">';
        htmlMenu[iMenu++] = '<img class="menuappimg" src="' + arrayApps[index].imagefile + '"/>';
        htmlMenu[iMenu++] = arrayApps[index].name + '</a></li>';
    }
    htmlTable[iTable++] = '</tr>';
    
    $('#apptable').html(htmlTable.join(''));  
    $('#appmenu').html(htmlMenu.join(''));
}


