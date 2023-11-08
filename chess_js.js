var idOfAllSquare = [
    [1 , 2 , 3 , 4 , 5 , 6 , 7 ,  8],
    [9 , 10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31, 32],
    [33, 34, 35, 36, 37, 38, 39, 40],
    [41, 42, 43, 44, 45, 46, 47, 48],
    [49, 50, 51, 52, 53, 54, 55, 56],
    [57, 58, 59, 60, 61, 62, 63, 64]
];

var currentboad = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

var preChessBoad = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

var empv=0;
var pv=1;
var rv=5;
var bv=3;
var nv=3;
var qv=9;
var kv=10000;

var bm=null;
let moves = [];
let movesB = [];
let movesW = [];
var pramotBlackQueen='<img src="./pieces/black/queen.png" alt="" />';

var pramotWhiteQueen='<img src="./pieces/white/queen.png" alt="" />';
var pramotWhiteKnight='<img src="./pieces/white/knight.png" alt="" />';
var pramotWhiteRook='<img src="./pieces/white/rook.png" alt="" />';
var pramotWhiteBishop='<img src="./pieces/white/bishop.png" alt="" />';

var whiteKingPos=0;
var whiteRookPos1=0;
var whiteRookPos2=0;

function bKingCheck() {
	  for(var i=0;i<8;i++) {
		 for(var j=0;j<8;j++) {
			 var pp=currentboad[i][j];
			 preChessBoad[i][j]=pp;
		 }
	 } 	
	  var ma=-1000000;
	 var hmm=null;
	 for(var i=0;i<moves.length;i++){
		 if(moves[i][4]>=ma) {ma=moves[i][4]; hmm=moves[i];} 
	 }
	 var hh=queenCheckCell('king','black',blackKing);
	 if(moves.length==0 && hh==false) {
		 alert("White win");
		 setTimeout(() => {
                    location.reload();
                }, 2000)
	 }
	 else  {
		 var bm=hmm;
		 var d='';
		 var dd='';
		 var dd1='';
		 var dd2='';
		 //console.log(bm);
	 var c1=idOfAllSquare[bm[0]][bm[1]];
	 var c2=idOfAllSquare[bm[2]][bm[3]];
	 d=document.getElementById(c1).innerHTML; 
	 dd=document.getElementById(c2).innerHTML; 
	 dd1=currentboad[bm[0]][bm[1]]; 
	 dd2=currentboad[bm[2]][bm[3]]; 
	 if(c1==blackKing) {blackKing=c2;}
	 document.getElementById(c1).innerHTML='';  // set innerHTML same as first.
	 document.getElementById(c2).innerHTML=d; // set innerHTML same as first.
	 currentboad[bm[2]][bm[3]]=currentboad[bm[0]][bm[1]];
	 currentboad[bm[0]][bm[1]]='';
	  
	  var bc=queenCheckCell('king','black',blackKing);
	  if(bc==false) {
		  var bm=hmm;
		  var c1=idOfAllSquare[bm[0]][bm[1]];
		  var c2=idOfAllSquare[bm[2]][bm[3]];
		  d=document.getElementById(c2).innerHTML; 
		  if(c2==blackKing) {blackKing=c1;}
		  document.getElementById(c2).innerHTML=dd;  // set innerHTML same as first.
		  document.getElementById(c1).innerHTML=d; // set innerHTML same as first. 
		   currentboad[bm[0]][bm[1]]=dd1;
		   currentboad[bm[2]][bm[3]]=dd2;
		   
		   for(var i=0;i<moves.length;i++) {
			 if(moves[i]==hmm) {
				 var removedEle=moves.splice(i, 1)[0];
				 break;
			 }
		 }
		 bKingCheck();
	  }
	 }
}

function getRandomElementFromArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function generateMovesForBlack(board) {
	 moves.length=0;
	 
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
		const getInner = currentboad[i][j];
		
		if(getInner=='n') {
			// leftUp	           // upLeft
			var k1=i-1;    var k9=i-2;
			var k2=j-2;    var k10=j-1;
			// leftDown	           // upRight	
			var k3=i+1;    var k11=i-2;
			var k4=j-2;    var k12=j+1;
			// rightUp	           // downLeft	
			var k5=i-1;    var k13=i+2;
			var k6=j+2;    var k14=j-1;
			// rightDown	       // downRight	
			var k7=i+1;    var k15=i+2;
			var k8=j+2;    var k16=j+1;
			
			if(k1>=0 && k2>=0 ) {let cur1 = currentboad[k1][k2]; if(cur1!='p' && cur1!='r' && cur1!='n' && cur1!='b' && cur1!='q' && cur1!='k') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} moves.push([i,j,k1,k2,f]);}}
			if(k3<=7 && k4>=0 ) {let cur1 = currentboad[k3][k4]; if(cur1!='p' && cur1!='r' && cur1!='n' && cur1!='b' && cur1!='q' && cur1!='k') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} moves.push([i,j,k3,k4,f]);}}
			if(k5>=0 && k6<=7 ) {let cur1 = currentboad[k5][k6]; if(cur1!='p' && cur1!='r' && cur1!='n' && cur1!='b' && cur1!='q' && cur1!='k') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} moves.push([i,j,k5,k6,f]);}}
			if(k7<=7 && k8<=7 ) {let cur1 = currentboad[k7][k8]; if(cur1!='p' && cur1!='r' && cur1!='n' && cur1!='b' && cur1!='q' && cur1!='k') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} moves.push([i,j,k7,k8,f]);}}
			
			if(k9>=0 && k10>=0 )  {let cur1 = currentboad[k9][k10];  if(cur1!='p' && cur1!='r' && cur1!='n' && cur1!='b' && cur1!='q' && cur1!='k') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} moves.push([i,j,k9,k10,f]);}}
			if(k11>=0 && k12<=7 ) {let cur1 = currentboad[k11][k12]; if(cur1!='p' && cur1!='r' && cur1!='n' && cur1!='b' && cur1!='q' && cur1!='k') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} moves.push([i,j,k11,k12,f]);}}
			if(k13<=7 && k14>=0 ) {let cur1 = currentboad[k13][k14]; if(cur1!='p' && cur1!='r' && cur1!='n' && cur1!='b' && cur1!='q' && cur1!='k') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} moves.push([i,j,k13,k14,f]);}}
			if(k15<=7 && k16<=7 ) {let cur1 = currentboad[k15][k16]; if(cur1!='p' && cur1!='r' && cur1!='n' && cur1!='b' && cur1!='q' && cur1!='k') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} moves.push([i,j,k15,k16,f]);}}
		}
		else if(getInner=='r') {
			 // plus
			 let wr = [i-1,j,i,j-1,i+1,j,i,j+1];
			 // up
			for (let k = 1; k < 9; k++) {
				if(wr[0]<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[0]][wr[1]]).innerHTML;
				let cur1 = currentboad[wr[0]][wr[1]];
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(getInner.includes('pieces')) {  if(getInner.includes('white')) {  moves.push([i,j,wr[0],wr[1],f]);} break;}
				moves.push([i,j,wr[0],wr[1],f]);
				wr[0]--;
            }
			 // left
			for (let k = 1; k < 9; k++) {
				if(wr[3]<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[2]][wr[3]]).innerHTML;
				let cur1 = currentboad[wr[2]][wr[3]];
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(getInner.includes('pieces')) {  if(getInner.includes('white')){  moves.push([i,j,wr[2],wr[3],f]);} break;}
				moves.push([i,j,wr[2],wr[3],f]);
				wr[3]--;
            }
			 // down
			for (let k = 1; k < 9; k++) {
				if(wr[4]>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[4]][wr[5]]).innerHTML;
				let cur1 = currentboad[wr[4]][wr[5]];
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(getInner.includes('pieces')) {   if(getInner.includes('white')) { moves.push([i,j,wr[4],wr[5],f]);} break;}
				moves.push([i,j,wr[4],wr[5],f]);
				wr[4]++;
            }
			 // right  
			for (let k = 1; k < 9; k++) {
				if(wr[7]>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[6]][wr[7]]).innerHTML;
				let cur1 = currentboad[wr[6]][wr[7]];
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(getInner.includes('pieces')) { if(getInner.includes('white')) { moves.push([i,j,wr[6],wr[7],f]); }break;}
				moves.push([i,j,wr[6],wr[7],f]);
				wr[7]++;
			}
		   }	
			else if(getInner=='p') {
					let getInner1 = null;
					let getInner2 = null;
					let getInner3 = null;
					let getInner4 = null;
					if(i==7) {continue;}
                if(i==1) {
					 getInner1 = currentboad[i+1][j]; 
					 getInner2 = currentboad[i+2][j]; 
					}
				if(i==1 && getInner1=='')  { moves.push([i,j,i+1,j,0]); }
				if(i==1 && getInner2=='' && getInner1=='')  { moves.push([i,j,i+2,j,0]); }
				if(i<=6 && i!=1)  { getInner1 = currentboad[i+1][j]; if(getInner1=='') { moves.push([i,j,i+1,j,0]); }}
				
				if(i<=6 && j<=6) {
					getInner3 = currentboad[i+1][j+1];   // rightDown
				}
				if(i<=6 && j>=1) {
					getInner4 = currentboad[i+1][j-1];  // leftDown
				}
				
				if(getInner3=='P' || getInner3=='R' || getInner3=='N' || getInner3=='B' || getInner3=='Q' || getInner3=='K') { var f=0; if(getInner3=='P') {f=pv;} if(getInner3=='B') {f=bv;} if(getInner3=='R') {f=rv;} if(getInner3=='N') {f=nv;} if(getInner3=='Q') {f=qv;} if(getInner3=='K') {f=kv;} moves.push([i,j,i+1,j+1,f]);}
				if(getInner4=='P' || getInner4=='R' || getInner4=='N' || getInner4=='B' || getInner4=='Q' || getInner4=='K') { var f=0; if(getInner4=='P') {f=pv;} if(getInner4=='B') {f=bv;} if(getInner4=='R') {f=rv;} if(getInner4=='N') {f=nv;} if(getInner4=='Q') {f=qv;} if(getInner4=='K') {f=kv;} moves.push([i,j,i+1,j-1,f]);}
			}			
			else if(getInner=='b') {
			 var b1=i-1; var b2=j+1;
			 var b3=i-1; var b4=j-1; 
			 var b5=i+1; var b6=j+1; 
			 var b7=i+1; var b8=j-1;
			 
			 // rightUp
			for (let k = 1; k < 9; k++) {
				if(b1<0 || b2>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[b1][b2]).innerHTML;
				let cur1 = currentboad[b1][b2];
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(getInner.includes('pieces')) {  if(getInner.includes('white')) { moves.push([i,j,b1,b2,f]);} break;}
				moves.push([i,j,b1,b2,f]);
				b1--; b2++;
            }
			 // leftUp
			for (let k = 1; k < 9; k++) {
				if(b3<0 || b4<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[b3][b4]).innerHTML;
				let cur1 = currentboad[b3][b4];
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(getInner.includes('pieces')) {  if(getInner.includes('white')) {moves.push([i,j,b3,b4,f]);} break;}
				moves.push([i,j,b3,b4,f]);
				b3--; b4--;
            }
			// rightDown
			for (let k = 1; k < 9; k++) {
				if(b5>7 || b6>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[b5][b6]).innerHTML;
				let cur1 = currentboad[b5][b6];
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(getInner.includes('pieces')) {  if(getInner.includes('white')) {moves.push([i,j,b5,b6,f]);} break;}
				moves.push([i,j,b5,b6,f]);
				b5++; b6++;
            }
			// leftDown
			for (let k = 1; k < 9; k++) {
				if(b7>7 || b8<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[b7][b8]).innerHTML;
				let cur1 = currentboad[b7][b8];
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(getInner.includes('pieces')) {  if(getInner.includes('white')) {moves.push([i,j,b7,b8,f]);} break;}
				moves.push([i,j,b7,b8,f]);
				b7++; b8--;
            }	
		 }		
		else if(getInner=='q') {
			// plus
			 let wr = [i-1,j,i,j-1,i+1,j,i,j+1];
			 // up
			for (let k = 1; k < 9; k++) {
				if(wr[0]<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[0]][wr[1]]).innerHTML;
				let cur1 = currentboad[wr[0]][wr[1]];
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(getInner.includes('pieces')) {  if(getInner.includes('white')) {  moves.push([i,j,wr[0],wr[1],f]);} break;}
				moves.push([i,j,wr[0],wr[1],f]);
				wr[0]--;
            }
			 // left
			for (let k = 1; k < 9; k++) {
				if(wr[3]<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[2]][wr[3]]).innerHTML;
				let cur1 = currentboad[wr[2]][wr[3]];
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(getInner.includes('pieces')) {  if(getInner.includes('white')) {  moves.push([i,j,wr[2],wr[3],f]);} break;}
				moves.push([i,j,wr[2],wr[3],f]);
				wr[3]--;
            }
			 // down
			for (let k = 1; k < 9; k++) {
				if(wr[4]>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[4]][wr[5]]).innerHTML;
				let cur1 = currentboad[wr[4]][wr[5]];
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(getInner.includes('pieces')) {   if(getInner.includes('white')) { moves.push([i,j,wr[4],wr[5],f]);} break;}
				moves.push([i,j,wr[4],wr[5],f]);
				wr[4]++;
            }
			 // right  
			for (let k = 1; k < 9; k++) {
				if(wr[7]>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[6]][wr[7]]).innerHTML;
				let cur1 = currentboad[wr[6]][wr[7]];
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(getInner.includes('pieces')) { if(getInner.includes('white')) { moves.push([i,j,wr[6],wr[7],f]); }break;}
				moves.push([i,j,wr[6],wr[7],f]);
				wr[7]++;
			}
			
			//corner
			 var b1=i-1; var b2=j+1;
			 var b3=i-1; var b4=j-1; 
			 var b5=i+1; var b6=j+1; 
			 var b7=i+1; var b8=j-1;
			 
			 // rightUp
			for (let k = 1; k < 9; k++) {
				if(b1<0 || b2>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[b1][b2]).innerHTML;
				let cur1 = currentboad[b1][b2];
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(getInner.includes('pieces')) {  if(getInner.includes('white')) { moves.push([i,j,b1,b2,f]);} break;}
				moves.push([i,j,b1,b2,f]);
				b1--; b2++;
            }
			 // leftUp
			for (let k = 1; k < 9; k++) {
				if(b3<0 || b4<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[b3][b4]).innerHTML;
				let cur1 = currentboad[b3][b4];
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(getInner.includes('pieces')) {  if(getInner.includes('white')) {moves.push([i,j,b3,b4,f]);} break;}
				moves.push([i,j,b3,b4,f]);
				b3--; b4--;
            }
			// rightDown
			for (let k = 1; k < 9; k++) {
				if(b5>7 || b6>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[b5][b6]).innerHTML;
				let cur1 = currentboad[b5][b6];
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(getInner.includes('pieces')) {  if(getInner.includes('white')) {moves.push([i,j,b5,b6,f]);} break;}
				moves.push([i,j,b5,b6,f]);
				b5++; b6++;
            }
			// leftDown
			for (let k = 1; k < 9; k++) {
				if(b7>7 || b8<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[b7][b8]).innerHTML;
				let cur1 = currentboad[b7][b8];
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(getInner.includes('pieces')) {  if(getInner.includes('white')) {moves.push([i,j,b7,b8,f]);} break;}
				moves.push([i,j,b7,b8,f]);
				b7++; b8--;
            }
		}
		 else if(getInner=='k') {          
			  // upLeft	    // right       
			 var k1=i-1;    var k9=i;
			 var k2=j-1;    var k10=j+1;
			 // up	        // leftDown	
			 var k3=i-1;    var k11=i+1;
			 var k4=j;      var k12=j-1;
			 // upRight	    // down	
			 var k5=i-1;    var k13=i+1;
			 var k6=j+1;    var k14=j;
			 // left	    // rightdown                   
			 var k7=i;      var k15=i+1;
			 var k8=j-1;    var k16=j+1;
			
			//fix it
		     if(k1>=0 && k2>=0) { const getInner=document.getElementById(idOfAllSquare[k1][k2]).innerHTML; if(!getInner.includes('black')) { var x=queenCheckCell('king','black',idOfAllSquare[k1][k2]); if(x==true) {let cur1 = currentboad[k1][k2]; var f=-1; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} if(kingCheckCell(idOfAllSquare[k1][k2])) {moves.push([i,j,k1,k2,f]);}}}}
			 if(k3>=0) { const getInner=document.getElementById(idOfAllSquare[k3][k4]).innerHTML; if(!getInner.includes('black')) { var x=queenCheckCell('king','black',idOfAllSquare[k3][k4]); if(x==true) { let cur1 = currentboad[k3][k4]; var f=-1; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} if(kingCheckCell(idOfAllSquare[k3][k4])) {moves.push([i,j,k3,k4,f]);}}}}
			 if(k5>=0 && k6<=7) { const getInner=document.getElementById(idOfAllSquare[k5][k6]).innerHTML; if(!getInner.includes('black')) { var x=queenCheckCell('king','black',idOfAllSquare[k5][k6]); if(x==true) { let cur1 = currentboad[k5][k6]; var f=-1; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} if(kingCheckCell(idOfAllSquare[k5][k6])) {moves.push([i,j,k5,k6,f]);}}}}
			 if(k8>=0) { const getInner=document.getElementById(idOfAllSquare[k7][k8]).innerHTML; if(!getInner.includes('black')) { var x=queenCheckCell('king','black',idOfAllSquare[k7][k8]); if(x==true) { let cur1 = currentboad[k7][k9]; var f=-1; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} if(kingCheckCell(idOfAllSquare[k7][k8])) {moves.push([i,j,k7,k8,f]);}}}}
			
			 if(k10<=7) { const getInner=document.getElementById(idOfAllSquare[k9][k10]).innerHTML; if(!getInner.includes('black')) { var x=queenCheckCell('king','black',idOfAllSquare[k9][k10]); if(x==true) { let cur1 = currentboad[k9][k10]; var f=-1; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} if(kingCheckCell(idOfAllSquare[k9][k10])) {moves.push([i,j,k9,k10,f]);}}}}            
			 if(k11<=7 && k12>=0) {const getInner=document.getElementById(idOfAllSquare[k11][k12]).innerHTML; if(!getInner.includes('black')) { var x=queenCheckCell('king','black',idOfAllSquare[k11][k12]); if(x==true) { let cur1 = currentboad[k11][k12]; var f=-1; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} if(kingCheckCell(idOfAllSquare[k11][k12])) {moves.push([i,j,k11,k12,f]);}}}}
			 if(k13<=7) {const getInner=document.getElementById(idOfAllSquare[k13][k14]).innerHTML; if(!getInner.includes('black')) { var x=queenCheckCell('king','black',idOfAllSquare[k13][k14]); if(x==true) { let cur1 = currentboad[k13][k14]; var f=-1; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} if(kingCheckCell(idOfAllSquare[k13][k14])) {moves.push([i,j,k13,k14,f]);}}}}         
			 if(k15<=7 && k16<=7) { const getInner=document.getElementById(idOfAllSquare[k15][k16]).innerHTML; if(!getInner.includes('black')) { var x=queenCheckCell('king','black',idOfAllSquare[k15][k16]); if(x==true) { let cur1 = currentboad[k15][k16]; var f=-1; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} if(kingCheckCell(idOfAllSquare[k15][k16])) {moves.push([i,j,k15,k16,f]);}}}}
		 }
    }
  }
  return moves;
}

function bestMoveBlack(board) {
	 movesB.length=0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
		const getInner = preChessBoad[i][j];
		
		if(getInner=='n') {
			// leftUp	           // upLeft
			var k1=i-1;    var k9=i-2;
			var k2=j-2;    var k10=j-1;
			// leftDown	           // upRight	
			var k3=i+1;    var k11=i-2;
			var k4=j-2;    var k12=j+1;
			// rightUp	           // downLeft	
			var k5=i-1;    var k13=i+2;
			var k6=j+2;    var k14=j-1;
			// rightDown	       // downRight	
			var k7=i+1;    var k15=i+2;
			var k8=j+2;    var k16=j+1;
			
			if(k1>=0 && k2>=0 ) {let cur1 = preChessBoad[k1][k2]; if(cur1!='p' && cur1!='r' && cur1!='n' && cur1!='b' && cur1!='q' && cur1!='k') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} movesB.push([i,j,k1,k2,f]);}}
			if(k3<=7 && k4>=0 ) {let cur1 = preChessBoad[k3][k4]; if(cur1!='p' && cur1!='r' && cur1!='n' && cur1!='b' && cur1!='q' && cur1!='k') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} movesB.push([i,j,k3,k4,f]);}}
			if(k5>=0 && k6<=7 ) {let cur1 = preChessBoad[k5][k6]; if(cur1!='p' && cur1!='r' && cur1!='n' && cur1!='b' && cur1!='q' && cur1!='k') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} movesB.push([i,j,k5,k6,f]);}}
			if(k7<=7 && k8<=7 ) {let cur1 = preChessBoad[k7][k8]; if(cur1!='p' && cur1!='r' && cur1!='n' && cur1!='b' && cur1!='q' && cur1!='k') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} movesB.push([i,j,k7,k8,f]);}}
			
			if(k9>=0 && k10>=0 )  {let cur1 = preChessBoad[k9][k10];  if(cur1!='p' && cur1!='r' && cur1!='n' && cur1!='b' && cur1!='q' && cur1!='k') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} movesB.push([i,j,k9,k10,f]);}}
			if(k11>=0 && k12<=7 ) {let cur1 = preChessBoad[k11][k12]; if(cur1!='p' && cur1!='r' && cur1!='n' && cur1!='b' && cur1!='q' && cur1!='k') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} movesB.push([i,j,k11,k12,f]);}}
			if(k13<=7 && k14>=0 ) {let cur1 = preChessBoad[k13][k14]; if(cur1!='p' && cur1!='r' && cur1!='n' && cur1!='b' && cur1!='q' && cur1!='k') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} movesB.push([i,j,k13,k14,f]);}}
			if(k15<=7 && k16<=7 ) {let cur1 = preChessBoad[k15][k16]; if(cur1!='p' && cur1!='r' && cur1!='n' && cur1!='b' && cur1!='q' && cur1!='k') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} movesB.push([i,j,k15,k16,f]);}}
		}
		else if(getInner=='r') {
			 // plus
			 let wr = [i-1,j,i,j-1,i+1,j,i,j+1];
			 // up
			for (let k = 1; k < 9; k++) {
				if(wr[0]<0) {break;}
				let cur1 = preChessBoad[wr[0]][wr[1]];
				if(cur1=='p' || cur1=='r' || cur1=='n' || cur1=='b' || cur1=='q' || cur1=='k') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(f!=-10000 && f!=0) {movesB.push([i,j,wr[0],wr[1],f]); break; }
				movesB.push([i,j,wr[0],wr[1],f]);
				wr[0]--;
            }
			 // left
			for (let k = 1; k < 9; k++) {
				if(wr[3]<0) {break;}
				let cur1 = preChessBoad[wr[2]][wr[3]];
				if(cur1=='p' || cur1=='r' || cur1=='n' || cur1=='b' || cur1=='q' || cur1=='k') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(f!=-10000 && f!=0) {movesB.push([i,j,wr[2],wr[3],f]); break; }
				movesB.push([i,j,wr[2],wr[3],f]);
				wr[3]--;
            }
			 // down
			for (let k = 1; k < 9; k++) {
				if(wr[4]>7) {break;}
				let cur1 = preChessBoad[wr[4]][wr[5]];
				if(cur1=='p' || cur1=='r' || cur1=='n' || cur1=='b' || cur1=='q' || cur1=='k') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(f!=-10000 && f!=0) {movesB.push([i,j,wr[4],wr[5],f]); break; }
				movesB.push([i,j,wr[4],wr[5],f]);
				wr[4]++;
            }
			 // right  
			for (let k = 1; k < 9; k++) {
				if(wr[7]>7) {break;}
				let cur1 = preChessBoad[wr[6]][wr[7]];
				if(cur1=='p' || cur1=='r' || cur1=='n' || cur1=='b' || cur1=='q' || cur1=='k') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(f!=-10000 && f!=0) {movesB.push([i,j,wr[6],wr[7],f]); break; }
				movesB.push([i,j,wr[6],wr[7],f]);
				wr[7]++;
			}
		   }		
			else if(getInner=='p') {
					let getInner1 = null;
					let getInner2 = null;
					let getInner3 = null;
					let getInner4 = null;
					if(i==7) {continue;}
                if(i==1) {
					 getInner1 = preChessBoad[i+1][j]; 
					 getInner2 = preChessBoad[i+2][j]; 
					}
				if(i==1 && getInner1=='')  { movesB.push([i,j,i+1,j,0]); }
				if(i==1 && getInner2=='' && getInner1=='')  { movesB.push([i,j,i+2,j,0]); }
				if(i<=6 && i!=1)  { getInner1 = preChessBoad[i+1][j]; if(getInner1=='') { movesB.push([i,j,i+1,j,0]); }}
				
				if(i<=6 && j<=6) {
					getInner3 = preChessBoad[i+1][j+1];   // rightDown
				}
				if(i<=6 && j>=1) {
					getInner4 = preChessBoad[i+1][j-1];  // leftDown
				}
				
				if(getInner3=='P' || getInner3=='R' || getInner3=='N' || getInner3=='B' || getInner3=='Q' || getInner3=='K') { var f=-1; if(getInner3=='P') {f=pv;} if(getInner3=='B') {f=bv;} if(getInner3=='R') {f=rv;} if(getInner3=='N') {f=nv;} if(getInner3=='Q') {f=qv;} if(getInner3=='K') {f=kv;} movesB.push([i,j,i+1,j+1,f]);}
				if(getInner4=='P' || getInner4=='R' || getInner4=='N' || getInner4=='B' || getInner4=='Q' || getInner4=='K') { var f=-1; if(getInner4=='P') {f=pv;} if(getInner4=='B') {f=bv;} if(getInner4=='R') {f=rv;} if(getInner4=='N') {f=nv;} if(getInner4=='Q') {f=qv;} if(getInner4=='K') {f=kv;} movesB.push([i,j,i+1,j-1,f]);}
			}	
			else if(getInner=='b') {
			 var b1=i-1; var b2=j+1;
			 var b3=i-1; var b4=j-1; 
			 var b5=i+1; var b6=j+1; 
			 var b7=i+1; var b8=j-1;
			 // rightUp
			for (let k = 1; k < 9; k++) {
				if(b1<0 || b2>7) {break;}
				let cur1 = preChessBoad[b1][b2];
				if(cur1=='p' || cur1=='r' || cur1=='n' || cur1=='b' || cur1=='q' || cur1=='k') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(f!=-10000 && f!=0) {movesB.push([i,j,b1,b2,f]); break; }
				movesB.push([i,j,b1,b2,f]);
				b1--; b2++;
            }
			 // leftUp
			for (let k = 1; k < 9; k++) {
				if(b3<0 || b4<0) {break;}
				let cur1 = preChessBoad[b3][b4];
				if(cur1=='p' || cur1=='r' || cur1=='n' || cur1=='b' || cur1=='q' || cur1=='k') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(f!=-10000 && f!=0) {movesB.push([i,j,b3,b4,f]); break; }
				movesB.push([i,j,b3,b4,f]);
				b3--; b4--;
            }
			// rightDown
			for (let k = 1; k < 9; k++) {
				if(b5>7 || b6>7) {break;}
				let cur1 = preChessBoad[b5][b6];
				if(cur1=='p' || cur1=='r' || cur1=='n' || cur1=='b' || cur1=='q' || cur1=='k') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(f!=-10000 && f!=0) {movesB.push([i,j,b5,b6,f]); break; }
				movesB.push([i,j,b5,b6,f]);
				b5++; b6++;
            }
			// leftDown
			for (let k = 1; k < 9; k++) {
				if(b7>7 || b8<0) {break;}
				let cur1 = preChessBoad[b7][b8];
				if(cur1=='p' || cur1=='r' || cur1=='n' || cur1=='b' || cur1=='q' || cur1=='k') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(f!=-10000 && f!=0) {movesB.push([i,j,b7,b8,f]); break; }
				movesB.push([i,j,b7,b8,f]);
				b7++; b8--;
            }	
		 }		
		else if(getInner=='q') {
			// plus
			 let wr = [i-1,j,i,j-1,i+1,j,i,j+1];
			 // up
			for (let k = 1; k < 9; k++) {
				if(wr[0]<0) {break;}
				let cur1 = preChessBoad[wr[0]][wr[1]];
				if(cur1=='p' || cur1=='r' || cur1=='n' || cur1=='b' || cur1=='q' || cur1=='k') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(f!=-10000 && f!=0) {movesB.push([i,j,wr[0],wr[1],f]); break; }
				movesB.push([i,j,wr[0],wr[1],f]);
				wr[0]--;
            }
			 // left
			for (let k = 1; k < 9; k++) {
				if(wr[3]<0) {break;}
				let cur1 = preChessBoad[wr[2]][wr[3]];
				if(cur1=='p' || cur1=='r' || cur1=='n' || cur1=='b' || cur1=='q' || cur1=='k') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(f!=-10000 && f!=0) {movesB.push([i,j,wr[2],wr[3],f]); break; }
				movesB.push([i,j,wr[2],wr[3],f]);
				wr[3]--;
            }
			 // down
			for (let k = 1; k < 9; k++) {
				if(wr[4]>7) {break;}
				let cur1 = preChessBoad[wr[4]][wr[5]];
				if(cur1=='p' || cur1=='r' || cur1=='n' || cur1=='b' || cur1=='q' || cur1=='k') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(f!=-10000 && f!=0) {movesB.push([i,j,wr[4],wr[5],f]); break; }
				movesB.push([i,j,wr[4],wr[5],f]);
				wr[4]++;
            }
			 // right  
			for (let k = 1; k < 9; k++) {
				if(wr[7]>7) {break;}
				let cur1 = preChessBoad[wr[6]][wr[7]];
				if(cur1=='p' || cur1=='r' || cur1=='n' || cur1=='b' || cur1=='q' || cur1=='k') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(f!=-10000 && f!=0) {movesB.push([i,j,wr[6],wr[7],f]); break; }
				movesB.push([i,j,wr[6],wr[7],f]);
				wr[7]++;
			}
			//corner
			 var b1=i-1; var b2=j+1;
			 var b3=i-1; var b4=j-1; 
			 var b5=i+1; var b6=j+1; 
			 var b7=i+1; var b8=j-1;
			 
			 // rightUp
			for (let k = 1; k < 9; k++) {
				if(b1<0 || b2>7) {break;}
				let cur1 = preChessBoad[b1][b2];
				if(cur1=='p' || cur1=='r' || cur1=='n' || cur1=='b' || cur1=='q' || cur1=='k') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(f!=-10000 && f!=0) {movesB.push([i,j,b1,b2,f]); break; }
				movesB.push([i,j,b1,b2,f]);
				b1--; b2++;
            }
			 // leftUp
			for (let k = 1; k < 9; k++) {
				if(b3<0 || b4<0) {break;}
				let cur1 = preChessBoad[b3][b4];
				if(cur1=='p' || cur1=='r' || cur1=='n' || cur1=='b' || cur1=='q' || cur1=='k') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(f!=-10000 && f!=0) {movesB.push([i,j,b3,b4,f]); break; }
				movesB.push([i,j,b3,b4,f]);
				b3--; b4--;
            }
			// rightDown
			for (let k = 1; k < 9; k++) {
				if(b5>7 || b6>7) {break;}
				let cur1 = preChessBoad[b5][b6];
				if(cur1=='p' || cur1=='r' || cur1=='n' || cur1=='b' || cur1=='q' || cur1=='k') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(f!=-10000 && f!=0) {movesB.push([i,j,b5,b6,f]); break; }
				movesB.push([i,j,b5,b6,f]);
				b5++; b6++;
            }
			// leftDown
			for (let k = 1; k < 9; k++) {
				if(b7>7 || b8<0) {break;}
				let cur1 = preChessBoad[b7][b8];
				if(cur1=='p' || cur1=='r' || cur1=='n' || cur1=='b' || cur1=='q' || cur1=='k') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;}
				if(f!=-10000 && f!=0) {movesB.push([i,j,b7,b8,f]); break; }
				movesB.push([i,j,b7,b8,f]);
				b7++; b8--;
            }
		}
		 else if(getInner=='k') {          
			  // upLeft	    // right       
			 var k1=i-1;    var k9=i;
			 var k2=j-1;    var k10=j+1;
			 // up	        // leftDown	
			 var k3=i-1;    var k11=i+1;
			 var k4=j;      var k12=j-1;
			 // upRight	    // down	
			 var k5=i-1;    var k13=i+1;
			 var k6=j+1;    var k14=j;
			 // left	    // rightdown                   
			 var k7=i;      var k15=i+1;
			 var k8=j-1;    var k16=j+1;
			
			//fix it
			 if(k1>=0 && k2>=0) { const getInner=document.getElementById(idOfAllSquare[k1][k2]).innerHTML; if(!getInner.includes('black')) { var x=queenCheckCell('king','black',idOfAllSquare[k1][k2]); if(x==true) {let cur1 = preChessBoad[k1][k2]; var f=-1; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} if(kingCheckCell(idOfAllSquare[k1][k2])) {movesB.push([i,j,k1,k2,f]);}}}}
			 if(k3>=0) { const getInner=document.getElementById(idOfAllSquare[k3][k4]).innerHTML; if(!getInner.includes('black')) { var x=queenCheckCell('king','black',idOfAllSquare[k3][k4]); if(x==true) { let cur1 = preChessBoad[k3][k4]; var f=-1; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} if(kingCheckCell(idOfAllSquare[k3][k4])) {movesB.push([i,j,k3,k4,f]);}}}}
			 if(k5>=0 && k6<=7) { const getInner=document.getElementById(idOfAllSquare[k5][k6]).innerHTML; if(!getInner.includes('black')) { var x=queenCheckCell('king','black',idOfAllSquare[k5][k6]); if(x==true) { let cur1 = preChessBoad[k5][k6]; var f=-1; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} if(kingCheckCell(idOfAllSquare[k5][k6])) {movesB.push([i,j,k5,k6,f]);}}}}
			 if(k8>=0) { const getInner=document.getElementById(idOfAllSquare[k7][k8]).innerHTML; if(!getInner.includes('black')) { var x=queenCheckCell('king','black',idOfAllSquare[k7][k8]); if(x==true) { let cur1 = preChessBoad[k7][k9]; var f=-1; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} if(kingCheckCell(idOfAllSquare[k7][k8])) {movesB.push([i,j,k7,k8,f]);}}}}
			
			 if(k10<=7) { const getInner=document.getElementById(idOfAllSquare[k9][k10]).innerHTML; if(!getInner.includes('black')) { var x=queenCheckCell('king','black',idOfAllSquare[k9][k10]); if(x==true) { let cur1 = preChessBoad[k9][k10]; var f=-1; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} if(kingCheckCell(idOfAllSquare[k9][k10])) {movesB.push([i,j,k9,k10,f]);}}}}            
			 if(k11<=7 && k12>=0) {const getInner=document.getElementById(idOfAllSquare[k11][k12]).innerHTML; if(!getInner.includes('black')) { var x=queenCheckCell('king','black',idOfAllSquare[k11][k12]); if(x==true) { let cur1 = preChessBoad[k11][k12]; var f=-1; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} if(kingCheckCell(idOfAllSquare[k11][k12])) {movesB.push([i,j,k11,k12,f]);}}}} 
			 if(k13<=7) {const getInner=document.getElementById(idOfAllSquare[k13][k14]).innerHTML; if(!getInner.includes('black')) { var x=queenCheckCell('king','black',idOfAllSquare[k13][k14]); if(x==true) { let cur1 = preChessBoad[k13][k14]; var f=-1; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} if(kingCheckCell(idOfAllSquare[k13][k14])) {movesB.push([i,j,k13,k14,f]);}}}}         
			 if(k15<=7 && k16<=7) { const getInner=document.getElementById(idOfAllSquare[k15][k16]).innerHTML; if(!getInner.includes('black')) { var x=queenCheckCell('king','black',idOfAllSquare[k15][k16]); if(x==true) { let cur1 = preChessBoad[k15][k16]; var f=-1; if(cur1=='') {f=empv;} if(cur1=='P') {f=pv;} if(cur1=='B') {f=bv;} if(cur1=='R') {f=rv;} if(cur1=='N') {f=nv;} if(cur1=='Q') {f=qv;} if(cur1=='K') {f=kv;} if(kingCheckCell(idOfAllSquare[k15][k16])) {movesB.push([i,j,k15,k16,f]);}}}}
		 }
    }
  }
	var ma=-1;
	var hmm=null;
    for(var i=0;i<movesB.length;i++){
		 if(movesB[i][4]>=ma) {ma=movesB[i][4]; hmm=movesB[i];} 
	 }
	 
	  if(ma==0) {
		return null;
	  }
	 
  return hmm;
}

function bestMoveWhite(board) {
	movesW.length=0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
		const getInner = preChessBoad[i][j];
		
		if(getInner=='N') {
			// leftUp	           // upLeft
			var k1=i-1;    var k9=i-2;
			var k2=j-2;    var k10=j-1;
			// leftDown	           // upRight	
			var k3=i+1;    var k11=i-2;
			var k4=j-2;    var k12=j+1;
			// rightUp	           // downLeft	
			var k5=i-1;    var k13=i+2;
			var k6=j+2;    var k14=j-1;
			// rightDown	       // downRight	
			var k7=i+1;    var k15=i+2;
			var k8=j+2;    var k16=j+1;
			
			if(k1>=0 && k2>=0 ) {let cur1 = preChessBoad[k1][k2]; if(cur1!='P' && cur1!='R' && cur1!='N' && cur1!='B' && cur1!='Q' && cur1!='K') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;} movesW.push([i,j,k1,k2,f]);}}
			if(k3<=7 && k4>=0 ) {let cur1 = preChessBoad[k3][k4]; if(cur1!='P' && cur1!='R' && cur1!='N' && cur1!='B' && cur1!='Q' && cur1!='K') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;} movesW.push([i,j,k3,k4,f]);}}
			if(k5>=0 && k6<=7 ) {let cur1 = preChessBoad[k5][k6]; if(cur1!='P' && cur1!='R' && cur1!='N' && cur1!='B' && cur1!='Q' && cur1!='K') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;} movesW.push([i,j,k5,k6,f]);}}
			if(k7<=7 && k8<=7 ) {let cur1 = preChessBoad[k7][k8]; if(cur1!='P' && cur1!='R' && cur1!='N' && cur1!='B' && cur1!='Q' && cur1!='K') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;} movesW.push([i,j,k7,k8,f]);}}
			
			if(k9>=0 && k10>=0 )  {let cur1 = preChessBoad[k9][k10];  if(cur1!='P' && cur1!='R' && cur1!='N' && cur1!='B' && cur1!='Q' && cur1!='K') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;} movesW.push([i,j,k9,k10,f]);}}
			if(k11>=0 && k12<=7 ) {let cur1 = preChessBoad[k11][k12]; if(cur1!='P' && cur1!='R' && cur1!='N' && cur1!='B' && cur1!='Q' && cur1!='K') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;} movesW.push([i,j,k11,k12,f]);}}
			if(k13<=7 && k14>=0 ) {let cur1 = preChessBoad[k13][k14]; if(cur1!='P' && cur1!='R' && cur1!='N' && cur1!='B' && cur1!='Q' && cur1!='K') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;} movesW.push([i,j,k13,k14,f]);}}
			if(k15<=7 && k16<=7 ) {let cur1 = preChessBoad[k15][k16]; if(cur1!='P' && cur1!='R' && cur1!='N' && cur1!='B' && cur1!='Q' && cur1!='K') { var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;} movesW.push([i,j,k15,k16,f]);}}
		}
		else if(getInner=='R') {
			 // plus
			 let wr = [i-1,j,i,j-1,i+1,j,i,j+1];
			 // up
			for (let k = 1; k < 9; k++) {
				if(wr[0]<0) {break;}
				let cur1 = preChessBoad[wr[0]][wr[1]];
				if(cur1=='P' || cur1=='R' || cur1=='N' || cur1=='B' || cur1=='Q' || cur1=='K') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;}
				if(f!=-10000 && f!=0) {movesW.push([i,j,wr[0],wr[1],f]); break; }
				movesW.push([i,j,wr[0],wr[1],f]);
				wr[0]--;
            }
			 // left
			for (let k = 1; k < 9; k++) {
				if(wr[3]<0) {break;}
				let cur1 = preChessBoad[wr[2]][wr[3]];
				if(cur1=='P' || cur1=='R' || cur1=='N' || cur1=='B' || cur1=='Q' || cur1=='K') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;}
				if(f!=-10000 && f!=0) {movesW.push([i,j,wr[2],wr[3],f]); break; }
				movesW.push([i,j,wr[2],wr[3],f]);
				wr[3]--;
            }
			 // down
			for (let k = 1; k < 9; k++) {
				if(wr[4]>7) {break;}
				let cur1 = preChessBoad[wr[4]][wr[5]];
				if(cur1=='P' || cur1=='R' || cur1=='N' || cur1=='B' || cur1=='Q' || cur1=='K') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;}
				if(f!=-10000 && f!=0) {movesW.push([i,j,wr[4],wr[5],f]); break; }
				movesW.push([i,j,wr[4],wr[5],f]);
				wr[4]++;
            }
			 // right  
			for (let k = 1; k < 9; k++) {
				if(wr[7]>7) {break;}
				let cur1 = preChessBoad[wr[6]][wr[7]];
				if(cur1=='P' || cur1=='R' || cur1=='N' || cur1=='B' || cur1=='Q' || cur1=='K') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;}
				if(f!=-10000 && f!=0) {movesW.push([i,j,wr[6],wr[7],f]); break; }
				movesW.push([i,j,wr[6],wr[7],f]);
				wr[7]++;
			}
		   }
			else if(getInner=='P') {
					let getInner1 = null;
					let getInner2 = null;
					let getInner3 = null;
					let getInner4 = null; 
					if(i==0) {continue;}
                if(i==6) {
					 getInner1 = preChessBoad[i-1][j]; 
					 getInner2 = preChessBoad[i-2][j]; 
					}
				if(i==6 && getInner1=='')  { movesW.push([i,j,i-1,j,0]); }
				if(i==6 && getInner2=='' && getInner1=='')  { movesW.push([i,j,i-2,j,0]); }
				if(i>=1 && i!=6)  { getInner1 = preChessBoad[i-1][j]; if(getInner1=='') { movesW.push([i,j,i-1,j,0]); }}
				
				if(i>=1 && j<=6) {
					getInner3 = preChessBoad[i-1][j+1];   // rightUp
				}
				if(i>=1 && j>=1) {
					getInner4 = preChessBoad[i-1][j-1];  // leftUp
				}
				if(getInner3=='p' || getInner3=='r' || getInner3=='n' || getInner3=='b' || getInner3=='q' || getInner3=='k') { var f=0; if(getInner3=='p') {f=pv;} if(getInner3=='b') {f=bv;} if(getInner3=='r') {f=rv;} if(getInner3=='n') {f=nv;} if(getInner3=='q') {f=qv;} if(getInner3=='k') {f=kv;} movesW.push([i,j,i-1,j+1,f]);}
				if(getInner4=='p' || getInner4=='r' || getInner4=='n' || getInner4=='b' || getInner4=='q' || getInner4=='k') { var f=0; if(getInner4=='p') {f=pv;} if(getInner4=='b') {f=bv;} if(getInner4=='r') {f=rv;} if(getInner4=='n') {f=nv;} if(getInner4=='q') {f=qv;} if(getInner4=='k') {f=kv;} movesW.push([i,j,i-1,j-1,f]);}
			}
			else if(getInner=='B') {
			 var b1=i-1; var b2=j+1;
			 var b3=i-1; var b4=j-1; 
			 var b5=i+1; var b6=j+1; 
			 var b7=i+1; var b8=j-1;
			 
			 // rightUp
			for (let k = 1; k < 9; k++) {
				if(b1<0 || b2>7) {break;}
				let cur1 = preChessBoad[b1][b2];
				if(cur1=='P' || cur1=='R' || cur1=='N' || cur1=='B' || cur1=='Q' || cur1=='K') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;}
				if(f!=-10000 && f!=0) {movesW.push([i,j,b1,b2,f]); break; }
				movesW.push([i,j,b1,b2,f]);
				b1--; b2++;
            }
			 // leftUp
			for (let k = 1; k < 9; k++) {
				if(b3<0 || b4<0) {break;}
				let cur1 = preChessBoad[b3][b4];
				if(cur1=='P' || cur1=='R' || cur1=='N' || cur1=='B' || cur1=='Q' || cur1=='K') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;}
				if(f!=-10000 && f!=0) {movesW.push([i,j,b3,b4,f]); break; }
				movesW.push([i,j,b3,b4,f]);
				b3--; b4--;
            }
			// rightDown
			for (let k = 1; k < 9; k++) {
				if(b5>7 || b6>7) {break;}
				let cur1 = preChessBoad[b5][b6];
				if(cur1=='P' || cur1=='R' || cur1=='N' || cur1=='B' || cur1=='Q' || cur1=='K') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;}
				if(f!=-10000 && f!=0) {movesW.push([i,j,b5,b6,f]); break; }
				movesW.push([i,j,b5,b6,f]);
				b5++; b6++;
            }
			// leftDown
			for (let k = 1; k < 9; k++) {
				if(b7>7 || b8<0) {break;}
				let cur1 = preChessBoad[b7][b8];
				if(cur1=='P' || cur1=='R' || cur1=='N' || cur1=='B' || cur1=='Q' || cur1=='K') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;}
				if(f!=-10000 && f!=0) {movesW.push([i,j,b7,b8,f]); break; }
				movesW.push([i,j,b7,b8,f]);
				b7++; b8--;
            }	
		 }
		else if(getInner=='Q') {
			// plus
			 let wr = [i-1,j,i,j-1,i+1,j,i,j+1];
			 // up
			for (let k = 1; k < 9; k++) {
				if(wr[0]<0) {break;}
				let cur1 = preChessBoad[wr[0]][wr[1]];
				if(cur1=='P' || cur1=='R' || cur1=='N' || cur1=='B' || cur1=='Q' || cur1=='K') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;}
				if(f!=-10000 && f!=0) {movesW.push([i,j,wr[0],wr[1],f]); break; }
				movesW.push([i,j,wr[0],wr[1],f]);
				wr[0]--;
            }
			 // left
			for (let k = 1; k < 9; k++) {
				if(wr[3]<0) {break;}
				let cur1 = preChessBoad[wr[2]][wr[3]];
				if(cur1=='P' || cur1=='R' || cur1=='N' || cur1=='B' || cur1=='Q' || cur1=='K') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;}
				if(f!=-10000 && f!=0) {movesW.push([i,j,wr[2],wr[3],f]); break; }
				movesW.push([i,j,wr[2],wr[3],f]);
				wr[3]--;
            }
			 // down
			for (let k = 1; k < 9; k++) {
				if(wr[4]>7) {break;}
				let cur1 = preChessBoad[wr[4]][wr[5]];
				if(cur1=='P' || cur1=='R' || cur1=='N' || cur1=='B' || cur1=='Q' || cur1=='K') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;}
				if(f!=-10000 && f!=0) {movesW.push([i,j,wr[4],wr[5],f]); break; }
				movesW.push([i,j,wr[4],wr[5],f]);
				wr[4]++;
            }
			 // right  
			for (let k = 1; k < 9; k++) {
				if(wr[7]>7) {break;}
				let cur1 = preChessBoad[wr[6]][wr[7]];
				if(cur1=='P' || cur1=='R' || cur1=='N' || cur1=='B' || cur1=='Q' || cur1=='K') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;}
				if(f!=-10000 && f!=0) {movesW.push([i,j,wr[6],wr[7],f]); break; }
				movesW.push([i,j,wr[6],wr[7],f]);
				wr[7]++;
			}
			//corner
			 var b1=i-1; var b2=j+1;
			 var b3=i-1; var b4=j-1; 
			 var b5=i+1; var b6=j+1; 
			 var b7=i+1; var b8=j-1;
			 
			 // rightUp
			for (let k = 1; k < 9; k++) {
				if(b1<0 || b2>7) {break;}
				let cur1 = preChessBoad[b1][b2];
				if(cur1=='P' || cur1=='R' || cur1=='N' || cur1=='B' || cur1=='Q' || cur1=='K') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;}
				if(f!=-10000 && f!=0) {movesW.push([i,j,b1,b2,f]); break; }
				movesW.push([i,j,b1,b2,f]);
				b1--; b2++;
            }
			 // leftUp
			for (let k = 1; k < 9; k++) {
				if(b3<0 || b4<0) {break;}
				let cur1 = preChessBoad[b3][b4];
				if(cur1=='P' || cur1=='R' || cur1=='N' || cur1=='B' || cur1=='Q' || cur1=='K') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;}
				if(f!=-10000 && f!=0) {movesW.push([i,j,b3,b4,f]); break; }
				movesW.push([i,j,b3,b4,f]);
				b3--; b4--;
            }
			// rightDown
			for (let k = 1; k < 9; k++) {
				if(b5>7 || b6>7) {break;}
				let cur1 = preChessBoad[b5][b6];
				if(cur1=='P' || cur1=='R' || cur1=='N' || cur1=='B' || cur1=='Q' || cur1=='K') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;}
				if(f!=-10000 && f!=0) {movesW.push([i,j,b5,b6,f]); break; }
				movesW.push([i,j,b5,b6,f]);
				b5++; b6++;
            }
			// leftDown
			for (let k = 1; k < 9; k++) {
				if(b7>7 || b8<0) {break;}
				let cur1 = preChessBoad[b7][b8];
				if(cur1=='P' || cur1=='R' || cur1=='N' || cur1=='B' || cur1=='Q' || cur1=='K') { break; }
				var f=-10000; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;}
				if(f!=-10000 && f!=0) {movesW.push([i,j,b7,b8,f]); break; }
				movesW.push([i,j,b7,b8,f]);
				b7++; b8--;
            }
		}
		 else if(getInner=='K') {          
			  // upLeft	    // right       
			 var k1=i-1;    var k9=i;
			 var k2=j-1;    var k10=j+1;
			 // up	        // leftDown	
			 var k3=i-1;    var k11=i+1;
			 var k4=j;      var k12=j-1;
			 // upRight	    // down	
			 var k5=i-1;    var k13=i+1;
			 var k6=j+1;    var k14=j;
			 // left	    // rightdown                   
			 var k7=i;      var k15=i+1;
			 var k8=j-1;    var k16=j+1;
			
			//fix it
			 if(k1>=0 && k2>=0) { const getInner=document.getElementById(idOfAllSquare[k1][k2]).innerHTML; if(!getInner.includes('white')) { var x=queenCheckCell('king','white',idOfAllSquare[k1][k2]); if(x==true) {let cur1 = preChessBoad[k1][k2]; var f=0; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;} movesW.push([i,j,k1,k2,f]);}}}
			 if(k3>=0) { const getInner=document.getElementById(idOfAllSquare[k3][k4]).innerHTML; if(!getInner.includes('white')) { var x=queenCheckCell('king','white',idOfAllSquare[k3][k4]); if(x==true) { let cur1 = preChessBoad[k3][k4]; var f=0; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;} movesW.push([i,j,k3,k4,f]);}}}
			 if(k5>=0 && k6<=7) { const getInner=document.getElementById(idOfAllSquare[k5][k6]).innerHTML; if(!getInner.includes('white')) { var x=queenCheckCell('king','white',idOfAllSquare[k5][k6]); if(x==true) { let cur1 = preChessBoad[k5][k6]; var f=0; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;} movesW.push([i,j,k5,k6,f]);}}}
			 if(k8>=0) { const getInner=document.getElementById(idOfAllSquare[k7][k8]).innerHTML; if(!getInner.includes('white')) { var x=queenCheckCell('king','white',idOfAllSquare[k7][k8]); if(x==true) { let cur1 = preChessBoad[k7][k9]; var f=0; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;} movesW.push([i,j,k7,k8,f]);}}}
			
			 if(k10<=7) { const getInner=document.getElementById(idOfAllSquare[k9][k10]).innerHTML; if(!getInner.includes('white')) { var x=queenCheckCell('king','white',idOfAllSquare[k9][k10]); if(x==true) { let cur1 = preChessBoad[k9][k10]; var f=0; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;} movesW.push([i,j,k9,k10,f]);}}}            
			 if(k11<=7 && k12>=0) {const getInner=document.getElementById(idOfAllSquare[k11][k12]).innerHTML; if(!getInner.includes('white')) { var x=queenCheckCell('king','white',idOfAllSquare[k11][k12]); if(x==true) { let cur1 = preChessBoad[k11][k12]; var f=0; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;} movesW.push([i,j,k11,k12,f]);}}}
			 if(k13<=7) {const getInner=document.getElementById(idOfAllSquare[k13][k14]).innerHTML; if(!getInner.includes('white')) { var x=queenCheckCell('king','white',idOfAllSquare[k13][k14]); if(x==true) { let cur1 = preChessBoad[k13][k14]; var f=0; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;} movesW.push([i,j,k13,k14,f]);}}}         
			 if(k15<=7 && k16<=7) { const getInner=document.getElementById(idOfAllSquare[k15][k16]).innerHTML; if(!getInner.includes('white')) { var x=queenCheckCell('king','white',idOfAllSquare[k15][k16]); if(x==true) { let cur1 = preChessBoad[k15][k16]; var f=0; if(cur1=='') {f=empv;} if(cur1=='p') {f=pv;} if(cur1=='b') {f=bv;} if(cur1=='r') {f=rv;} if(cur1=='n') {f=nv;} if(cur1=='q') {f=qv;} if(cur1=='k') {f=kv;} movesW.push([i,j,k15,k16,f]);}}}
		 }
    }
  }  
	var ma=0;
	var hmm=null;
    for(var i=0;i<movesW.length;i++){
		 if(movesW[i][4]>=ma) {ma=movesW[i][4]; hmm=movesW[i];} 
	 }
	
	  if(ma==0) {
		hmm=null;
	  }
	 
  return hmm;
}

function pridictMove(hmm) {
	 
	 for(var i=0;i<8;i++) {
		 for(var j=0;j<8;j++) {
			 var pp=currentboad[i][j];
			 preChessBoad[i][j]=pp;
		 }
	 } 
	 value=0;
	 ////////////////////  black
	 var bm=hmm;
	  var cur1=preChessBoad[bm[2]][bm[3]];	  
	
	 if(cur1=='') {value+=0;} if(cur1=='P') {value+=pv;} if(cur1=='B') {value+=bv;} if(cur1=='R') {value+=rv;} if(cur1=='N') {value+=nv;} if(cur1=='Q') {value+=qv;} if(cur1=='K') {value+=kv;}
	 preChessBoad[bm[2]][bm[3]]=preChessBoad[bm[0]][bm[1]];
	 preChessBoad[bm[0]][bm[1]]='';
	 
	 /////////////////// white
	  hmm=bestMoveWhite(preChessBoad);
	  if(hmm!=null) {
	  bm=hmm;
	 cur1=preChessBoad[bm[2]][bm[3]];
	 if(cur1=='') {value-=0;} if(cur1=='p') {value-=pv;} if(cur1=='b') {value-=bv;} if(cur1=='r') {value-=rv;} if(cur1=='n') {value-=nv;} if(cur1=='q') {value-=qv;} if(cur1=='k') {value-=kv;}
	 preChessBoad[bm[2]][bm[3]]=preChessBoad[bm[0]][bm[1]];
	 preChessBoad[bm[0]][bm[1]]='';	 
	  }  
	 /////////////////// black
	 
	  hmm=bestMoveBlack(preChessBoad);
	  if(hmm!=null) {
	  bm=hmm;
	  cur1=preChessBoad[bm[2]][bm[3]];
	  if(cur1=='') {value+=0;} if(cur1=='P') {value+=pv;} if(cur1=='B') {value+=bv;} if(cur1=='R') {value+=rv;} if(cur1=='N') {value+=nv;} if(cur1=='Q') {value+=qv;} if(cur1=='K') {value+=kv;}
	 preChessBoad[bm[2]][bm[3]]=preChessBoad[bm[0]][bm[1]];
	 preChessBoad[bm[0]][bm[1]]='';
	  }
	  /* 
	 ///////////////////  white 
	 hmm=bestMoveWhite(preChessBoad);
	  if(hmm!=null) {
	  bm=hmm;
	 cur1=preChessBoad[bm[2]][bm[3]];
	 if(cur1=='') {value-=0;} if(cur1=='p') {value-=pv;} if(cur1=='b') {value-=bv;} if(cur1=='r') {value-=rv;} if(cur1=='n') {value-=nv;} if(cur1=='q') {value-=qv;} if(cur1=='k') {value-=kv;}
	 preChessBoad[bm[2]][bm[3]]=preChessBoad[bm[0]][bm[1]];
	 preChessBoad[bm[0]][bm[1]]='';	 
	  } 
	 */ 
	 //console.log(preChessBoad);
	 //console.log(value);
	 
	 if(value<0) {return false;}
	 return true;
}

function bmm1() {
	 var ma=-1;
	 var hmm=null;
	 for(var i=0;i<moves.length;i++){
		 if(moves[i][4]>=ma) {ma=moves[i][4]; hmm=moves[i];} 
	 }
	 
	 if(ma==0) {hmm=getRandomElementFromArray(moves);}
	 
	 var bm=hmm;
	 var bc=queenCheckCell('king','black',blackKing);
	 
	 if(bc==false) {
		bKingCheck();
		const pp = [57,58,59,60,61,62,63,64];
		    for(var i=0;i<=7;i++) {
				var pq=document.getElementById(pp[i]).innerHTML; 
				if(pq.includes('black') && pq.includes('pawn')) {
					document.getElementById(pp[i]).innerHTML=pramotBlackQueen;
					currentboad[7][i]='q';
				}
			}
		whosTurn();
		return;
	 }
	 else if(pridictMove(hmm)) {
	 var c1=idOfAllSquare[bm[0]][bm[1]];
	 var c2=idOfAllSquare[bm[2]][bm[3]];
	 var d=document.getElementById(c1).innerHTML; 
	 if(c1==blackKing) {blackKing=c2;}	
	 document.getElementById(c1).innerHTML='';  // set innerHTML same as first.
	 document.getElementById(c2).innerHTML=d; // set innerHTML same as first.
	 currentboad[bm[2]][bm[3]]=currentboad[bm[0]][bm[1]];
	 currentboad[bm[0]][bm[1]]='';
	  const pp = [57,58,59,60,61,62,63,64];
		    for(var i=0;i<=7;i++) {
				var pq=document.getElementById(pp[i]).innerHTML; 
				if(pq.includes('black') && pq.includes('pawn')) {
					document.getElementById(pp[i]).innerHTML=pramotBlackQueen;
					currentboad[7][i]='q';
				}
			}
	 whosTurn();
	 return;
	 }
	 else {
		 var le=moves.length;
		 if(le==1) {
			 generateMovesForBlack(currentboad);
			ma=100000;
		  for(var i=0;i<moves.length;i++){
			if(moves[i][4]<=ma) {ma=moves[i][4]; hmm=moves[i];} 
		  }
		  bm=hmm;
		  var c1=idOfAllSquare[bm[0]][bm[1]];
		  var c2=idOfAllSquare[bm[2]][bm[3]];
		  var d=document.getElementById(c1).innerHTML; 
		  if(c1==blackKing) {blackKing=c2;}
		  document.getElementById(c1).innerHTML='';  // set innerHTML same as first.
		  document.getElementById(c2).innerHTML=d; // set innerHTML same as first.
		  currentboad[bm[2]][bm[3]]=currentboad[bm[0]][bm[1]];
		  currentboad[bm[0]][bm[1]]='';
			const pp = [57,58,59,60,61,62,63,64];
		    for(var i=0;i<=7;i++) {
				var pq=document.getElementById(pp[i]).innerHTML; 
				if(pq.includes('black') && pq.includes('pawn')) {
					document.getElementById(pp[i]).innerHTML=pramotBlackQueen;
				}
			}
			whosTurn();
			return;
		 }
		 for(var i=0;i<le;i++) {
			 if(moves[i]==hmm) {
				 var removedEle=moves.splice(i, 1)[0];
				 break;
			 }
		 }
		 bmm();
	 }
}

function bmm() {
	
	if(moves.length==0) {
		 alert("Stalemate");
		 setTimeout(() => {
                    location.reload();
                }, 2000)
	}
	 var ma=-1;
	 var hmm=null;
	 
	 for(var i=0;i<moves.length;i++){
		 if(moves[i][4]>=ma) {ma=moves[i][4]; hmm=moves[i];} 
	 }
	 
	 if(ma==0) {hmm=getRandomElementFromArray(moves);}
	 
	 var bm=hmm;
	 var bc=queenCheckCell('king','black',blackKing);
	 
	 if(bc==false) {
		//console.log("check");
		bKingCheck();
		const pp = [57,58,59,60,61,62,63,64];
		    for(var i=0;i<=7;i++) {
				var pq=document.getElementById(pp[i]).innerHTML; 
				if(pq.includes('black') && pq.includes('pawn')) {
					document.getElementById(pp[i]).innerHTML=pramotBlackQueen;
					currentboad[7][i]='q';
				}
			}
		whosTurn();	
		return;
	 }
	 else if(pridictMove(hmm)) {
	 var c1=idOfAllSquare[bm[0]][bm[1]];
	 var c2=idOfAllSquare[bm[2]][bm[3]];
	 var d=document.getElementById(c1).innerHTML; 
	 if(c1==blackKing) {blackKing=c2;}
	 document.getElementById(c1).innerHTML='';  // set innerHTML same as first.
	 document.getElementById(c2).innerHTML=d; // set innerHTML same as first.
	 currentboad[bm[2]][bm[3]]=currentboad[bm[0]][bm[1]];
	 currentboad[bm[0]][bm[1]]='';
	 const pp = [57,58,59,60,61,62,63,64];
		    for(var i=0;i<=7;i++) {
				var pq=document.getElementById(pp[i]).innerHTML; 
				if(pq.includes('black') && pq.includes('pawn')) {
					document.getElementById(pp[i]).innerHTML=pramotBlackQueen;
					currentboad[7][i]='q';
				}
			}
	 whosTurn();
	 return;
	 }
	 else {
		 var le=moves.length;
		 if(le==1) {
		    generateMovesForBlack(currentboad);
			ma=100000;
		  for(var i=0;i<moves.length;i++){
			if(moves[i][4]<=ma) {ma=moves[i][4]; hmm=moves[i];} 
		  }
		  bm=hmm;
		  var c1=idOfAllSquare[bm[0]][bm[1]];
		  var c2=idOfAllSquare[bm[2]][bm[3]];
		  var d=document.getElementById(c1).innerHTML; 
		  if(c1==blackKing) {blackKing=c2;}
		  document.getElementById(c1).innerHTML='';  // set innerHTML same as first.
		  document.getElementById(c2).innerHTML=d; // set innerHTML same as first.
		  currentboad[bm[2]][bm[3]]=currentboad[bm[0]][bm[1]];
		  currentboad[bm[0]][bm[1]]='';
		  const pp = [57,58,59,60,61,62,63,64];
		    for(var i=0;i<=7;i++) {
				var pq=document.getElementById(pp[i]).innerHTML; 
				if(pq.includes('black') && pq.includes('pawn')) {
					document.getElementById(pp[i]).innerHTML=pramotBlackQueen;
					currentboad[7][i]='q';
				}
			}
		
		   whosTurn();
		   return;
		 }
		 for(var i=0;i<le;i++) {
			 if(moves[i]==hmm) {
				 var removedEle=moves.splice(i, 1)[0];
				 break;
			 }
		 }
		  bmm1();
	 }
}
 
	let click1=null;
	let click2=null;
	let current_i=null;
	let current_j=null;
	let target_i=null;
	let target_j=null;
	let priId=null; 
	let preCheck=null; 
	let moveNo=0;
	let whiteKing=61;
	let blackKing=5;
	
		 function whosTurn() {
			 if(moveNo%2==0) {document.getElementById('tog').innerText = "Black's Turn"; moveNo=moveNo+1; generateMovesForBlack(currentboad);  bmm(); }
			 else if(moveNo%2==1) {document.getElementById('tog').innerText = "White's Turn"; moveNo=moveNo+1; if(moveNo>=4) { whiteKingCheckMate(); }}
		} if(moveNo==0) {moveNo=moveNo+1; whosTurn(); }
			
		function queenCheckCell(kp,imgCheck,cells) {
			
			
			var  currenti;
			var  currentj;
			var count=0;
			
			var celld=cells;
			
			 currenti=Math.ceil(Number((celld)/8))-1;
		   currentj=Math.ceil(Number(celld)%8)-1;
		   if(currentj==-1) {currentj=7;}
		
			currenti=Number(currenti);
		   currentj=Number(currentj);
		
		   // plus
			 let wr = [currenti-1,currentj,currenti,currentj-1,currenti+1,currentj,currenti,currentj+1];
			 // up
			for (let i = 1; i < 9; i++) {
				if(wr[0]<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[0]][wr[1]]).innerHTML;
				if(getInner.includes('pieces')) { if(!getInner.includes(imgCheck)) { if(/rook|queen/.test(getInner)) {  count=1; } queenCheck.push(idOfAllSquare[wr[0]][wr[1]]);} break;}
				queenCheck.push(idOfAllSquare[wr[0]][wr[1]]);
				wr[0]--;
            }
			 // left
			for (let i = 1; i < 9; i++) {
				if(wr[3]<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[2]][wr[3]]).innerHTML;
				if(getInner.includes('pieces')) { if(!getInner.includes(imgCheck)) { if(/rook|queen/.test(getInner)) { count=1; } queenCheck.push(idOfAllSquare[wr[2]][wr[3]]);} break;}
				queenCheck.push(idOfAllSquare[wr[2]][wr[3]]);
				wr[3]--;
            }
			 // down
			for (let i = 1; i < 9; i++) {
				if(wr[4]>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[4]][wr[5]]).innerHTML;
				if(getInner.includes('pieces')) { if(!getInner.includes(imgCheck)) { if(/rook|queen/.test(getInner)) { count=1; } queenCheck.push(idOfAllSquare[wr[4]][wr[5]]);} break;}
				queenCheck.push(idOfAllSquare[wr[4]][wr[5]]);
				wr[4]++;
            }
			 // right
			for (let i = 1; i < 9; i++) {
				if(wr[7]>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[6]][wr[7]]).innerHTML;
				if(getInner.includes('pieces')) {if(!getInner.includes(imgCheck)) { if(/rook|queen/.test(getInner)) {  count=1; } queenCheck.push(idOfAllSquare[wr[6]][wr[7]]); }break;}
				queenCheck.push(idOfAllSquare[wr[6]][wr[7]]);
				wr[7]++;
            }
			
			// corner
			 var b1=currenti-1;
			 var b2=currentj+1;
			 var b3=currenti-1;
			 var b4=currentj-1; 
			 var b5=currenti+1;
			 var b6=currentj+1; 
			 var b7=currenti+1;
			 var b8=currentj-1;
			 
			  // rightUp
			for (let i = 1; i < 9; i++) {
				if(b1<0 || b2>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[b1][b2]).innerHTML;
				if(getInner.includes('pieces')) { if(!getInner.includes(imgCheck)) { if(/bishop|queen/.test(getInner)) {  count=1; } queenCheck.push(idOfAllSquare[b1][b2]);} break;}
				queenCheck.push(idOfAllSquare[b1][b2]);
				b1--; b2++;
            }
			 // leftUp
			for (let i = 1; i < 9; i++) {
				if(b3<0 || b4<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[b3][b4]).innerHTML;
				if(getInner.includes('pieces')) { if(!getInner.includes(imgCheck)) { if(/bishop|queen/.test(getInner)) {  count=1; }  queenCheck.push(idOfAllSquare[b3][b4]);} break;}
				queenCheck.push(idOfAllSquare[b3][b4]);
				b3--; b4--;
            }
			// rightDown
			for (let i = 1; i < 9; i++) {
				if(b5>7 || b6>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[b5][b6]).innerHTML;
				if(getInner.includes('pieces')) { if(!getInner.includes(imgCheck)) {if(/bishop|queen/.test(getInner)) { count=1; }  queenCheck.push(idOfAllSquare[b5][b6]);} break;}
				queenCheck.push(idOfAllSquare[b5][b6]);
				b5++; b6++;
            }
			// leftDown
			for (let i = 1; i < 9; i++) {
				if(b7>7 || b8<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[b7][b8]).innerHTML;
				if(getInner.includes('pieces')) { if(!getInner.includes(imgCheck)) { if(/bishop|queen/.test(getInner)) {  count=1; }  queenCheck.push(idOfAllSquare[b7][b8]);} break;}
				queenCheck.push(idOfAllSquare[b7][b8]);
				b7++; b8--;
            }
			
			// knight
			
			// leftUp	           // upLeft
			var k1=currenti-1;    var k9=currenti-2;
			var k2=currentj-2;    var k10=currentj-1;
			// leftDown	           // upRight	
			var k3=currenti+1;    var k11=currenti-2;
			var k4=currentj-2;    var k12=currentj+1;
			// rightUp	           // downLeft	
			var k5=currenti-1;    var k13=currenti+2;
			var k6=currentj+2;    var k14=currentj-1;
			// rightDown	       // downRight	
			var k7=currenti+1;    var k15=currenti+2;
			var k8=currentj+2;    var k16=currentj+1;
			
			if(k1>=0 && k2>=0) { const getInner = document.getElementById(idOfAllSquare[k1][k2]).innerHTML; if(!getInner.includes(imgCheck)) { if(getInner.includes('knight')) {count=1;} queenCheck.push(idOfAllSquare[k1][k2]);}}
			if(k3<=7 && k4>=0) { const getInner = document.getElementById(idOfAllSquare[k3][k4]).innerHTML; if(!getInner.includes(imgCheck)) { if(getInner.includes('knight')) {count=1;} queenCheck.push(idOfAllSquare[k3][k4]);}}
			if(k5>=0 && k6<=7) { const getInner = document.getElementById(idOfAllSquare[k5][k6]).innerHTML; if(!getInner.includes(imgCheck)) { if(getInner.includes('knight')) {count=1;} queenCheck.push(idOfAllSquare[k5][k6]);}}
			if(k7<=7 && k8<=7) { const getInner = document.getElementById(idOfAllSquare[k7][k8]).innerHTML; if(!getInner.includes(imgCheck)) { if(getInner.includes('knight')) {count=1;} queenCheck.push(idOfAllSquare[k7][k8]);}}
			
			if(k9>=0 && k10>=0)  { const getInner = document.getElementById(idOfAllSquare[k9][k10]).innerHTML; if(!getInner.includes(imgCheck))  { if(getInner.includes('knight')) {count=1;} queenCheck.push(idOfAllSquare[k9][k10]);}}
			if(k11>=0 && k12<=7) { const getInner = document.getElementById(idOfAllSquare[k11][k12]).innerHTML; if(!getInner.includes(imgCheck)) { if(getInner.includes('knight')) {count=1;} queenCheck.push(idOfAllSquare[k11][k12]);}}
			if(k13<=7 && k14>=0) { const getInner = document.getElementById(idOfAllSquare[k13][k14]).innerHTML; if(!getInner.includes(imgCheck)) { if(getInner.includes('knight')) {count=1;} queenCheck.push(idOfAllSquare[k13][k14]);}}
			if(k15<=7 && k16<=7) { const getInner = document.getElementById(idOfAllSquare[k15][k16]).innerHTML; if(!getInner.includes(imgCheck)) { if(getInner.includes('knight')) {count=1;} queenCheck.push(idOfAllSquare[k15][k16]);}}
			
			 
			 // pown 
			if(imgCheck=='white') {
				// upLeft	        
				var k1=currenti-1;
				var k2=currentj-1; 
				// upRight	        
				var k3=currenti-1;
				var k4=currentj+1; 
				
				if(k1>=0 && k2>=0) {
				const getInner1 = document.getElementById(idOfAllSquare[k1][k2]).innerHTML; 
				if(getInner1.includes('black') && getInner1.includes('pawn')) {count=1;}			
				}
				if(k3>=0 && k4<=7)  {
				const getInner2 = document.getElementById(idOfAllSquare[k3][k4]).innerHTML; 
				if(getInner2.includes('black') && getInner2.includes('pawn')) {count=1;}
				}
			
			}
			else if(imgCheck=='black')  {
				// leftDown	
				 var k1=currenti+1;
				 var k2=currentj-1;
				// rightdown
				 var k3=currenti+1;
				 var k4=currentj+1;
				 
				 if(k1<=7 && k2>=0) {
				const getInner1 = document.getElementById(idOfAllSquare[k1][k2]).innerHTML; 
				if(getInner1.includes('white') && getInner1.includes('pawn')) {count=1;}
				 }
				 if(k3<=7 && k4<=7) {
				const getInner2 = document.getElementById(idOfAllSquare[k3][k4]).innerHTML; 
				if(getInner2.includes('white') && getInner2.includes('pawn')) {count=1;} 
				 }
				
			}

				
			if(imgCheck=='white' && kp=='king' && click1==whiteKing) {
				
			var i=Math.ceil(Number((click2)/8))-1;
		    var j=Math.ceil(Number(click2)%8)-1;
		    if(j==-1) {j=7;}
		   
				 // upLeft	           // right
			 var ki1=i-1;    var ki9=i;
			 var ki2=j-1;    var ki10=j+1;
			 // up	           	   // leftDown	
			 var ki3=i-1;    var ki11=i+1;
			 var ki4=j;      var ki12=j-1;
			 // upRight	           // down	
			 var ki5=i-1;    var ki13=i+1;
			 var ki6=j+1;    var ki14=j;
			 // left	      		   // rightdown
			 var ki7=i;      var ki15=i+1;
			 var ki8=j-1;    var ki16=j+1;
			 
			 if(ki1>=0 && ki2>=0) {const getInner = document.getElementById(idOfAllSquare[ki1][ki2]).innerHTML; if(getInner.includes('black') && getInner.includes('king')) {count=1;}}
			 if(ki3>=0) {const getInner = document.getElementById(idOfAllSquare[ki3][ki4]).innerHTML; if(getInner.includes('black') && getInner.includes('king')) {count=1;}}
			 if(ki5>=0 && ki6<=7) {const getInner = document.getElementById(idOfAllSquare[ki5][ki6]).innerHTML; if(getInner.includes('black') && getInner.includes('king')) {count=1;}}
			 if(ki8>=0) {const getInner = document.getElementById(idOfAllSquare[ki7][ki8]).innerHTML; if(getInner.includes('black') && getInner.includes('king')) {count=1;}}
			
			 if(ki10<=7) {const getInner = document.getElementById(idOfAllSquare[ki9][ki10]).innerHTML; if(getInner.includes('black') && getInner.includes('king')) {count=1;}}
			 if(ki11<=7 && ki12>=0) {const getInner = document.getElementById(idOfAllSquare[ki11][ki12]).innerHTML; if(getInner.includes('black') && getInner.includes('king')) {count=1;}}
			 if(ki13<=7) {const getInner = document.getElementById(idOfAllSquare[ki13][ki14]).innerHTML; if(getInner.includes('black') && getInner.includes('king')) {count=1;}}
			 if(ki15<=7 && ki16<=7) {const getInner = document.getElementById(idOfAllSquare[ki15][ki16]).innerHTML; if(getInner.includes('black') && getInner.includes('king')) {count=1;}}
			}
			
				//console.log(queenCheck);
				 //console.log(count);
			
			   queenCheck.length=0;
			   
			if(count==1)   {return false;}
			
			return true;
			
	}
	
	    // for black
		function kingCheckCell(clic) {
			var i=Math.ceil(Number(clic)/8)-1;
		    var j=Math.ceil(Number(clic)%8)-1;
		    if(j==-1) {j=7;}
		   
		   var count=0;
				 // upLeft	           // right
			 var ki1=i-1;    var ki9=i;
			 var ki2=j-1;    var ki10=j+1;
			 // up	           	   // leftDown	
			 var ki3=i-1;    var ki11=i+1;
			 var ki4=j;      var ki12=j-1;
			 // upRight	           // down	
			 var ki5=i-1;    var ki13=i+1;
			 var ki6=j+1;    var ki14=j;
			 // left	      		   // rightdown
			 var ki7=i;      var ki15=i+1;
			 var ki8=j-1;    var ki16=j+1;
			 
			 if(ki1>=0 && ki2>=0) {const getInner = document.getElementById(idOfAllSquare[ki1][ki2]).innerHTML; if(getInner.includes('white') && getInner.includes('king')) {count=1;}}
			 if(ki3>=0) {const getInner = document.getElementById(idOfAllSquare[ki3][ki4]).innerHTML; if(getInner.includes('white') && getInner.includes('king')) {count=1;}}
			 if(ki5>=0 && ki6<=7) {const getInner = document.getElementById(idOfAllSquare[ki5][ki6]).innerHTML; if(getInner.includes('white') && getInner.includes('king')) {count=1;}}
			 if(ki8>=0) {const getInner = document.getElementById(idOfAllSquare[ki7][ki8]).innerHTML; if(getInner.includes('white') && getInner.includes('king')) {count=1;}}
			
			 if(ki10<=7) {const getInner = document.getElementById(idOfAllSquare[ki9][ki10]).innerHTML; if(getInner.includes('white') && getInner.includes('king')) {count=1;}}
			 if(ki11<=7 && ki12>=0) {const getInner = document.getElementById(idOfAllSquare[ki11][ki12]).innerHTML; if(getInner.includes('white') && getInner.includes('king')) {count=1;}}
			 if(ki13<=7) {const getInner = document.getElementById(idOfAllSquare[ki13][ki14]).innerHTML; if(getInner.includes('white') && getInner.includes('king')) {count=1;}}
			 if(ki15<=7 && ki16<=7) {const getInner = document.getElementById(idOfAllSquare[ki15][ki16]).innerHTML; if(getInner.includes('white') && getInner.includes('king')) {count=1;}}
			  if(count==1) {return false;}
			  return true;
		}

		function whiteKingCheckMate() {
			
			var i=Math.ceil(Number(whiteKing)/8)-1;
		    var j=Math.ceil(Number(whiteKing)%8)-1;
		    if(j==-1) {j=7;}
			
		   var count=8;
			// upLeft	     // right
			 var ki1=i-1;    var ki9=i;
			 var ki2=j-1;    var ki10=j+1;
			 // up	         // leftDown	
			 var ki3=i-1;    var ki11=i+1;
			 var ki4=j;      var ki12=j-1;
			 // upRight	     // down	
			 var ki5=i-1;    var ki13=i+1;
			 var ki6=j+1;    var ki14=j;
			 // left	     // rightdown
			 var ki7=i;      var ki15=i+1;
			 var ki8=j-1;    var ki16=j+1;
			 
			if(ki1>=0 && ki2>=0) { const getInner = document.getElementById(idOfAllSquare[ki1][ki2]).innerHTML; var kr1=queenCheckCell('king','white',idOfAllSquare[ki1][ki2]);  if(getInner.includes('white')) {kr1=false;}} 
			if(ki3>=0) { const getInner = document.getElementById(idOfAllSquare[ki3][ki4]).innerHTML; var kr2=queenCheckCell('king','white',idOfAllSquare[ki3][ki4]); if(getInner.includes('white')) {kr2=false;} } 
			if(ki5>=0 && ki6<=7) { const getInner = document.getElementById(idOfAllSquare[ki5][ki6]).innerHTML; var kr3=queenCheckCell('king','white',idOfAllSquare[ki5][ki6]);  if(getInner.includes('white')) {kr3=false;} }
			if(ki8>=0) { const getInner = document.getElementById(idOfAllSquare[ki7][ki8]).innerHTML; var kr4=queenCheckCell('king','white',idOfAllSquare[ki7][ki8]); if(getInner.includes('white')) {kr4=false;} }
			
			var kr0=queenCheckCell('king','white',whiteKing);
			
			if(ki10<=7) { const getInner = document.getElementById(idOfAllSquare[ki9][ki10]).innerHTML; var kr5=queenCheckCell('king','white',idOfAllSquare[ki9][ki10]); if(getInner.includes('white')) {kr5=false;} }
			if(ki11<=7 && ki12>=0) { const getInner = document.getElementById(idOfAllSquare[ki11][ki12]).innerHTML; var kr6=queenCheckCell('king','white',idOfAllSquare[ki11][ki12]); if(getInner.includes('white')) {kr6=false;} } 
			if(ki13<=7) { const getInner = document.getElementById(idOfAllSquare[ki13][ki14]).innerHTML; var kr7=queenCheckCell('king','white',idOfAllSquare[ki13][ki14]);  if(getInner.includes('white')) {kr7=false;} }
			if(ki15<=7 && ki16<=7) { const getInner = document.getElementById(idOfAllSquare[ki15][ki16]).innerHTML; var kr8=queenCheckCell('king','white',idOfAllSquare[ki15][ki16]);  if(getInner.includes('white')) {kr8=false;} }
			
			if(kr1==undefined) {kr1=false;}
			if(kr2==undefined) {kr2=false;}
			if(kr3==undefined) {kr3=false;}
			if(kr4==undefined) {kr4=false;}
			
			if(kr5==undefined) {kr5=false;}
			if(kr6==undefined) {kr6=false;}
			if(kr7==undefined) {kr7=false;}
			if(kr8==undefined) {kr8=false;}
			
			if(kr0==false && kr1==false && kr2==false && kr3==false && kr4==false && kr5==false && kr6==false && kr7==false && kr8==false) {
				alert("Black win");
					setTimeout(() => {
                    location.reload();
					}, 5000)
			}
			bestMoveWhite(currentboad);
			if(kr0==true && kr1==false && kr2==false && kr3==false && kr4==false && kr5==false && kr6==false && kr7==false && kr8==false && movesW.length==0) {
				alert("Stalemate");
					setTimeout(() => {
                    location.reload();
					}, 5000)
			}  
		}		

// click heandle
	const allSquare = document.querySelectorAll(".square");   // array that take all square div.
	const clickedElement = [];  // empty array that allow only one click cell.
	const clickElement = [null,null];  // store cell 'id' first and second click.
	let ok=0;
		
		for(const i of allSquare) {
			i.addEventListener('click',function() { 
			if(clickedElement.length>0) {
				clickedElement[0].removeAttribute('style');  // remove style attributes.
				clickedElement.length=0; // set length as a 0.
			}
				const idOfElement = i.getAttribute("id"); // get id of a cell.
				const imageSrc = document.getElementById(idOfElement).innerHTML; // get image src into string.
				// check if this cell have a image.
				if(imageSrc.includes('white') && document.getElementById('tog').innerText == "White's Turn") {
					document.getElementById(idOfElement).style.backgroundColor="#769656";  // set style attributes and make backgroundColor as a green.
					clickedElement.push(i); // push element in empty array.  
				} 
				
			// check user click 'white'
			if(ok==0 && imageSrc.includes('white') && document.getElementById('tog').innerText == "White's Turn") {  
				clickElement[0]=idOfElement;
				click1=clickElement[0];  // assign value to click1.
				ok=1;
			}
			else if(ok==1 && document.getElementById('tog').innerText == "White's Turn") {  
				clickElement[1]=idOfElement;
				click2=clickElement[1];  // assign value to click2.
				if(imageSrc.includes('white')) {
					  clickElement[0]=idOfElement;
					  click1=idOfElement;
					  clickElement[1]=null;
					  click2=null;  // assign NuLL to click1.
				}
				else if(clickElement[0] != clickElement[1] && !imageSrc.includes('white')) {
				priId = document.getElementById(click2).innerHTML; // get click2 imgsrc (use in function).
				if(Number(click1)-8>=9) {preCheck = document.getElementById((click1-8)).innerHTML;}
				var inner1=document.getElementById(idOfElement).innerHTML; // get innerHTML of current index.	
				var inner=document.getElementById(clickElement[0]).innerHTML;  // get inner html of clickElement[0].
				i.innerHTML = inner;   // set innerHTML into clickElement[1].
				document.getElementById(clickElement[0]).innerHTML=""; // remove image from first click.
				ok=2;
				const imageSsrc = document.getElementById(clickElement[1]).innerHTML; // get image src into string of second. 
				var flag=false;
				flag=checkIfValid(click1,click2,imageSsrc); // check is valid move.
				var h=true;
				// castling Right
				if(imageSsrc.includes('king') && click2==63) { 
				 if(whiteKingPos==0 && whiteRookPos2==0) {
					var kr1=queenCheckCell('king','white',62); 
					var kr2=queenCheckCell('king','white',63);
					var kp=queenCheckCell('king','white',whiteKing);
					var krc=document.getElementById(62).innerHTML;					
					if(kr1==true && kr2==true && kp==true && krc=='') { 
					   flag=true;
					   document.getElementById(62).innerHTML=document.getElementById(64).innerHTML;
					   document.getElementById(64).innerHTML='';
					   currentboad[7][7]='';
					   currentboad[7][5]='R';
					}
				  }
				}
				 // castling Left
				if(imageSsrc.includes('king') && click2==59) { 
				 if(whiteKingPos==0 && whiteRookPos1==0) {
					var kr1=queenCheckCell('king','white',58); 
					var kr2=queenCheckCell('king','white',59);
					var kr3=queenCheckCell('king','white',60);
					var kp=queenCheckCell('king','white',whiteKing);
					var krc1=document.getElementById(58).innerHTML;					
					var krc2=document.getElementById(60).innerHTML;					
					if(kr1==true && kr2==true && kr3==true && kp==true && krc1=='' && krc2=='') { 
					   flag=true;
					   document.getElementById(60).innerHTML=document.getElementById(57).innerHTML;
					   document.getElementById(57).innerHTML='';
					  currentboad[7][0]='';
					  currentboad[7][3]='R';
					}
				  }
				}
				if(flag==true) {
					if(imageSsrc.includes('king'))  {
					h=queenCheckCell('king','white',click2);
					}
					else {
						h=queenCheckCell('pieces','white',whiteKing);
					}
						//console.log(h);
					 if(h==true && flag==true) { 
					 if(imageSsrc.includes('king')) { whiteKingPos=1; whiteKing=Number(click2); }
					  if(imageSsrc.includes('rook')) {if(click1==57) {whiteRookPos1=1;}  if(click1==64) {whiteRookPos2=1;}}
					  target_i=Math.ceil(Number((click2)/8))-1;
					  target_j=Math.ceil(Number(click2)%8)-1;
					  if(target_j==-1) {target_j=7;}
					  currentboad[target_i][target_j]=currentboad[current_i][current_j];
					  currentboad[current_i][current_j]='';
					  var done=true;
					  const pp = [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8];
						for(var l=0;l<=7;l++) {
							var pq=document.getElementById(pp[l]).innerHTML; 
							if(pq.includes('white') && pq.includes('pawn')) {
								done=false;
								selectElement.style.display = "block";
								document.getElementById("Loading").style.display = "block";
							}
						} 
					 if(done==true) {whosTurn();}
					 }
					}
				if(flag==false || h==false) {
					
					document.getElementById(clickElement[0]).innerHTML = inner;  // set innerHTML same as first.
					document.getElementById(clickElement[1]).innerHTML=inner1; // set innerHTML same as first.
					  // red border (move invalid).
					  setTimeout(function() {
							var redBorder = document.getElementsByClassName("main-container");
								for (var i = 0; i < redBorder.length; i++) {
								redBorder[i].classList.add("red-border");
								}
								setTimeout(function() {
								for (var i = 0; i < redBorder.length; i++) {
								redBorder[i].classList.remove("red-border");
								}
							}, 1000);
						}, 0);
					}	
				}
			}
			else if(ok==2 && imageSrc.includes('white') && document.getElementById('tog').innerText == "White's Turn") { 
				ok=1;
				clickElement.length=0;
				clickElement[0]=idOfElement;
				click1=clickElement[0];  // assign value to click1.	
				click2=null;
			}
			});
		}
		
// check piece move.
let rookCheck = []; 
let knightCheck = [];
let bishopCheck = [];
let queenCheck = []; 
const kingCheck = [];

	function checkIfValid(click1,click2,imageSrc) {
		
		   current_i=Math.ceil(Number((click1)/8))-1;
		   current_j=Math.ceil(Number(click1)%8)-1;
		   if(current_j==-1) {current_j=7;}
		   
		   click1=Number(click1);
		   click2=Number(click2);
		 
		 if(imageSrc.includes('pawn') && imageSrc.includes('white')) {
			const starterRow = [49,50,51,52,53,54,55,56];
			if(starterRow.includes(click1) && ((click1-8)-8 == click2 && !preCheck.includes('pieces')) ||   // first 2 move
				(click1-8 == click2 && !priId.includes('black')) ||   // go next
				((click2==(click1-8)+1 || click2==(click1-8)-1) && priId.includes('black')))	  // go right-up or left-up 
				{return true;}
			else {return false;}
		 }
		 
		 else if(imageSrc.includes('rook')) {
			 let wr = [current_i-1,current_j,current_i,current_j-1,current_i+1,current_j,current_i,current_j+1];
			 // up
			for (let i = 1; i < 9; i++) {
				if(wr[0]<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[0]][wr[1]]).innerHTML;
				if(getInner.includes('pieces')) {rookCheck.push(idOfAllSquare[wr[0]][wr[1]]); break;}
				rookCheck.push(idOfAllSquare[wr[0]][wr[1]]);
				wr[0]--;
            }
			 // left
			for (let i = 1; i < 9; i++) {
				if(wr[3]<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[2]][wr[3]]).innerHTML;
				if(getInner.includes('pieces')) {rookCheck.push(idOfAllSquare[wr[2]][wr[3]]); break;}
				rookCheck.push(idOfAllSquare[wr[2]][wr[3]]);
				wr[3]--;
            }
			 // down
			for (let i = 1; i < 9; i++) {
				if(wr[4]>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[4]][wr[5]]).innerHTML;
				if(getInner.includes('pieces')) {rookCheck.push(idOfAllSquare[wr[4]][wr[5]]); break;}
				rookCheck.push(idOfAllSquare[wr[4]][wr[5]]);
				wr[4]++;
            }
			 // right
			for (let i = 1; i < 9; i++) {
				if(wr[7]>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[6]][wr[7]]).innerHTML;
				if(getInner.includes('pieces')) {rookCheck.push(idOfAllSquare[wr[6]][wr[7]]); break;}
				rookCheck.push(idOfAllSquare[wr[6]][wr[7]]);
				wr[7]++;
            }
			if(rookCheck.includes(Number(click2))) {rookCheck.length=0; return true;}
			else {rookCheck.length=0; return false;}
		 }
		 
		 else if(imageSrc.includes('knight')) {
			
			// leftUp	           // upLeft
			var k1=current_i-1;    var k9=current_i-2;
			var k2=current_j-2;    var k10=current_j-1;
			// leftDown	           // upRight	
			var k3=current_i+1;    var k11=current_i-2;
			var k4=current_j-2;    var k12=current_j+1;
			// rightUp	           // downLeft	
			var k5=current_i-1;    var k13=current_i+2;
			var k6=current_j+2;    var k14=current_j-1;
			// rightDown	       // downRight	
			var k7=current_i+1;    var k15=current_i+2;
			var k8=current_j+2;    var k16=current_j+1;
			
			if(k1>=0 && k2>=0) { knightCheck.push(idOfAllSquare[k1][k2]);}
			if(k3<=7 && k4>=0) { knightCheck.push(idOfAllSquare[k3][k4]);}
			if(k5>=0 && k6<=7) { knightCheck.push(idOfAllSquare[k5][k6]);}
			if(k7<=7 && k8<=7) { knightCheck.push(idOfAllSquare[k7][k8]);}
			
			if(k9>=0 && k10>=0)  { knightCheck.push(idOfAllSquare[k9][k10]);}
			if(k11>=0 && k12<=7) { knightCheck.push(idOfAllSquare[k11][k12]);}
			if(k13<=7 && k14>=0) { knightCheck.push(idOfAllSquare[k13][k14]);}
			if(k15<=7 && k16<=7) { knightCheck.push(idOfAllSquare[k15][k16]);}
			
			if(knightCheck.includes(Number(click2))) {knightCheck.length=0; return true;}
			else {knightCheck.length=0; return false;}
		 }
		 
		 else if(imageSrc.includes('bishop')) {
			
			 var b1=current_i-1;
			 var b2=current_j+1;
			 var b3=current_i-1;
			 var b4=current_j-1; 
			 var b5=current_i+1;
			 var b6=current_j+1; 
			 var b7=current_i+1;
			 var b8=current_j-1;
			 
			  // rightUp
			for (let i = 1; i < 9; i++) {
				if(b1<0 || b2>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[b1][b2]).innerHTML;
				if(getInner.includes('pieces')) {bishopCheck.push(idOfAllSquare[b1][b2]); break;}
				bishopCheck.push(idOfAllSquare[b1][b2]);
				b1--; b2++;
            }
			 // leftUp
			for (let i = 1; i < 9; i++) {
				if(b3<0 || b4<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[b3][b4]).innerHTML;
				if(getInner.includes('pieces')) {bishopCheck.push(idOfAllSquare[b3][b4]); break;}
				bishopCheck.push(idOfAllSquare[b3][b4]);
				b3--; b4--;
            }
			// rightDown
			for (let i = 1; i < 9; i++) {
				if(b5>7 || b6>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[b5][b6]).innerHTML;
				if(getInner.includes('pieces')) {bishopCheck.push(idOfAllSquare[b5][b6]); break;}
				bishopCheck.push(idOfAllSquare[b5][b6]);
				b5++; b6++;
            }
			// leftDown
			for (let i = 1; i < 9; i++) {
				if(b7>7 || b8<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[b7][b8]).innerHTML;
				if(getInner.includes('pieces')) {bishopCheck.push(idOfAllSquare[b7][b8]); break;}
				bishopCheck.push(idOfAllSquare[b7][b8]);
				b7++; b8--;
            }
			if(bishopCheck.includes(Number(click2))) {bishopCheck.length=0; return true;}
			else {bishopCheck.length=0; return false;} 							
		 }
		 
		 else if(imageSrc.includes('queen')) {
			
			// plus
			 let wr = [current_i-1,current_j,current_i,current_j-1,current_i+1,current_j,current_i,current_j+1];
			 // up
			for (let i = 1; i < 9; i++) {
				if(wr[0]<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[0]][wr[1]]).innerHTML;
				if(getInner.includes('pieces')) {queenCheck.push(idOfAllSquare[wr[0]][wr[1]]); break;}
				queenCheck.push(idOfAllSquare[wr[0]][wr[1]]);
				wr[0]--;
            }
			 // left
			for (let i = 1; i < 9; i++) {
				if(wr[3]<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[2]][wr[3]]).innerHTML;
				if(getInner.includes('pieces')) {queenCheck.push(idOfAllSquare[wr[2]][wr[3]]); break;}
				queenCheck.push(idOfAllSquare[wr[2]][wr[3]]);
				wr[3]--;
            }
			 // down
			for (let i = 1; i < 9; i++) {
				if(wr[4]>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[4]][wr[5]]).innerHTML;
				if(getInner.includes('pieces')) {queenCheck.push(idOfAllSquare[wr[4]][wr[5]]); break;}
				queenCheck.push(idOfAllSquare[wr[4]][wr[5]]);
				wr[4]++;
            }
			 // right
			for (let i = 1; i < 9; i++) {
				if(wr[7]>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[wr[6]][wr[7]]).innerHTML;
				if(getInner.includes('pieces')) {queenCheck.push(idOfAllSquare[wr[6]][wr[7]]); break;}
				queenCheck.push(idOfAllSquare[wr[6]][wr[7]]);
				wr[7]++;
            }
			
			// corner
			 var b1=current_i-1;
			 var b2=current_j+1;
			 var b3=current_i-1;
			 var b4=current_j-1; 
			 var b5=current_i+1;
			 var b6=current_j+1; 
			 var b7=current_i+1;
			 var b8=current_j-1;
			 
			  // rightUp
			for (let i = 1; i < 9; i++) {
				if(b1<0 || b2>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[b1][b2]).innerHTML;
				if(getInner.includes('pieces')) {queenCheck.push(idOfAllSquare[b1][b2]); break;}
				queenCheck.push(idOfAllSquare[b1][b2]);
				b1--; b2++;
            }
			 // leftUp
			for (let i = 1; i < 9; i++) {
				if(b3<0 || b4<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[b3][b4]).innerHTML;
				if(getInner.includes('pieces')) {queenCheck.push(idOfAllSquare[b3][b4]); break;}
				queenCheck.push(idOfAllSquare[b3][b4]);
				b3--; b4--;
            }
			// rightDown
			for (let i = 1; i < 9; i++) {
				if(b5>7 || b6>7) {break;}
                const getInner = document.getElementById(idOfAllSquare[b5][b6]).innerHTML;
				if(getInner.includes('pieces')) {queenCheck.push(idOfAllSquare[b5][b6]); break;}
				queenCheck.push(idOfAllSquare[b5][b6]);
				b5++; b6++;
            }
			// leftDown
			for (let i = 1; i < 9; i++) {
				if(b7>7 || b8<0) {break;}
                const getInner = document.getElementById(idOfAllSquare[b7][b8]).innerHTML;
				if(getInner.includes('pieces')) {queenCheck.push(idOfAllSquare[b7][b8]); break;}
				queenCheck.push(idOfAllSquare[b7][b8]);
				b7++; b8--;
            }
			
			if(queenCheck.includes(Number(click2))) {queenCheck.length=0; return true;}
			else {queenCheck.length=0; return false;} 
		 }
		 
		 else if(imageSrc.includes('king')) {
			 
			 // upLeft	           // right
			 var k1=current_i-1;    var k9=current_i;
			 var k2=current_j-1;    var k10=current_j+1;
			 // up	           	   // leftDown	
			 var k3=current_i-1;    var k11=current_i+1;
			 var k4=current_j;      var k12=current_j-1;
			 // upRight	           // down	
			 var k5=current_i-1;    var k13=current_i+1;
			 var k6=current_j+1;    var k14=current_j;
			 // left	      		   // rightdown
			 var k7=current_i;      var k15=current_i+1;
			 var k8=current_j-1;    var k16=current_j+1;
			
			 if(k1>=0 && k2>=0) {kingCheck.push(idOfAllSquare[k1][k2]);}
			 if(k3>=0) {kingCheck.push(idOfAllSquare[k3][k4]);}
			 if(k5>=0 && k6<=7) {kingCheck.push(idOfAllSquare[k5][k6]);}
			 if(k8>=0) {kingCheck.push(idOfAllSquare[k7][k8]);}
			
			 if(k10<=7) {kingCheck.push(idOfAllSquare[k9][k10]);}
			 if(k11<=7 && k12>=0) {kingCheck.push(idOfAllSquare[k11][k12]);}
			 if(k13<=7) {kingCheck.push(idOfAllSquare[k13][k14]);}
			 if(k15<=7 && k16<=7) {kingCheck.push(idOfAllSquare[k15][k16]);}
			 
			 
			
			 if(kingCheck.includes(Number(click2))) {kingCheck.length=0; return true;}
			 else {kingCheck.length=0; return false;}
		  }
		 
	}
	
 let selectElement = document.getElementById("sel1");	
 selectElement.addEventListener("change", function() {
	 	// Hide the options container when an option is selected
	 	selectElement.style.display = "none"; 
		document.getElementById("Loading").style.display = "none";
		  let selectedOption = selectElement.options[selectElement.selectedIndex].value;
		    console.log(selectedOption);
			selectElement.selectedIndex = 0;
				const pp = [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8];
						for(var l=0;l<=7;l++) {
							var pq=document.getElementById(pp[l]).innerHTML; 
							if(pq.includes('white') && pq.includes('pawn')) {
								
								if(selectedOption=='Queen') {
								document.getElementById(pp[l]).innerHTML=pramotWhiteQueen;
								whosTurn();
								}
								if(selectedOption=='Bishop') {
								document.getElementById(pp[l]).innerHTML=pramotWhiteBishop;
								whosTurn();
								}
								if(selectedOption=='Rook') {
								document.getElementById(pp[l]).innerHTML=pramotWhiteRook;
								whosTurn();
								}
								if(selectedOption=='Knight') {
								document.getElementById(pp[l]).innerHTML=pramotWhiteKnight;
								whosTurn();
								}
							}
						}
	 });