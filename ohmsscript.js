var col=1;
var d=0;
var rowSize=0;
var winWidth=0;
var docWidth=0;
var maxCols=1;
var newLine=false;
var firstHeight=0;
var bRow=1;
var w=0;
var o=0;

//*
function reload(){
    var container = document.getElementById("columnate");
    var content = container.innerHTML;
    container.innerHTML= content; 
}
//*/
function cord() {
	var colu=document.getElementById("columnate");
	var ww = window.innerWidth;
	winWidth = ww;
	var we = colu.clientWidth;
	if ( docWidth < we ) {
		docWidth=we;
	}
	var mc = Math.floor(winWidth/docWidth);
	if ( col=== 1 && mc > 1 ) {
		maxCols = mc;
	}
	
	var wb = window.innerHeight;
	var db = document.body.offsetHeight;
	var dod = colu.offsetHeight;

	w = bRow*wb;
	
	if ( firstHeight === 0 && dod === 0 ) {
		firstHeight = (db * 1.25);
		//w += firstHeight;
	}

	var rs = db-d;
	if (newLine && bRow===1 ) {
		d += firstHeight;
		newLine=false;
		//document.write( 'fh='+firstHeight );
	}

	if ( bRow>1 || col>1 ) {
		d += rowSize;
	} else {
		d=db;
	}
	

	var of= Math.ceil ( w * 0.05) ;
	var wn = 0;

	if ( bRow>1 ) {
		wn = wb ;
		w=wn;
	}else {
		wn = w * col - ( col * firstHeight );
	}
	o = wn - d;
	var off=of; 

	var nl = '<br />';
	//document.write('wn-' + wn + ' d-' + d + ' off-' + off + ' co-' + col + ' o-' + o + ' ros-' + rowSize );
//	document.write('w='+w+' wn='+wn+' d='+d+' off=' + off + ' co=' + col + ' o=' + o + ' bR='+bRow+' rS='+rowSize );
	//document.write('ww='+winWidth+' we='+docWidth+' mc='+maxCols+nl);
	//*
	if (  o < off ) {
		if ( rowSize === 0 ) { 
			rowSize=rs;
		}
		if ( col < maxCols ) {
			document.write('</td><td valign=top style="border:none; border-left: 0.5px solid; padding-left:10px; padding-top: 2px;">');
			newLine=true;
		}
		else {
			
			bt = 'style="border-top: 2px solid ; "';
			col=0;
			bRow++;
			document.write('</td></tr><tr>');
			for ( j=0; j<maxCols; j++) {
				document.write('<td '+bt+'></td>');
			}
			document.write('</tr><tr><td valign=top style="border: none; padding-left: 10px; padding-top: 2px;">');
		}
		if (bRow>1) {
			d=0;
		}
		col++;
	}
	//*/
}

function autoRefresh(thePostData, theRefreshRate) {
        var firstData = thePostData.split(",");
        var postData = {} ;
        for (var i=0; i<firstData.length; i++) {
                var secondData = firstData[i].split(":");
                postData[secondData[0]] =  secondData[1];
        }
        var refreshId = setInterval(function() {
                $.post("centre", postData, function(data) {
                        $('#centerColumn').empty();
                        $('#centerColumn').append(data);
                 });
        }, theRefreshRate);
}

function autoReload(theRefreshRate) {
        var refreshId = setInterval(reload(), theRefreshRate);
}

function autoFullRefresh(thePostData) {
        var firstData = thePostData.split(",");
        var postData = {} ;
        for (var i=0; i<firstData.length; i++) {
                var secondData = firstData[i].split(":");
                postData[secondData[0]] =  secondData[1];
        }
        

        $.post("centre", postData, function(data) {
                $('#centerColumn').empty();
                $('#centerColumn').append(data);
        });
}


window.onresize = autoFullRefresh('');
