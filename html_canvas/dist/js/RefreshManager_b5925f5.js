function RefreshManager(){}RefreshManager.prototype={thingsToDraw:[],infoPanel:document.querySelector(".status-content"),infoRows:0,printInfo:function(n){this.infoRows>=50&&(this.infoPanel.innerHTML="",this.infoRows=0),this.infoPanel.innerHTML+=(new Date).toLocaleTimeString()+":<br>",this.infoPanel.innerHTML+=n+"<br>",this.infoPanel.scrollTop=this.infoPanel.scrollHeight,this.infoRows++},refresh:function(){this.printInfo("xxxxxx"),window.pen.clearRect(0,0,Config.canvasWidth,Config.canvasHeight);for(var n=0,i=this.thingsToDraw.length;i>n;n++)this.thingsToDraw[n].draw()},add:function(n){return this.thingsToDraw.push(n),this}};