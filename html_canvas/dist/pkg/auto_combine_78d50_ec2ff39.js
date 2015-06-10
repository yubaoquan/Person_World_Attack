function RefreshManager(){}RefreshManager.prototype={thingsToDraw:[],infoPanel:document.querySelector(".status-content"),infoRows:0,printInfo:function(n){this.infoRows>=50&&(this.infoPanel.innerHTML="",this.infoRows=0),this.infoPanel.innerHTML+=(new Date).toLocaleTimeString()+":<br>",this.infoPanel.innerHTML+=n+"<br>",this.infoPanel.scrollTop=this.infoPanel.scrollHeight,this.infoRows++},refresh:function(){this.printInfo("xxxxxx"),window.pen.clearRect(0,0,Config.canvasWidth,Config.canvasHeight);for(var n=0,i=this.thingsToDraw.length;i>n;n++)this.thingsToDraw[n].draw()},add:function(n){return this.thingsToDraw.push(n),this}};
;!function(){function e(){var e=document.getElementById("world"),t=e.parentNode;t.style.width=Config.canvasWidth+"px",t.style.height=Config.canvasHeight+"px",e.setAttribute("width",Config.canvasWidth),e.setAttribute("height",Config.canvasHeight),window.pen=e.getContext("2d");var n=new RefreshManager,o=new World(Config.worldWidth,Config.worldHeight),d=new Person("邓xx",18,"敲代码"),i=new Person("韩xx",19,"吹牛逼");d.world=o,i.world=o;var r=["right","right","down","down","left","left","up","up"];d.path=r,i.path=r;var a=new Bullet(Config.worldWidth-1,0,"left"),l=new Bullet(Config.worldWidth-1,1,"right"),w=new Bullet(Config.worldWidth-1,2,"up"),h=new Bullet(Config.worldWidth-1,3,"down");i.setPosition(10,0),d.moveInterval=2,i.moveInterval=1,a.moveInterval=1,h.moveInterval=3,n.add(o),n.add(d).add(i),n.add(a).add(l).add(w).add(h);var v=setInterval(function(){d.moveInPath(),i.moveInPath(),a.move(),h.move(),n.refresh(),window.option===!0&&Util.remove(i),window.stop===!0&&clearInterval(v)},Config.refreshInterval)}window.onload=e}();
;!function(){var t={getRandomInt:function(t,n){return Math.floor(Math.random()*(n-t+1))+t},getAPicture:function(t){var n=new Image;return n.src=t,n},remove:function(t){t.isRemoved=!0},isInWorld:function(t,n){return t>=0&&t<Config.worldWidth&&n>=0&&n<Config.worldHeight}};Object.extend=function(t,n){for(p in n)t[p]=n[p];return t},Object.prototype.extend=function(t){return Object.extend.apply(this,[this,t])},Util=t}();
;!function(){var t={move:function(t){if(isNaN(this.stepCount)&&(this.stepCount=1),this.stepCount!==this.moveInterval)return this.stepCount++,!1;switch(t.toLowerCase()){case"up":this.y--;break;case"down":this.y++;break;case"left":this.x--;break;case"right":this.x++;break;default:return console.warn("Invalid direction:"+t),!1}return this.stepCount=1,!0},setPosition:function(t,i){this.x=t,this.y=i},act:function(t,i){this.isRemoved||(i?t(i,this):t(this))},moveInPath:function(){this.isRemoved||((isNaN(this.pathIndex)||this.pathIndex===this.path.length)&&(this.pathIndex=0),this.move(this.path[this.pathIndex])&&this.pathIndex++)}};window.BaseBehavior=t}();
;!function(){function i(i,t){this.ground=[],this.personRecord=[],this.width=i,this.height=t,this.stoneNumber=10,this.init()}function t(t){return t===i.grass}i.stone="●●●●",i.grass="△△△△",i.wall="▇▇▇▇",i.prototype={init:function(){for(var i=0;i<this.width;i++){this.personRecord[i]=[],this.ground[i]=[];for(var t=0;t<this.height;t++)this.personRecord[i][t]=null,this.ground[i][t]=null}this.createGrass(),this.createWalls(),this.createStones()},createGrass:function(){for(var t=0;t<this.width;t++)for(var r=0;r<this.height;r++)this.ground[t][r]=i.grass},createWalls:function(){for(var t=1;t<this.width;t+=2)for(var r=1;r<this.height;r+=2)this.ground[t][r]=i.wall},createStones:function(){for(var r=0;r<this.stoneNumber;r++){for(var n=Util.getRandomInt(0,this.width-1),o=Util.getRandomInt(0,this.height-1);!t(this.ground[n][o]);)n=Util.getRandomInt(0,this.width-1),o=Util.getRandomInt(0,this.height-1);this.ground[n][o]=i.stone}},clear:function(t,r){for(var n=0;n<this.width;n++)for(var o=0;o<this.height;o++)this.ground[n][o]=i.grass,this.personRecord[t][r]=null},reset:function(t,r){isNaN(t)||isNaN(r)||(this.ground[t][r]=i.grass,this.personRecord[t][r]=null)},show:function(){console.info();for(var i=0;i<this.width;i++){for(var t="",r=0;r<this.height;r++)t+=this.ground[i][r]+" ";console.info(t)}},setPerson:function(i,t,r){this.ground[i][t]=r.name,this.personRecord[i][t]=r},stoneBetweenPersons:function(t,r,n,o){if(t===n){if(Math.abs(r-o)<=1)return!1;for(var s=o>r?r:o,h=o>r?o:r,e=s+1;h>e;e++)if(this.ground[t][e]===i.stone)return!0}else{if(Math.abs(t-n)<=1)return!1;for(var a=n>t?t:n,f=n>t?n:t,e=a+1;f>e;e++)if(this.ground[e][r]===i.stone)return!0}return!1},draw:function(){for(var t=0;t<this.width;t++)for(var r=0;r<this.height;r++)switch(this.ground[t][r]){case i.grass:this.drawGrass(t,r);break;case i.wall:this.drawWall(t,r);break;case i.stone:this.drawStone(t,r);break;default:console.info("Illegal thing:"+this.ground[t][r])}},drawGrass:function(i,t){var r=window.pen;r.fillStyle=Config.grassColor,r.fillRect(i*Config.brickWidth,t*Config.brickWidth,Config.brickWidth,Config.brickWidth),r.strokeRect(i*Config.brickWidth,t*Config.brickWidth,Config.brickWidth,Config.brickWidth)},drawWall:function(i,t){var r=window.pen,n=i*Config.brickWidth,o=t*Config.brickWidth;r.drawImage(Config.wallImg,n,o,Config.brickWidth,Config.brickWidth)},drawStone:function(i,t){var r=window.pen,n=i*Config.brickWidth,o=t*Config.brickWidth;r.drawImage(Config.stoneImg,n,o,Config.brickWidth,Config.brickWidth)}},i.drawGrass=function(i,t){var r=window.pen;r.fillStyle=Config.grassColor,r.fillRect(i*Config.brickWidth,t*Config.brickWidth,Config.brickWidth,Config.brickWidth),r.strokeRect(i*Config.brickWidth,t*Config.brickWidth,Config.brickWidth,Config.brickWidth)},i.drawWall=function(i,t){var r=window.pen;r.fillStyle=Config.wallColor,r.fillRect(i*Config.brickWidth,t*Config.brickWidth,Config.brickWidth,Config.brickWidth)},window.World=i}();
;!function(){var t=25,i=11,l=40,e={worldWidth:t,worldHeight:i,brickWidth:l,canvasWidth:t*l,canvasHeight:i*l,grassColor:"rgba(0,255,0,1)",wallColor:"rgba(255,0,0,1)",refreshInterval:500,stoneImg:Util.getAPicture("../image/stone_8b47c7b.png"),wallImg:Util.getAPicture("../image/wall_29b52eb.png"),bulletWidth:20,bulletHeight:10};window.Config=e}();
;function Person(t,i,s){this.name=t||"人",this.age=i,this.skill=s,Person.persons.push(this)}Person.persons=[],Person.prototype={x:0,y:0,blood:10,attackSkills:[],moveInterval:1,toString:function(){return"我是"+this.name+", 今年"+this.age+"岁.我最擅长"+this.skill},changeBlood:function(t){return this.blood<=0?void console.info(this.name+"已经死了."):(this.blood+=t,void(this.blood<=0&&console.info(this.name+"死了_(:з」∠)_")))},robSeat:function(){this.targetSeat.setOwner(this)},canStand:function(t){return t===this.world.grass||t===this.name},walkInWorld:function(){for(var t=Util.getRandomInt(0,this.world.width-1),i=Util.getRandomInt(0,this.world.height-1),s=this.world.ground[t][i],o=0;!this.canStand(s);)o++,o>1e3&&(console.info("dead loop"),console.info(t+", "+i+":"+s),console.info(this.name+":"+this.x+", "+this.y)),t=Util.getRandomInt(0,this.world.width-1),i=Util.getRandomInt(0,this.world.height-1),s=this.world.ground[t][i];this.scan(),this.world.reset(this.x,this.y),this.world.setPerson(t,i,this),this.setPosition(t,i)},setPosition:BaseBehavior.setPosition,move:function(t){if(isNaN(this.stepCount)&&(this.stepCount=1),this.stepCount!==this.moveInterval)return this.stepCount++,!1;var i=this.x,s=this.y;switch(t.toLowerCase()){case"up":s=this.y-1;break;case"down":s=this.y+1;break;case"left":i=this.x-1;break;case"right":i=this.x+1;break;default:return console.warn("Invalid direction:"+t),!1}return Util.isInWorld(i,s)?this.world.ground[i][s]!==World.grass?!1:(this.x=i,this.y=s,this.stepCount=1,!0):(console.info("Not in world"),!1)},scan:function(){for(var t=[],i=0;i<this.world.width;i++)for(var s=0;s<this.world.height;s++)this.detectEnemy(i,s,t);var o=this;return t.forEach(function(t){o.attack(t)}),t},isEnemy:function(t){return t!==this.world.grass&&t!==this.name&&t!==this.world.stone&&t!==this.world.wall},detectEnemy:function(t,i,s){var o=this.world.ground[t][i];if(this.isEnemy(o))if(t===this.x||i===this.y){{this.x,this.y}this.world.stoneBetweenPersons(t,i,this.x,this.y)?console.info(this.name+"探查中,由于"+o+"被石头挡住,没被发现..."):(console.info(this.name+"在("+t+", "+i+")发现敌人"+o),s.push(this.world.personRecord[t][i]))}else(1===Math.abs(t-this.x)||1===Math.abs(i-this.y))&&console.info(this.name+"感觉附近有动静,但是没发现敌人,蛋疼菊紧...")},addAttackSkill:function(t){this.attackSkills.push(t)},attack:function(t){this.attackSkills[0].attack(this,t)},draw:function(){if(!this.isRemoved){var t=(this.x+.5)*Config.brickWidth,i=(this.y+.5)*Config.brickWidth,s=Config.brickWidth/2,o=window.pen;o.beginPath(),o.arc(t,i,s,0,2*Math.PI,!1),o.closePath(),o.fillStyle="#000000",o.fill();var n=this.x*Config.brickWidth+5,e=(this.y+1)*Config.brickWidth-10;o.fillStyle="#ffffff",o.font="italic 25px sans-serif",o.fillText(this.name[0],n,e)}},act:BaseBehavior.act,moveInPath:BaseBehavior.moveInPath};
;function Skill(t){this.lethality=t}function Shoot(t){this.lethality=t}Skill.prototype={decreseBlood:function(t){t.changeBlood(-1*this.lethality)},attack:function(){}},Shoot.prototype=(new Skill).extend({attack:function(t,o){console.info(t.name+"向"+o.name+"开了一枪,"+o.name+"流了"+this.lethality+"滴血"),this.decreseBlood(o)}});
;function Bullet(i,t,e){this.x=i,this.y=t,this.direction=e.toLowerCase()}Bullet.prototype={direction:"u",setPosition:BaseBehavior.setPosition,act:BaseBehavior.act,move:function(){BaseBehavior.move.call(this,this.direction)},draw:function(){var i,t,e,o,l,h,n,g=this.x*Config.brickWidth,f=this.y*Config.brickWidth,b=Config.bulletHeight/2;switch(this.direction){case"left":i=g+(Config.brickWidth-Config.bulletWidth)/2,t=f+(Config.brickWidth-Config.bulletHeight)/2,e=Config.bulletWidth,o=Config.bulletHeight,l=i,h=f+Config.brickWidth/2,n=Math.PI/2;break;case"right":i=g+(Config.brickWidth-Config.bulletWidth)/2,t=f+(Config.brickWidth-Config.bulletHeight)/2,e=Config.bulletWidth,o=Config.bulletHeight,l=i+Config.bulletWidth,h=f+Config.brickWidth/2,n=-Math.PI/2;break;case"up":i=g+(Config.brickWidth-Config.bulletHeight)/2,t=f+(Config.brickWidth-Config.bulletWidth)/2,e=Config.bulletHeight,o=Config.bulletWidth,l=g+Config.brickWidth/2,h=t,n=-Math.PI;break;case"down":i=g+(Config.brickWidth-Config.bulletHeight)/2,t=f+(Config.brickWidth-Config.bulletWidth)/2,e=Config.bulletHeight,o=Config.bulletWidth,l=g+Config.brickWidth/2,h=t+Config.bulletWidth,n=0;break;default:console.warn("Illegal direction:"+this.direction)}var r=window.pen;r.fillStyle="#000000",r.stokeStyle="#000000",r.strokeRect(i,t,e,o),r.beginPath(),r.arc(l,h,b,n,n+Math.PI,!1),r.closePath(),r.stroke()}};