(function(){var mt=Object.freeze({Linear:Object.freeze({None:function(e){return e},In:function(e){return e},Out:function(e){return e},InOut:function(e){return e}}),Quadratic:Object.freeze({In:function(e){return e*e},Out:function(e){return e*(2-e)},InOut:function(e){return(e*=2)<1?.5*e*e:-.5*(--e*(e-2)-1)}}),Cubic:Object.freeze({In:function(e){return e*e*e},Out:function(e){return--e*e*e+1},InOut:function(e){return(e*=2)<1?.5*e*e*e:.5*((e-=2)*e*e+2)}}),Quartic:Object.freeze({In:function(e){return e*e*e*e},Out:function(e){return 1- --e*e*e*e},InOut:function(e){return(e*=2)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2)}}),Quintic:Object.freeze({In:function(e){return e*e*e*e*e},Out:function(e){return--e*e*e*e*e+1},InOut:function(e){return(e*=2)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2)}}),Sinusoidal:Object.freeze({In:function(e){return 1-Math.sin((1-e)*Math.PI/2)},Out:function(e){return Math.sin(e*Math.PI/2)},InOut:function(e){return .5*(1-Math.sin(Math.PI*(.5-e)))}}),Exponential:Object.freeze({In:function(e){return e===0?0:Math.pow(1024,e-1)},Out:function(e){return e===1?1:1-Math.pow(2,-10*e)},InOut:function(e){return e===0?0:e===1?1:(e*=2)<1?.5*Math.pow(1024,e-1):.5*(-Math.pow(2,-10*(e-1))+2)}}),Circular:Object.freeze({In:function(e){return 1-Math.sqrt(1-e*e)},Out:function(e){return Math.sqrt(1- --e*e)},InOut:function(e){return(e*=2)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1)}}),Elastic:Object.freeze({In:function(e){return e===0?0:e===1?1:-Math.pow(2,10*(e-1))*Math.sin((e-1.1)*5*Math.PI)},Out:function(e){return e===0?0:e===1?1:Math.pow(2,-10*e)*Math.sin((e-.1)*5*Math.PI)+1},InOut:function(e){return e===0?0:e===1?1:(e*=2,e<1?-.5*Math.pow(2,10*(e-1))*Math.sin((e-1.1)*5*Math.PI):.5*Math.pow(2,-10*(e-1))*Math.sin((e-1.1)*5*Math.PI)+1)}}),Back:Object.freeze({In:function(e){var t=1.70158;return e===1?1:e*e*((t+1)*e-t)},Out:function(e){var t=1.70158;return e===0?0:--e*e*((t+1)*e+t)+1},InOut:function(e){var t=2.5949095;return(e*=2)<1?.5*(e*e*((t+1)*e-t)):.5*((e-=2)*e*((t+1)*e+t)+2)}}),Bounce:Object.freeze({In:function(e){return 1-mt.Bounce.Out(1-e)},Out:function(e){return e<.36363636363636365?7.5625*e*e:e<.7272727272727273?7.5625*(e-=.5454545454545454)*e+.75:e<.9090909090909091?7.5625*(e-=.8181818181818182)*e+.9375:7.5625*(e-=.9545454545454546)*e+.984375},InOut:function(e){return e<.5?mt.Bounce.In(e*2)*.5:mt.Bounce.Out(e*2-1)*.5+.5}}),generatePow:function(e){return e===void 0&&(e=4),e=e<Number.EPSILON?Number.EPSILON:e,e=e>1e4?1e4:e,{In:function(t){return Math.pow(t,e)},Out:function(t){return 1-Math.pow(1-t,e)},InOut:function(t){return t<.5?Math.pow(t*2,e)/2:(1-Math.pow(2-t*2,e))/2+.5}}}}),dn=function(){return performance.now()},_s=(function(){function e(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];this._tweens={},this._tweensAddedDuringUpdate={},this.add.apply(this,t)}return e.prototype.getAll=function(){var t=this;return Object.keys(this._tweens).map(function(i){return t._tweens[i]})},e.prototype.removeAll=function(){this._tweens={}},e.prototype.add=function(){for(var t,i=[],n=0;n<arguments.length;n++)i[n]=arguments[n];for(var r=0,s=i;r<s.length;r++){var a=s[r];(t=a._group)===null||t===void 0||t.remove(a),a._group=this,this._tweens[a.getId()]=a,this._tweensAddedDuringUpdate[a.getId()]=a}},e.prototype.remove=function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];for(var n=0,r=t;n<r.length;n++){var s=r[n];s._group=void 0,delete this._tweens[s.getId()],delete this._tweensAddedDuringUpdate[s.getId()]}},e.prototype.allStopped=function(){return this.getAll().every(function(t){return!t.isPlaying()})},e.prototype.update=function(t,i){t===void 0&&(t=dn()),i===void 0&&(i=!0);var n=Object.keys(this._tweens);if(n.length!==0)for(;n.length>0;){this._tweensAddedDuringUpdate={};for(var r=0;r<n.length;r++){var s=this._tweens[n[r]],a=!i;s&&s.update(t,a)===!1&&!i&&this.remove(s)}n=Object.keys(this._tweensAddedDuringUpdate)}},e})(),Ni={Linear:function(e,t){var i=e.length-1,n=i*t,r=Math.floor(n),s=Ni.Utils.Linear;return t<0?s(e[0],e[1],n):t>1?s(e[i],e[i-1],i-n):s(e[r],e[r+1>i?i:r+1],n-r)},Bezier:function(e,t){for(var i=0,n=e.length-1,r=Math.pow,s=Ni.Utils.Bernstein,a=0;a<=n;a++)i+=r(1-t,n-a)*r(t,a)*e[a]*s(n,a);return i},CatmullRom:function(e,t){var i=e.length-1,n=i*t,r=Math.floor(n),s=Ni.Utils.CatmullRom;return e[0]===e[i]?(t<0&&(r=Math.floor(n=i*(1+t))),s(e[(r-1+i)%i],e[r],e[(r+1)%i],e[(r+2)%i],n-r)):t<0?e[0]-(s(e[0],e[0],e[1],e[1],-n)-e[0]):t>1?e[i]-(s(e[i],e[i],e[i-1],e[i-1],n-i)-e[i]):s(e[r?r-1:0],e[r],e[i<r+1?i:r+1],e[i<r+2?i:r+2],n-r)},Utils:{Linear:function(e,t,i){return(t-e)*i+e},Bernstein:function(e,t){var i=Ni.Utils.Factorial;return i(e)/i(t)/i(e-t)},Factorial:(function(){var e=[1];return function(t){var i=1;if(e[t])return e[t];for(var n=t;n>1;n--)i*=n;return e[t]=i,i}})(),CatmullRom:function(e,t,i,n,r){var s=(i-e)*.5,a=(n-t)*.5,o=r*r,c=r*o;return(2*t-2*i+s+a)*c+(-3*t+3*i-2*s-a)*o+s*r+t}}},xs=(function(){function e(){}return e.nextId=function(){return e._nextId++},e._nextId=0,e})(),_r=new _s,bt=(function(){function e(t,i){this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._isDynamic=!1,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=mt.Linear.None,this._interpolationFunction=Ni.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._id=xs.nextId(),this._isChainStopped=!1,this._propertiesAreSetUp=!1,this._goToEnd=!1,this._object=t,typeof i=="object"?(this._group=i,i.add(this)):i===!0&&(this._group=_r,_r.add(this))}return e.prototype.getId=function(){return this._id},e.prototype.isPlaying=function(){return this._isPlaying},e.prototype.isPaused=function(){return this._isPaused},e.prototype.getDuration=function(){return this._duration},e.prototype.to=function(t,i){if(i===void 0&&(i=1e3),this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=t,this._propertiesAreSetUp=!1,this._duration=i<0?0:i,this},e.prototype.duration=function(t){return t===void 0&&(t=1e3),this._duration=t<0?0:t,this},e.prototype.dynamic=function(t){return t===void 0&&(t=!1),this._isDynamic=t,this},e.prototype.start=function(t,i){if(t===void 0&&(t=dn()),i===void 0&&(i=!1),this._isPlaying)return this;if(this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var n in this._valuesStartRepeat)this._swapEndStartRepeatValues(n),this._valuesStart[n]=this._valuesStartRepeat[n]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=t,this._startTime+=this._delayTime,!this._propertiesAreSetUp||i){if(this._propertiesAreSetUp=!0,!this._isDynamic){var r={};for(var s in this._valuesEnd)r[s]=this._valuesEnd[s];this._valuesEnd=r}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,i)}return this},e.prototype.startFromCurrentValues=function(t){return this.start(t,!0)},e.prototype._setupProperties=function(t,i,n,r,s){for(var a in n){var o=t[a],c=Array.isArray(o),l=c?"array":typeof o,u=!c&&Array.isArray(n[a]);if(!(l==="undefined"||l==="function")){if(u){var d=n[a];if(d.length===0)continue;for(var h=[o],p=0,x=d.length;p<x;p+=1){var y=this._handleRelativeValue(o,d[p]);if(isNaN(y)){u=!1,console.warn("Found invalid interpolation list. Skipping.");break}h.push(y)}u&&(n[a]=h)}if((l==="object"||c)&&o&&!u){i[a]=c?[]:{};var m=o;for(var f in m)i[a][f]=m[f];r[a]=c?[]:{};var d=n[a];if(!this._isDynamic){var R={};for(var f in d)R[f]=d[f];n[a]=d=R}this._setupProperties(m,i[a],d,r[a],s)}else(typeof i[a]=="undefined"||s)&&(i[a]=o),c||(i[a]*=1),u?r[a]=n[a].slice().reverse():r[a]=i[a]||0}}},e.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},e.prototype.end=function(){return this._goToEnd=!0,this.update(this._startTime+this._duration),this},e.prototype.pause=function(t){return t===void 0&&(t=dn()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=t,this)},e.prototype.resume=function(t){return t===void 0&&(t=dn()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=t-this._pauseStart,this._pauseStart=0,this)},e.prototype.stopChainedTweens=function(){for(var t=0,i=this._chainedTweens.length;t<i;t++)this._chainedTweens[t].stop();return this},e.prototype.group=function(t){return t?(t.add(this),this):(console.warn("tween.group() without args has been removed, use group.add(tween) instead."),this)},e.prototype.remove=function(){var t;return(t=this._group)===null||t===void 0||t.remove(this),this},e.prototype.delay=function(t){return t===void 0&&(t=0),this._delayTime=t,this},e.prototype.repeat=function(t){return t===void 0&&(t=0),this._initialRepeat=t,this._repeat=t,this},e.prototype.repeatDelay=function(t){return this._repeatDelayTime=t,this},e.prototype.yoyo=function(t){return t===void 0&&(t=!1),this._yoyo=t,this},e.prototype.easing=function(t){return t===void 0&&(t=mt.Linear.None),this._easingFunction=t,this},e.prototype.interpolation=function(t){return t===void 0&&(t=Ni.Linear),this._interpolationFunction=t,this},e.prototype.chain=function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];return this._chainedTweens=t,this},e.prototype.onStart=function(t){return this._onStartCallback=t,this},e.prototype.onEveryStart=function(t){return this._onEveryStartCallback=t,this},e.prototype.onUpdate=function(t){return this._onUpdateCallback=t,this},e.prototype.onRepeat=function(t){return this._onRepeatCallback=t,this},e.prototype.onComplete=function(t){return this._onCompleteCallback=t,this},e.prototype.onStop=function(t){return this._onStopCallback=t,this},e.prototype.update=function(t,i){var n=this,r;if(t===void 0&&(t=dn()),i===void 0&&(i=e.autoStartOnUpdate),this._isPaused)return!0;var s;if(!this._goToEnd&&!this._isPlaying)if(i)this.start(t,!0);else return!1;if(this._goToEnd=!1,t<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0);var a=t-this._startTime,o=this._duration+((r=this._repeatDelayTime)!==null&&r!==void 0?r:this._delayTime),c=this._duration+this._repeat*o,l=function(){if(n._duration===0||a>c)return 1;var y=a-Math.trunc(a/o)*o,m=Math.min(y/n._duration,1);return m===0&&a===n._duration?1:m},u=l(),d=this._easingFunction(u);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,d),this._onUpdateCallback&&this._onUpdateCallback(this._object,u),this._duration===0||a>=this._duration)if(this._repeat>0){var h=Math.min(Math.trunc((a-this._duration)/o)+1,this._repeat);isFinite(this._repeat)&&(this._repeat-=h);for(s in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[s]=="string"&&(this._valuesStartRepeat[s]=this._valuesStartRepeat[s]+parseFloat(this._valuesEnd[s])),this._yoyo&&this._swapEndStartRepeatValues(s),this._valuesStart[s]=this._valuesStartRepeat[s];return this._yoyo&&(this._reversed=!this._reversed),this._startTime+=o*h,this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1,!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var p=0,x=this._chainedTweens.length;p<x;p++)this._chainedTweens[p].start(this._startTime+this._duration,!1);return this._isPlaying=!1,!1}return!0},e.prototype._updateProperties=function(t,i,n,r){for(var s in n)if(i[s]!==void 0){var a=i[s]||0,o=n[s];!Array.isArray(t[s])&&Array.isArray(o)?t[s]=this._interpolationFunction(o,r):typeof o=="object"&&o?this._updateProperties(t[s],a,o,r):(o=this._handleRelativeValue(a,o),typeof o=="number"&&(t[s]=a+(o-a)*r))}},e.prototype._handleRelativeValue=function(t,i){return typeof i!="string"?i:i.charAt(0)==="+"||i.charAt(0)==="-"?t+parseFloat(i):parseFloat(i)},e.prototype._swapEndStartRepeatValues=function(t){var i=this._valuesStartRepeat[t],n=this._valuesEnd[t];typeof n=="string"?this._valuesStartRepeat[t]=this._valuesStartRepeat[t]+parseFloat(n):this._valuesStartRepeat[t]=this._valuesEnd[t],this._valuesEnd[t]=i},e.autoStartOnUpdate=!1,e})(),zd=xs.nextId,Zt=_r,Vd=Zt.getAll.bind(Zt),Gd=Zt.removeAll.bind(Zt),kd=Zt.add.bind(Zt),Hd=Zt.remove.bind(Zt),Wd=Zt.update.bind(Zt),Ms,Ss,ys,Es,Ts,bs,As,ws,Rs,Xd="185",qd=0,Yd=1,Kd=1,Zd=100,$d=204,Jd=205,Qd=0,jd=1,ef=2,tf=3,nf=4,rf=5,sf=6,af=7,of=0,lf=300,cf=301,xr=1e3,si=1001,Mr=1002,St=1003,Ao=1004,wo=1005,Pt=1006,Ro=1007,Sr=1008,fi=1009,Co=1010,Po=1011,Cs=1012,Io=1013,bi=1014,Un=1015,Ai=1016,Ps=1017,Is=1018,Ls=1020,Lo=35902,Uo=35899,Do=1021,No=1022,fn=1023,pn=1026,Us=1027,Oo=1028,Ds=1029,Dn=1030,Ns=1031,Os=1033,Fo=33776,Bo=33777,zo=33778,Vo=33779,Go=35840,ko=35841,Ho=35842,Wo=35843,Xo=36196,qo=37492,Yo=37496,Ko=37488,Zo=37489,$o=37490,Jo=37491,Qo=37808,jo=37809,el=37810,tl=37811,il=37812,nl=37813,rl=37814,sl=37815,al=37816,ol=37817,ll=37818,cl=37819,hl=37820,ul=37821,dl=36492,fl=36494,pl=36495,ml=36283,gl=36284,vl=36285,_l=36286,Nn=2300,yr=2301,Er=2302,Fs=2303,Bs=2400,zs=2401,Vs=2402,xl=3200,hf=0,uf="",Gt="srgb",Tr="srgb-linear",On="linear",Fn="srgb",br=7680,df=519,Ml=35044,ff="300 es",Oi=2e3,pf=2001;function Sl(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function yl(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Bn(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function El(){const e=Bn("canvas");return e.style.display="block",e}var Gs={},Fi=null;function ks(...e){const t="THREE."+e.shift();Fi?Fi("log",t,...e):console.log(t,...e)}function Hs(e){const t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){const i=e[1];i&&i.isStackTrace?e[0]+=" "+i.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function be(...e){e=Hs(e);const t="THREE."+e.shift();if(Fi)Fi("warn",t,...e);else{const i=e[0];i&&i.isStackTrace?console.warn(i.getError(t)):console.warn(t,...e)}}function Re(...e){e=Hs(e);const t="THREE."+e.shift();if(Fi)Fi("error",t,...e);else{const i=e[0];i&&i.isStackTrace?console.error(i.getError(t)):console.error(t,...e)}}function Bi(...e){const t=e.join(" ");t in Gs||(Gs[t]=!0,be(...e))}function Tl(e,t,i){return new Promise(function(n,r){function s(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:r();break;case e.TIMEOUT_EXPIRED:setTimeout(s,i);break;default:n()}}setTimeout(s,i)})}var bl={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},wi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const n=i[e];if(n!==void 0){const r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let r=0,s=n.length;r<s;r++)n[r].call(this,e);e.target=null}}},_t=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ar=Math.PI/180,wr=180/Math.PI;function mn(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(_t[e&255]+_t[e>>8&255]+_t[e>>16&255]+_t[e>>24&255]+"-"+_t[t&255]+_t[t>>8&255]+"-"+_t[t>>16&15|64]+_t[t>>24&255]+"-"+_t[i&63|128]+_t[i>>8&255]+"-"+_t[i>>16&255]+_t[i>>24&255]+_t[n&255]+_t[n>>8&255]+_t[n>>16&255]+_t[n>>24&255]).toLowerCase()}function Be(e,t,i){return Math.max(t,Math.min(i,e))}function Al(e,t){return(e%t+t)%t}function Rr(e,t,i){return(1-i)*e+i*t}function gn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function At(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}As=Symbol.iterator;var Ge=class{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Be(this.x,e.x,t.x),this.y=Be(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Be(this.x,e,t),this.y=Be(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Be(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Be(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),r=this.x-e.x,s=this.y-e.y;return this.x=r*i-s*n+e.x,this.y=r*n+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[As](){yield this.x,yield this.y}};Ms=Ge,Ms.prototype.isVector2=!0;var Ri=class{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,r,s,a){let o=i[n+0],c=i[n+1],l=i[n+2],u=i[n+3],d=r[s+0],h=r[s+1],p=r[s+2],x=r[s+3];if(u!==x||o!==d||c!==h||l!==p){let y=o*d+c*h+l*p+u*x;y<0&&(d=-d,h=-h,p=-p,x=-x,y=-y);let m=1-a;if(y<.9995){const f=Math.acos(y),R=Math.sin(f);m=Math.sin(m*f)/R,a=Math.sin(a*f)/R,o=o*m+d*a,c=c*m+h*a,l=l*m+p*a,u=u*m+x*a}else{o=o*m+d*a,c=c*m+h*a,l=l*m+p*a,u=u*m+x*a;const f=1/Math.sqrt(o*o+c*c+l*l+u*u);o*=f,c*=f,l*=f,u*=f}}e[t]=o,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,n,r,s){const a=i[n],o=i[n+1],c=i[n+2],l=i[n+3],u=r[s],d=r[s+1],h=r[s+2],p=r[s+3];return e[t]=a*p+l*u+o*h-c*d,e[t+1]=o*p+l*d+c*u-a*h,e[t+2]=c*p+l*h+a*d-o*u,e[t+3]=l*p-a*u-o*d-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,n=e._y,r=e._z,s=e._order,a=Math.cos,o=Math.sin,c=a(i/2),l=a(n/2),u=a(r/2),d=o(i/2),h=o(n/2),p=o(r/2);switch(s){case"XYZ":this._x=d*l*u+c*h*p,this._y=c*h*u-d*l*p,this._z=c*l*p+d*h*u,this._w=c*l*u-d*h*p;break;case"YXZ":this._x=d*l*u+c*h*p,this._y=c*h*u-d*l*p,this._z=c*l*p-d*h*u,this._w=c*l*u+d*h*p;break;case"ZXY":this._x=d*l*u-c*h*p,this._y=c*h*u+d*l*p,this._z=c*l*p+d*h*u,this._w=c*l*u-d*h*p;break;case"ZYX":this._x=d*l*u-c*h*p,this._y=c*h*u+d*l*p,this._z=c*l*p-d*h*u,this._w=c*l*u+d*h*p;break;case"YZX":this._x=d*l*u+c*h*p,this._y=c*h*u+d*l*p,this._z=c*l*p-d*h*u,this._w=c*l*u-d*h*p;break;case"XZY":this._x=d*l*u-c*h*p,this._y=c*h*u-d*l*p,this._z=c*l*p+d*h*u,this._w=c*l*u+d*h*p;break;default:be("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],r=t[8],s=t[1],a=t[5],o=t[9],c=t[2],l=t[6],u=t[10],d=i+a+u;if(d>0){const h=.5/Math.sqrt(d+1);this._w=.25/h,this._x=(l-o)*h,this._y=(r-c)*h,this._z=(s-n)*h}else if(i>a&&i>u){const h=2*Math.sqrt(1+i-a-u);this._w=(l-o)/h,this._x=.25*h,this._y=(n+s)/h,this._z=(r+c)/h}else if(a>u){const h=2*Math.sqrt(1+a-i-u);this._w=(r-c)/h,this._x=(n+s)/h,this._y=.25*h,this._z=(o+l)/h}else{const h=2*Math.sqrt(1+u-i-a);this._w=(s-n)/h,this._x=(r+c)/h,this._y=(o+l)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Be(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,r=e._z,s=e._w,a=t._x,o=t._y,c=t._z,l=t._w;return this._x=i*l+s*a+n*c-r*o,this._y=n*l+s*o+r*a-i*c,this._z=r*l+s*c+i*o-n*a,this._w=s*l-i*a-n*o-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,n=e._y,r=e._z,s=e._w,a=this.dot(e);a<0&&(i=-i,n=-n,r=-r,s=-s,a=-a);let o=1-t;if(a<.9995){const c=Math.acos(a),l=Math.sin(c);o=Math.sin(o*c)/l,t=Math.sin(t*c)/l,this._x=this._x*o+i*t,this._y=this._y*o+n*t,this._z=this._z*o+r*t,this._w=this._w*o+s*t,this._onChangeCallback()}else this._x=this._x*o+i*t,this._y=this._y*o+n*t,this._z=this._z*o+r*t,this._w=this._w*o+s*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(e),n*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};ws=Symbol.iterator;var B=class{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ws.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ws.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*n,this.y=r[1]*t+r[4]*i+r[7]*n,this.z=r[2]*t+r[5]*i+r[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=e.elements,s=1/(r[3]*t+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*n+r[12])*s,this.y=(r[1]*t+r[5]*i+r[9]*n+r[13])*s,this.z=(r[2]*t+r[6]*i+r[10]*n+r[14])*s,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,r=e.x,s=e.y,a=e.z,o=e.w,c=2*(s*n-a*i),l=2*(a*t-r*n),u=2*(r*i-s*t);return this.x=t+o*c+s*u-a*l,this.y=i+o*l+a*c-r*u,this.z=n+o*u+r*l-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n,this.y=r[1]*t+r[5]*i+r[9]*n,this.z=r[2]*t+r[6]*i+r[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Be(this.x,e.x,t.x),this.y=Be(this.y,e.y,t.y),this.z=Be(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Be(this.x,e,t),this.y=Be(this.y,e,t),this.z=Be(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Be(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,r=e.z,s=t.x,a=t.y,o=t.z;return this.x=n*o-r*a,this.y=r*s-i*o,this.z=i*a-n*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Cr.copy(this).projectOnVector(e),this.sub(Cr)}reflect(e){return this.sub(Cr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Be(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[ws](){yield this.x,yield this.y,yield this.z}};Ss=B,Ss.prototype.isVector3=!0;var Cr=new B,Ws=new Ri,Ue=class{constructor(e,t,i,n,r,s,a,o,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,s,a,o,c)}set(e,t,i,n,r,s,a,o,c){const l=this.elements;return l[0]=e,l[1]=n,l[2]=a,l[3]=t,l[4]=r,l[5]=o,l[6]=i,l[7]=s,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,s=i[0],a=i[3],o=i[6],c=i[1],l=i[4],u=i[7],d=i[2],h=i[5],p=i[8],x=n[0],y=n[3],m=n[6],f=n[1],R=n[4],A=n[7],S=n[2],b=n[5],w=n[8];return r[0]=s*x+a*f+o*S,r[3]=s*y+a*R+o*b,r[6]=s*m+a*A+o*w,r[1]=c*x+l*f+u*S,r[4]=c*y+l*R+u*b,r[7]=c*m+l*A+u*w,r[2]=d*x+h*f+p*S,r[5]=d*y+h*R+p*b,r[8]=d*m+h*A+p*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],s=e[4],a=e[5],o=e[6],c=e[7],l=e[8];return t*s*l-t*a*c-i*r*l+i*a*o+n*r*c-n*s*o}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],s=e[4],a=e[5],o=e[6],c=e[7],l=e[8],u=l*s-a*c,d=a*o-l*r,h=c*r-s*o,p=t*u+i*d+n*h;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/p;return e[0]=u*x,e[1]=(n*c-l*i)*x,e[2]=(a*i-n*s)*x,e[3]=d*x,e[4]=(l*t-n*o)*x,e[5]=(n*r-a*t)*x,e[6]=h*x,e[7]=(i*o-c*t)*x,e[8]=(s*t-i*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,r,s,a){const o=Math.cos(r),c=Math.sin(r);return this.set(i*o,i*c,-i*(o*s+c*a)+s+e,-n*c,n*o,-n*(-c*s+o*a)+a+t,0,0,1),this}scale(e,t){return Bi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Pr.makeScale(e,t)),this}rotate(e){return Bi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Pr.makeRotation(-e)),this}translate(e,t){return Bi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Pr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};ys=Ue,ys.prototype.isMatrix3=!0;var Pr=new Ue,Xs=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qs=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wl(){const e={enabled:!0,workingColorSpace:Tr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer==="srgb"&&(r.r=ai(r.r),r.g=ai(r.g),r.b=ai(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer==="srgb"&&(r.r=zi(r.r),r.g=zi(r.g),r.b=zi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===""?On:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Bi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Bi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],n=[.3127,.329];return e.define({[Tr]:{primaries:t,whitePoint:n,transfer:On,toXYZ:Xs,fromXYZ:qs,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Gt},outputColorSpaceConfig:{drawingBufferColorSpace:Gt}},[Gt]:{primaries:t,whitePoint:n,transfer:Fn,toXYZ:Xs,fromXYZ:qs,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Gt}}}),e}var ze=wl();function ai(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function zi(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}var Vi,Rl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Vi===void 0&&(Vi=Bn("canvas")),Vi.width=e.width,Vi.height=e.height;const n=Vi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),i=Vi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){const t=Bn("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),r=n.data;for(let s=0;s<r.length;s++)r[s]=ai(r[s]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ai(t[i]/255)*255):t[i]=ai(t[i]);return{data:t,width:e.width,height:e.height}}else return be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Cl=0,Ir=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Cl++}),this.uuid=mn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement!="undefined"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame!="undefined"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let s=0,a=n.length;s<a;s++)n[s].isDataTexture?r.push(Lr(n[s].image)):r.push(Lr(n[s]))}else r=Lr(n);i.url=r}return t||(e.images[this.uuid]=i),i}};function Lr(e){return typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap?Rl.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(be("Texture: Unable to serialize Texture."),{})}var Pl=0,Ur=new B,kt=class gr extends wi{constructor(t=gr.DEFAULT_IMAGE,i=gr.DEFAULT_MAPPING,n=si,r=si,s=Pt,a=Sr,o=fn,c=fi,l=gr.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Pl++}),this.uuid=mn(),this.name="",this.source=new Ir(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ge(0,0),this.repeat=new Ge(1,1),this.center=new Ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ur).x}get height(){return this.source.getSize(Ur).y}get depth(){return this.source.getSize(Ur).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const i in t){const n=t[i];if(n===void 0){be(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const r=this[i];if(r===void 0){be(`Texture.setValues(): property '${i}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[i]=n}}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),i||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==300)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case xr:t.x=t.x-Math.floor(t.x);break;case si:t.x=t.x<0?0:1;break;case Mr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x)}if(t.y<0||t.y>1)switch(this.wrapT){case xr:t.y=t.y-Math.floor(t.y);break;case si:t.y=t.y<0?0:1;break;case Mr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y)}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};kt.DEFAULT_IMAGE=null,kt.DEFAULT_MAPPING=300,kt.DEFAULT_ANISOTROPY=1,Rs=Symbol.iterator;var nt=class{constructor(e=0,t=0,i=0,n=1){this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*n+s[12]*r,this.y=s[1]*t+s[5]*i+s[9]*n+s[13]*r,this.z=s[2]*t+s[6]*i+s[10]*n+s[14]*r,this.w=s[3]*t+s[7]*i+s[11]*n+s[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,r;const o=e.elements,c=o[0],l=o[4],u=o[8],d=o[1],h=o[5],p=o[9],x=o[2],y=o[6],m=o[10];if(Math.abs(l-d)<.01&&Math.abs(u-x)<.01&&Math.abs(p-y)<.01){if(Math.abs(l+d)<.1&&Math.abs(u+x)<.1&&Math.abs(p+y)<.1&&Math.abs(c+h+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const R=(c+1)/2,A=(h+1)/2,S=(m+1)/2,b=(l+d)/4,w=(u+x)/4,P=(p+y)/4;return R>A&&R>S?R<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(R),n=b/i,r=w/i):A>S?A<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(A),i=b/n,r=P/n):S<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(S),i=w/r,n=P/r),this.set(i,n,r,t),this}let f=Math.sqrt((y-p)*(y-p)+(u-x)*(u-x)+(d-l)*(d-l));return Math.abs(f)<.001&&(f=1),this.x=(y-p)/f,this.y=(u-x)/f,this.z=(d-l)/f,this.w=Math.acos((c+h+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Be(this.x,e.x,t.x),this.y=Be(this.y,e.y,t.y),this.z=Be(this.z,e.z,t.z),this.w=Be(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Be(this.x,e,t),this.y=Be(this.y,e,t),this.z=Be(this.z,e,t),this.w=Be(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Be(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Rs](){yield this.x,yield this.y,yield this.z,yield this.w}};Es=nt,Es.prototype.isVector4=!0;var Il=class extends wi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new nt(0,0,e,t),this.scissorTest=!1,this.viewport=new nt(0,0,e,t),this.textures=[];const n={width:e,height:t,depth:i.depth},r=new kt(n),s=i.count;for(let a=0;a<s;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Pt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const n=Object.assign({},e.textures[t].image);this.textures[t].source=new Ir(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},$t=class extends Il{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Ys=class extends kt{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=St,this.minFilter=St,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Ll=class extends kt{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=St,this.minFilter=St,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ot=class xo{constructor(t,i,n,r,s,a,o,c,l,u,d,h,p,x,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,n,r,s,a,o,c,l,u,d,h,p,x,y,m)}set(t,i,n,r,s,a,o,c,l,u,d,h,p,x,y,m){const f=this.elements;return f[0]=t,f[4]=i,f[8]=n,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=x,f[11]=y,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xo().fromArray(this.elements)}copy(t){const i=this.elements,n=t.elements;return i[0]=n[0],i[1]=n[1],i[2]=n[2],i[3]=n[3],i[4]=n[4],i[5]=n[5],i[6]=n[6],i[7]=n[7],i[8]=n[8],i[9]=n[9],i[10]=n[10],i[11]=n[11],i[12]=n[12],i[13]=n[13],i[14]=n[14],i[15]=n[15],this}copyPosition(t){const i=this.elements,n=t.elements;return i[12]=n[12],i[13]=n[13],i[14]=n[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,n){return this.determinantAffine()===0?(t.set(1,0,0),i.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,i,n){return this.set(t.x,i.x,n.x,0,t.y,i.y,n.y,0,t.z,i.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const i=this.elements,n=t.elements,r=1/Gi.setFromMatrixColumn(t,0).length(),s=1/Gi.setFromMatrixColumn(t,1).length(),a=1/Gi.setFromMatrixColumn(t,2).length();return i[0]=n[0]*r,i[1]=n[1]*r,i[2]=n[2]*r,i[3]=0,i[4]=n[4]*s,i[5]=n[5]*s,i[6]=n[6]*s,i[7]=0,i[8]=n[8]*a,i[9]=n[9]*a,i[10]=n[10]*a,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,n=t.x,r=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){const h=a*u,p=a*d,x=o*u,y=o*d;i[0]=c*u,i[4]=-c*d,i[8]=l,i[1]=p+x*l,i[5]=h-y*l,i[9]=-o*c,i[2]=y-h*l,i[6]=x+p*l,i[10]=a*c}else if(t.order==="YXZ"){const h=c*u,p=c*d,x=l*u,y=l*d;i[0]=h+y*o,i[4]=x*o-p,i[8]=a*l,i[1]=a*d,i[5]=a*u,i[9]=-o,i[2]=p*o-x,i[6]=y+h*o,i[10]=a*c}else if(t.order==="ZXY"){const h=c*u,p=c*d,x=l*u,y=l*d;i[0]=h-y*o,i[4]=-a*d,i[8]=x+p*o,i[1]=p+x*o,i[5]=a*u,i[9]=y-h*o,i[2]=-a*l,i[6]=o,i[10]=a*c}else if(t.order==="ZYX"){const h=a*u,p=a*d,x=o*u,y=o*d;i[0]=c*u,i[4]=x*l-p,i[8]=h*l+y,i[1]=c*d,i[5]=y*l+h,i[9]=p*l-x,i[2]=-l,i[6]=o*c,i[10]=a*c}else if(t.order==="YZX"){const h=a*c,p=a*l,x=o*c,y=o*l;i[0]=c*u,i[4]=y-h*d,i[8]=x*d+p,i[1]=d,i[5]=a*u,i[9]=-o*u,i[2]=-l*u,i[6]=p*d+x,i[10]=h-y*d}else if(t.order==="XZY"){const h=a*c,p=a*l,x=o*c,y=o*l;i[0]=c*u,i[4]=-d,i[8]=l*u,i[1]=h*d+y,i[5]=a*u,i[9]=p*d-x,i[2]=x*d-p,i[6]=o*u,i[10]=y*d+h}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ul,t,Dl)}lookAt(t,i,n){const r=this.elements;return It.subVectors(t,i),It.lengthSq()===0&&(It.z=1),It.normalize(),pi.crossVectors(n,It),pi.lengthSq()===0&&(Math.abs(n.z)===1?It.x+=1e-4:It.z+=1e-4,It.normalize(),pi.crossVectors(n,It)),pi.normalize(),zn.crossVectors(It,pi),r[0]=pi.x,r[4]=zn.x,r[8]=It.x,r[1]=pi.y,r[5]=zn.y,r[9]=It.y,r[2]=pi.z,r[6]=zn.z,r[10]=It.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const n=t.elements,r=i.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],p=n[13],x=n[2],y=n[6],m=n[10],f=n[14],R=n[3],A=n[7],S=n[11],b=n[15],w=r[0],P=r[4],v=r[8],E=r[12],W=r[1],T=r[5],z=r[9],H=r[13],Y=r[2],k=r[6],K=r[10],N=r[14],j=r[3],ee=r[7],ne=r[11],fe=r[15];return s[0]=a*w+o*W+c*Y+l*j,s[4]=a*P+o*T+c*k+l*ee,s[8]=a*v+o*z+c*K+l*ne,s[12]=a*E+o*H+c*N+l*fe,s[1]=u*w+d*W+h*Y+p*j,s[5]=u*P+d*T+h*k+p*ee,s[9]=u*v+d*z+h*K+p*ne,s[13]=u*E+d*H+h*N+p*fe,s[2]=x*w+y*W+m*Y+f*j,s[6]=x*P+y*T+m*k+f*ee,s[10]=x*v+y*z+m*K+f*ne,s[14]=x*E+y*H+m*N+f*fe,s[3]=R*w+A*W+S*Y+b*j,s[7]=R*P+A*T+S*k+b*ee,s[11]=R*v+A*z+S*K+b*ne,s[15]=R*E+A*H+S*N+b*fe,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],n=t[4],r=t[8],s=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],d=t[6],h=t[10],p=t[14],x=t[3],y=t[7],m=t[11],f=t[15],R=c*p-l*h,A=o*p-l*d,S=o*h-c*d,b=a*p-l*u,w=a*h-c*u,P=a*d-o*u;return i*(y*R-m*A+f*S)-n*(x*R-m*b+f*w)+r*(x*A-y*b+f*P)-s*(x*S-y*w+m*P)}determinantAffine(){const t=this.elements,i=t[0],n=t[4],r=t[8],s=t[1],a=t[5],o=t[9],c=t[2],l=t[6],u=t[10];return i*(a*u-o*l)-n*(s*u-o*c)+r*(s*l-a*c)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=i,r[14]=n),this}invert(){const t=this.elements,i=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],d=t[9],h=t[10],p=t[11],x=t[12],y=t[13],m=t[14],f=t[15],R=i*o-n*a,A=i*c-r*a,S=i*l-s*a,b=n*c-r*o,w=n*l-s*o,P=r*l-s*c,v=u*y-d*x,E=u*m-h*x,W=u*f-p*x,T=d*m-h*y,z=d*f-p*y,H=h*f-p*m,Y=R*H-A*z+S*T+b*W-w*E+P*v;if(Y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/Y;return t[0]=(o*H-c*z+l*T)*k,t[1]=(r*z-n*H-s*T)*k,t[2]=(y*P-m*w+f*b)*k,t[3]=(h*w-d*P-p*b)*k,t[4]=(c*W-a*H-l*E)*k,t[5]=(i*H-r*W+s*E)*k,t[6]=(m*S-x*P-f*A)*k,t[7]=(u*P-h*S+p*A)*k,t[8]=(a*z-o*W+l*v)*k,t[9]=(n*W-i*z-s*v)*k,t[10]=(x*w-y*S+f*R)*k,t[11]=(d*S-u*w-p*R)*k,t[12]=(o*E-a*T-c*v)*k,t[13]=(i*T-n*E+r*v)*k,t[14]=(y*A-x*b-m*R)*k,t[15]=(u*b-d*A+h*R)*k,this}scale(t){const i=this.elements,n=t.x,r=t.y,s=t.z;return i[0]*=n,i[4]*=r,i[8]*=s,i[1]*=n,i[5]*=r,i[9]*=s,i[2]*=n,i[6]*=r,i[10]*=s,i[3]*=n,i[7]*=r,i[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,n,r))}makeTranslation(t,i,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,n,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,i,-n,0,0,n,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),n=Math.sin(t);return this.set(i,0,n,0,0,1,0,0,-n,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),n=Math.sin(t);return this.set(i,-n,0,0,n,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const n=Math.cos(i),r=Math.sin(i),s=1-n,a=t.x,o=t.y,c=t.z,l=s*a,u=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+n,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(t,i,n){return this.set(t,0,0,0,0,i,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,i,n,r,s,a){return this.set(1,n,s,0,t,1,a,0,i,r,1,0,0,0,0,1),this}compose(t,i,n){const r=this.elements,s=i._x,a=i._y,o=i._z,c=i._w,l=s+s,u=a+a,d=o+o,h=s*l,p=s*u,x=s*d,y=a*u,m=a*d,f=o*d,R=c*l,A=c*u,S=c*d,b=n.x,w=n.y,P=n.z;return r[0]=(1-(y+f))*b,r[1]=(p+S)*b,r[2]=(x-A)*b,r[3]=0,r[4]=(p-S)*w,r[5]=(1-(h+f))*w,r[6]=(m+R)*w,r[7]=0,r[8]=(x+A)*P,r[9]=(m-R)*P,r[10]=(1-(h+y))*P,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,i,n){const r=this.elements;t.x=r[12],t.y=r[13],t.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),i.identity(),this;let a=Gi.set(r[0],r[1],r[2]).length();const o=Gi.set(r[4],r[5],r[6]).length(),c=Gi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Ht.copy(this);const l=1/a,u=1/o,d=1/c;return Ht.elements[0]*=l,Ht.elements[1]*=l,Ht.elements[2]*=l,Ht.elements[4]*=u,Ht.elements[5]*=u,Ht.elements[6]*=u,Ht.elements[8]*=d,Ht.elements[9]*=d,Ht.elements[10]*=d,i.setFromRotationMatrix(Ht),n.x=a,n.y=o,n.z=c,this}makePerspective(t,i,n,r,s,a,o=Oi,c=!1){const l=this.elements,u=2*s/(i-t),d=2*s/(n-r),h=(i+t)/(i-t),p=(n+r)/(n-r);let x,y;if(c)x=s/(a-s),y=a*s/(a-s);else if(o===2e3)x=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(o===2001)x=-a/(a-s),y=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,i,n,r,s,a,o=Oi,c=!1){const l=this.elements,u=2/(i-t),d=2/(n-r),h=-(i+t)/(i-t),p=-(n+r)/(n-r);let x,y;if(c)x=1/(a-s),y=a/(a-s);else if(o===2e3)x=-2/(a-s),y=-(a+s)/(a-s);else if(o===2001)x=-1/(a-s),y=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=x,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const i=this.elements,n=t.elements;for(let r=0;r<16;r++)if(i[r]!==n[r])return!1;return!0}fromArray(t,i=0){for(let n=0;n<16;n++)this.elements[n]=t[n+i];return this}toArray(t=[],i=0){const n=this.elements;return t[i]=n[0],t[i+1]=n[1],t[i+2]=n[2],t[i+3]=n[3],t[i+4]=n[4],t[i+5]=n[5],t[i+6]=n[6],t[i+7]=n[7],t[i+8]=n[8],t[i+9]=n[9],t[i+10]=n[10],t[i+11]=n[11],t[i+12]=n[12],t[i+13]=n[13],t[i+14]=n[14],t[i+15]=n[15],t}};Ts=ot,Ts.prototype.isMatrix4=!0;var Gi=new B,Ht=new ot,Ul=new B(0,0,0),Dl=new B(1,1,1),pi=new B,zn=new B,It=new B,Ks=new ot,Zs=new Ri,ki=class Mo{constructor(t=0,i=0,n=0,r=Mo.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,n,r=this._order){return this._x=t,this._y=i,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,n=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],d=r[2],h=r[6],p=r[10];switch(i){case"XYZ":this._y=Math.asin(Be(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Be(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Be(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Be(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Be(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:be("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,n){return Ks.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ks,i,n)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return Zs.setFromEuler(this),this.setFromQuaternion(Zs,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ki.DEFAULT_ORDER="XYZ";var $s=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Nl=0,Js=new B,Hi=new Ri,oi=new ot,Vn=new B,vn=new B,Ol=new B,Fl=new Ri,Qs=new B(1,0,0),js=new B(0,1,0),ea=new B(0,0,1),ta={type:"added"},Bl={type:"removed"},Wi={type:"childadded",child:null},Dr={type:"childremoved",child:null},Lt=class vr extends wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nl++}),this.uuid=mn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vr.DEFAULT_UP.clone();const t=new B,i=new ki,n=new Ri,r=new B(1,1,1);function s(){n.setFromEuler(i,!1)}function a(){i.setFromQuaternion(n,void 0,!1)}i._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ot},normalMatrix:{value:new Ue}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=vr.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vr.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $s,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return Hi.setFromAxisAngle(t,i),this.quaternion.multiply(Hi),this}rotateOnWorldAxis(t,i){return Hi.setFromAxisAngle(t,i),this.quaternion.premultiply(Hi),this}rotateX(t){return this.rotateOnAxis(Qs,t)}rotateY(t){return this.rotateOnAxis(js,t)}rotateZ(t){return this.rotateOnAxis(ea,t)}translateOnAxis(t,i){return Js.copy(t).applyQuaternion(this.quaternion),this.position.add(Js.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(Qs,t)}translateY(t){return this.translateOnAxis(js,t)}translateZ(t){return this.translateOnAxis(ea,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(oi.copy(this.matrixWorld).invert())}lookAt(t,i,n){t.isVector3?Vn.copy(t):Vn.set(t,i,n);const r=this.parent;this.updateWorldMatrix(!0,!1),vn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?oi.lookAt(vn,Vn,this.up):oi.lookAt(Vn,vn,this.up),this.quaternion.setFromRotationMatrix(oi),r&&(oi.extractRotation(r.matrixWorld),Hi.setFromRotationMatrix(oi),this.quaternion.premultiply(Hi.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(Re("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ta),Wi.child=t,this.dispatchEvent(Wi),Wi.child=null):Re("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(Bl),Dr.child=t,this.dispatchEvent(Dr),Dr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),oi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),oi.multiply(t.parent.matrixWorld)),t.applyMatrix4(oi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ta),Wi.child=t,this.dispatchEvent(Wi),Wi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let n=0,r=this.children.length;n<r;n++){const s=this.children[n].getObjectByProperty(t,i);if(s!==void 0)return s}}getObjectsByProperty(t,i,n=[]){this[t]===i&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,i,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vn,t,Ol),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vn,Fl,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);const i=this.children;for(let n=0,r=i.length;n<r;n++)i[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let n=0,r=i.length;n<r;n++)i[n].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const i=t.x,n=t.y,r=t.z,s=this.matrix.elements;s[12]+=i-s[0]*i-s[4]*n-s[8]*r,s[13]+=n-s[1]*i-s[5]*n-s[9]*r,s[14]+=r-s[2]*i-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let n=0,r=i.length;n<r;n++)i[n].updateMatrixWorld(t)}updateWorldMatrix(t,i,n=!1){const r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),i===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const i=t===void 0||typeof t=="string",n={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];s(t.shapes,d)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(t.materials,this.material[c]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(t.animations,c))}}if(i){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),d=a(t.shapes),h=a(t.skeletons),p=a(t.animations),x=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),x.length>0&&(n.nodes=x)}return n.object=r,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}};Lt.DEFAULT_UP=new B(0,1,0),Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0,Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var mi=class extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}},zl={type:"move"},Nr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,r=null,s=null;const a=this._targetRay,o=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(const h of e.hand.values()){const p=t.getJointPose(h,i),x=this._getHandJoint(c,h);p!==null&&(x.matrix.fromArray(p.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=p.radius),x.visible=p!==null}const l=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=l.position.distanceTo(u.position);c.inputState.pinching&&d>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(a.matrix.fromArray(n.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,n.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(n.linearVelocity)):a.hasLinearVelocity=!1,n.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(n.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(zl)))}return a!==null&&(a.visible=n!==null),o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new mi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},ia={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},Gn={h:0,s:0,l:0};function Or(e,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?e+(t-e)*6*i:i<1/2?t:i<2/3?e+(t-e)*6*(2/3-i):e}var Oe=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ze.colorSpaceToWorking(this,t),this}setRGB(e,t,i,n=ze.workingColorSpace){return this.r=e,this.g=t,this.b=i,ze.colorSpaceToWorking(this,n),this}setHSL(e,t,i,n=ze.workingColorSpace){if(e=Al(e,1),t=Be(t,0,1),i=Be(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,s=2*i-r;this.r=Or(s,r,e+1/3),this.g=Or(s,r,e),this.b=Or(s,r,e-1/3)}return ze.colorSpaceToWorking(this,n),this}setStyle(e,t=Gt){function i(r){r!==void 0&&parseFloat(r)<1&&be("Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const s=n[1],a=n[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:be("Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=n[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(r,16),t);be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Gt){const i=ia[e.toLowerCase()];return i!==void 0?this.setHex(i,t):be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ai(e.r),this.g=ai(e.g),this.b=ai(e.b),this}copyLinearToSRGB(e){return this.r=zi(e.r),this.g=zi(e.g),this.b=zi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Gt){return ze.workingToColorSpace(xt.copy(this),e),Math.round(Be(xt.r*255,0,255))*65536+Math.round(Be(xt.g*255,0,255))*256+Math.round(Be(xt.b*255,0,255))}getHexString(e=Gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ze.workingColorSpace){ze.workingToColorSpace(xt.copy(this),t);const i=xt.r,n=xt.g,r=xt.b,s=Math.max(i,n,r),a=Math.min(i,n,r);let o,c;const l=(a+s)/2;if(a===s)o=0,c=0;else{const u=s-a;switch(c=l<=.5?u/(s+a):u/(2-s-a),s){case i:o=(n-r)/u+(n<r?6:0);break;case n:o=(r-i)/u+2;break;case r:o=(i-n)/u+4}o/=6}return e.h=o,e.s=c,e.l=l,e}getRGB(e,t=ze.workingColorSpace){return ze.workingToColorSpace(xt.copy(this),t),e.r=xt.r,e.g=xt.g,e.b=xt.b,e}getStyle(e=Gt){ze.workingToColorSpace(xt.copy(this),e);const t=xt.r,i=xt.g,n=xt.b;return e!=="srgb"?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(gi),this.setHSL(gi.h+e,gi.s+t,gi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(gi),e.getHSL(Gn);const i=Rr(gi.h,Gn.h,t),n=Rr(gi.s,Gn.s,t),r=Rr(gi.l,Gn.l,t);return this.setHSL(i,n,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,n=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*n,this.g=r[1]*t+r[4]*i+r[7]*n,this.b=r[2]*t+r[5]*i+r[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},xt=new Oe;Oe.NAMES=ia;var Vl=class So{constructor(t,i=1,n=1e3){this.isFog=!0,this.name="",this.color=new Oe(t),this.near=i,this.far=n}clone(){return new So(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Gl=class extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ki,this.environmentIntensity=1,this.environmentRotation=new ki,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Wt=new B,li=new B,Fr=new B,ci=new B,Xi=new B,qi=new B,na=new B,Br=new B,zr=new B,Vr=new B,Gr=new nt,kr=new nt,Hr=new nt,_n=class hn{constructor(t=new B,i=new B,n=new B){this.a=t,this.b=i,this.c=n}static getNormal(t,i,n,r){r.subVectors(n,i),Wt.subVectors(t,i),r.cross(Wt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,i,n,r,s){Wt.subVectors(r,i),li.subVectors(n,i),Fr.subVectors(t,i);const a=Wt.dot(Wt),o=Wt.dot(li),c=Wt.dot(Fr),l=li.dot(li),u=li.dot(Fr),d=a*l-o*o;if(d===0)return s.set(0,0,0),null;const h=1/d,p=(l*c-o*u)*h,x=(a*u-o*c)*h;return s.set(1-p-x,x,p)}static containsPoint(t,i,n,r){return this.getBarycoord(t,i,n,r,ci)===null?!1:ci.x>=0&&ci.y>=0&&ci.x+ci.y<=1}static getInterpolation(t,i,n,r,s,a,o,c){return this.getBarycoord(t,i,n,r,ci)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ci.x),c.addScaledVector(a,ci.y),c.addScaledVector(o,ci.z),c)}static getInterpolatedAttribute(t,i,n,r,s,a){return Gr.setScalar(0),kr.setScalar(0),Hr.setScalar(0),Gr.fromBufferAttribute(t,i),kr.fromBufferAttribute(t,n),Hr.fromBufferAttribute(t,r),a.setScalar(0),a.addScaledVector(Gr,s.x),a.addScaledVector(kr,s.y),a.addScaledVector(Hr,s.z),a}static isFrontFacing(t,i,n,r){return Wt.subVectors(n,i),li.subVectors(t,i),Wt.cross(li).dot(r)<0}set(t,i,n){return this.a.copy(t),this.b.copy(i),this.c.copy(n),this}setFromPointsAndIndices(t,i,n,r){return this.a.copy(t[i]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,i,n,r){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Wt.subVectors(this.c,this.b),li.subVectors(this.a,this.b),Wt.cross(li).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return hn.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,n,r,s){return hn.getInterpolation(t,this.a,this.b,this.c,i,n,r,s)}containsPoint(t){return hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const n=this.a,r=this.b,s=this.c;let a,o;Xi.subVectors(r,n),qi.subVectors(s,n),Br.subVectors(t,n);const c=Xi.dot(Br),l=qi.dot(Br);if(c<=0&&l<=0)return i.copy(n);zr.subVectors(t,r);const u=Xi.dot(zr),d=qi.dot(zr);if(u>=0&&d<=u)return i.copy(r);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),i.copy(n).addScaledVector(Xi,a);Vr.subVectors(t,s);const p=Xi.dot(Vr),x=qi.dot(Vr);if(x>=0&&p<=x)return i.copy(s);const y=p*l-c*x;if(y<=0&&l>=0&&x<=0)return o=l/(l-x),i.copy(n).addScaledVector(qi,o);const m=u*x-p*d;if(m<=0&&d-u>=0&&p-x>=0)return na.subVectors(s,r),o=(d-u)/(d-u+(p-x)),i.copy(r).addScaledVector(na,o);const f=1/(m+y+h);return a=y*f,o=h*f,i.copy(n).addScaledVector(Xi,a).addScaledVector(qi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},xn=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Xt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Xt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Xt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=r.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,Xt):Xt.fromBufferAttribute(r,s),Xt.applyMatrix4(e.matrixWorld),this.expandByPoint(Xt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),kn.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),kn.copy(i.boundingBox)),kn.applyMatrix4(e.matrixWorld),this.union(kn)}const n=e.children;for(let r=0,s=n.length;r<s;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xt),Xt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Mn),Hn.subVectors(this.max,Mn),Yi.subVectors(e.a,Mn),Ki.subVectors(e.b,Mn),Zi.subVectors(e.c,Mn),vi.subVectors(Ki,Yi),_i.subVectors(Zi,Ki),Ci.subVectors(Yi,Zi);let t=[0,-vi.z,vi.y,0,-_i.z,_i.y,0,-Ci.z,Ci.y,vi.z,0,-vi.x,_i.z,0,-_i.x,Ci.z,0,-Ci.x,-vi.y,vi.x,0,-_i.y,_i.x,0,-Ci.y,Ci.x,0];return!Wr(t,Yi,Ki,Zi,Hn)||(t=[1,0,0,0,1,0,0,0,1],!Wr(t,Yi,Ki,Zi,Hn))?!1:(Wn.crossVectors(vi,_i),t=[Wn.x,Wn.y,Wn.z],Wr(t,Yi,Ki,Zi,Hn))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},hi=[new B,new B,new B,new B,new B,new B,new B,new B],Xt=new B,kn=new xn,Yi=new B,Ki=new B,Zi=new B,vi=new B,_i=new B,Ci=new B,Mn=new B,Hn=new B,Wn=new B,Pi=new B;function Wr(e,t,i,n,r){for(let s=0,a=e.length-3;s<=a;s+=3){Pi.fromArray(e,s);const o=r.x*Math.abs(Pi.x)+r.y*Math.abs(Pi.y)+r.z*Math.abs(Pi.z),c=t.dot(Pi),l=i.dot(Pi),u=n.dot(Pi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var ct=new B,Xn=new Ge,kl=0,Jt=class extends wi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kl++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ml,this.updateRanges=[],this.gpuType=Un,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Xn.fromBufferAttribute(this,t),Xn.applyMatrix3(e),this.setXY(t,Xn.x,Xn.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix3(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix4(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.applyNormalMatrix(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.transformDirection(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=gn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=At(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=gn(t,this.array)),t}setX(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=gn(t,this.array)),t}setY(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=gn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=gn(t,this.array)),t}setW(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),i=At(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),i=At(i,this.array),n=At(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),i=At(i,this.array),n=At(n,this.array),r=At(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}},ra=class extends Jt{constructor(e,t,i){super(new Uint16Array(e),t,i)}},sa=class extends Jt{constructor(e,t,i){super(new Uint32Array(e),t,i)}},Nt=class extends Jt{constructor(e,t,i){super(new Float32Array(e),t,i)}},Hl=new xn,Sn=new B,Xr=new B,qr=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Hl.setFromPoints(e).getCenter(i);let n=0;for(let r=0,s=e.length;r<s;r++)n=Math.max(n,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Sn.subVectors(e,this.center);const t=Sn.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(Sn,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Sn.copy(e.center).add(Xr)),this.expandByPoint(Sn.copy(e.center).sub(Xr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Wl=0,Ot=new ot,Yr=new Lt,$i=new B,Ut=new xn,yn=new xn,ft=new B,xi=class yo extends wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wl++}),this.uuid=mn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Sl(t)?sa:ra)(t,1):this.index=t,this}setIndirect(t,i=0){return this.indirect=t,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,n=0){this.groups.push({start:t,count:i,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ue().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ot.makeRotationFromQuaternion(t),this.applyMatrix4(Ot),this}rotateX(t){return Ot.makeRotationX(t),this.applyMatrix4(Ot),this}rotateY(t){return Ot.makeRotationY(t),this.applyMatrix4(Ot),this}rotateZ(t){return Ot.makeRotationZ(t),this.applyMatrix4(Ot),this}translate(t,i,n){return Ot.makeTranslation(t,i,n),this.applyMatrix4(Ot),this}scale(t,i,n){return Ot.makeScale(t,i,n),this.applyMatrix4(Ot),this}lookAt(t){return Yr.lookAt(t),Yr.updateMatrix(),this.applyMatrix4(Yr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($i).negate(),this.translate($i.x,$i.y,$i.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const a=t[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Nt(n,3))}else{const n=Math.min(t.length,i.count);for(let r=0;r<n;r++){const s=t[r];i.setXYZ(r,s.x,s.y,s.z||0)}t.length>i.count&&be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xn);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Re("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let n=0,r=i.length;n<r;n++){const s=i[n];Ut.setFromBufferAttribute(s),this.morphTargetsRelative?(ft.addVectors(this.boundingBox.min,Ut.min),this.boundingBox.expandByPoint(ft),ft.addVectors(this.boundingBox.max,Ut.max),this.boundingBox.expandByPoint(ft)):(this.boundingBox.expandByPoint(Ut.min),this.boundingBox.expandByPoint(Ut.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Re('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qr);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Re("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(t){const n=this.boundingSphere.center;if(Ut.setFromBufferAttribute(t),i)for(let s=0,a=i.length;s<a;s++){const o=i[s];yn.setFromBufferAttribute(o),this.morphTargetsRelative?(ft.addVectors(Ut.min,yn.min),Ut.expandByPoint(ft),ft.addVectors(Ut.max,yn.max),Ut.expandByPoint(ft)):(Ut.expandByPoint(yn.min),Ut.expandByPoint(yn.max))}Ut.getCenter(n);let r=0;for(let s=0,a=t.count;s<a;s++)ft.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(ft));if(i)for(let s=0,a=i.length;s<a;s++){const o=i[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)ft.fromBufferAttribute(o,l),c&&($i.fromBufferAttribute(t,l),ft.add($i)),r=Math.max(r,n.distanceToSquared(ft))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Re('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){Re("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=i.position,r=i.normal,s=i.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Jt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let v=0;v<n.count;v++)o[v]=new B,c[v]=new B;const l=new B,u=new B,d=new B,h=new Ge,p=new Ge,x=new Ge,y=new B,m=new B;function f(v,E,W){l.fromBufferAttribute(n,v),u.fromBufferAttribute(n,E),d.fromBufferAttribute(n,W),h.fromBufferAttribute(s,v),p.fromBufferAttribute(s,E),x.fromBufferAttribute(s,W),u.sub(l),d.sub(l),p.sub(h),x.sub(h);const T=1/(p.x*x.y-x.x*p.y);isFinite(T)&&(y.copy(u).multiplyScalar(x.y).addScaledVector(d,-p.y).multiplyScalar(T),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-x.x).multiplyScalar(T),o[v].add(y),o[E].add(y),o[W].add(y),c[v].add(m),c[E].add(m),c[W].add(m))}let R=this.groups;R.length===0&&(R=[{start:0,count:t.count}]);for(let v=0,E=R.length;v<E;++v){const W=R[v],T=W.start,z=W.count;for(let H=T,Y=T+z;H<Y;H+=3)f(t.getX(H+0),t.getX(H+1),t.getX(H+2))}const A=new B,S=new B,b=new B,w=new B;function P(v){b.fromBufferAttribute(r,v),w.copy(b);const E=o[v];A.copy(E),A.sub(b.multiplyScalar(b.dot(E))).normalize(),S.crossVectors(w,E);const W=S.dot(c[v])<0?-1:1;a.setXYZW(v,A.x,A.y,A.z,W)}for(let v=0,E=R.length;v<E;++v){const W=R[v],T=W.start,z=W.count;for(let H=T,Y=T+z;H<Y;H+=3)P(t.getX(H+0)),P(t.getX(H+1)),P(t.getX(H+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==i.count)n=new Jt(new Float32Array(i.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);const r=new B,s=new B,a=new B,o=new B,c=new B,l=new B,u=new B,d=new B;if(t)for(let h=0,p=t.count;h<p;h+=3){const x=t.getX(h+0),y=t.getX(h+1),m=t.getX(h+2);r.fromBufferAttribute(i,x),s.fromBufferAttribute(i,y),a.fromBufferAttribute(i,m),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(n,x),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,p=i.count;h<p;h+=3)r.fromBufferAttribute(i,h+0),s.fromBufferAttribute(i,h+1),a.fromBufferAttribute(i,h+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,n=t.count;i<n;i++)ft.fromBufferAttribute(t,i),ft.normalize(),t.setXYZ(i,ft.x,ft.y,ft.z)}toNonIndexed(){function t(o,c){const l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u);let p=0,x=0;for(let y=0,m=c.length;y<m;y++){o.isInterleavedBufferAttribute?p=c[y]*o.data.stride+o.offset:p=c[y]*u;for(let f=0;f<u;f++)h[x++]=l[p++]}return new Jt(h,u,d)}if(this.index===null)return be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new yo,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=t(c,n);i.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,d=l.length;u<d;u++){const h=l[u],p=t(h,n);c.push(p)}i.morphAttributes[o]=c}i.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];i.addGroup(l.start,l.count,l.materialIndex)}return i}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const p=l[d];u.push(p.toJSON(t.data))}u.length>0&&(r[c]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const r=t.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(i))}const s=t.morphAttributes;for(const l in s){const u=[],d=s[l];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(i));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,u=a.length;l<u;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Xl=0,Ji=class extends wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xl++}),this.uuid=mn(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=br,this.stencilZFail=br,this.stencilZPass=br,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){be(`Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){be(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(i.blending=this.blending),this.side!==0&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==204&&(i.blendSrc=this.blendSrc),this.blendDst!==205&&(i.blendDst=this.blendDst),this.blendEquation!==100&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(i.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){const s=[];for(const a in r){const o=r[a];delete o.metadata,s.push(o)}return s}if(t){const r=n(e.textures),s=n(e.images);r.length>0&&(i.textures=r),s.length>0&&(i.images=s)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Oe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ge().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ge().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ui=new B,Kr=new B,qn=new B,Mi=new B,Zr=new B,Yn=new B,$r=new B,ql=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ui)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ui.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ui.copy(this.origin).addScaledVector(this.direction,t),ui.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){Kr.copy(e).add(t).multiplyScalar(.5),qn.copy(t).sub(e).normalize(),Mi.copy(this.origin).sub(Kr);const r=e.distanceTo(t)*.5,s=-this.direction.dot(qn),a=Mi.dot(this.direction),o=-Mi.dot(qn),c=Mi.lengthSq(),l=Math.abs(1-s*s);let u,d,h,p;if(l>0)if(u=s*o-a,d=s*a-o,p=r*l,u>=0)if(d>=-p)if(d<=p){const x=1/l;u*=x,d*=x,h=u*(u+s*d+2*a)+d*(s*u+d+2*o)+c}else d=r,u=Math.max(0,-(s*d+a)),h=-u*u+d*(d+2*o)+c;else d=-r,u=Math.max(0,-(s*d+a)),h=-u*u+d*(d+2*o)+c;else d<=-p?(u=Math.max(0,-(-s*r+a)),d=u>0?-r:Math.min(Math.max(-r,-o),r),h=-u*u+d*(d+2*o)+c):d<=p?(u=0,d=Math.min(Math.max(-r,-o),r),h=d*(d+2*o)+c):(u=Math.max(0,-(s*r+a)),d=u>0?r:Math.min(Math.max(-r,-o),r),h=-u*u+d*(d+2*o)+c);else d=s>0?-r:r,u=Math.max(0,-(s*d+a)),h=-u*u+d*(d+2*o)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(Kr).addScaledVector(qn,d),h}intersectSphere(e,t){ui.subVectors(e.center,this.origin);const i=ui.dot(this.direction),n=ui.dot(ui)-i*i,r=e.radius*e.radius;if(n>r)return null;const s=Math.sqrt(r-n),a=i-s,o=i+s;return o<0?null:a<0?this.at(o,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,r,s,a,o;const c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,n=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,n=(e.min.x-d.x)*c),l>=0?(r=(e.min.y-d.y)*l,s=(e.max.y-d.y)*l):(r=(e.max.y-d.y)*l,s=(e.min.y-d.y)*l),i>s||r>n||((r>i||isNaN(i))&&(i=r),(s<n||isNaN(n))&&(n=s),u>=0?(a=(e.min.z-d.z)*u,o=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,o=(e.min.z-d.z)*u),i>o||a>n)||((a>i||i!==i)&&(i=a),(o<n||n!==n)&&(n=o),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,ui)!==null}intersectTriangle(e,t,i,n,r){Zr.subVectors(t,e),Yn.subVectors(i,e),$r.crossVectors(Zr,Yn);let s=this.direction.dot($r),a;if(s>0){if(n)return null;a=1}else if(s<0)a=-1,s=-s;else return null;Mi.subVectors(this.origin,e);const o=a*this.direction.dot(Yn.crossVectors(Mi,Yn));if(o<0)return null;const c=a*this.direction.dot(Zr.cross(Mi));if(c<0||o+c>s)return null;const l=-a*Mi.dot($r);return l<0?null:this.at(l/s,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},aa=class extends Ji{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},oa=new ot,Ii=new ql,Kn=new qr,la=new B,Zn=new B,$n=new B,Jn=new B,Jr=new B,Qn=new B,ca=new B,jn=new B,wt=class extends Lt{constructor(e=new xi,t=new aa){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let n=0,r=i.length;n<r;n++){const s=i[n].name||String(n);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=n}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const a=this.morphTargetInfluences;if(r&&a){Qn.set(0,0,0);for(let o=0,c=r.length;o<c;o++){const l=a[o],u=r[o];l!==0&&(Jr.fromBufferAttribute(u,e),s?Qn.addScaledVector(Jr,l):Qn.addScaledVector(Jr.sub(t),l))}t.add(Qn)}return t}raycast(e,t){const i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Kn.copy(i.boundingSphere),Kn.applyMatrix4(r),Ii.copy(e.ray).recast(e.near),!(Kn.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(Kn,la)===null||Ii.origin.distanceToSquared(la)>(e.far-e.near)**2))&&(oa.copy(r).invert(),Ii.copy(e.ray).applyMatrix4(oa),!(i.boundingBox!==null&&Ii.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ii)))}_computeIntersections(e,t,i){let n;const r=this.geometry,s=this.material,a=r.index,o=r.attributes.position,c=r.attributes.uv,l=r.attributes.uv1,u=r.attributes.normal,d=r.groups,h=r.drawRange;if(a!==null)if(Array.isArray(s))for(let p=0,x=d.length;p<x;p++){const y=d[p],m=s[y.materialIndex],f=Math.max(y.start,h.start),R=Math.min(a.count,Math.min(y.start+y.count,h.start+h.count));for(let A=f,S=R;A<S;A+=3){const b=a.getX(A),w=a.getX(A+1),P=a.getX(A+2);n=er(this,m,e,i,c,l,u,b,w,P),n&&(n.faceIndex=Math.floor(A/3),n.face.materialIndex=y.materialIndex,t.push(n))}}else{const p=Math.max(0,h.start),x=Math.min(a.count,h.start+h.count);for(let y=p,m=x;y<m;y+=3){const f=a.getX(y),R=a.getX(y+1),A=a.getX(y+2);n=er(this,s,e,i,c,l,u,f,R,A),n&&(n.faceIndex=Math.floor(y/3),t.push(n))}}else if(o!==void 0)if(Array.isArray(s))for(let p=0,x=d.length;p<x;p++){const y=d[p],m=s[y.materialIndex],f=Math.max(y.start,h.start),R=Math.min(o.count,Math.min(y.start+y.count,h.start+h.count));for(let A=f,S=R;A<S;A+=3){const b=A,w=A+1,P=A+2;n=er(this,m,e,i,c,l,u,b,w,P),n&&(n.faceIndex=Math.floor(A/3),n.face.materialIndex=y.materialIndex,t.push(n))}}else{const p=Math.max(0,h.start),x=Math.min(o.count,h.start+h.count);for(let y=p,m=x;y<m;y+=3){const f=y,R=y+1,A=y+2;n=er(this,s,e,i,c,l,u,f,R,A),n&&(n.faceIndex=Math.floor(y/3),t.push(n))}}}};function Yl(e,t,i,n,r,s,a,o){let c;if(t.side===1?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,t.side===0,o),c===null)return null;jn.copy(o),jn.applyMatrix4(e.matrixWorld);const l=i.ray.origin.distanceTo(jn);return l<i.near||l>i.far?null:{distance:l,point:jn.clone(),object:e}}function er(e,t,i,n,r,s,a,o,c,l){e.getVertexPosition(o,Zn),e.getVertexPosition(c,$n),e.getVertexPosition(l,Jn);const u=Yl(e,t,i,n,Zn,$n,Jn,ca);if(u){const d=new B;_n.getBarycoord(ca,Zn,$n,Jn,d),r&&(u.uv=_n.getInterpolatedAttribute(r,o,c,l,d,new Ge)),s&&(u.uv1=_n.getInterpolatedAttribute(s,o,c,l,d,new Ge)),a&&(u.normal=_n.getInterpolatedAttribute(a,o,c,l,d,new B),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new B,materialIndex:0};_n.getNormal(Zn,$n,Jn,h.normal),u.face=h,u.barycoord=d}return u}var Kl=class extends kt{constructor(e=null,t=1,i=1,n,r,s,a,o,c=St,l=St,u,d){super(null,s,a,o,c,l,n,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Qr=new B,Zl=new B,$l=new Ue,Li=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=Qr.subVectors(i,t).cross(Zl.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const n=e.delta(Qr),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(s<0||s>1)?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||$l.getNormalMatrix(e),n=this.coplanarPoint(Qr).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ui=new qr,Jl=new Ge(.5,.5),tr=new B,jr=class{constructor(e=new Li,t=new Li,i=new Li,n=new Li,r=new Li,s=new Li){this.planes=[e,t,i,n,r,s]}set(e,t,i,n,r,s){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(n),a[4].copy(r),a[5].copy(s),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Oi,i=!1){const n=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],l=r[4],u=r[5],d=r[6],h=r[7],p=r[8],x=r[9],y=r[10],m=r[11],f=r[12],R=r[13],A=r[14],S=r[15];if(n[0].setComponents(c-s,h-l,m-p,S-f).normalize(),n[1].setComponents(c+s,h+l,m+p,S+f).normalize(),n[2].setComponents(c+a,h+u,m+x,S+R).normalize(),n[3].setComponents(c-a,h-u,m-x,S-R).normalize(),i)n[4].setComponents(o,d,y,A).normalize(),n[5].setComponents(c-o,h-d,m-y,S-A).normalize();else if(n[4].setComponents(c-o,h-d,m-y,S-A).normalize(),t===2e3)n[5].setComponents(c+o,h+d,m+y,S+A).normalize();else if(t===2001)n[5].setComponents(o,d,y,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ui.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ui.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ui)}intersectsSprite(e){Ui.center.set(0,0,0);const t=Jl.distanceTo(e.center);return Ui.radius=.7071067811865476+t,Ui.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ui)}intersectsSphere(e){const t=this.planes,i=e.center,n=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const n=t[i];if(tr.x=n.normal.x>0?e.max.x:e.min.x,tr.y=n.normal.y>0?e.max.y:e.min.y,tr.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(tr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},ha=class extends kt{constructor(e=[],t=301,i,n,r,s,a,o,c,l){super(e,t,i,n,r,s,a,o,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Qi=class extends kt{constructor(e,t,i=bi,n,r,s,a=St,o=St,c,l=pn,u=1){if(l!==1026&&l!==1027)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},n,r,s,a,o,l,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ir(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Ql=class extends Qi{constructor(e,t=bi,i=301,n,r,s=St,a=St,o,c=pn){const l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,i,n,r,s,a,o,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ua=class extends kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ji=class Eo extends xi{constructor(t=1,i=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],d=[];let h=0,p=0;x("z","y","x",-1,-1,n,i,t,a,s,0),x("z","y","x",1,-1,n,i,-t,a,s,1),x("x","z","y",1,1,t,n,i,r,a,2),x("x","z","y",1,-1,t,n,-i,r,a,3),x("x","y","z",1,-1,t,i,n,r,s,4),x("x","y","z",-1,-1,t,i,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new Nt(l,3)),this.setAttribute("normal",new Nt(u,3)),this.setAttribute("uv",new Nt(d,2));function x(y,m,f,R,A,S,b,w,P,v,E){const W=S/P,T=b/v,z=S/2,H=b/2,Y=w/2,k=P+1,K=v+1;let N=0,j=0;const ee=new B;for(let ne=0;ne<K;ne++){const fe=ne*T-H;for(let ye=0;ye<k;ye++)ee[y]=(ye*W-z)*R,ee[m]=fe*A,ee[f]=Y,l.push(ee.x,ee.y,ee.z),ee[y]=0,ee[m]=0,ee[f]=w>0?1:-1,u.push(ee.x,ee.y,ee.z),d.push(ye/P),d.push(1-ne/v),N+=1}for(let ne=0;ne<v;ne++)for(let fe=0;fe<P;fe++){const ye=h+fe+k*ne,tt=h+fe+k*(ne+1),Ze=h+(fe+1)+k*(ne+1),X=h+(fe+1)+k*ne;c.push(ye,tt,X),c.push(tt,Ze,X),j+=6}o.addGroup(p,j,E),p+=j,h+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Eo(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},es=class To extends xi{constructor(t=1,i=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:n,heightSegments:r};const s=t/2,a=i/2,o=Math.floor(n),c=Math.floor(r),l=o+1,u=c+1,d=t/o,h=i/c,p=[],x=[],y=[],m=[];for(let f=0;f<u;f++){const R=f*h-a;for(let A=0;A<l;A++){const S=A*d-s;x.push(S,-R,0),y.push(0,0,1),m.push(A/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let R=0;R<o;R++){const A=R+l*f,S=R+l*(f+1),b=R+1+l*(f+1),w=R+1+l*f;p.push(A,S,w),p.push(S,b,w)}this.setIndex(p),this.setAttribute("position",new Nt(x,3)),this.setAttribute("normal",new Nt(y,3)),this.setAttribute("uv",new Nt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new To(t.width,t.height,t.widthSegments,t.heightSegments)}},jl=class bo extends xi{constructor(t=1,i=.4,n=12,r=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:i,radialSegments:n,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);const c=[],l=[],u=[],d=[],h=new B,p=new B,x=new B;for(let y=0;y<=n;y++){const m=a+y/n*o;for(let f=0;f<=r;f++){const R=f/r*s;p.x=(t+i*Math.cos(m))*Math.cos(R),p.y=(t+i*Math.cos(m))*Math.sin(R),p.z=i*Math.sin(m),l.push(p.x,p.y,p.z),h.x=t*Math.cos(R),h.y=t*Math.sin(R),x.subVectors(p,h).normalize(),u.push(x.x,x.y,x.z),d.push(f/r),d.push(y/n)}}for(let y=1;y<=n;y++)for(let m=1;m<=r;m++){const f=(r+1)*y+m-1,R=(r+1)*(y-1)+m-1,A=(r+1)*(y-1)+m,S=(r+1)*y+m;c.push(f,R,S),c.push(R,A,S)}this.setIndex(c),this.setAttribute("position",new Nt(l,3)),this.setAttribute("normal",new Nt(u,3)),this.setAttribute("uv",new Nt(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bo(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}},ec=class extends Ji{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Oe(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};function en(e){const t={};for(const i in e){t[i]={};for(const n in e[i]){const r=e[i][n];if(da(r))r.isRenderTargetTexture?(be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][n]=null):t[i][n]=r.clone();else if(Array.isArray(r))if(da(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();t[i][n]=s}else t[i][n]=r.slice();else t[i][n]=r}}return t}function yt(e){const t={};for(let i=0;i<e.length;i++){const n=en(e[i]);for(const r in n)t[r]=n[r]}return t}function da(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function tc(e){const t=[];for(let i=0;i<e.length;i++)t.push(e[i].clone());return t}function fa(e){const t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ze.workingColorSpace}var ic={clone:en,merge:yt},nc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Qt=class extends Ji{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nc,this.fragmentShader=rc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=en(e.uniforms),this.uniformsGroups=tc(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:"m4",value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const n=e.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=t[n.value]||null;break;case"c":this.uniforms[i].value=new Oe().setHex(n.value);break;case"v2":this.uniforms[i].value=new Ge().fromArray(n.value);break;case"v3":this.uniforms[i].value=new B().fromArray(n.value);break;case"v4":this.uniforms[i].value=new nt().fromArray(n.value);break;case"m3":this.uniforms[i].value=new Ue().fromArray(n.value);break;case"m4":this.uniforms[i].value=new ot().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},sc=class extends Qt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Et=class extends Ji{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ac=class extends Ji{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},oc=class extends Ji{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ir(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}var En=class{constructor(e,t,i,n){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let i=this._cachedIndex,n=t[i],r=t[i-1];i:{e:{let s;t:{n:if(!(e<n)){for(let a=i+2;;){if(n===void 0){if(e<r)break n;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=n,n=t[++i],e<n)break e}s=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(i=2,r=a);for(let o=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===o)break;if(n=r,r=t[--i-1],e>=r)break e}s=i,i=0;break t}break i}for(;i<s;){const a=i+s>>>1;e<t[a]?s=a:i=a+1}if(n=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,n)}return this.interpolate_(i,r,e,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=e*n;for(let s=0;s!==n;++s)t[s]=i[r+s];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},lc=class extends En{constructor(e,t,i,n){super(e,t,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Bs,endingEnd:Bs}}intervalChanged_(e,t,i){const n=this.parameterPositions;let r=e-2,s=e+1,a=n[r],o=n[s];if(a===void 0)switch(this.getSettings_().endingStart){case zs:r=e,a=2*t-i;break;case Vs:r=n.length-2,a=t+n[r]-n[r+1];break;default:r=e,a=i}if(o===void 0)switch(this.getSettings_().endingEnd){case zs:s=e,o=2*i-t;break;case Vs:s=1,o=i+n[1]-n[0];break;default:s=e-1,o=t}const c=(i-t)*.5,l=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(o-i),this._offsetPrev=r*l,this._offsetNext=s*l}interpolate_(e,t,i,n){const r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=e*a,c=o-a,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,h=this._weightNext,p=(i-t)/(n-t),x=p*p,y=x*p,m=-d*y+2*d*x-d*p,f=(1+d)*y+(-1.5-2*d)*x+(-.5+d)*p+1,R=(-1-h)*y+(1.5+h)*x+.5*p,A=h*y-h*x;for(let S=0;S!==a;++S)r[S]=m*s[l+S]+f*s[c+S]+R*s[o+S]+A*s[u+S];return r}},cc=class extends En{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){const r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=e*a,c=o-a,l=(i-t)/(n-t),u=1-l;for(let d=0;d!==a;++d)r[d]=s[c+d]*u+s[o+d]*l;return r}},hc=class extends En{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e){return this.copySampleValue_(e-1)}},uc=class extends En{interpolate_(e,t,i,n){const r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=e*a,c=o-a,l=this.inTangents,u=this.outTangents;if(!l||!u){const p=(i-t)/(n-t),x=1-p;for(let y=0;y!==a;++y)r[y]=s[c+y]*x+s[o+y]*p;return r}const d=a*2,h=e-1;for(let p=0;p!==a;++p){const x=s[c+p],y=s[o+p],m=h*d+p*2,f=u[m],R=u[m+1],A=e*d+p*2,S=l[A],b=l[A+1];let w=(i-t)/(n-t),P,v,E,W,T;for(let z=0;z<8;z++){P=w*w,v=P*w,E=1-w,W=E*E,T=W*E;const H=T*t+3*W*w*f+3*E*P*S+v*n-i;if(Math.abs(H)<1e-10)break;const Y=3*W*(f-t)+6*E*w*(S-f)+3*P*(n-S);if(Math.abs(Y)<1e-10)break;w=w-H/Y,w=Math.max(0,Math.min(1,w))}r[p]=T*x+3*W*w*R+3*E*P*b+v*y}return r}},jt=class{constructor(e,t,i,n){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ir(t,this.TimeBufferType),this.values=ir(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:ir(e.times,Array),values:ir(e.values,Array)};const n=e.getInterpolation();n!==e.DefaultInterpolation&&(i.interpolation=n)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new hc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new cc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new lc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new uc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Nn:t=this.InterpolantFactoryMethodDiscrete;break;case yr:t=this.InterpolantFactoryMethodLinear;break;case Er:t=this.InterpolantFactoryMethodSmooth;break;case Fs:t=this.InterpolantFactoryMethodBezier}if(t===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return be("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Nn;case this.InterpolantFactoryMethodLinear:return yr;case this.InterpolantFactoryMethodSmooth:return Er;case this.InterpolantFactoryMethodBezier:return Fs}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]*=e}return this}trim(e,t){const i=this.times,n=i.length;let r=0,s=n-1;for(;r!==n&&i[r]<e;)++r;for(;s!==-1&&i[s]>t;)--s;if(++s,r!==0||s!==n){r>=s&&(s=Math.max(s,1),r=s-1);const a=this.getValueSize();this.times=i.slice(r,s),this.values=this.values.slice(r*a,s*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Re("KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,n=this.values,r=i.length;r===0&&(Re("KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let a=0;a!==r;a++){const o=i[a];if(typeof o=="number"&&isNaN(o)){Re("KeyframeTrack: Time is not a valid number.",this,a,o),e=!1;break}if(s!==null&&s>o){Re("KeyframeTrack: Out of order keys.",this,a,o,s),e=!1;break}s=o}if(n!==void 0&&yl(n))for(let a=0,o=n.length;a!==o;++a){const c=n[a];if(isNaN(c)){Re("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===Er,r=e.length-1;let s=1;for(let a=1;a<r;++a){let o=!1;const c=e[a];if(c!==e[a+1]&&(a!==1||c!==e[0]))if(n)o=!0;else{const l=a*i,u=l-i,d=l+i;for(let h=0;h!==i;++h){const p=t[l+h];if(p!==t[u+h]||p!==t[d+h]){o=!0;break}}}if(o){if(a!==s){e[s]=e[a];const l=a*i,u=s*i;for(let d=0;d!==i;++d)t[u+d]=t[l+d]}++s}}if(r>0){e[s]=e[r];for(let a=r*i,o=s*i,c=0;c!==i;++c)t[o+c]=t[a+c];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=t.slice(0,s*i)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),i=this.constructor,n=new i(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};jt.prototype.ValueTypeName="",jt.prototype.TimeBufferType=Float32Array,jt.prototype.ValueBufferType=Float32Array,jt.prototype.DefaultInterpolation=yr;var Tn=class extends jt{constructor(e,t,i){super(e,t,i)}};Tn.prototype.ValueTypeName="bool",Tn.prototype.ValueBufferType=Array,Tn.prototype.DefaultInterpolation=Nn,Tn.prototype.InterpolantFactoryMethodLinear=void 0,Tn.prototype.InterpolantFactoryMethodSmooth=void 0;var dc=class extends jt{constructor(e,t,i,n){super(e,t,i,n)}};dc.prototype.ValueTypeName="color";var fc=class extends jt{constructor(e,t,i,n){super(e,t,i,n)}};fc.prototype.ValueTypeName="number";var pc=class extends En{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){const r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=(i-t)/(n-t);let c=e*a;for(let l=c+a;c!==l;c+=4)Ri.slerpFlat(r,0,s,c-a,s,c,o);return r}},pa=class extends jt{constructor(e,t,i,n){super(e,t,i,n)}InterpolantFactoryMethodLinear(e){return new pc(this.times,this.values,this.getValueSize(),e)}};pa.prototype.ValueTypeName="quaternion",pa.prototype.InterpolantFactoryMethodSmooth=void 0;var bn=class extends jt{constructor(e,t,i){super(e,t,i)}};bn.prototype.ValueTypeName="string",bn.prototype.ValueBufferType=Array,bn.prototype.DefaultInterpolation=Nn,bn.prototype.InterpolantFactoryMethodLinear=void 0,bn.prototype.InterpolantFactoryMethodSmooth=void 0;var mc=class extends jt{constructor(e,t,i,n){super(e,t,i,n)}};mc.prototype.ValueTypeName="vector";var gc=class{constructor(e,t,i){const n=this;let r=!1,s=0,a=0,o;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(l){a++,r===!1&&n.onStart!==void 0&&n.onStart(l,s,a),r=!0},this.itemEnd=function(l){s++,n.onProgress!==void 0&&n.onProgress(l,s,a),s===a&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(l){n.onError!==void 0&&n.onError(l)},this.resolveURL=function(l){return l=l.normalize("NFC"),o?o(l):l},this.setURLModifier=function(l){return o=l,this},this.addHandler=function(l,u){return c.push(l,u),this},this.removeHandler=function(l){const u=c.indexOf(l);return u!==-1&&c.splice(u,2),this},this.getHandler=function(l){for(let u=0,d=c.length;u<d;u+=2){const h=c[u],p=c[u+1];if(h.global&&(h.lastIndex=0),h.test(l))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},vc=new gc,_c=class{constructor(e){this.manager=e!==void 0?e:vc,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(n,r){i.load(e,n,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};_c.DEFAULT_MATERIAL_NAME="__DEFAULT";var ts=class extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},xc=class extends ts{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},is=new ot,ma=new B,ga=new B,Mc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ge(512,512),this.mapType=fi,this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new jr,this._frameExtents=new Ge(1,1),this._viewportCount=1,this._viewports=[new nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;ma.setFromMatrixPosition(e.matrixWorld),t.position.copy(ma),ga.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ga),t.updateMatrixWorld(),is.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(is,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(is)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},nr=new B,rr=new Ri,ei=new B,va=class extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=Oi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(nr,rr,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(nr,rr,ei.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(nr,rr,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(nr,rr,ei.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Si=new B,_a=new Ge,xa=new Ge,qt=class extends va{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=wr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ar*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return wr*2*Math.atan(Math.tan(Ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Si.x,Si.y).multiplyScalar(-e/Si.z),Si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Si.x,Si.y).multiplyScalar(-e/Si.z)}getViewSize(e,t){return this.getViewBounds(e,_a,xa),t.subVectors(xa,_a)}setViewOffset(e,t,i,n,r,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ar*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,r=-.5*n;const s=this.view;if(this.view!==null&&this.view.enabled){const o=s.fullWidth,c=s.fullHeight;r+=s.offsetX*n/o,t-=s.offsetY*i/c,n*=s.width/o,i*=s.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},sr=class extends va{constructor(e=-1,t=1,i=1,n=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let r=i-e,s=i+e,a=n+t,o=n-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,s=r+c*this.view.width,a-=l*this.view.offsetY,o=a-l*this.view.height}this.projectionMatrix.makeOrthographic(r,s,a,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Sc=class extends Mc{constructor(){super(new sr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},yc=class extends ts{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.shadow=new Sc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Ec=class extends ts{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}},tn=-90,nn=1,Tc=class extends Lt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new qt(tn,nn,e,t);n.layers=this.layers,this.add(n);const r=new qt(tn,nn,e,t);r.layers=this.layers,this.add(r);const s=new qt(tn,nn,e,t);s.layers=this.layers,this.add(s);const a=new qt(tn,nn,e,t);a.layers=this.layers,this.add(a);const o=new qt(tn,nn,e,t);o.layers=this.layers,this.add(o);const c=new qt(tn,nn,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,n,r,s,a,o]=t;for(const c of t)this.remove(c);if(e===2e3)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===2001)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,s,a,o,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let y=!1;e.isWebGLRenderer===!0?y=e.state.buffers.depth.getReversed():y=e.reversedDepthBuffer,e.setRenderTarget(i,0,n),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,n),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,2,n),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,n),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,4,n),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,n),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,h),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}},bc=class extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Ac="\\[\\]\\.:\\/",wc=new RegExp("[\\[\\]\\.:\\/]","g"),ns="[^\\[\\]\\.:\\/]",Rc="[^"+Ac.replace("\\.","")+"]",Cc=/((?:WC+[\/:])*)/.source.replace("WC",ns),Pc=/(WCOD+)?/.source.replace("WCOD",Rc),Ic=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ns),Lc=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ns),Uc=new RegExp("^"+Cc+Pc+Ic+Lc+"$"),Dc=["material","materials","bones","map"],Nc=class{constructor(e,t,i){const n=i||rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,n)}getValue(e,t){this.bind();const i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(e,t)}setValue(e,t){const i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},rt=class un{constructor(t,i,n){this.path=i,this.parsedPath=n||un.parseTrackName(i),this.node=un.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,i,n){return t&&t.isAnimationObjectGroup?new un.Composite(t,i,n):new un(t,i,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(wc,"")}static parseTrackName(t){const i=Uc.exec(t);if(i===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const s=n.nodeName.substring(r+1);Dc.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,i){if(i===void 0||i===""||i==="."||i===-1||i===t.name||i===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(i);if(n!==void 0)return n}if(t.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===i||o.uuid===i)return o;const c=n(o.children);if(c)return c}return null},r=n(t.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,i){t[i]=this.targetObject[this.propertyName]}_getValue_array(t,i){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)t[i++]=n[r]}_getValue_arrayElement(t,i){t[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,i){this.resolvedProperty.toArray(t,i)}_setValue_direct(t,i){this.targetObject[this.propertyName]=t[i]}_setValue_direct_setNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,i){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[i++]}_setValue_array_setNeedsUpdate(t,i){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,i){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,i){this.resolvedProperty[this.propertyIndex]=t[i]}_setValue_arrayElement_setNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,i){this.resolvedProperty.fromArray(t,i)}_setValue_fromArray_setNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,i){this.bind(),this.getValue(t,i)}_setValue_unbound(t,i){this.bind(),this.setValue(t,i)}bind(){let t=this.node;const i=this.parsedPath,n=i.objectName,r=i.propertyName;let s=i.propertyIndex;if(t||(t=un.findNode(this.rootNode,i.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){be("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=i.objectIndex;switch(n){case"materials":if(!t.material){Re("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Re("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Re("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Re("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Re("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Re("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){Re("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}const a=t[r];if(a===void 0){const l=i.nodeName;Re("PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!t.geometry){Re("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Re("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};rt.Composite=Nc,rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},rt.prototype.GetterByBindingType=[rt.prototype._getValue_direct,rt.prototype._getValue_array,rt.prototype._getValue_arrayElement,rt.prototype._getValue_toArray],rt.prototype.SetterByBindingTypeAndVersioning=[[rt.prototype._setValue_direct,rt.prototype._setValue_direct_setNeedsUpdate,rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_array,rt.prototype._setValue_array_setNeedsUpdate,rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_arrayElement,rt.prototype._setValue_arrayElement_setNeedsUpdate,rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_fromArray,rt.prototype._setValue_fromArray_setNeedsUpdate,rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Oc=class{constructor(e,t,i,n){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,n){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=n,this}};bs=Oc,bs.prototype.isMatrix2=!0;function Ma(e,t,i,n){const r=Fc(n);switch(i){case Do:return e*t;case Oo:return e*t/r.components*r.byteLength;case Ds:return e*t/r.components*r.byteLength;case Dn:return e*t*2/r.components*r.byteLength;case Ns:return e*t*2/r.components*r.byteLength;case No:return e*t*3/r.components*r.byteLength;case fn:return e*t*4/r.components*r.byteLength;case Os:return e*t*4/r.components*r.byteLength;case Fo:case Bo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case zo:case Vo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ko:case Wo:return Math.max(e,16)*Math.max(t,8)/4;case Go:case Ho:return Math.max(e,8)*Math.max(t,8)/2;case Xo:case qo:case Ko:case Zo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Yo:case $o:case Jo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Qo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case jo:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case el:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case tl:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case il:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case nl:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case rl:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case sl:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case al:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case ol:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case ll:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case cl:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case hl:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case ul:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case dl:case fl:case pl:return Math.ceil(e/4)*Math.ceil(t/4)*16;case ml:case gl:return Math.ceil(e/4)*Math.ceil(t/4)*8;case vl:case _l:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function Fc(e){switch(e){case fi:case Co:return{byteLength:1,components:1};case Cs:case Po:case Ai:return{byteLength:2,components:1};case Ps:case Is:return{byteLength:2,components:4};case bi:case Io:case Un:return{byteLength:4,components:1};case Lo:case Uo:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}})),typeof window!="undefined"&&(window.__THREE__?be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function Sa(){let e=null,t=!1,i=null,n=null;function r(s,a){i(s,a),n=e.requestAnimationFrame(r)}return{start:function(){t!==!0&&i!==null&&e!==null&&(n=e.requestAnimationFrame(r),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){i=s},setContext:function(s){e=s}}}function Bc(e){const t=new WeakMap;function i(o,c){const l=o.array,u=o.usage,d=l.byteLength,h=e.createBuffer();e.bindBuffer(c,h),e.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=e.FLOAT;else if(typeof Float16Array!="undefined"&&l instanceof Float16Array)p=e.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=e.HALF_FLOAT:p=e.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=e.SHORT;else if(l instanceof Uint32Array)p=e.UNSIGNED_INT;else if(l instanceof Int32Array)p=e.INT;else if(l instanceof Int8Array)p=e.BYTE;else if(l instanceof Uint8Array)p=e.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const u=c.array,d=c.updateRanges;if(e.bindBuffer(l,o),d.length===0)e.bufferSubData(l,0,u);else{d.sort((p,x)=>p.start-x.start);let h=0;for(let p=1;p<d.length;p++){const x=d[h],y=d[p];y.start<=x.start+x.count+1?x.count=Math.max(x.count,y.start+y.count-x.start):(++h,d[h]=y)}d.length=h+1;for(let p=0,x=d.length;p<x;p++){const y=d[p];e.bufferSubData(l,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(e.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,i(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var De={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},ae={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new Ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new Ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},ti={basic:{uniforms:yt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:De.meshbasic_vert,fragmentShader:De.meshbasic_frag},lambert:{uniforms:yt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Oe(0)},envMapIntensity:{value:1}}]),vertexShader:De.meshlambert_vert,fragmentShader:De.meshlambert_frag},phong:{uniforms:yt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:De.meshphong_vert,fragmentShader:De.meshphong_frag},standard:{uniforms:yt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag},toon:{uniforms:yt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new Oe(0)}}]),vertexShader:De.meshtoon_vert,fragmentShader:De.meshtoon_frag},matcap:{uniforms:yt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:De.meshmatcap_vert,fragmentShader:De.meshmatcap_frag},points:{uniforms:yt([ae.points,ae.fog]),vertexShader:De.points_vert,fragmentShader:De.points_frag},dashed:{uniforms:yt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:De.linedashed_vert,fragmentShader:De.linedashed_frag},depth:{uniforms:yt([ae.common,ae.displacementmap]),vertexShader:De.depth_vert,fragmentShader:De.depth_frag},normal:{uniforms:yt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:De.meshnormal_vert,fragmentShader:De.meshnormal_frag},sprite:{uniforms:yt([ae.sprite,ae.fog]),vertexShader:De.sprite_vert,fragmentShader:De.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:De.background_vert,fragmentShader:De.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:De.backgroundCube_vert,fragmentShader:De.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:De.cube_vert,fragmentShader:De.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:De.equirect_vert,fragmentShader:De.equirect_frag},distance:{uniforms:yt([ae.common,ae.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:De.distance_vert,fragmentShader:De.distance_frag},shadow:{uniforms:yt([ae.lights,ae.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:De.shadow_vert,fragmentShader:De.shadow_frag}};ti.physical={uniforms:yt([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new Ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new Ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new Ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag};var ar={r:0,b:0,g:0},zc=new ot,ya=new Ue;ya.set(-1,0,0,0,1,0,0,0,1);function Vc(e,t,i,n,r,s){const a=new Oe(0);let o=r===!0?0:1,c,l,u=null,d=0,h=null;function p(R){let A=R.isScene===!0?R.background:null;if(A&&A.isTexture){const S=R.backgroundBlurriness>0;A=t.get(A,S)}return A}function x(R){let A=!1;const S=p(R);S===null?m(a,o):S&&S.isColor&&(m(S,1),A=!0);const b=e.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,s):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,s),(e.autoClear||A)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function y(R,A){const S=p(A);S&&(S.isCubeTexture||S.mapping===306)?(l===void 0&&(l=new wt(new ji(1,1,1),new Qt({name:"BackgroundCubeMaterial",uniforms:en(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(b,w,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=S,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(zc.makeRotationFromEuler(A.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ya),l.material.toneMapped=ze.getTransfer(S.colorSpace)!==Fn,(u!==S||d!==S.version||h!==e.toneMapping)&&(l.material.needsUpdate=!0,u=S,d=S.version,h=e.toneMapping),l.layers.enableAll(),R.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new wt(new es(2,2),new Qt({name:"BackgroundMaterial",uniforms:en(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=ze.getTransfer(S.colorSpace)!==Fn,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||h!==e.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,h=e.toneMapping),c.layers.enableAll(),R.unshift(c,c.geometry,c.material,0,0,null))}function m(R,A){R.getRGB(ar,fa(e)),i.buffers.color.setClear(ar.r,ar.g,ar.b,A,s)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(R,A=1){a.set(R),o=A,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(R){o=R,m(a,o)},render:x,addToRenderList:y,dispose:f}}function Gc(e,t){const i=e.getParameter(e.MAX_VERTEX_ATTRIBS),n={},r=h(null);let s=r,a=!1;function o(T,z,H,Y,k){let K=!1;const N=d(T,Y,H,z);s!==N&&(s=N,l(s.object)),K=p(T,Y,H,k),K&&x(T,Y,H,k),k!==null&&t.update(k,e.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,S(T,z,H,Y),k!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function c(){return e.createVertexArray()}function l(T){return e.bindVertexArray(T)}function u(T){return e.deleteVertexArray(T)}function d(T,z,H,Y){const k=Y.wireframe===!0;let K=n[z.id];K===void 0&&(K={},n[z.id]=K);const N=T.isInstancedMesh===!0?T.id:0;let j=K[N];j===void 0&&(j={},K[N]=j);let ee=j[H.id];ee===void 0&&(ee={},j[H.id]=ee);let ne=ee[k];return ne===void 0&&(ne=h(c()),ee[k]=ne),ne}function h(T){const z=[],H=[],Y=[];for(let k=0;k<i;k++)z[k]=0,H[k]=0,Y[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:H,attributeDivisors:Y,object:T,attributes:{},index:null}}function p(T,z,H,Y){const k=s.attributes,K=z.attributes;let N=0;const j=H.getAttributes();for(const ee in j)if(j[ee].location>=0){const ne=k[ee];let fe=K[ee];if(fe===void 0&&(ee==="instanceMatrix"&&T.instanceMatrix&&(fe=T.instanceMatrix),ee==="instanceColor"&&T.instanceColor&&(fe=T.instanceColor)),ne===void 0||ne.attribute!==fe||fe&&ne.data!==fe.data)return!0;N++}return s.attributesNum!==N||s.index!==Y}function x(T,z,H,Y){const k={},K=z.attributes;let N=0;const j=H.getAttributes();for(const ee in j)if(j[ee].location>=0){let ne=K[ee];ne===void 0&&(ee==="instanceMatrix"&&T.instanceMatrix&&(ne=T.instanceMatrix),ee==="instanceColor"&&T.instanceColor&&(ne=T.instanceColor));const fe={};fe.attribute=ne,ne&&ne.data&&(fe.data=ne.data),k[ee]=fe,N++}s.attributes=k,s.attributesNum=N,s.index=Y}function y(){const T=s.newAttributes;for(let z=0,H=T.length;z<H;z++)T[z]=0}function m(T){f(T,0)}function f(T,z){const H=s.newAttributes,Y=s.enabledAttributes,k=s.attributeDivisors;H[T]=1,Y[T]===0&&(e.enableVertexAttribArray(T),Y[T]=1),k[T]!==z&&(e.vertexAttribDivisor(T,z),k[T]=z)}function R(){const T=s.newAttributes,z=s.enabledAttributes;for(let H=0,Y=z.length;H<Y;H++)z[H]!==T[H]&&(e.disableVertexAttribArray(H),z[H]=0)}function A(T,z,H,Y,k,K,N){N===!0?e.vertexAttribIPointer(T,z,H,k,K):e.vertexAttribPointer(T,z,H,Y,k,K)}function S(T,z,H,Y){y();const k=Y.attributes,K=H.getAttributes(),N=z.defaultAttributeValues;for(const j in K){const ee=K[j];if(ee.location>=0){let ne=k[j];if(ne===void 0&&(j==="instanceMatrix"&&T.instanceMatrix&&(ne=T.instanceMatrix),j==="instanceColor"&&T.instanceColor&&(ne=T.instanceColor)),ne!==void 0){const fe=ne.normalized,ye=ne.itemSize,tt=t.get(ne);if(tt===void 0)continue;const Ze=tt.buffer,X=tt.type,se=tt.bytesPerElement,me=X===e.INT||X===e.UNSIGNED_INT||ne.gpuType===1013;if(ne.isInterleavedBufferAttribute){const ue=ne.data,Ae=ue.stride,Ce=ne.offset;if(ue.isInstancedInterleavedBuffer){for(let Ie=0;Ie<ee.locationSize;Ie++)f(ee.location+Ie,ue.meshPerAttribute);T.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Ie=0;Ie<ee.locationSize;Ie++)m(ee.location+Ie);e.bindBuffer(e.ARRAY_BUFFER,Ze);for(let Ie=0;Ie<ee.locationSize;Ie++)A(ee.location+Ie,ye/ee.locationSize,X,fe,Ae*se,(Ce+ye/ee.locationSize*Ie)*se,me)}else{if(ne.isInstancedBufferAttribute){for(let ue=0;ue<ee.locationSize;ue++)f(ee.location+ue,ne.meshPerAttribute);T.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ue=0;ue<ee.locationSize;ue++)m(ee.location+ue);e.bindBuffer(e.ARRAY_BUFFER,Ze);for(let ue=0;ue<ee.locationSize;ue++)A(ee.location+ue,ye/ee.locationSize,X,fe,ye*se,ye/ee.locationSize*ue*se,me)}}else if(N!==void 0){const fe=N[j];if(fe!==void 0)switch(fe.length){case 2:e.vertexAttrib2fv(ee.location,fe);break;case 3:e.vertexAttrib3fv(ee.location,fe);break;case 4:e.vertexAttrib4fv(ee.location,fe);break;default:e.vertexAttrib1fv(ee.location,fe)}}}}R()}function b(){E();for(const T in n){const z=n[T];for(const H in z){const Y=z[H];for(const k in Y){const K=Y[k];for(const N in K)u(K[N].object),delete K[N];delete Y[k]}}delete n[T]}}function w(T){if(n[T.id]===void 0)return;const z=n[T.id];for(const H in z){const Y=z[H];for(const k in Y){const K=Y[k];for(const N in K)u(K[N].object),delete K[N];delete Y[k]}}delete n[T.id]}function P(T){for(const z in n){const H=n[z];for(const Y in H){const k=H[Y];if(k[T.id]===void 0)continue;const K=k[T.id];for(const N in K)u(K[N].object),delete K[N];delete k[T.id]}}}function v(T){for(const z in n){const H=n[z],Y=T.isInstancedMesh===!0?T.id:0,k=H[Y];if(k!==void 0){for(const K in k){const N=k[K];for(const j in N)u(N[j].object),delete N[j];delete k[K]}delete H[Y],Object.keys(H).length===0&&delete n[z]}}}function E(){W(),a=!0,s!==r&&(s=r,l(s.object))}function W(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:E,resetDefaultState:W,dispose:b,releaseStatesOfGeometry:w,releaseStatesOfObject:v,releaseStatesOfProgram:P,initAttributes:y,enableAttribute:m,disableUnusedAttributes:R}}function kc(e,t,i){let n;function r(c){n=c}function s(c,l){e.drawArrays(n,c,l),i.update(l,n,1)}function a(c,l,u){u!==0&&(e.drawArraysInstanced(n,c,l,u),i.update(l,n,u))}function o(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let d=0;for(let h=0;h<u;h++)d+=l[h];i.update(d,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Hc(e,t,i,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");r=e.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==1023&&n.convert(P)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const v=P===1016&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==1009&&n.convert(P)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==1015&&!v)}function c(P){if(P==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=i.precision!==void 0?i.precision:"highp";const u=c(l);u!==l&&(be("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=i.logarithmicDepthBuffer===!0,h=i.reversedDepthBuffer===!0&&t.has("EXT_clip_control");i.reversedDepthBuffer===!0&&h===!1&&be("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),x=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),R=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),A=e.getParameter(e.MAX_VARYING_VECTORS),S=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),b=e.getParameter(e.MAX_SAMPLES),w=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:x,maxTextureSize:y,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:R,maxVaryings:A,maxFragmentUniforms:S,maxSamples:b,samples:w}}function Wc(e){const t=this;let i=null,n=0,r=!1,s=!1;const a=new Li,o=new Ue,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||n!==0||r;return r=h,n=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){i=u(d,h,0)},this.setState=function(d,h,p){const x=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,f=e.get(d);if(!r||x===null||x.length===0||s&&!m)s?u(null):l();else{const R=s?0:n,A=R*4;let S=f.clippingState||null;c.value=S,S=u(x,h,A,p);for(let b=0;b!==A;++b)S[b]=i[b];f.clippingState=S,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=R}};function l(){c.value!==i&&(c.value=i,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,h,p,x){const y=d!==null?d.length:0;let m=null;if(y!==0){if(m=c.value,x!==!0||m===null){const f=p+y*4,R=h.matrixWorldInverse;o.getNormalMatrix(R),(m===null||m.length<f)&&(m=new Float32Array(f));for(let A=0,S=p;A!==y;++A,S+=4)a.copy(d[A]).applyMatrix4(R,o),a.normal.toArray(m,S),m[S+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,m}}var yi=4,Ea=[.125,.215,.35,.446,.526,.582],rn=20,Xc=256,An=new sr,Ta=new Oe,rs=null,ss=0,as=0,os=!1,qc=new B,ba=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,n=100,r={}){const{size:s=256,position:a=qc}=r;rs=this._renderer.getRenderTarget(),ss=this._renderer.getActiveCubeFace(),as=this._renderer.getActiveMipmapLevel(),os=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,i,n,o,a),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ra(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wa(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(rs,ss,as),this._renderer.xr.enabled=os,e.scissorTest=!1,sn(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),rs=this._renderer.getRenderTarget(),ss=this._renderer.getActiveCubeFace(),as=this._renderer.getActiveMipmapLevel(),os=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Pt,minFilter:Pt,generateMipmaps:!1,type:Ai,format:fn,colorSpace:Tr,depthBuffer:!1},n=Aa(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Aa(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Yc(r)),this._blurMaterial=Zc(r,e,t),this._ggxMaterial=Kc(r,e,t)}return n}_compileMaterial(e){const t=new wt(new xi,e);this._renderer.compile(t,An)}_sceneToCubeUV(e,t,i,n,r){const s=new qt(90,1,t,i),a=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Ta),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(n),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new wt(new ji,new aa({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1})));const d=this._backgroundBox,h=d.material;let p=!1;const x=e.background;x?x.isColor&&(h.color.copy(x),e.background=null,p=!0):(h.color.copy(Ta),p=!0);for(let y=0;y<6;y++){const m=y%3;m===0?(s.up.set(0,a[y],0),s.position.set(r.x,r.y,r.z),s.lookAt(r.x+o[y],r.y,r.z)):m===1?(s.up.set(0,0,a[y]),s.position.set(r.x,r.y,r.z),s.lookAt(r.x,r.y+o[y],r.z)):(s.up.set(0,a[y],0),s.position.set(r.x,r.y,r.z),s.lookAt(r.x,r.y,r.z+o[y]));const f=this._cubeSize;sn(n,m*f,y>2?f:0,f,f),c.setRenderTarget(n),p&&c.render(d,s),c.render(e,s)}c.toneMapping=u,c.autoClear=l,e.background=x}_textureToCubeUV(e,t){const i=this._renderer,n=e.mapping===301||e.mapping===302;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ra()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wa());const r=n?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=r;const a=r.uniforms;a.envMap.value=e;const o=this._cubeSize;sn(t,0,0,3*o,2*o),i.setRenderTarget(t),i.render(s,An)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const n=this._lodMeshes.length;for(let r=1;r<n;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const n=this._renderer,r=this._pingPongRenderTarget,s=this._ggxMaterial,a=this._lodMeshes[i];a.material=s;const o=s.uniforms,c=i/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(0+c*1.25),{_lodMax:d}=this,h=this._sizeLods[i],p=3*h*(i>d-yi?i-d+yi:0),x=4*(this._cubeSize-h);o.envMap.value=e.texture,o.roughness.value=u,o.mipInt.value=d-t,sn(r,p,x,3*h,2*h),n.setRenderTarget(r),n.render(a,An),o.envMap.value=r.texture,o.roughness.value=0,o.mipInt.value=d-i,sn(e,p,x,3*h,2*h),n.setRenderTarget(e),n.render(a,An)}_blur(e,t,i,n,r){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,i,n,"latitudinal",r),this._halfBlur(s,e,i,i,n,"longitudinal",r)}_halfBlur(e,t,i,n,r,s,a){const o=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&Re("blur direction must be either latitudinal or longitudinal!");const l=3,u=this._lodMeshes[n];u.material=c;const d=c.uniforms,h=this._sizeLods[i]-1,p=isFinite(r)?Math.PI/(2*h):2*Math.PI/39,x=r/p,y=isFinite(r)?1+Math.floor(l*x):rn;y>rn&&be(`sigmaRadians, ${r}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${rn}`);const m=[];let f=0;for(let S=0;S<rn;++S){const b=S/x,w=Math.exp(-b*b/2);m.push(w),S===0?f+=w:S<y&&(f+=2*w)}for(let S=0;S<m.length;S++)m[S]=m[S]/f;d.envMap.value=e.texture,d.samples.value=y,d.weights.value=m,d.latitudinal.value=s==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:R}=this;d.dTheta.value=p,d.mipInt.value=R-i;const A=this._sizeLods[n];sn(t,3*A*(n>R-yi?n-R+yi:0),4*(this._cubeSize-A),3*A,2*A),o.setRenderTarget(t),o.render(u,An)}};function Yc(e){const t=[],i=[],n=[];let r=e;const s=e-yi+1+Ea.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let c=1/o;a>e-yi?c=Ea[a-e+yi-1]:a===0&&(c=0),i.push(c);const l=1/(o-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,x=3,y=2,m=1,f=new Float32Array(108),R=new Float32Array(72),A=new Float32Array(36);for(let b=0;b<p;b++){const w=b%3*2/3-1,P=b>2?0:-1,v=[w,P,0,w+2/3,P,0,w+2/3,P+1,0,w,P,0,w+2/3,P+1,0,w,P+1,0];f.set(v,18*b),R.set(h,12*b);const E=[b,b,b,b,b,b];A.set(E,6*b)}const S=new xi;S.setAttribute("position",new Jt(f,x)),S.setAttribute("uv",new Jt(R,y)),S.setAttribute("faceIndex",new Jt(A,m)),n.push(new wt(S,null)),r>yi&&r--}return{lodMeshes:n,sizeLods:t,sigmas:i}}function Aa(e,t,i){const n=new $t(e,t,i);return n.texture.mapping=306,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function sn(e,t,i,n,r){e.viewport.set(t,i,n,r),e.scissor.set(t,i,n,r)}function Kc(e,t,i){return new Qt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Xc,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:or(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Zc(e,t,i){const n=new Float32Array(rn),r=new B(0,1,0);return new Qt({name:"SphericalGaussianBlur",defines:{n:rn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:or(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function wa(){return new Qt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:or(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ra(){return new Qt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:or(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function or(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ca=class extends $t{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];this.texture=new ha(n),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new ji(5,5,5),r=new Qt({name:"CubemapFromEquirect",uniforms:en(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:1,blending:0});r.uniforms.tEquirect.value=t;const s=new wt(n,r),a=t.minFilter;return t.minFilter===1008&&(t.minFilter=Pt),new Tc(1,10,this).update(e,s),t.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,i=!0,n=!0){const r=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,n);e.setRenderTarget(r)}};function $c(e){let t=new WeakMap,i=new WeakMap,n=null;function r(h,p=!1){return h==null?null:p?a(h):s(h)}function s(h){if(h&&h.isTexture){const p=h.mapping;if(p===303||p===304)if(t.has(h)){const x=t.get(h).texture;return o(x,h.mapping)}else{const x=h.image;if(x&&x.height>0){const y=new Ca(x.height);return y.fromEquirectangularTexture(e,h),t.set(h,y),h.addEventListener("dispose",l),o(y.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const p=h.mapping,x=p===303||p===304,y=p===301||p===302;if(x||y){let m=i.get(h);const f=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return n===null&&(n=new ba(e)),m=x?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,i.set(h,m),m.texture;if(m!==void 0)return m.texture;{const R=h.image;return x&&R&&R.height>0||y&&R&&c(R)?(n===null&&(n=new ba(e)),m=x?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,i.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,p){return p===303?h.mapping=301:p===304&&(h.mapping=302),h}function c(h){let p=0;const x=6;for(let y=0;y<x;y++)h[y]!==void 0&&p++;return p===x}function l(h){const p=h.target;p.removeEventListener("dispose",l);const x=t.get(p);x!==void 0&&(t.delete(p),x.dispose())}function u(h){const p=h.target;p.removeEventListener("dispose",u);const x=i.get(p);x!==void 0&&(i.delete(p),x.dispose())}function d(){t=new WeakMap,i=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:d}}function Jc(e){const t={};function i(n){if(t[n]!==void 0)return t[n];const r=e.getExtension(n);return t[n]=r,r}return{has:function(n){return i(n)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(n){const r=i(n);return r===null&&Bi("WebGLRenderer: "+n+" extension not supported."),r}}}function Qc(e,t,i,n){const r={},s=new WeakMap;function a(d){const h=d.target;h.index!==null&&t.remove(h.index);for(const x in h.attributes)t.remove(h.attributes[x]);h.removeEventListener("dispose",a),delete r[h.id];const p=s.get(h);p&&(t.remove(p),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,i.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,i.memory.geometries++),h}function c(d){const h=d.attributes;for(const p in h)t.update(h[p],e.ARRAY_BUFFER)}function l(d){const h=[],p=d.index,x=d.attributes.position;let y=0;if(x===void 0)return;if(p!==null){const R=p.array;y=p.version;for(let A=0,S=R.length;A<S;A+=3){const b=R[A+0],w=R[A+1],P=R[A+2];h.push(b,w,w,P,P,b)}}else{const R=x.array;y=x.version;for(let A=0,S=R.length/3-1;A<S;A+=3){const b=A+0,w=A+1,P=A+2;h.push(b,w,w,P,P,b)}}const m=new(x.count>=65535?sa:ra)(h,1);m.version=y;const f=s.get(d);f&&t.remove(f),s.set(d,m)}function u(d){const h=s.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&l(d)}else l(d);return s.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function jc(e,t,i){let n;function r(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function c(d,h){e.drawElements(n,h,s,d*a),i.update(h,n,1)}function l(d,h,p){p!==0&&(e.drawElementsInstanced(n,h,s,d*a,p),i.update(h,n,p))}function u(d,h,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,d,0,p);let x=0;for(let y=0;y<p;y++)x+=h[y];i.update(x,n,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function eh(e){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(i.calls++,a){case e.TRIANGLES:i.triangles+=o*(s/3);break;case e.LINES:i.lines+=o*(s/2);break;case e.LINE_STRIP:i.lines+=o*(s-1);break;case e.LINE_LOOP:i.lines+=o*s;break;case e.POINTS:i.points+=o*s;break;default:Re("WebGLInfo: Unknown draw mode:",a)}}function r(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:r,update:n}}function th(e,t,i){const n=new WeakMap,r=new nt;function s(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==d){let W=function(){v.dispose(),n.delete(o),o.removeEventListener("dispose",W)};var p=W;h!==void 0&&h.texture.dispose();const x=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],R=o.morphAttributes.normal||[],A=o.morphAttributes.color||[];let S=0;x===!0&&(S=1),y===!0&&(S=2),m===!0&&(S=3);let b=o.attributes.position.count*S,w=1;b>t.maxTextureSize&&(w=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);const P=new Float32Array(b*w*4*d),v=new Ys(P,b,w,d);v.type=Un,v.needsUpdate=!0;const E=S*4;for(let T=0;T<d;T++){const z=f[T],H=R[T],Y=A[T],k=b*w*4*T;for(let K=0;K<z.count;K++){const N=K*E;x===!0&&(r.fromBufferAttribute(z,K),P[k+N+0]=r.x,P[k+N+1]=r.y,P[k+N+2]=r.z,P[k+N+3]=0),y===!0&&(r.fromBufferAttribute(H,K),P[k+N+4]=r.x,P[k+N+5]=r.y,P[k+N+6]=r.z,P[k+N+7]=0),m===!0&&(r.fromBufferAttribute(Y,K),P[k+N+8]=r.x,P[k+N+9]=r.y,P[k+N+10]=r.z,P[k+N+11]=Y.itemSize===4?r.w:1)}}h={count:d,texture:v,size:new Ge(b,w)},n.set(o,h),o.addEventListener("dispose",W)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(e,"morphTexture",a.morphTexture,i);else{let x=0;for(let m=0;m<l.length;m++)x+=l[m];const y=o.morphTargetsRelative?1:1-x;c.getUniforms().setValue(e,"morphTargetBaseInfluence",y),c.getUniforms().setValue(e,"morphTargetInfluences",l)}c.getUniforms().setValue(e,"morphTargetsTexture",h.texture,i),c.getUniforms().setValue(e,"morphTargetsTextureSize",h.size)}return{update:s}}function ih(e,t,i,n,r){let s=new WeakMap;function a(l){const u=r.render.frame,d=l.geometry,h=t.get(l,d);if(s.get(h)!==u&&(t.update(h),s.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(i.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null&&i.update(l.instanceColor,e.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==u&&(p.update(),s.set(p,u))}return h}function o(){s=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),i.remove(u.instanceMatrix),u.instanceColor!==null&&i.remove(u.instanceColor)}return{update:a,dispose:o}}var nh={1:"LINEAR_TONE_MAPPING",2:"REINHARD_TONE_MAPPING",3:"CINEON_TONE_MAPPING",4:"ACES_FILMIC_TONE_MAPPING",6:"AGX_TONE_MAPPING",7:"NEUTRAL_TONE_MAPPING",5:"CUSTOM_TONE_MAPPING"};function rh(e,t,i,n,r,s){const a=new $t(t,i,{type:e,depthBuffer:r,stencilBuffer:s,samples:n?4:0,depthTexture:r?new Qi(t,i):void 0}),o=new $t(t,i,{type:Ai,depthBuffer:!1,stencilBuffer:!1}),c=new xi;c.setAttribute("position",new Nt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Nt([0,2,0,0,2,0],2));const l=new sc({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new wt(c,l),d=new sr(-1,1,1,-1,0,1);let h=null,p=null,x=!1,y,m=null,f=[],R=!1;this.setSize=function(A,S){a.setSize(A,S),o.setSize(A,S);for(let b=0;b<f.length;b++){const w=f[b];w.setSize&&w.setSize(A,S)}},this.setEffects=function(A){f=A,R=f.length>0&&f[0].isRenderPass===!0;const S=a.width,b=a.height;for(let w=0;w<f.length;w++){const P=f[w];P.setSize&&P.setSize(S,b)}},this.begin=function(A,S){if(x||A.toneMapping===0&&f.length===0)return!1;if(m=S,S!==null){const b=S.width,w=S.height;(a.width!==b||a.height!==w)&&this.setSize(b,w)}return R===!1&&A.setRenderTarget(a),y=A.toneMapping,A.toneMapping=0,!0},this.hasRenderPass=function(){return R},this.end=function(A,S){A.toneMapping=y,x=!0;let b=a,w=o;for(let P=0;P<f.length;P++){const v=f[P];if(v.enabled!==!1&&(v.render(A,w,b,S),v.needsSwap!==!1)){const E=b;b=w,w=E}}if(h!==A.outputColorSpace||p!==A.toneMapping){h=A.outputColorSpace,p=A.toneMapping,l.defines={},ze.getTransfer(h)==="srgb"&&(l.defines.SRGB_TRANSFER="");const P=nh[p];P&&(l.defines[P]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=b.texture,A.setRenderTarget(m),A.render(u,d),m=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}var Pa=new kt,ls=new Qi(1,1),Ia=new Ys,La=new Ll,Ua=new ha,Da=[],Na=[],Oa=new Float32Array(16),Fa=new Float32Array(9),Ba=new Float32Array(4);function an(e,t,i){const n=e[0];if(n<=0||n>0)return e;const r=t*i;let s=Da[r];if(s===void 0&&(s=new Float32Array(r),Da[r]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=i,e[a].toArray(s,o)}return s}function ht(e,t){if(e.length!==t.length)return!1;for(let i=0,n=e.length;i<n;i++)if(e[i]!==t[i])return!1;return!0}function ut(e,t){for(let i=0,n=t.length;i<n;i++)e[i]=t[i]}function lr(e,t){let i=Na[t];i===void 0&&(i=new Int32Array(t),Na[t]=i);for(let n=0;n!==t;++n)i[n]=e.allocateTextureUnit();return i}function sh(e,t){const i=this.cache;i[0]!==t&&(e.uniform1f(this.addr,t),i[0]=t)}function ah(e,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(ht(i,t))return;e.uniform2fv(this.addr,t),ut(i,t)}}function oh(e,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(ht(i,t))return;e.uniform3fv(this.addr,t),ut(i,t)}}function lh(e,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(ht(i,t))return;e.uniform4fv(this.addr,t),ut(i,t)}}function ch(e,t){const i=this.cache,n=t.elements;if(n===void 0){if(ht(i,t))return;e.uniformMatrix2fv(this.addr,!1,t),ut(i,t)}else{if(ht(i,n))return;Ba.set(n),e.uniformMatrix2fv(this.addr,!1,Ba),ut(i,n)}}function hh(e,t){const i=this.cache,n=t.elements;if(n===void 0){if(ht(i,t))return;e.uniformMatrix3fv(this.addr,!1,t),ut(i,t)}else{if(ht(i,n))return;Fa.set(n),e.uniformMatrix3fv(this.addr,!1,Fa),ut(i,n)}}function uh(e,t){const i=this.cache,n=t.elements;if(n===void 0){if(ht(i,t))return;e.uniformMatrix4fv(this.addr,!1,t),ut(i,t)}else{if(ht(i,n))return;Oa.set(n),e.uniformMatrix4fv(this.addr,!1,Oa),ut(i,n)}}function dh(e,t){const i=this.cache;i[0]!==t&&(e.uniform1i(this.addr,t),i[0]=t)}function fh(e,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(ht(i,t))return;e.uniform2iv(this.addr,t),ut(i,t)}}function ph(e,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(ht(i,t))return;e.uniform3iv(this.addr,t),ut(i,t)}}function mh(e,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(ht(i,t))return;e.uniform4iv(this.addr,t),ut(i,t)}}function gh(e,t){const i=this.cache;i[0]!==t&&(e.uniform1ui(this.addr,t),i[0]=t)}function vh(e,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(ht(i,t))return;e.uniform2uiv(this.addr,t),ut(i,t)}}function _h(e,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(ht(i,t))return;e.uniform3uiv(this.addr,t),ut(i,t)}}function xh(e,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(ht(i,t))return;e.uniform4uiv(this.addr,t),ut(i,t)}}function Mh(e,t,i){const n=this.cache,r=i.allocateTextureUnit();n[0]!==r&&(e.uniform1i(this.addr,r),n[0]=r);let s;this.type===e.SAMPLER_2D_SHADOW?(ls.compareFunction=i.isReversedDepthBuffer()?518:515,s=ls):s=Pa,i.setTexture2D(t||s,r)}function Sh(e,t,i){const n=this.cache,r=i.allocateTextureUnit();n[0]!==r&&(e.uniform1i(this.addr,r),n[0]=r),i.setTexture3D(t||La,r)}function yh(e,t,i){const n=this.cache,r=i.allocateTextureUnit();n[0]!==r&&(e.uniform1i(this.addr,r),n[0]=r),i.setTextureCube(t||Ua,r)}function Eh(e,t,i){const n=this.cache,r=i.allocateTextureUnit();n[0]!==r&&(e.uniform1i(this.addr,r),n[0]=r),i.setTexture2DArray(t||Ia,r)}function Th(e){switch(e){case 5126:return sh;case 35664:return ah;case 35665:return oh;case 35666:return lh;case 35674:return ch;case 35675:return hh;case 35676:return uh;case 5124:case 35670:return dh;case 35667:case 35671:return fh;case 35668:case 35672:return ph;case 35669:case 35673:return mh;case 5125:return gh;case 36294:return vh;case 36295:return _h;case 36296:return xh;case 35678:case 36198:case 36298:case 36306:case 35682:return Mh;case 35679:case 36299:case 36307:return Sh;case 35680:case 36300:case 36308:case 36293:return yh;case 36289:case 36303:case 36311:case 36292:return Eh}}function bh(e,t){e.uniform1fv(this.addr,t)}function Ah(e,t){const i=an(t,this.size,2);e.uniform2fv(this.addr,i)}function wh(e,t){const i=an(t,this.size,3);e.uniform3fv(this.addr,i)}function Rh(e,t){const i=an(t,this.size,4);e.uniform4fv(this.addr,i)}function Ch(e,t){const i=an(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,i)}function Ph(e,t){const i=an(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,i)}function Ih(e,t){const i=an(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,i)}function Lh(e,t){e.uniform1iv(this.addr,t)}function Uh(e,t){e.uniform2iv(this.addr,t)}function Dh(e,t){e.uniform3iv(this.addr,t)}function Nh(e,t){e.uniform4iv(this.addr,t)}function Oh(e,t){e.uniform1uiv(this.addr,t)}function Fh(e,t){e.uniform2uiv(this.addr,t)}function Bh(e,t){e.uniform3uiv(this.addr,t)}function zh(e,t){e.uniform4uiv(this.addr,t)}function Vh(e,t,i){const n=this.cache,r=t.length,s=lr(i,r);ht(n,s)||(e.uniform1iv(this.addr,s),ut(n,s));let a;this.type===e.SAMPLER_2D_SHADOW?a=ls:a=Pa;for(let o=0;o!==r;++o)i.setTexture2D(t[o]||a,s[o])}function Gh(e,t,i){const n=this.cache,r=t.length,s=lr(i,r);ht(n,s)||(e.uniform1iv(this.addr,s),ut(n,s));for(let a=0;a!==r;++a)i.setTexture3D(t[a]||La,s[a])}function kh(e,t,i){const n=this.cache,r=t.length,s=lr(i,r);ht(n,s)||(e.uniform1iv(this.addr,s),ut(n,s));for(let a=0;a!==r;++a)i.setTextureCube(t[a]||Ua,s[a])}function Hh(e,t,i){const n=this.cache,r=t.length,s=lr(i,r);ht(n,s)||(e.uniform1iv(this.addr,s),ut(n,s));for(let a=0;a!==r;++a)i.setTexture2DArray(t[a]||Ia,s[a])}function Wh(e){switch(e){case 5126:return bh;case 35664:return Ah;case 35665:return wh;case 35666:return Rh;case 35674:return Ch;case 35675:return Ph;case 35676:return Ih;case 5124:case 35670:return Lh;case 35667:case 35671:return Uh;case 35668:case 35672:return Dh;case 35669:case 35673:return Nh;case 5125:return Oh;case 36294:return Fh;case 36295:return Bh;case 36296:return zh;case 35678:case 36198:case 36298:case 36306:case 35682:return Vh;case 35679:case 36299:case 36307:return Gh;case 35680:case 36300:case 36308:case 36293:return kh;case 36289:case 36303:case 36311:case 36292:return Hh}}var Xh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Th(t.type)}},qh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Wh(t.type)}},Yh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let r=0,s=n.length;r!==s;++r){const a=n[r];a.setValue(e,t[a.id],i)}}},cs=/(\w+)(\])?(\[|\.)?/g;function za(e,t){e.seq.push(t),e.map[t.id]=t}function Kh(e,t,i){const n=e.name,r=n.length;for(cs.lastIndex=0;;){const s=cs.exec(n),a=cs.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){za(i,l===void 0?new Xh(o,e,t):new qh(o,e,t));break}else{let u=i.map[o];u===void 0&&(u=new Yh(o),za(i,u)),i=u}}}var cr=class{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const a=e.getActiveUniform(t,s);Kh(a,e.getUniformLocation(t,a.name),this)}const n=[],r=[];for(const s of this.seq)s.type===e.SAMPLER_2D_SHADOW||s.type===e.SAMPLER_CUBE_SHADOW||s.type===e.SAMPLER_2D_ARRAY_SHADOW?n.push(s):r.push(s);n.length>0&&(this.seq=n.concat(r))}setValue(e,t,i,n){const r=this.map[t];r!==void 0&&r.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let r=0,s=t.length;r!==s;++r){const a=t[r],o=i[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,r=e.length;n!==r;++n){const s=e[n];s.id in t&&i.push(s)}return i}};function Va(e,t,i){const n=e.createShader(t);return e.shaderSource(n,i),e.compileShader(n),n}var Zh=37297,$h=0;function Jh(e,t){const i=e.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,i.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${i[a]}`)}return n.join(`
`)}var Ga=new Ue;function Qh(e){ze._getMatrix(Ga,ze.workingColorSpace,e);const t=`mat3( ${Ga.elements.map(i=>i.toFixed(4))} )`;switch(ze.getTransfer(e)){case On:return[t,"LinearTransferOETF"];case Fn:return[t,"sRGBTransferOETF"];default:return be("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function ka(e,t,i){const n=e.getShaderParameter(t,e.COMPILE_STATUS),r=(e.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return i.toUpperCase()+`

`+r+`

`+Jh(e.getShaderSource(t),a)}else return r}function jh(e,t){const i=Qh(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}var eu={1:"Linear",2:"Reinhard",3:"Cineon",4:"ACESFilmic",6:"AgX",7:"Neutral",5:"Custom"};function tu(e,t){const i=eu[t];return i===void 0?(be("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}var hr=new B;function iu(){return ze.getLuminanceCoefficients(hr),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${hr.x.toFixed(4)}, ${hr.y.toFixed(4)}, ${hr.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function nu(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wn).join(`
`)}function ru(e){const t=[];for(const i in e){const n=e[i];n!==!1&&t.push("#define "+i+" "+n)}return t.join(`
`)}function su(e,t){const i={},n=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=e.getActiveAttrib(t,r),a=s.name;let o=1;s.type===e.FLOAT_MAT2&&(o=2),s.type===e.FLOAT_MAT3&&(o=3),s.type===e.FLOAT_MAT4&&(o=4),i[a]={type:s.type,location:e.getAttribLocation(t,a),locationSize:o}}return i}function wn(e){return e!==""}function Ha(e,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Wa(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var au=/^[ \t]*#include +<([\w\d./]+)>/gm;function hs(e){return e.replace(au,lu)}var ou=new Map;function lu(e,t){let i=De[t];if(i===void 0){const n=ou.get(t);if(n!==void 0)i=De[n],be('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return hs(i)}var cu=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xa(e){return e.replace(cu,hu)}function hu(e,t,i,n){let r="";for(let s=parseInt(t);s<parseInt(i);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function qa(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var uu={1:"SHADOWMAP_TYPE_PCF",3:"SHADOWMAP_TYPE_VSM"};function du(e){return uu[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var fu={301:"ENVMAP_TYPE_CUBE",302:"ENVMAP_TYPE_CUBE",306:"ENVMAP_TYPE_CUBE_UV"};function pu(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":fu[e.envMapMode]||"ENVMAP_TYPE_CUBE"}var mu={302:"ENVMAP_MODE_REFRACTION"};function gu(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":mu[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}var vu={0:"ENVMAP_BLENDING_MULTIPLY",1:"ENVMAP_BLENDING_MIX",2:"ENVMAP_BLENDING_ADD"};function _u(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":vu[e.combine]||"ENVMAP_BLENDING_NONE"}function xu(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:n,maxMip:i}}function Mu(e,t,i,n){const r=e.getContext(),s=i.defines;let a=i.vertexShader,o=i.fragmentShader;const c=du(i),l=pu(i),u=gu(i),d=_u(i),h=xu(i),p=nu(i),x=ru(s),y=r.createProgram();let m,f,R=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(m=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,x].filter(wn).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,x].filter(wn).join(`
`),f.length>0&&(f+=`
`)):(m=[qa(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,x,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+u:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+c:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wn).join(`
`),f=[qa(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,x,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+l:"",i.envMap?"#define "+u:"",i.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+c:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==0?"#define TONE_MAPPING":"",i.toneMapping!==0?De.tonemapping_pars_fragment:"",i.toneMapping!==0?tu("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",De.colorspace_pars_fragment,jh("linearToOutputTexel",i.outputColorSpace),iu(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(wn).join(`
`)),a=hs(a),a=Ha(a,i),a=Wa(a,i),o=hs(o),o=Ha(o,i),o=Wa(o,i),a=Xa(a),o=Xa(o),i.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",i.glslVersion==="300 es"?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion==="300 es"?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const A=R+m+a,S=R+f+o,b=Va(r,r.VERTEX_SHADER,A),w=Va(r,r.FRAGMENT_SHADER,S);r.attachShader(y,b),r.attachShader(y,w),i.index0AttributeName!==void 0?r.bindAttribLocation(y,0,i.index0AttributeName):i.hasPositionAttribute===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function P(T){if(e.debug.checkShaderErrors){const z=r.getProgramInfoLog(y)||"",H=r.getShaderInfoLog(b)||"",Y=r.getShaderInfoLog(w)||"",k=z.trim(),K=H.trim(),N=Y.trim();let j=!0,ee=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(j=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(r,y,b,w);else{const ne=ka(r,b,"vertex"),fe=ka(r,w,"fragment");Re("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+k+`
`+ne+`
`+fe)}else k!==""?be("WebGLProgram: Program Info Log:",k):(K===""||N==="")&&(ee=!1);ee&&(T.diagnostics={runnable:j,programLog:k,vertexShader:{log:K,prefix:m},fragmentShader:{log:N,prefix:f}})}r.deleteShader(b),r.deleteShader(w),v=new cr(r,y),E=su(r,y)}let v;this.getUniforms=function(){return v===void 0&&P(this),v};let E;this.getAttributes=function(){return E===void 0&&P(this),E};let W=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return W===!1&&(W=r.getProgramParameter(y,Zh)),W},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=$h++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=b,this.fragmentShader=w,this}var Su=0,yu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const n=this._getShaderCacheForMaterial(e);return n.has(t)===!1&&(n.add(t),t.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Eu(e),t.set(e,i)),i}},Eu=class{constructor(e){this.id=Su++,this.code=e,this.usedTimes=0}};function Tu(e){return e===1030||e===37490||e===36285}function bu(e,t,i,n,r,s){const a=new $s,o=new yu,c=new Set,l=[],u=new Map,d=n.logarithmicDepthBuffer;let h=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(v){return c.add(v),v===0?"uv":`uv${v}`}function y(v,E,W,T,z,H){const Y=T.fog,k=z.geometry,K=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?T.environment:null,N=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,j=t.get(v.envMap||K,N),ee=j&&j.mapping===306?j.image.height:null,ne=p[v.type];v.precision!==null&&(h=n.getMaxPrecision(v.precision),h!==v.precision&&be("WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const fe=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ye=fe!==void 0?fe.length:0;let tt=0;k.morphAttributes.position!==void 0&&(tt=1),k.morphAttributes.normal!==void 0&&(tt=2),k.morphAttributes.color!==void 0&&(tt=3);let Ze,X,se,me;if(ne){const we=ti[ne];Ze=we.vertexShader,X=we.fragmentShader}else{Ze=v.vertexShader,X=v.fragmentShader;const we=o.getVertexShaderStage(v),Tt=o.getFragmentShaderStage(v);o.update(v,we,Tt),se=we.id,me=Tt.id}const ue=e.getRenderTarget(),Ae=e.state.buffers.depth.getReversed(),Ce=z.isInstancedMesh===!0,Ie=z.isBatchedMesh===!0,Xe=!!v.map,Ve=!!v.matcap,Qe=!!j,gt=!!v.aoMap,Ct=!!v.lightMap,Bt=!!v.bumpMap&&v.wireframe===!1,je=!!v.normalMap,vt=!!v.displacementMap,pt=!!v.emissiveMap,dt=!!v.metalnessMap,L=!!v.roughnessMap,zt=v.anisotropy>0,qe=v.clearcoat>0,et=v.dispersion>0,M=v.iridescence>0,g=v.sheen>0,C=v.transmission>0,G=zt&&!!v.anisotropyMap,Z=qe&&!!v.clearcoatMap,ie=qe&&!!v.clearcoatNormalMap,oe=qe&&!!v.clearcoatRoughnessMap,U=M&&!!v.iridescenceMap,te=M&&!!v.iridescenceThicknessMap,pe=g&&!!v.sheenColorMap,xe=g&&!!v.sheenRoughnessMap,Q=!!v.specularMap,Se=!!v.specularColorMap,Ee=!!v.specularIntensityMap,Le=C&&!!v.transmissionMap,ke=C&&!!v.thicknessMap,I=!!v.gradientMap,q=!!v.alphaMap,$=v.alphaTest>0,de=!!v.alphaHash,_e=!!v.extensions;let J=0;v.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(J=e.toneMapping);const le={shaderID:ne,shaderType:v.type,shaderName:v.name,vertexShader:Ze,fragmentShader:X,defines:v.defines,customVertexShaderID:se,customFragmentShaderID:me,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:Ie,batchingColor:Ie&&z._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&z.instanceColor!==null,instancingMorph:Ce&&z.morphTexture!==null,outputColorSpace:ue===null?e.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:ze.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Xe,matcap:Ve,envMap:Qe,envMapMode:Qe&&j.mapping,envMapCubeUVHeight:ee,aoMap:gt,lightMap:Ct,bumpMap:Bt,normalMap:je,displacementMap:vt,emissiveMap:pt,normalMapObjectSpace:je&&v.normalMapType===1,normalMapTangentSpace:je&&v.normalMapType===0,packedNormalMap:je&&v.normalMapType===0&&Tu(v.normalMap.format),metalnessMap:dt,roughnessMap:L,anisotropy:zt,anisotropyMap:G,clearcoat:qe,clearcoatMap:Z,clearcoatNormalMap:ie,clearcoatRoughnessMap:oe,dispersion:et,iridescence:M,iridescenceMap:U,iridescenceThicknessMap:te,sheen:g,sheenColorMap:pe,sheenRoughnessMap:xe,specularMap:Q,specularColorMap:Se,specularIntensityMap:Ee,transmission:C,transmissionMap:Le,thicknessMap:ke,gradientMap:I,opaque:v.transparent===!1&&v.blending===1&&v.alphaToCoverage===!1,alphaMap:q,alphaTest:$,alphaHash:de,combine:v.combine,mapUv:Xe&&x(v.map.channel),aoMapUv:gt&&x(v.aoMap.channel),lightMapUv:Ct&&x(v.lightMap.channel),bumpMapUv:Bt&&x(v.bumpMap.channel),normalMapUv:je&&x(v.normalMap.channel),displacementMapUv:vt&&x(v.displacementMap.channel),emissiveMapUv:pt&&x(v.emissiveMap.channel),metalnessMapUv:dt&&x(v.metalnessMap.channel),roughnessMapUv:L&&x(v.roughnessMap.channel),anisotropyMapUv:G&&x(v.anisotropyMap.channel),clearcoatMapUv:Z&&x(v.clearcoatMap.channel),clearcoatNormalMapUv:ie&&x(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&x(v.clearcoatRoughnessMap.channel),iridescenceMapUv:U&&x(v.iridescenceMap.channel),iridescenceThicknessMapUv:te&&x(v.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&x(v.sheenColorMap.channel),sheenRoughnessMapUv:xe&&x(v.sheenRoughnessMap.channel),specularMapUv:Q&&x(v.specularMap.channel),specularColorMapUv:Se&&x(v.specularColorMap.channel),specularIntensityMapUv:Ee&&x(v.specularIntensityMap.channel),transmissionMapUv:Le&&x(v.transmissionMap.channel),thicknessMapUv:ke&&x(v.thicknessMap.channel),alphaMapUv:q&&x(v.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(je||zt),vertexNormals:!!k.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!k.attributes.uv&&(Xe||q),fog:!!Y,useFog:v.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||k.attributes.normal===void 0&&je===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ae,skinning:z.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:tt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:H.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:e.shadowMap.enabled&&W.length>0,shadowMapType:e.shadowMap.type,toneMapping:J,decodeVideoTexture:Xe&&v.map.isVideoTexture===!0&&ze.getTransfer(v.map.colorSpace)==="srgb",decodeVideoTextureEmissive:pt&&v.emissiveMap.isVideoTexture===!0&&ze.getTransfer(v.emissiveMap.colorSpace)==="srgb",premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===2,flipSided:v.side===1,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:_e&&v.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&v.extensions.multiDraw===!0||Ie)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return le.vertexUv1s=c.has(1),le.vertexUv2s=c.has(2),le.vertexUv3s=c.has(3),c.clear(),le}function m(v){const E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(const W in v.defines)E.push(W),E.push(v.defines[W]);return v.isRawShaderMaterial===!1&&(f(E,v),R(E,v),E.push(e.outputColorSpace)),E.push(v.customProgramCacheKey),E.join()}function f(v,E){v.push(E.precision),v.push(E.outputColorSpace),v.push(E.envMapMode),v.push(E.envMapCubeUVHeight),v.push(E.mapUv),v.push(E.alphaMapUv),v.push(E.lightMapUv),v.push(E.aoMapUv),v.push(E.bumpMapUv),v.push(E.normalMapUv),v.push(E.displacementMapUv),v.push(E.emissiveMapUv),v.push(E.metalnessMapUv),v.push(E.roughnessMapUv),v.push(E.anisotropyMapUv),v.push(E.clearcoatMapUv),v.push(E.clearcoatNormalMapUv),v.push(E.clearcoatRoughnessMapUv),v.push(E.iridescenceMapUv),v.push(E.iridescenceThicknessMapUv),v.push(E.sheenColorMapUv),v.push(E.sheenRoughnessMapUv),v.push(E.specularMapUv),v.push(E.specularColorMapUv),v.push(E.specularIntensityMapUv),v.push(E.transmissionMapUv),v.push(E.thicknessMapUv),v.push(E.combine),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.morphAttributeCount),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.numLightProbes),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function R(v,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function A(v){const E=p[v.type];let W;if(E){const T=ti[E];W=ic.clone(T.uniforms)}else W=v.uniforms;return W}function S(v,E){let W=u.get(E);return W!==void 0?++W.usedTimes:(W=new Mu(e,E,v,r),l.push(W),u.set(E,W)),W}function b(v){if(--v.usedTimes===0){const E=l.indexOf(v);l[E]=l[l.length-1],l.pop(),u.delete(v.cacheKey),v.destroy()}}function w(v){o.remove(v)}function P(){o.dispose()}return{getParameters:y,getProgramCacheKey:m,getUniforms:A,acquireProgram:S,releaseProgram:b,releaseShaderCache:w,programs:l,dispose:P}}function Au(){let e=new WeakMap;function t(a){return e.has(a)}function i(a){let o=e.get(a);return o===void 0&&(o={},e.set(a,o)),o}function n(a){e.delete(a)}function r(a,o,c){e.get(a)[o]=c}function s(){e=new WeakMap}return{has:t,get:i,remove:n,update:r,dispose:s}}function wu(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function Ya(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Ka(){const e=[];let t=0;const i=[],n=[],r=[];function s(){t=0,i.length=0,n.length=0,r.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,x,y,m,f){let R=e[t];return R===void 0?(R={id:h.id,object:h,geometry:p,material:x,materialVariant:a(h),groupOrder:y,renderOrder:h.renderOrder,z:m,group:f},e[t]=R):(R.id=h.id,R.object=h,R.geometry=p,R.material=x,R.materialVariant=a(h),R.groupOrder=y,R.renderOrder=h.renderOrder,R.z=m,R.group=f),t++,R}function c(h,p,x,y,m,f){const R=o(h,p,x,y,m,f);x.transmission>0?n.push(R):x.transparent===!0?r.push(R):i.push(R)}function l(h,p,x,y,m,f){const R=o(h,p,x,y,m,f);x.transmission>0?n.unshift(R):x.transparent===!0?r.unshift(R):i.unshift(R)}function u(h,p,x){i.length>1&&i.sort(h||wu),n.length>1&&n.sort(p||Ya),r.length>1&&r.sort(p||Ya),x&&(i.reverse(),n.reverse(),r.reverse())}function d(){for(let h=t,p=e.length;h<p;h++){const x=e[h];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:i,transmissive:n,transparent:r,init:s,push:c,unshift:l,finish:d,sort:u}}function Ru(){let e=new WeakMap;function t(n,r){const s=e.get(n);let a;return s===void 0?(a=new Ka,e.set(n,[a])):r>=s.length?(a=new Ka,s.push(a)):a=s[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}function Cu(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new B,color:new Oe};break;case"SpotLight":i={position:new B,direction:new B,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new B,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":i={direction:new B,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":i={color:new Oe,position:new B,halfWidth:new B,halfHeight:new B}}return e[t.id]=i,i}}}function Pu(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=i,i}}}var Iu=0;function Lu(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function Uu(e){const t=new Cu,i=Pu(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new B);const r=new B,s=new ot,a=new ot;function o(l){let u=0,d=0,h=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let p=0,x=0,y=0,m=0,f=0,R=0,A=0,S=0,b=0,w=0,P=0;l.sort(Lu);for(let E=0,W=l.length;E<W;E++){const T=l[E],z=T.color,H=T.intensity,Y=T.distance;let k=null;if(T.shadow&&T.shadow.map&&(T.shadow.map.texture.format===1030?k=T.shadow.map.texture:k=T.shadow.map.depthTexture||T.shadow.map.texture),T.isAmbientLight)u+=z.r*H,d+=z.g*H,h+=z.b*H;else if(T.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(T.sh.coefficients[K],H);P++}else if(T.isDirectionalLight){const K=t.get(T);if(K.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const N=T.shadow,j=i.get(T);j.shadowIntensity=N.intensity,j.shadowBias=N.bias,j.shadowNormalBias=N.normalBias,j.shadowRadius=N.radius,j.shadowMapSize=N.mapSize,n.directionalShadow[p]=j,n.directionalShadowMap[p]=k,n.directionalShadowMatrix[p]=T.shadow.matrix,R++}n.directional[p]=K,p++}else if(T.isSpotLight){const K=t.get(T);K.position.setFromMatrixPosition(T.matrixWorld),K.color.copy(z).multiplyScalar(H),K.distance=Y,K.coneCos=Math.cos(T.angle),K.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),K.decay=T.decay,n.spot[y]=K;const N=T.shadow;if(T.map&&(n.spotLightMap[b]=T.map,b++,N.updateMatrices(T),T.castShadow&&w++),n.spotLightMatrix[y]=N.matrix,T.castShadow){const j=i.get(T);j.shadowIntensity=N.intensity,j.shadowBias=N.bias,j.shadowNormalBias=N.normalBias,j.shadowRadius=N.radius,j.shadowMapSize=N.mapSize,n.spotShadow[y]=j,n.spotShadowMap[y]=k,S++}y++}else if(T.isRectAreaLight){const K=t.get(T);K.color.copy(z).multiplyScalar(H),K.halfWidth.set(T.width*.5,0,0),K.halfHeight.set(0,T.height*.5,0),n.rectArea[m]=K,m++}else if(T.isPointLight){const K=t.get(T);if(K.color.copy(T.color).multiplyScalar(T.intensity),K.distance=T.distance,K.decay=T.decay,T.castShadow){const N=T.shadow,j=i.get(T);j.shadowIntensity=N.intensity,j.shadowBias=N.bias,j.shadowNormalBias=N.normalBias,j.shadowRadius=N.radius,j.shadowMapSize=N.mapSize,j.shadowCameraNear=N.camera.near,j.shadowCameraFar=N.camera.far,n.pointShadow[x]=j,n.pointShadowMap[x]=k,n.pointShadowMatrix[x]=T.shadow.matrix,A++}n.point[x]=K,x++}else if(T.isHemisphereLight){const K=t.get(T);K.skyColor.copy(T.color).multiplyScalar(H),K.groundColor.copy(T.groundColor).multiplyScalar(H),n.hemi[f]=K,f++}}m>0&&(e.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ae.LTC_FLOAT_1,n.rectAreaLTC2=ae.LTC_FLOAT_2):(n.rectAreaLTC1=ae.LTC_HALF_1,n.rectAreaLTC2=ae.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const v=n.hash;(v.directionalLength!==p||v.pointLength!==x||v.spotLength!==y||v.rectAreaLength!==m||v.hemiLength!==f||v.numDirectionalShadows!==R||v.numPointShadows!==A||v.numSpotShadows!==S||v.numSpotMaps!==b||v.numLightProbes!==P)&&(n.directional.length=p,n.spot.length=y,n.rectArea.length=m,n.point.length=x,n.hemi.length=f,n.directionalShadow.length=R,n.directionalShadowMap.length=R,n.pointShadow.length=A,n.pointShadowMap.length=A,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=R,n.pointShadowMatrix.length=A,n.spotLightMatrix.length=S+b-w,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=P,v.directionalLength=p,v.pointLength=x,v.spotLength=y,v.rectAreaLength=m,v.hemiLength=f,v.numDirectionalShadows=R,v.numPointShadows=A,v.numSpotShadows=S,v.numSpotMaps=b,v.numLightProbes=P,n.version=Iu++)}function c(l,u){let d=0,h=0,p=0,x=0,y=0;const m=u.matrixWorldInverse;for(let f=0,R=l.length;f<R;f++){const A=l[f];if(A.isDirectionalLight){const S=n.directional[d];S.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),d++}else if(A.isSpotLight){const S=n.spot[p];S.position.setFromMatrixPosition(A.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),p++}else if(A.isRectAreaLight){const S=n.rectArea[x];S.position.setFromMatrixPosition(A.matrixWorld),S.position.applyMatrix4(m),a.identity(),s.copy(A.matrixWorld),s.premultiply(m),a.extractRotation(s),S.halfWidth.set(A.width*.5,0,0),S.halfHeight.set(0,A.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),x++}else if(A.isPointLight){const S=n.point[h];S.position.setFromMatrixPosition(A.matrixWorld),S.position.applyMatrix4(m),h++}else if(A.isHemisphereLight){const S=n.hemi[y];S.direction.setFromMatrixPosition(A.matrixWorld),S.direction.transformDirection(m),y++}}}return{setup:o,setupView:c,state:n}}function Za(e){const t=new Uu(e),i=[],n=[],r=[];function s(h){d.camera=h,i.length=0,n.length=0,r.length=0}function a(h){i.push(h)}function o(h){n.push(h)}function c(h){r.push(h)}function l(){t.setup(i)}function u(h){t.setupView(i,h)}const d={lightsArray:i,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Du(e){let t=new WeakMap;function i(r,s=0){const a=t.get(r);let o;return a===void 0?(o=new Za(e),t.set(r,[o])):s>=a.length?(o=new Za(e),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:i,dispose:n}}var Nu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ou=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Fu=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],Bu=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],$a=new ot,Rn=new B,us=new B;function zu(e,t,i){let n=new jr;const r=new Ge,s=new Ge,a=new nt,o=new ac,c=new oc,l={},u=i.maxTextureSize,d={0:1,1:0,2:2},h=new Qt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ge},radius:{value:4}},vertexShader:Nu,fragmentShader:Ou}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const x=new xi;x.setAttribute("position",new Jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new wt(x,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let f=this.type;this.render=function(w,P,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===2&&(be("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=1);const E=e.getRenderTarget(),W=e.getActiveCubeFace(),T=e.getActiveMipmapLevel(),z=e.state;z.setBlending(0),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const H=f!==this.type;H&&P.traverse(function(Y){Y.material&&(Array.isArray(Y.material)?Y.material.forEach(k=>k.needsUpdate=!0):Y.material.needsUpdate=!0)});for(let Y=0,k=w.length;Y<k;Y++){const K=w[Y],N=K.shadow;if(N===void 0){be("WebGLShadowMap:",K,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;r.copy(N.mapSize);const j=N.getFrameExtents();r.multiply(j),s.copy(N.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/j.x),r.x=s.x*j.x,N.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/j.y),r.y=s.y*j.y,N.mapSize.y=s.y));const ee=e.state.buffers.depth.getReversed();if(N.camera._reversedDepth=ee,N.map===null||H===!0){if(N.map!==null&&(N.map.depthTexture!==null&&(N.map.depthTexture.dispose(),N.map.depthTexture=null),N.map.dispose()),this.type===3){if(K.isPointLight){be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}N.map=new $t(r.x,r.y,{format:Dn,type:Ai,minFilter:Pt,magFilter:Pt,generateMipmaps:!1}),N.map.texture.name=K.name+".shadowMap",N.map.depthTexture=new Qi(r.x,r.y,Un),N.map.depthTexture.name=K.name+".shadowMapDepth",N.map.depthTexture.format=pn,N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=St,N.map.depthTexture.magFilter=St}else K.isPointLight?(N.map=new Ca(r.x),N.map.depthTexture=new Ql(r.x,bi)):(N.map=new $t(r.x,r.y),N.map.depthTexture=new Qi(r.x,r.y,bi)),N.map.depthTexture.name=K.name+".shadowMap",N.map.depthTexture.format=pn,this.type===1?(N.map.depthTexture.compareFunction=ee?518:515,N.map.depthTexture.minFilter=Pt,N.map.depthTexture.magFilter=Pt):(N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=St,N.map.depthTexture.magFilter=St);N.camera.updateProjectionMatrix()}const ne=N.map.isWebGLCubeRenderTarget?6:1;for(let fe=0;fe<ne;fe++){if(N.map.isWebGLCubeRenderTarget)e.setRenderTarget(N.map,fe),e.clear();else{fe===0&&(e.setRenderTarget(N.map),e.clear());const ye=N.getViewport(fe);a.set(s.x*ye.x,s.y*ye.y,s.x*ye.z,s.y*ye.w),z.viewport(a)}if(K.isPointLight){const ye=N.camera,tt=N.matrix,Ze=K.distance||ye.far;Ze!==ye.far&&(ye.far=Ze,ye.updateProjectionMatrix()),Rn.setFromMatrixPosition(K.matrixWorld),ye.position.copy(Rn),us.copy(ye.position),us.add(Fu[fe]),ye.up.copy(Bu[fe]),ye.lookAt(us),ye.updateMatrixWorld(),tt.makeTranslation(-Rn.x,-Rn.y,-Rn.z),$a.multiplyMatrices(ye.projectionMatrix,ye.matrixWorldInverse),N._frustum.setFromProjectionMatrix($a,ye.coordinateSystem,ye.reversedDepth)}else N.updateMatrices(K);n=N.getFrustum(),S(P,v,N.camera,K,this.type)}N.isPointLightShadow!==!0&&this.type===3&&R(N,v),N.needsUpdate=!1}f=this.type,m.needsUpdate=!1,e.setRenderTarget(E,W,T)};function R(w,P){const v=t.update(y);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new $t(r.x,r.y,{format:Dn,type:Ai})),h.uniforms.shadow_pass.value=w.map.depthTexture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,e.setRenderTarget(w.mapPass),e.clear(),e.renderBufferDirect(P,null,v,h,y,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,e.setRenderTarget(w.map),e.clear(),e.renderBufferDirect(P,null,v,p,y,null)}function A(w,P,v,E){let W=null;const T=v.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(T!==void 0)W=T;else if(W=v.isPointLight===!0?c:o,e.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const z=W.uuid,H=P.uuid;let Y=l[z];Y===void 0&&(Y={},l[z]=Y);let k=Y[H];k===void 0&&(k=W.clone(),Y[H]=k,P.addEventListener("dispose",b)),W=k}if(W.visible=P.visible,W.wireframe=P.wireframe,E===3?W.side=P.shadowSide!==null?P.shadowSide:P.side:W.side=P.shadowSide!==null?P.shadowSide:d[P.side],W.alphaMap=P.alphaMap,W.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,W.map=P.map,W.clipShadows=P.clipShadows,W.clippingPlanes=P.clippingPlanes,W.clipIntersection=P.clipIntersection,W.displacementMap=P.displacementMap,W.displacementScale=P.displacementScale,W.displacementBias=P.displacementBias,W.wireframeLinewidth=P.wireframeLinewidth,W.linewidth=P.linewidth,v.isPointLight===!0&&W.isMeshDistanceMaterial===!0){const z=e.properties.get(W);z.light=v}return W}function S(w,P,v,E,W){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&W===3)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,w.matrixWorld);const z=t.update(w),H=w.material;if(Array.isArray(H)){const Y=z.groups;for(let k=0,K=Y.length;k<K;k++){const N=Y[k],j=H[N.materialIndex];if(j&&j.visible){const ee=A(w,j,E,W);w.onBeforeShadow(e,w,P,v,z,ee,N),e.renderBufferDirect(v,null,z,ee,w,N),w.onAfterShadow(e,w,P,v,z,ee,N)}}}else if(H.visible){const Y=A(w,H,E,W);w.onBeforeShadow(e,w,P,v,z,Y,null),e.renderBufferDirect(v,null,z,Y,w,null),w.onAfterShadow(e,w,P,v,z,Y,null)}}const T=w.children;for(let z=0,H=T.length;z<H;z++)S(T[z],P,v,E,W)}function b(w){w.target.removeEventListener("dispose",b);for(const P in l){const v=l[P],E=w.target.uuid;E in v&&(v[E].dispose(),delete v[E])}}}function Vu(e,t){function i(){let I=!1;const q=new nt;let $=null;const de=new nt(0,0,0,0);return{setMask:function(_e){$!==_e&&!I&&(e.colorMask(_e,_e,_e,_e),$=_e)},setLocked:function(_e){I=_e},setClear:function(_e,J,le,we,Tt){Tt===!0&&(_e*=we,J*=we,le*=we),q.set(_e,J,le,we),de.equals(q)===!1&&(e.clearColor(_e,J,le,we),de.copy(q))},reset:function(){I=!1,$=null,de.set(-1,0,0,0)}}}function n(){let I=!1,q=!1,$=null,de=null,_e=null;return{setReversed:function(J){if(q!==J){const le=t.get("EXT_clip_control");J?le.clipControlEXT(le.LOWER_LEFT_EXT,le.ZERO_TO_ONE_EXT):le.clipControlEXT(le.LOWER_LEFT_EXT,le.NEGATIVE_ONE_TO_ONE_EXT),q=J;const we=_e;_e=null,this.setClear(we)}},getReversed:function(){return q},setTest:function(J){J?ue(e.DEPTH_TEST):Ae(e.DEPTH_TEST)},setMask:function(J){$!==J&&!I&&(e.depthMask(J),$=J)},setFunc:function(J){if(q&&(J=bl[J]),de!==J){switch(J){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}de=J}},setLocked:function(J){I=J},setClear:function(J){_e!==J&&(_e=J,q&&(J=1-J),e.clearDepth(J))},reset:function(){I=!1,$=null,de=null,_e=null,q=!1}}}function r(){let I=!1,q=null,$=null,de=null,_e=null,J=null,le=null,we=null,Tt=null;return{setTest:function($e){I||($e?ue(e.STENCIL_TEST):Ae(e.STENCIL_TEST))},setMask:function($e){q!==$e&&!I&&(e.stencilMask($e),q=$e)},setFunc:function($e,ni,di){($!==$e||de!==ni||_e!==di)&&(e.stencilFunc($e,ni,di),$=$e,de=ni,_e=di)},setOp:function($e,ni,di){(J!==$e||le!==ni||we!==di)&&(e.stencilOp($e,ni,di),J=$e,le=ni,we=di)},setLocked:function($e){I=$e},setClear:function($e){Tt!==$e&&(e.clearStencil($e),Tt=$e)},reset:function(){I=!1,q=null,$=null,de=null,_e=null,J=null,le=null,we=null,Tt=null}}}const s=new i,a=new n,o=new r,c=new WeakMap,l=new WeakMap;let u={},d={},h={},p=new WeakMap,x=[],y=null,m=!1,f=null,R=null,A=null,S=null,b=null,w=null,P=null,v=new Oe(0,0,0),E=0,W=!1,T=null,z=null,H=null,Y=null,k=null;const K=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,j=0;const ee=e.getParameter(e.VERSION);ee.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(ee)[1]),N=j>=1):ee.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),N=j>=2);let ne=null,fe={};const ye=e.getParameter(e.SCISSOR_BOX),tt=e.getParameter(e.VIEWPORT),Ze=new nt().fromArray(ye),X=new nt().fromArray(tt);function se(I,q,$,de){const _e=new Uint8Array(4),J=e.createTexture();e.bindTexture(I,J),e.texParameteri(I,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(I,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let le=0;le<$;le++)I===e.TEXTURE_3D||I===e.TEXTURE_2D_ARRAY?e.texImage3D(q,0,e.RGBA,1,1,de,0,e.RGBA,e.UNSIGNED_BYTE,_e):e.texImage2D(q+le,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,_e);return J}const me={};me[e.TEXTURE_2D]=se(e.TEXTURE_2D,e.TEXTURE_2D,1),me[e.TEXTURE_CUBE_MAP]=se(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),me[e.TEXTURE_2D_ARRAY]=se(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),me[e.TEXTURE_3D]=se(e.TEXTURE_3D,e.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ue(e.DEPTH_TEST),a.setFunc(3),Bt(!1),je(1),ue(e.CULL_FACE),gt(0);function ue(I){u[I]!==!0&&(e.enable(I),u[I]=!0)}function Ae(I){u[I]!==!1&&(e.disable(I),u[I]=!1)}function Ce(I,q){return h[I]!==q?(e.bindFramebuffer(I,q),h[I]=q,I===e.DRAW_FRAMEBUFFER&&(h[e.FRAMEBUFFER]=q),I===e.FRAMEBUFFER&&(h[e.DRAW_FRAMEBUFFER]=q),!0):!1}function Ie(I,q){let $=x,de=!1;if(I){$=p.get(q),$===void 0&&($=[],p.set(q,$));const _e=I.textures;if($.length!==_e.length||$[0]!==e.COLOR_ATTACHMENT0){for(let J=0,le=_e.length;J<le;J++)$[J]=e.COLOR_ATTACHMENT0+J;$.length=_e.length,de=!0}}else $[0]!==e.BACK&&($[0]=e.BACK,de=!0);de&&e.drawBuffers($)}function Xe(I){return y!==I?(e.useProgram(I),y=I,!0):!1}const Ve={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};Ve[103]=e.MIN,Ve[104]=e.MAX;const Qe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function gt(I,q,$,de,_e,J,le,we,Tt,$e){if(I===0){m===!0&&(Ae(e.BLEND),m=!1);return}if(m===!1&&(ue(e.BLEND),m=!0),I!==5){if(I!==f||$e!==W){if((R!==100||b!==100)&&(e.blendEquation(e.FUNC_ADD),R=100,b=100),$e)switch(I){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Re("WebGLState: Invalid blending: ",I)}else switch(I){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:Re("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case 4:Re("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Re("WebGLState: Invalid blending: ",I)}A=null,S=null,w=null,P=null,v.set(0,0,0),E=0,f=I,W=$e}return}_e=_e||q,J=J||$,le=le||de,(q!==R||_e!==b)&&(e.blendEquationSeparate(Ve[q],Ve[_e]),R=q,b=_e),($!==A||de!==S||J!==w||le!==P)&&(e.blendFuncSeparate(Qe[$],Qe[de],Qe[J],Qe[le]),A=$,S=de,w=J,P=le),(we.equals(v)===!1||Tt!==E)&&(e.blendColor(we.r,we.g,we.b,Tt),v.copy(we),E=Tt),f=I,W=!1}function Ct(I,q){I.side===2?Ae(e.CULL_FACE):ue(e.CULL_FACE);let $=I.side===1;q&&($=!$),Bt($),I.blending===1&&I.transparent===!1?gt(0):gt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),s.setMask(I.colorWrite);const de=I.stencilWrite;o.setTest(de),de&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),pt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ue(e.SAMPLE_ALPHA_TO_COVERAGE):Ae(e.SAMPLE_ALPHA_TO_COVERAGE)}function Bt(I){T!==I&&(I?e.frontFace(e.CW):e.frontFace(e.CCW),T=I)}function je(I){I!==0?(ue(e.CULL_FACE),I!==z&&(I===1?e.cullFace(e.BACK):I===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Ae(e.CULL_FACE),z=I}function vt(I){I!==H&&(N&&e.lineWidth(I),H=I)}function pt(I,q,$){I?(ue(e.POLYGON_OFFSET_FILL),(Y!==q||k!==$)&&(Y=q,k=$,a.getReversed()&&(q=-q),e.polygonOffset(q,$))):Ae(e.POLYGON_OFFSET_FILL)}function dt(I){I?ue(e.SCISSOR_TEST):Ae(e.SCISSOR_TEST)}function L(I){I===void 0&&(I=e.TEXTURE0+K-1),ne!==I&&(e.activeTexture(I),ne=I)}function zt(I,q,$){$===void 0&&(ne===null?$=e.TEXTURE0+K-1:$=ne);let de=fe[$];de===void 0&&(de={type:void 0,texture:void 0},fe[$]=de),(de.type!==I||de.texture!==q)&&(ne!==$&&(e.activeTexture($),ne=$),e.bindTexture(I,q||me[I]),de.type=I,de.texture=q)}function qe(){const I=fe[ne];I!==void 0&&I.type!==void 0&&(e.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function et(){try{e.compressedTexImage2D(...arguments)}catch(I){Re("WebGLState:",I)}}function M(){try{e.compressedTexImage3D(...arguments)}catch(I){Re("WebGLState:",I)}}function g(){try{e.texSubImage2D(...arguments)}catch(I){Re("WebGLState:",I)}}function C(){try{e.texSubImage3D(...arguments)}catch(I){Re("WebGLState:",I)}}function G(){try{e.compressedTexSubImage2D(...arguments)}catch(I){Re("WebGLState:",I)}}function Z(){try{e.compressedTexSubImage3D(...arguments)}catch(I){Re("WebGLState:",I)}}function ie(){try{e.texStorage2D(...arguments)}catch(I){Re("WebGLState:",I)}}function oe(){try{e.texStorage3D(...arguments)}catch(I){Re("WebGLState:",I)}}function U(){try{e.texImage2D(...arguments)}catch(I){Re("WebGLState:",I)}}function te(){try{e.texImage3D(...arguments)}catch(I){Re("WebGLState:",I)}}function pe(I){return d[I]!==void 0?d[I]:e.getParameter(I)}function xe(I,q){d[I]!==q&&(e.pixelStorei(I,q),d[I]=q)}function Q(I){Ze.equals(I)===!1&&(e.scissor(I.x,I.y,I.z,I.w),Ze.copy(I))}function Se(I){X.equals(I)===!1&&(e.viewport(I.x,I.y,I.z,I.w),X.copy(I))}function Ee(I,q){let $=l.get(q);$===void 0&&($=new WeakMap,l.set(q,$));let de=$.get(I);de===void 0&&(de=e.getUniformBlockIndex(q,I.name),$.set(I,de))}function Le(I,q){const $=l.get(q).get(I);c.get(q)!==$&&(e.uniformBlockBinding(q,$,I.__bindingPointIndex),c.set(q,$))}function ke(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),a.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},ne=null,fe={},h={},p=new WeakMap,x=[],y=null,m=!1,f=null,R=null,A=null,S=null,b=null,w=null,P=null,v=new Oe(0,0,0),E=0,W=!1,T=null,z=null,H=null,Y=null,k=null,Ze.set(0,0,e.canvas.width,e.canvas.height),X.set(0,0,e.canvas.width,e.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ue,disable:Ae,bindFramebuffer:Ce,drawBuffers:Ie,useProgram:Xe,setBlending:gt,setMaterial:Ct,setFlipSided:Bt,setCullFace:je,setLineWidth:vt,setPolygonOffset:pt,setScissorTest:dt,activeTexture:L,bindTexture:zt,unbindTexture:qe,compressedTexImage2D:et,compressedTexImage3D:M,texImage2D:U,texImage3D:te,pixelStorei:xe,getParameter:pe,updateUBOMapping:Ee,uniformBlockBinding:Le,texStorage2D:ie,texStorage3D:oe,texSubImage2D:g,texSubImage3D:C,compressedTexSubImage2D:G,compressedTexSubImage3D:Z,scissor:Q,viewport:Se,reset:ke}}function Gu(e,t,i,n,r,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ge,u=new WeakMap,d=new Set;let h;const p=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(M,g){return x?new OffscreenCanvas(M,g):Bn("canvas")}function m(M,g,C){let G=1;const Z=et(M);if((Z.width>C||Z.height>C)&&(G=C/Math.max(Z.width,Z.height)),G<1)if(typeof HTMLImageElement!="undefined"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&M instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&M instanceof ImageBitmap||typeof VideoFrame!="undefined"&&M instanceof VideoFrame){const ie=Math.floor(G*Z.width),oe=Math.floor(G*Z.height);h===void 0&&(h=y(ie,oe));const U=g?y(ie,oe):h;return U.width=ie,U.height=oe,U.getContext("2d").drawImage(M,0,0,ie,oe),be("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+ie+"x"+oe+")."),U}else return"data"in M&&be("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),M;return M}function f(M){return M.generateMipmaps}function R(M){e.generateMipmap(M)}function A(M){return M.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?e.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(M,g,C,G,Z,ie=!1){if(M!==null){if(e[M]!==void 0)return e[M];be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let oe;G&&(oe=t.get("EXT_texture_norm16"),oe||be("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let U=g;if(g===e.RED&&(C===e.FLOAT&&(U=e.R32F),C===e.HALF_FLOAT&&(U=e.R16F),C===e.UNSIGNED_BYTE&&(U=e.R8),C===e.UNSIGNED_SHORT&&oe&&(U=oe.R16_EXT),C===e.SHORT&&oe&&(U=oe.R16_SNORM_EXT)),g===e.RED_INTEGER&&(C===e.UNSIGNED_BYTE&&(U=e.R8UI),C===e.UNSIGNED_SHORT&&(U=e.R16UI),C===e.UNSIGNED_INT&&(U=e.R32UI),C===e.BYTE&&(U=e.R8I),C===e.SHORT&&(U=e.R16I),C===e.INT&&(U=e.R32I)),g===e.RG&&(C===e.FLOAT&&(U=e.RG32F),C===e.HALF_FLOAT&&(U=e.RG16F),C===e.UNSIGNED_BYTE&&(U=e.RG8),C===e.UNSIGNED_SHORT&&oe&&(U=oe.RG16_EXT),C===e.SHORT&&oe&&(U=oe.RG16_SNORM_EXT)),g===e.RG_INTEGER&&(C===e.UNSIGNED_BYTE&&(U=e.RG8UI),C===e.UNSIGNED_SHORT&&(U=e.RG16UI),C===e.UNSIGNED_INT&&(U=e.RG32UI),C===e.BYTE&&(U=e.RG8I),C===e.SHORT&&(U=e.RG16I),C===e.INT&&(U=e.RG32I)),g===e.RGB_INTEGER&&(C===e.UNSIGNED_BYTE&&(U=e.RGB8UI),C===e.UNSIGNED_SHORT&&(U=e.RGB16UI),C===e.UNSIGNED_INT&&(U=e.RGB32UI),C===e.BYTE&&(U=e.RGB8I),C===e.SHORT&&(U=e.RGB16I),C===e.INT&&(U=e.RGB32I)),g===e.RGBA_INTEGER&&(C===e.UNSIGNED_BYTE&&(U=e.RGBA8UI),C===e.UNSIGNED_SHORT&&(U=e.RGBA16UI),C===e.UNSIGNED_INT&&(U=e.RGBA32UI),C===e.BYTE&&(U=e.RGBA8I),C===e.SHORT&&(U=e.RGBA16I),C===e.INT&&(U=e.RGBA32I)),g===e.RGB&&(C===e.UNSIGNED_SHORT&&oe&&(U=oe.RGB16_EXT),C===e.SHORT&&oe&&(U=oe.RGB16_SNORM_EXT),C===e.UNSIGNED_INT_5_9_9_9_REV&&(U=e.RGB9_E5),C===e.UNSIGNED_INT_10F_11F_11F_REV&&(U=e.R11F_G11F_B10F)),g===e.RGBA){const te=ie?On:ze.getTransfer(Z);C===e.FLOAT&&(U=e.RGBA32F),C===e.HALF_FLOAT&&(U=e.RGBA16F),C===e.UNSIGNED_BYTE&&(U=te==="srgb"?e.SRGB8_ALPHA8:e.RGBA8),C===e.UNSIGNED_SHORT&&oe&&(U=oe.RGBA16_EXT),C===e.SHORT&&oe&&(U=oe.RGBA16_SNORM_EXT),C===e.UNSIGNED_SHORT_4_4_4_4&&(U=e.RGBA4),C===e.UNSIGNED_SHORT_5_5_5_1&&(U=e.RGB5_A1)}return(U===e.R16F||U===e.R32F||U===e.RG16F||U===e.RG32F||U===e.RGBA16F||U===e.RGBA32F)&&t.get("EXT_color_buffer_float"),U}function b(M,g){let C;return M?g===null||g===1014||g===1020?C=e.DEPTH24_STENCIL8:g===1015?C=e.DEPTH32F_STENCIL8:g===1012&&(C=e.DEPTH24_STENCIL8,be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===1014||g===1020?C=e.DEPTH_COMPONENT24:g===1015?C=e.DEPTH_COMPONENT32F:g===1012&&(C=e.DEPTH_COMPONENT16),C}function w(M,g){return f(M)===!0||M.isFramebufferTexture&&M.minFilter!==1003&&M.minFilter!==1006?Math.log2(Math.max(g.width,g.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?g.mipmaps.length:1}function P(M){const g=M.target;g.removeEventListener("dispose",P),E(g),g.isVideoTexture&&u.delete(g),g.isHTMLTexture&&d.delete(g)}function v(M){const g=M.target;g.removeEventListener("dispose",v),T(g)}function E(M){const g=n.get(M);if(g.__webglInit===void 0)return;const C=M.source,G=p.get(C);if(G){const Z=G[g.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&W(M),Object.keys(G).length===0&&p.delete(C)}n.remove(M)}function W(M){const g=n.get(M);e.deleteTexture(g.__webglTexture);const C=M.source,G=p.get(C);delete G[g.__cacheKey],a.memory.textures--}function T(M){const g=n.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),n.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(g.__webglFramebuffer[G]))for(let Z=0;Z<g.__webglFramebuffer[G].length;Z++)e.deleteFramebuffer(g.__webglFramebuffer[G][Z]);else e.deleteFramebuffer(g.__webglFramebuffer[G]);g.__webglDepthbuffer&&e.deleteRenderbuffer(g.__webglDepthbuffer[G])}else{if(Array.isArray(g.__webglFramebuffer))for(let G=0;G<g.__webglFramebuffer.length;G++)e.deleteFramebuffer(g.__webglFramebuffer[G]);else e.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&e.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&e.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let G=0;G<g.__webglColorRenderbuffer.length;G++)g.__webglColorRenderbuffer[G]&&e.deleteRenderbuffer(g.__webglColorRenderbuffer[G]);g.__webglDepthRenderbuffer&&e.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const C=M.textures;for(let G=0,Z=C.length;G<Z;G++){const ie=n.get(C[G]);ie.__webglTexture&&(e.deleteTexture(ie.__webglTexture),a.memory.textures--),n.remove(C[G])}n.remove(M)}let z=0;function H(){z=0}function Y(){return z}function k(M){z=M}function K(){const M=z;return M>=r.maxTextures&&be("WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+r.maxTextures),z+=1,M}function N(M){const g=[];return g.push(M.wrapS),g.push(M.wrapT),g.push(M.wrapR||0),g.push(M.magFilter),g.push(M.minFilter),g.push(M.anisotropy),g.push(M.internalFormat),g.push(M.format),g.push(M.type),g.push(M.generateMipmaps),g.push(M.premultiplyAlpha),g.push(M.flipY),g.push(M.unpackAlignment),g.push(M.colorSpace),g.join()}function j(M,g){const C=n.get(M);if(M.isVideoTexture&&zt(M),M.isRenderTargetTexture===!1&&M.isExternalTexture!==!0&&M.version>0&&C.__version!==M.version){const G=M.image;if(G===null)be("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)be("WebGLRenderer: Texture marked for update but image is incomplete");else{Ae(C,M,g);return}}else M.isExternalTexture&&(C.__webglTexture=M.sourceTexture?M.sourceTexture:null);i.bindTexture(e.TEXTURE_2D,C.__webglTexture,e.TEXTURE0+g)}function ee(M,g){const C=n.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&C.__version!==M.version){Ae(C,M,g);return}else M.isExternalTexture&&(C.__webglTexture=M.sourceTexture?M.sourceTexture:null);i.bindTexture(e.TEXTURE_2D_ARRAY,C.__webglTexture,e.TEXTURE0+g)}function ne(M,g){const C=n.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&C.__version!==M.version){Ae(C,M,g);return}i.bindTexture(e.TEXTURE_3D,C.__webglTexture,e.TEXTURE0+g)}function fe(M,g){const C=n.get(M);if(M.isCubeDepthTexture!==!0&&M.version>0&&C.__version!==M.version){Ce(C,M,g);return}i.bindTexture(e.TEXTURE_CUBE_MAP,C.__webglTexture,e.TEXTURE0+g)}const ye={[xr]:e.REPEAT,[si]:e.CLAMP_TO_EDGE,[Mr]:e.MIRRORED_REPEAT},tt={[St]:e.NEAREST,[Ao]:e.NEAREST_MIPMAP_NEAREST,[wo]:e.NEAREST_MIPMAP_LINEAR,[Pt]:e.LINEAR,[Ro]:e.LINEAR_MIPMAP_NEAREST,[Sr]:e.LINEAR_MIPMAP_LINEAR},Ze={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function X(M,g){if(g.type===1015&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===1006||g.magFilter===1007||g.magFilter===1005||g.magFilter===1008||g.minFilter===1006||g.minFilter===1007||g.minFilter===1005||g.minFilter===1008)&&be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(M,e.TEXTURE_WRAP_S,ye[g.wrapS]),e.texParameteri(M,e.TEXTURE_WRAP_T,ye[g.wrapT]),(M===e.TEXTURE_3D||M===e.TEXTURE_2D_ARRAY)&&e.texParameteri(M,e.TEXTURE_WRAP_R,ye[g.wrapR]),e.texParameteri(M,e.TEXTURE_MAG_FILTER,tt[g.magFilter]),e.texParameteri(M,e.TEXTURE_MIN_FILTER,tt[g.minFilter]),g.compareFunction&&(e.texParameteri(M,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(M,e.TEXTURE_COMPARE_FUNC,Ze[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===1003||g.minFilter!==1005&&g.minFilter!==1008||g.type===1015&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){const C=t.get("EXT_texture_filter_anisotropic");e.texParameterf(M,C.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function se(M,g){let C=!1;M.__webglInit===void 0&&(M.__webglInit=!0,g.addEventListener("dispose",P));const G=g.source;let Z=p.get(G);Z===void 0&&(Z={},p.set(G,Z));const ie=N(g);if(ie!==M.__cacheKey){Z[ie]===void 0&&(Z[ie]={texture:e.createTexture(),usedTimes:0},a.memory.textures++,C=!0),Z[ie].usedTimes++;const oe=Z[M.__cacheKey];oe!==void 0&&(Z[M.__cacheKey].usedTimes--,oe.usedTimes===0&&W(g)),M.__cacheKey=ie,M.__webglTexture=Z[ie].texture}return C}function me(M,g,C){return Math.floor(Math.floor(M/C)/g)}function ue(M,g,C,G){const ie=M.updateRanges;if(ie.length===0)i.texSubImage2D(e.TEXTURE_2D,0,0,0,g.width,g.height,C,G,g.data);else{ie.sort((xe,Q)=>xe.start-Q.start);let oe=0;for(let xe=1;xe<ie.length;xe++){const Q=ie[oe],Se=ie[xe],Ee=Q.start+Q.count,Le=me(Se.start,g.width,4),ke=me(Q.start,g.width,4);Se.start<=Ee+1&&Le===ke&&me(Se.start+Se.count-1,g.width,4)===Le?Q.count=Math.max(Q.count,Se.start+Se.count-Q.start):(++oe,ie[oe]=Se)}ie.length=oe+1;const U=i.getParameter(e.UNPACK_ROW_LENGTH),te=i.getParameter(e.UNPACK_SKIP_PIXELS),pe=i.getParameter(e.UNPACK_SKIP_ROWS);i.pixelStorei(e.UNPACK_ROW_LENGTH,g.width);for(let xe=0,Q=ie.length;xe<Q;xe++){const Se=ie[xe],Ee=Math.floor(Se.start/4),Le=Math.ceil(Se.count/4),ke=Ee%g.width,I=Math.floor(Ee/g.width),q=Le,$=1;i.pixelStorei(e.UNPACK_SKIP_PIXELS,ke),i.pixelStorei(e.UNPACK_SKIP_ROWS,I),i.texSubImage2D(e.TEXTURE_2D,0,ke,I,q,$,C,G,g.data)}M.clearUpdateRanges(),i.pixelStorei(e.UNPACK_ROW_LENGTH,U),i.pixelStorei(e.UNPACK_SKIP_PIXELS,te),i.pixelStorei(e.UNPACK_SKIP_ROWS,pe)}}function Ae(M,g,C){let G=e.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(G=e.TEXTURE_2D_ARRAY),g.isData3DTexture&&(G=e.TEXTURE_3D);const Z=se(M,g),ie=g.source;i.bindTexture(G,M.__webglTexture,e.TEXTURE0+C);const oe=n.get(ie);if(ie.version!==oe.__version||Z===!0){if(i.activeTexture(e.TEXTURE0+C),!(typeof ImageBitmap!="undefined"&&g.image instanceof ImageBitmap)){const q=ze.getPrimaries(ze.workingColorSpace),$=g.colorSpace===""?null:ze.getPrimaries(g.colorSpace),de=g.colorSpace===""||q===$?e.NONE:e.BROWSER_DEFAULT_WEBGL;i.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,de)}i.pixelStorei(e.UNPACK_ALIGNMENT,g.unpackAlignment);let U=m(g.image,!1,r.maxTextureSize);U=qe(g,U);const te=s.convert(g.format,g.colorSpace),pe=s.convert(g.type);let xe=S(g.internalFormat,te,pe,g.normalized,g.colorSpace,g.isVideoTexture);X(G,g);let Q;const Se=g.mipmaps,Ee=g.isVideoTexture!==!0,Le=oe.__version===void 0||Z===!0,ke=ie.dataReady,I=w(g,U);if(g.isDepthTexture)xe=b(g.format===Us,g.type),Le&&(Ee?i.texStorage2D(e.TEXTURE_2D,1,xe,U.width,U.height):i.texImage2D(e.TEXTURE_2D,0,xe,U.width,U.height,0,te,pe,null));else if(g.isDataTexture)if(Se.length>0){Ee&&Le&&i.texStorage2D(e.TEXTURE_2D,I,xe,Se[0].width,Se[0].height);for(let q=0,$=Se.length;q<$;q++)Q=Se[q],Ee?ke&&i.texSubImage2D(e.TEXTURE_2D,q,0,0,Q.width,Q.height,te,pe,Q.data):i.texImage2D(e.TEXTURE_2D,q,xe,Q.width,Q.height,0,te,pe,Q.data);g.generateMipmaps=!1}else Ee?(Le&&i.texStorage2D(e.TEXTURE_2D,I,xe,U.width,U.height),ke&&ue(g,U,te,pe)):i.texImage2D(e.TEXTURE_2D,0,xe,U.width,U.height,0,te,pe,U.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Ee&&Le&&i.texStorage3D(e.TEXTURE_2D_ARRAY,I,xe,Se[0].width,Se[0].height,U.depth);for(let q=0,$=Se.length;q<$;q++)if(Q=Se[q],g.format!==1023)if(te!==null)if(Ee){if(ke)if(g.layerUpdates.size>0){const de=Ma(Q.width,Q.height,g.format,g.type);for(const _e of g.layerUpdates){const J=Q.data.subarray(_e*de/Q.data.BYTES_PER_ELEMENT,(_e+1)*de/Q.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,q,0,0,_e,Q.width,Q.height,1,te,J)}g.clearLayerUpdates()}else i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,q,0,0,0,Q.width,Q.height,U.depth,te,Q.data)}else i.compressedTexImage3D(e.TEXTURE_2D_ARRAY,q,xe,Q.width,Q.height,U.depth,0,Q.data,0,0);else be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ee?ke&&i.texSubImage3D(e.TEXTURE_2D_ARRAY,q,0,0,0,Q.width,Q.height,U.depth,te,pe,Q.data):i.texImage3D(e.TEXTURE_2D_ARRAY,q,xe,Q.width,Q.height,U.depth,0,te,pe,Q.data)}else{Ee&&Le&&i.texStorage2D(e.TEXTURE_2D,I,xe,Se[0].width,Se[0].height);for(let q=0,$=Se.length;q<$;q++)Q=Se[q],g.format!==1023?te!==null?Ee?ke&&i.compressedTexSubImage2D(e.TEXTURE_2D,q,0,0,Q.width,Q.height,te,Q.data):i.compressedTexImage2D(e.TEXTURE_2D,q,xe,Q.width,Q.height,0,Q.data):be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ee?ke&&i.texSubImage2D(e.TEXTURE_2D,q,0,0,Q.width,Q.height,te,pe,Q.data):i.texImage2D(e.TEXTURE_2D,q,xe,Q.width,Q.height,0,te,pe,Q.data)}else if(g.isDataArrayTexture)if(Ee){if(Le&&i.texStorage3D(e.TEXTURE_2D_ARRAY,I,xe,U.width,U.height,U.depth),ke)if(g.layerUpdates.size>0){const q=Ma(U.width,U.height,g.format,g.type);for(const $ of g.layerUpdates){const de=U.data.subarray($*q/U.data.BYTES_PER_ELEMENT,($+1)*q/U.data.BYTES_PER_ELEMENT);i.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,$,U.width,U.height,1,te,pe,de)}g.clearLayerUpdates()}else i.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,U.width,U.height,U.depth,te,pe,U.data)}else i.texImage3D(e.TEXTURE_2D_ARRAY,0,xe,U.width,U.height,U.depth,0,te,pe,U.data);else if(g.isData3DTexture)Ee?(Le&&i.texStorage3D(e.TEXTURE_3D,I,xe,U.width,U.height,U.depth),ke&&i.texSubImage3D(e.TEXTURE_3D,0,0,0,0,U.width,U.height,U.depth,te,pe,U.data)):i.texImage3D(e.TEXTURE_3D,0,xe,U.width,U.height,U.depth,0,te,pe,U.data);else if(g.isFramebufferTexture){if(Le)if(Ee)i.texStorage2D(e.TEXTURE_2D,I,xe,U.width,U.height);else{let q=U.width,$=U.height;for(let de=0;de<I;de++)i.texImage2D(e.TEXTURE_2D,de,xe,q,$,0,te,pe,null),q>>=1,$>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in e){const q=e.canvas;if(q.hasAttribute("layoutsubtree")||q.setAttribute("layoutsubtree","true"),U.parentNode!==q){q.appendChild(U),d.add(g),q.onpaint=$=>{const de=$.changedElements;for(const _e of d)de.includes(_e.image)&&(_e.needsUpdate=!0)},q.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,U);else{const de=e.RGBA,_e=e.RGBA,J=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,de,_e,J,U)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Se.length>0){if(Ee&&Le){const q=et(Se[0]);i.texStorage2D(e.TEXTURE_2D,I,xe,q.width,q.height)}for(let q=0,$=Se.length;q<$;q++)Q=Se[q],Ee?ke&&i.texSubImage2D(e.TEXTURE_2D,q,0,0,te,pe,Q):i.texImage2D(e.TEXTURE_2D,q,xe,te,pe,Q);g.generateMipmaps=!1}else if(Ee){if(Le){const q=et(U);i.texStorage2D(e.TEXTURE_2D,I,xe,q.width,q.height)}ke&&i.texSubImage2D(e.TEXTURE_2D,0,0,0,te,pe,U)}else i.texImage2D(e.TEXTURE_2D,0,xe,te,pe,U);f(g)&&R(G),oe.__version=ie.version,g.onUpdate&&g.onUpdate(g)}M.__version=g.version}function Ce(M,g,C){if(g.image.length!==6)return;const G=se(M,g),Z=g.source;i.bindTexture(e.TEXTURE_CUBE_MAP,M.__webglTexture,e.TEXTURE0+C);const ie=n.get(Z);if(Z.version!==ie.__version||G===!0){i.activeTexture(e.TEXTURE0+C);const oe=ze.getPrimaries(ze.workingColorSpace),U=g.colorSpace===""?null:ze.getPrimaries(g.colorSpace),te=g.colorSpace===""||oe===U?e.NONE:e.BROWSER_DEFAULT_WEBGL;i.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(e.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const pe=g.isCompressedTexture||g.image[0].isCompressedTexture,xe=g.image[0]&&g.image[0].isDataTexture,Q=[];for(let J=0;J<6;J++)!pe&&!xe?Q[J]=m(g.image[J],!0,r.maxCubemapSize):Q[J]=xe?g.image[J].image:g.image[J],Q[J]=qe(g,Q[J]);const Se=Q[0],Ee=s.convert(g.format,g.colorSpace),Le=s.convert(g.type),ke=S(g.internalFormat,Ee,Le,g.normalized,g.colorSpace),I=g.isVideoTexture!==!0,q=ie.__version===void 0||G===!0,$=Z.dataReady;let de=w(g,Se);X(e.TEXTURE_CUBE_MAP,g);let _e;if(pe){I&&q&&i.texStorage2D(e.TEXTURE_CUBE_MAP,de,ke,Se.width,Se.height);for(let J=0;J<6;J++){_e=Q[J].mipmaps;for(let le=0;le<_e.length;le++){const we=_e[le];g.format!==1023?Ee!==null?I?$&&i.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,0,0,we.width,we.height,Ee,we.data):i.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,ke,we.width,we.height,0,we.data):be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?$&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,0,0,we.width,we.height,Ee,Le,we.data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,ke,we.width,we.height,0,Ee,Le,we.data)}}}else{if(_e=g.mipmaps,I&&q){_e.length>0&&de++;const J=et(Q[0]);i.texStorage2D(e.TEXTURE_CUBE_MAP,de,ke,J.width,J.height)}for(let J=0;J<6;J++)if(xe){I?$&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Q[J].width,Q[J].height,Ee,Le,Q[J].data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,ke,Q[J].width,Q[J].height,0,Ee,Le,Q[J].data);for(let le=0;le<_e.length;le++){const we=_e[le].image[J].image;I?$&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,0,0,we.width,we.height,Ee,Le,we.data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,ke,we.width,we.height,0,Ee,Le,we.data)}}else{I?$&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Ee,Le,Q[J]):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,ke,Ee,Le,Q[J]);for(let le=0;le<_e.length;le++){const we=_e[le];I?$&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,0,0,Ee,Le,we.image[J]):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,ke,Ee,Le,we.image[J])}}}f(g)&&R(e.TEXTURE_CUBE_MAP),ie.__version=Z.version,g.onUpdate&&g.onUpdate(g)}M.__version=g.version}function Ie(M,g,C,G,Z,ie){const oe=s.convert(C.format,C.colorSpace),U=s.convert(C.type),te=S(C.internalFormat,oe,U,C.normalized,C.colorSpace),pe=n.get(g),xe=n.get(C);if(xe.__renderTarget=g,!pe.__hasExternalTextures){const Q=Math.max(1,g.width>>ie),Se=Math.max(1,g.height>>ie);Z===e.TEXTURE_3D||Z===e.TEXTURE_2D_ARRAY?i.texImage3D(Z,ie,te,Q,Se,g.depth,0,oe,U,null):i.texImage2D(Z,ie,te,Q,Se,0,oe,U,null)}i.bindFramebuffer(e.FRAMEBUFFER,M),L(g)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,G,Z,xe.__webglTexture,0,dt(g)):(Z===e.TEXTURE_2D||Z>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,G,Z,xe.__webglTexture,ie),i.bindFramebuffer(e.FRAMEBUFFER,null)}function Xe(M,g,C){if(e.bindRenderbuffer(e.RENDERBUFFER,M),g.depthBuffer){const G=g.depthTexture,Z=G&&G.isDepthTexture?G.type:null,ie=b(g.stencilBuffer,Z),oe=g.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;L(g)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,dt(g),ie,g.width,g.height):C?e.renderbufferStorageMultisample(e.RENDERBUFFER,dt(g),ie,g.width,g.height):e.renderbufferStorage(e.RENDERBUFFER,ie,g.width,g.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,oe,e.RENDERBUFFER,M)}else{const G=g.textures;for(let Z=0;Z<G.length;Z++){const ie=G[Z],oe=s.convert(ie.format,ie.colorSpace),U=s.convert(ie.type),te=S(ie.internalFormat,oe,U,ie.normalized,ie.colorSpace);L(g)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,dt(g),te,g.width,g.height):C?e.renderbufferStorageMultisample(e.RENDERBUFFER,dt(g),te,g.width,g.height):e.renderbufferStorage(e.RENDERBUFFER,te,g.width,g.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ve(M,g,C){const G=g.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(e.FRAMEBUFFER,M),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=n.get(g.depthTexture);if(Z.__renderTarget=g,(!Z.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),G){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,g.depthTexture.addEventListener("dispose",P)),Z.__webglTexture===void 0){Z.__webglTexture=e.createTexture(),i.bindTexture(e.TEXTURE_CUBE_MAP,Z.__webglTexture),X(e.TEXTURE_CUBE_MAP,g.depthTexture);const pe=s.convert(g.depthTexture.format),xe=s.convert(g.depthTexture.type);let Q;g.depthTexture.format===1026?Q=e.DEPTH_COMPONENT24:g.depthTexture.format===1027&&(Q=e.DEPTH24_STENCIL8);for(let Se=0;Se<6;Se++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,Q,g.width,g.height,0,pe,xe,null)}}else j(g.depthTexture,0);const ie=Z.__webglTexture,oe=dt(g),U=G?e.TEXTURE_CUBE_MAP_POSITIVE_X+C:e.TEXTURE_2D,te=g.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(g.depthTexture.format===1026)L(g)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,te,U,ie,0,oe):e.framebufferTexture2D(e.FRAMEBUFFER,te,U,ie,0);else if(g.depthTexture.format===1027)L(g)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,te,U,ie,0,oe):e.framebufferTexture2D(e.FRAMEBUFFER,te,U,ie,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Qe(M){const g=n.get(M),C=M.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==M.depthTexture){const G=M.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),G){const Z=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,G.removeEventListener("dispose",Z)};G.addEventListener("dispose",Z),g.__depthDisposeCallback=Z}g.__boundDepthTexture=G}if(M.depthTexture&&!g.__autoAllocateDepthBuffer)if(C)for(let G=0;G<6;G++)Ve(g.__webglFramebuffer[G],M,G);else{const G=M.texture.mipmaps;G&&G.length>0?Ve(g.__webglFramebuffer[0],M,0):Ve(g.__webglFramebuffer,M,0)}else if(C){g.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(i.bindFramebuffer(e.FRAMEBUFFER,g.__webglFramebuffer[G]),g.__webglDepthbuffer[G]===void 0)g.__webglDepthbuffer[G]=e.createRenderbuffer(),Xe(g.__webglDepthbuffer[G],M,!1);else{const Z=M.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ie=g.__webglDepthbuffer[G];e.bindRenderbuffer(e.RENDERBUFFER,ie),e.framebufferRenderbuffer(e.FRAMEBUFFER,Z,e.RENDERBUFFER,ie)}}else{const G=M.texture.mipmaps;if(G&&G.length>0?i.bindFramebuffer(e.FRAMEBUFFER,g.__webglFramebuffer[0]):i.bindFramebuffer(e.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=e.createRenderbuffer(),Xe(g.__webglDepthbuffer,M,!1);else{const Z=M.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ie=g.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,ie),e.framebufferRenderbuffer(e.FRAMEBUFFER,Z,e.RENDERBUFFER,ie)}}i.bindFramebuffer(e.FRAMEBUFFER,null)}function gt(M,g,C){const G=n.get(M);g!==void 0&&Ie(G.__webglFramebuffer,M,M.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),C!==void 0&&Qe(M)}function Ct(M){const g=M.texture,C=n.get(M),G=n.get(g);M.addEventListener("dispose",v);const Z=M.textures,ie=M.isWebGLCubeRenderTarget===!0,oe=Z.length>1;if(oe||(G.__webglTexture===void 0&&(G.__webglTexture=e.createTexture()),G.__version=g.version,a.memory.textures++),ie){C.__webglFramebuffer=[];for(let U=0;U<6;U++)if(g.mipmaps&&g.mipmaps.length>0){C.__webglFramebuffer[U]=[];for(let te=0;te<g.mipmaps.length;te++)C.__webglFramebuffer[U][te]=e.createFramebuffer()}else C.__webglFramebuffer[U]=e.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){C.__webglFramebuffer=[];for(let U=0;U<g.mipmaps.length;U++)C.__webglFramebuffer[U]=e.createFramebuffer()}else C.__webglFramebuffer=e.createFramebuffer();if(oe)for(let U=0,te=Z.length;U<te;U++){const pe=n.get(Z[U]);pe.__webglTexture===void 0&&(pe.__webglTexture=e.createTexture(),a.memory.textures++)}if(M.samples>0&&L(M)===!1){C.__webglMultisampledFramebuffer=e.createFramebuffer(),C.__webglColorRenderbuffer=[],i.bindFramebuffer(e.FRAMEBUFFER,C.__webglMultisampledFramebuffer);for(let U=0;U<Z.length;U++){const te=Z[U];C.__webglColorRenderbuffer[U]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,C.__webglColorRenderbuffer[U]);const pe=s.convert(te.format,te.colorSpace),xe=s.convert(te.type),Q=S(te.internalFormat,pe,xe,te.normalized,te.colorSpace,M.isXRRenderTarget===!0),Se=dt(M);e.renderbufferStorageMultisample(e.RENDERBUFFER,Se,Q,M.width,M.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+U,e.RENDERBUFFER,C.__webglColorRenderbuffer[U])}e.bindRenderbuffer(e.RENDERBUFFER,null),M.depthBuffer&&(C.__webglDepthRenderbuffer=e.createRenderbuffer(),Xe(C.__webglDepthRenderbuffer,M,!0)),i.bindFramebuffer(e.FRAMEBUFFER,null)}}if(ie){i.bindTexture(e.TEXTURE_CUBE_MAP,G.__webglTexture),X(e.TEXTURE_CUBE_MAP,g);for(let U=0;U<6;U++)if(g.mipmaps&&g.mipmaps.length>0)for(let te=0;te<g.mipmaps.length;te++)Ie(C.__webglFramebuffer[U][te],M,g,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+U,te);else Ie(C.__webglFramebuffer[U],M,g,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+U,0);f(g)&&R(e.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(oe){for(let U=0,te=Z.length;U<te;U++){const pe=Z[U],xe=n.get(pe);let Q=e.TEXTURE_2D;(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(Q=M.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),i.bindTexture(Q,xe.__webglTexture),X(Q,pe),Ie(C.__webglFramebuffer,M,pe,e.COLOR_ATTACHMENT0+U,Q,0),f(pe)&&R(Q)}i.unbindTexture()}else{let U=e.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(U=M.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),i.bindTexture(U,G.__webglTexture),X(U,g),g.mipmaps&&g.mipmaps.length>0)for(let te=0;te<g.mipmaps.length;te++)Ie(C.__webglFramebuffer[te],M,g,e.COLOR_ATTACHMENT0,U,te);else Ie(C.__webglFramebuffer,M,g,e.COLOR_ATTACHMENT0,U,0);f(g)&&R(U),i.unbindTexture()}M.depthBuffer&&Qe(M)}function Bt(M){const g=M.textures;for(let C=0,G=g.length;C<G;C++){const Z=g[C];if(f(Z)){const ie=A(M),oe=n.get(Z).__webglTexture;i.bindTexture(ie,oe),R(ie),i.unbindTexture()}}}const je=[],vt=[];function pt(M){if(M.samples>0){if(L(M)===!1){const g=M.textures,C=M.width,G=M.height;let Z=e.COLOR_BUFFER_BIT;const ie=M.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,oe=n.get(M),U=g.length>1;if(U)for(let pe=0;pe<g.length;pe++)i.bindFramebuffer(e.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+pe,e.RENDERBUFFER,null),i.bindFramebuffer(e.FRAMEBUFFER,oe.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+pe,e.TEXTURE_2D,null,0);i.bindFramebuffer(e.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);const te=M.texture.mipmaps;te&&te.length>0?i.bindFramebuffer(e.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):i.bindFramebuffer(e.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let pe=0;pe<g.length;pe++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(Z|=e.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(Z|=e.STENCIL_BUFFER_BIT)),U){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,oe.__webglColorRenderbuffer[pe]);const xe=n.get(g[pe]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,xe,0)}e.blitFramebuffer(0,0,C,G,0,0,C,G,Z,e.NEAREST),c===!0&&(je.length=0,vt.length=0,je.push(e.COLOR_ATTACHMENT0+pe),M.depthBuffer&&M.resolveDepthBuffer===!1&&(je.push(ie),vt.push(ie),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,vt)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,je))}if(i.bindFramebuffer(e.READ_FRAMEBUFFER,null),i.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),U)for(let pe=0;pe<g.length;pe++){i.bindFramebuffer(e.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+pe,e.RENDERBUFFER,oe.__webglColorRenderbuffer[pe]);const xe=n.get(g[pe]).__webglTexture;i.bindFramebuffer(e.FRAMEBUFFER,oe.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+pe,e.TEXTURE_2D,xe,0)}i.bindFramebuffer(e.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&c){const g=M.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[g])}}}function dt(M){return Math.min(r.maxSamples,M.samples)}function L(M){const g=n.get(M);return M.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function zt(M){const g=a.render.frame;u.get(M)!==g&&(u.set(M,g),M.update())}function qe(M,g){const C=M.colorSpace,G=M.format,Z=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||C!=="srgb-linear"&&C!==""&&(ze.getTransfer(C)==="srgb"?(G!==1023||Z!==1009)&&be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Re("WebGLTextures: Unsupported texture color space:",C)),g}function et(M){return typeof HTMLImageElement!="undefined"&&M instanceof HTMLImageElement?(l.width=M.naturalWidth||M.width,l.height=M.naturalHeight||M.height):typeof VideoFrame!="undefined"&&M instanceof VideoFrame?(l.width=M.displayWidth,l.height=M.displayHeight):(l.width=M.width,l.height=M.height),l}this.allocateTextureUnit=K,this.resetTextureUnits=H,this.getTextureUnits=Y,this.setTextureUnits=k,this.setTexture2D=j,this.setTexture2DArray=ee,this.setTexture3D=ne,this.setTextureCube=fe,this.rebindTextures=gt,this.setupRenderTarget=Ct,this.updateRenderTargetMipmap=Bt,this.updateMultisampleRenderTarget=pt,this.setupDepthRenderbuffer=Qe,this.setupFrameBufferTexture=Ie,this.useMultisampledRTT=L,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function ku(e,t){function i(n,r=""){let s;const a=ze.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a==="srgb")if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===33776)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===33776)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===35840)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===36196||n===37492)return a==="srgb"?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===37496)return a==="srgb"?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return s.COMPRESSED_R11_EAC;if(n===37489)return s.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return s.COMPRESSED_RG11_EAC;if(n===37491)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===37808)return a==="srgb"?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a==="srgb"?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a==="srgb"?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a==="srgb"?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a==="srgb"?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a==="srgb"?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a==="srgb"?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a==="srgb"?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a==="srgb"?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a==="srgb"?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a==="srgb"?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a==="srgb"?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a==="srgb"?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a==="srgb"?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===36492)return a==="srgb"?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===36283)return s.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?e.UNSIGNED_INT_24_8:e[n]!==void 0?e[n]:null}return{convert:i}}var Hu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Wu=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Xu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new ua(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Qt({vertexShader:Hu,fragmentShader:Wu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new wt(new es(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},qu=class extends wi{constructor(e,t){super();const i=this;let n=null,r=1,s=null,a="local-floor",o=1,c=null,l=null,u=null,d=null,h=null,p=null;const x=typeof XRWebGLBinding!="undefined",y=new Xu,m={},f=t.getContextAttributes();let R=null,A=null;const S=[],b=[],w=new Ge;let P=null;const v=new qt;v.viewport=new nt;const E=new qt;E.viewport=new nt;const W=[v,E],T=new bc;let z=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let se=S[X];return se===void 0&&(se=new Nr,S[X]=se),se.getTargetRaySpace()},this.getControllerGrip=function(X){let se=S[X];return se===void 0&&(se=new Nr,S[X]=se),se.getGripSpace()},this.getHand=function(X){let se=S[X];return se===void 0&&(se=new Nr,S[X]=se),se.getHandSpace()};function Y(X){const se=b.indexOf(X.inputSource);if(se===-1)return;const me=S[se];me!==void 0&&(me.update(X.inputSource,X.frame,c||s),me.dispatchEvent({type:X.type,data:X.inputSource}))}function k(){n.removeEventListener("select",Y),n.removeEventListener("selectstart",Y),n.removeEventListener("selectend",Y),n.removeEventListener("squeeze",Y),n.removeEventListener("squeezestart",Y),n.removeEventListener("squeezeend",Y),n.removeEventListener("end",k),n.removeEventListener("inputsourceschange",K);for(let X=0;X<S.length;X++){const se=b[X];se!==null&&(b[X]=null,S[X].disconnect(se))}z=null,H=null,y.reset();for(const X in m)delete m[X];e.setRenderTarget(R),h=null,d=null,u=null,n=null,A=null,Ze.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,i.isPresenting===!0&&be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return d!==null?d:h},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(n,t)),u},this.getFrame=function(){return p},this.getSession=function(){return n},this.setSession=async function(X){if(n=X,n!==null){if(R=e.getRenderTarget(),n.addEventListener("select",Y),n.addEventListener("selectstart",Y),n.addEventListener("selectend",Y),n.addEventListener("squeeze",Y),n.addEventListener("squeezestart",Y),n.addEventListener("squeezeend",Y),n.addEventListener("end",k),n.addEventListener("inputsourceschange",K),f.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(w),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,me=null,ue=null;f.depth&&(ue=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=f.stencil?Us:pn,me=f.stencil?Ls:bi);const Ae={colorFormat:t.RGBA8,depthFormat:ue,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Ae),n.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),A=new $t(d.textureWidth,d.textureHeight,{format:fn,type:fi,depthTexture:new Qi(d.textureWidth,d.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:f.stencil,colorSpace:e.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const se={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(n,t,se),n.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),A=new $t(h.framebufferWidth,h.framebufferHeight,{format:fn,type:fi,colorSpace:e.outputColorSpace,stencilBuffer:f.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(o),c=null,s=await n.requestReferenceSpace(a),Ze.setContext(n),Ze.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function K(X){for(let se=0;se<X.removed.length;se++){const me=X.removed[se],ue=b.indexOf(me);ue>=0&&(b[ue]=null,S[ue].disconnect(me))}for(let se=0;se<X.added.length;se++){const me=X.added[se];let ue=b.indexOf(me);if(ue===-1){for(let Ce=0;Ce<S.length;Ce++)if(Ce>=b.length){b.push(me),ue=Ce;break}else if(b[Ce]===null){b[Ce]=me,ue=Ce;break}if(ue===-1)break}const Ae=S[ue];Ae&&Ae.connect(me)}}const N=new B,j=new B;function ee(X,se,me){N.setFromMatrixPosition(se.matrixWorld),j.setFromMatrixPosition(me.matrixWorld);const ue=N.distanceTo(j),Ae=se.projectionMatrix.elements,Ce=me.projectionMatrix.elements,Ie=Ae[14]/(Ae[10]-1),Xe=Ae[14]/(Ae[10]+1),Ve=(Ae[9]+1)/Ae[5],Qe=(Ae[9]-1)/Ae[5],gt=(Ae[8]-1)/Ae[0],Ct=(Ce[8]+1)/Ce[0],Bt=Ie*gt,je=Ie*Ct,vt=ue/(-gt+Ct),pt=vt*-gt;if(se.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(pt),X.translateZ(vt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Ae[10]===-1)X.projectionMatrix.copy(se.projectionMatrix),X.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const dt=Ie+vt,L=Xe+vt,zt=Bt-pt,qe=je+(ue-pt),et=Ve*Xe/L*dt,M=Qe*Xe/L*dt;X.projectionMatrix.makePerspective(zt,qe,et,M,dt,L),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ne(X,se){se===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(se.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(n===null)return;let se=X.near,me=X.far;y.texture!==null&&(y.depthNear>0&&(se=y.depthNear),y.depthFar>0&&(me=y.depthFar)),T.near=E.near=v.near=se,T.far=E.far=v.far=me,(z!==T.near||H!==T.far)&&(n.updateRenderState({depthNear:T.near,depthFar:T.far}),z=T.near,H=T.far),T.layers.mask=X.layers.mask|6,v.layers.mask=T.layers.mask&-5,E.layers.mask=T.layers.mask&-3;const ue=X.parent,Ae=T.cameras;ne(T,ue);for(let Ce=0;Ce<Ae.length;Ce++)ne(Ae[Ce],ue);Ae.length===2?ee(T,v,E):T.projectionMatrix.copy(v.projectionMatrix),fe(X,T,ue)};function fe(X,se,me){me===null?X.matrix.copy(se.matrixWorld):(X.matrix.copy(me.matrixWorld),X.matrix.invert(),X.matrix.multiply(se.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(se.projectionMatrix),X.projectionMatrixInverse.copy(se.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=wr*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return T},this.getFoveation=function(){if(!(d===null&&h===null))return o},this.setFoveation=function(X){o=X,d!==null&&(d.fixedFoveation=X),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=X)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(T)},this.getCameraTexture=function(X){return m[X]};let ye=null;function tt(X,se){if(l=se.getViewerPose(c||s),p=se,l!==null){const me=l.views;h!==null&&(e.setRenderTargetFramebuffer(A,h.framebuffer),e.setRenderTarget(A));let ue=!1;me.length!==T.cameras.length&&(T.cameras.length=0,ue=!0);for(let Ce=0;Ce<me.length;Ce++){const Ie=me[Ce];let Xe=null;if(h!==null)Xe=h.getViewport(Ie);else{const Qe=u.getViewSubImage(d,Ie);Xe=Qe.viewport,Ce===0&&(e.setRenderTargetTextures(A,Qe.colorTexture,Qe.depthStencilTexture),e.setRenderTarget(A))}let Ve=W[Ce];Ve===void 0&&(Ve=new qt,Ve.layers.enable(Ce),Ve.viewport=new nt,W[Ce]=Ve),Ve.matrix.fromArray(Ie.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(Ie.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(Xe.x,Xe.y,Xe.width,Xe.height),Ce===0&&(T.matrix.copy(Ve.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale)),ue===!0&&T.cameras.push(Ve)}const Ae=n.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&x){u=i.getBinding();const Ce=u.getDepthInformation(me[0]);Ce&&Ce.isValid&&Ce.texture&&y.init(Ce,n.renderState)}if(Ae&&Ae.includes("camera-access")&&x){e.state.unbindTexture(),u=i.getBinding();for(let Ce=0;Ce<me.length;Ce++){const Ie=me[Ce].camera;if(Ie){let Xe=m[Ie];Xe||(Xe=new ua,m[Ie]=Xe);const Ve=u.getCameraImage(Ie);Xe.sourceTexture=Ve}}}}for(let me=0;me<S.length;me++){const ue=b[me],Ae=S[me];ue!==null&&Ae!==void 0&&Ae.update(ue,se,c||s)}ye&&ye(X,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),p=null}const Ze=new Sa;Ze.setAnimationLoop(tt),this.setAnimationLoop=function(X){ye=X},this.dispose=function(){}}},Yu=new ot,Ja=new Ue;Ja.set(-1,0,0,0,1,0,0,0,1);function Ku(e,t){function i(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,fa(e)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,R,A,S){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(m,f):f.isMeshLambertMaterial?(s(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),u(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,S)):f.isMeshMatcapMaterial?(s(m,f),x(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),y(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,R,A):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,i(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,i(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,i(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===1&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,i(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===1&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,i(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,i(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,i(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const R=t.get(f),A=R.envMap,S=R.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(Yu.makeRotationFromEuler(S)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Ja),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,i(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,i(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,i(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,R,A){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*R,m.scale.value=A*.5,f.map&&(m.map.value=f.map,i(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,i(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,i(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,i(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,i(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,i(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,R){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,i(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,i(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,i(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,i(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,i(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===1&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,i(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,i(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=R.texture,m.transmissionSamplerSize.value.set(R.width,R.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,i(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,i(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,i(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,i(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,i(f.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,f){f.matcap&&(m.matcap.value=f.matcap)}function y(m,f){const R=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(R.matrixWorld),m.nearDistance.value=R.shadow.camera.near,m.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Zu(e,t,i,n){let r={},s={},a=[];const o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,b){const w=b.program;n.uniformBlockBinding(S,w)}function l(S,b){let w=r[S.id];w===void 0&&(m(S),w=u(S),r[S.id]=w,S.addEventListener("dispose",R));const P=b.program;n.updateUBOMapping(S,P);const v=t.render.frame;s[S.id]!==v&&(h(S),s[S.id]=v)}function u(S){const b=d();S.__bindingPointIndex=b;const w=e.createBuffer(),P=S.__size,v=S.usage;return e.bindBuffer(e.UNIFORM_BUFFER,w),e.bufferData(e.UNIFORM_BUFFER,P,v),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,b,w),w}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return Re("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const b=r[S.id],w=S.uniforms,P=S.__cache;e.bindBuffer(e.UNIFORM_BUFFER,b);for(let v=0,E=w.length;v<E;v++){const W=w[v];if(Array.isArray(W))for(let T=0,z=W.length;T<z;T++)p(W[T],v,T,P);else p(W,v,0,P)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(S,b,w,P){if(y(S,b,w,P)===!0){const v=S.__offset,E=S.value;if(Array.isArray(E)){let W=0;for(let T=0;T<E.length;T++){const z=E[T],H=f(z);x(z,S.__data,W),typeof z!="number"&&typeof z!="boolean"&&!z.isMatrix3&&!ArrayBuffer.isView(z)&&(W+=H.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(E,S.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,v,S.__data)}}function x(S,b,w){typeof S=="number"||typeof S=="boolean"?b[0]=S:S.isMatrix3?(b[0]=S.elements[0],b[1]=S.elements[1],b[2]=S.elements[2],b[3]=0,b[4]=S.elements[3],b[5]=S.elements[4],b[6]=S.elements[5],b[7]=0,b[8]=S.elements[6],b[9]=S.elements[7],b[10]=S.elements[8],b[11]=0):ArrayBuffer.isView(S)?b.set(new S.constructor(S.buffer,S.byteOffset,b.length)):S.toArray(b,w)}function y(S,b,w,P){const v=S.value,E=b+"_"+w;if(P[E]===void 0)return typeof v=="number"||typeof v=="boolean"?P[E]=v:ArrayBuffer.isView(v)?P[E]=v.slice():P[E]=v.clone(),!0;{const W=P[E];if(typeof v=="number"||typeof v=="boolean"){if(W!==v)return P[E]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(W.equals(v)===!1)return W.copy(v),!0}}return!1}function m(S){const b=S.uniforms;let w=0;const P=16;for(let E=0,W=b.length;E<W;E++){const T=Array.isArray(b[E])?b[E]:[b[E]];for(let z=0,H=T.length;z<H;z++){const Y=T[z],k=Array.isArray(Y.value)?Y.value:[Y.value];for(let K=0,N=k.length;K<N;K++){const j=k[K],ee=f(j),ne=w%P,fe=ne%ee.boundary,ye=ne+fe;w+=fe,ye!==0&&P-ye<ee.storage&&(w+=P-ye),Y.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=w,w+=ee.storage}}}const v=w%P;return v>0&&(w+=P-v),S.__size=w,S.__cache={},this}function f(S){const b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=48,b.storage=48):S.isMatrix4?(b.boundary=64,b.storage=64):S.isTexture?be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(b.boundary=16,b.storage=S.byteLength):be("WebGLRenderer: Unsupported uniform value type.",S),b}function R(S){const b=S.target;b.removeEventListener("dispose",R);const w=a.indexOf(b.__bindingPointIndex);a.splice(w,1),e.deleteBuffer(r[b.id]),delete r[b.id],delete s[b.id]}function A(){for(const S in r)e.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:c,update:l,dispose:A}}var $u=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ii=null;function Ju(){return ii===null&&(ii=new Kl($u,16,16,Dn,Ai),ii.name="DFG_LUT",ii.minFilter=Pt,ii.magFilter=Pt,ii.wrapS=si,ii.wrapT=si,ii.generateMipmaps=!1,ii.needsUpdate=!0),ii}var Qu=class{constructor(e={}){const{canvas:t=El(),context:i=null,depth:n=!0,stencil:r=!1,alpha:s=!1,antialias:a=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:c=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:h=fi}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext!="undefined"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=s;const x=h,y=new Set([Os,Ns,Ds]),m=new Set([fi,bi,Cs,Ls,Ps,Is]),f=new Uint32Array(4),R=new Int32Array(4),A=new B;let S=null,b=null;const w=[],P=[];let v=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let W=!1,T=null,z=null,H=null,Y=null;this._outputColorSpace=Gt;let k=0,K=0,N=null,j=-1,ee=null;const ne=new nt,fe=new nt;let ye=null;const tt=new Oe(0);let Ze=0,X=t.width,se=t.height,me=1,ue=null,Ae=null;const Ce=new nt(0,0,X,se),Ie=new nt(0,0,X,se);let Xe=!1;const Ve=new jr;let Qe=!1,gt=!1;const Ct=new ot,Bt=new B,je=new nt,vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pt=!1;function dt(){return N===null?me:1}let L=i;function zt(_,D){return t.getContext(_,D)}try{const _={alpha:!0,depth:n,stencil:r,antialias:a,premultipliedAlpha:o,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r185"),t.addEventListener("webglcontextlost",we,!1),t.addEventListener("webglcontextrestored",Tt,!1),t.addEventListener("webglcontextcreationerror",$e,!1),L===null){const D="webgl2";if(L=zt(D,_),L===null)throw zt(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(_){throw Re("WebGLRenderer: "+_.message),_}let qe,et,M,g,C,G,Z,ie,oe,U,te,pe,xe,Q,Se,Ee,Le,ke,I,q,$,de,_e;function J(){qe=new Jc(L),qe.init(),$=new ku(L,qe),et=new Hc(L,qe,e,$),M=new Vu(L,qe),et.reversedDepthBuffer&&d&&M.buffers.depth.setReversed(!0),z=L.createFramebuffer(),H=L.createFramebuffer(),Y=L.createFramebuffer(),g=new eh(L),C=new Au,G=new Gu(L,qe,M,C,et,$,g),Z=new $c(E),ie=new Bc(L),de=new Gc(L,ie),oe=new Qc(L,ie,g,de),U=new ih(L,oe,ie,de,g),ke=new th(L,et,G),Se=new Wc(C),te=new bu(E,Z,qe,et,de,Se),pe=new Ku(E,C),xe=new Ru,Q=new Du(qe),Le=new Vc(E,Z,M,U,p,o),Ee=new zu(E,U,et),_e=new Zu(L,g,et,M),I=new kc(L,qe,g),q=new jc(L,qe,g),g.programs=te.programs,E.capabilities=et,E.extensions=qe,E.properties=C,E.renderLists=xe,E.shadowMap=Ee,E.state=M,E.info=g}J(),x!==1009&&(v=new rh(x,t.width,t.height,a,n,r));const le=new qu(E,L);this.xr=le,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const _=qe.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){const _=qe.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return me},this.setPixelRatio=function(_){_!==void 0&&(me=_,this.setSize(X,se,!1))},this.getSize=function(_){return _.set(X,se)},this.setSize=function(_,D,V=!0){if(le.isPresenting){be("WebGLRenderer: Can't change size while VR device is presenting.");return}X=_,se=D,t.width=Math.floor(_*me),t.height=Math.floor(D*me),V===!0&&(t.style.width=_+"px",t.style.height=D+"px"),v!==null&&v.setSize(t.width,t.height),this.setViewport(0,0,_,D)},this.getDrawingBufferSize=function(_){return _.set(X*me,se*me).floor()},this.setDrawingBufferSize=function(_,D,V){X=_,se=D,me=V,t.width=Math.floor(_*V),t.height=Math.floor(D*V),this.setViewport(0,0,_,D)},this.setEffects=function(_){if(x===1009){Re("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(_){for(let D=0;D<_.length;D++)if(_[D].isOutputPass===!0){be("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(_||[])},this.getCurrentViewport=function(_){return _.copy(ne)},this.getViewport=function(_){return _.copy(Ce)},this.setViewport=function(_,D,V,F){_.isVector4?Ce.set(_.x,_.y,_.z,_.w):Ce.set(_,D,V,F),M.viewport(ne.copy(Ce).multiplyScalar(me).round())},this.getScissor=function(_){return _.copy(Ie)},this.setScissor=function(_,D,V,F){_.isVector4?Ie.set(_.x,_.y,_.z,_.w):Ie.set(_,D,V,F),M.scissor(fe.copy(Ie).multiplyScalar(me).round())},this.getScissorTest=function(){return Xe},this.setScissorTest=function(_){M.setScissorTest(Xe=_)},this.setOpaqueSort=function(_){ue=_},this.setTransparentSort=function(_){Ae=_},this.getClearColor=function(_){return _.copy(Le.getClearColor())},this.setClearColor=function(){Le.setClearColor(...arguments)},this.getClearAlpha=function(){return Le.getClearAlpha()},this.setClearAlpha=function(){Le.setClearAlpha(...arguments)},this.clear=function(_=!0,D=!0,V=!0){let F=0;if(_){let O=!1;if(N!==null){const re=N.texture.format;O=y.has(re)}if(O){const re=N.texture.type,ce=m.has(re),ge=Le.getClearColor(),ve=Le.getClearAlpha(),Pe=ge.r,Ne=ge.g,Fe=ge.b;ce?(f[0]=Pe,f[1]=Ne,f[2]=Fe,f[3]=ve,L.clearBufferuiv(L.COLOR,0,f)):(R[0]=Pe,R[1]=Ne,R[2]=Fe,R[3]=ve,L.clearBufferiv(L.COLOR,0,R))}else F|=L.COLOR_BUFFER_BIT}D&&(F|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(F|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F!==0&&L.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(_){_.setRenderer(this),T=_},this.dispose=function(){t.removeEventListener("webglcontextlost",we,!1),t.removeEventListener("webglcontextrestored",Tt,!1),t.removeEventListener("webglcontextcreationerror",$e,!1),Le.dispose(),xe.dispose(),Q.dispose(),C.dispose(),Z.dispose(),U.dispose(),de.dispose(),_e.dispose(),te.dispose(),le.dispose(),le.removeEventListener("sessionstart",ho),le.removeEventListener("sessionend",uo),Di.stop()};function we(_){_.preventDefault(),ks("WebGLRenderer: Context Lost."),W=!0}function Tt(){ks("WebGLRenderer: Context Restored."),W=!1;const _=g.autoReset,D=Ee.enabled,V=Ee.autoUpdate,F=Ee.needsUpdate,O=Ee.type;J(),g.autoReset=_,Ee.enabled=D,Ee.autoUpdate=V,Ee.needsUpdate=F,Ee.type=O}function $e(_){Re("WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function ni(_){const D=_.target;D.removeEventListener("dispose",ni),di(D)}function di(_){Ud(_),C.remove(_)}function Ud(_){const D=C.get(_).programs;D!==void 0&&(D.forEach(function(V){te.releaseProgram(V)}),_.isShaderMaterial&&te.releaseShaderCache(_))}this.renderBufferDirect=function(_,D,V,F,O,re){D===null&&(D=vt);const ce=O.isMesh&&O.matrixWorld.determinantAffine()<0,ge=Od(_,D,V,F,O);M.setMaterial(F,ce);let ve=V.index,Pe=1;if(F.wireframe===!0){if(ve=oe.getWireframeAttribute(V),ve===void 0)return;Pe=2}const Ne=V.drawRange,Fe=V.attributes.position;let Te=Ne.start*Pe,Je=(Ne.start+Ne.count)*Pe;re!==null&&(Te=Math.max(Te,re.start*Pe),Je=Math.min(Je,(re.start+re.count)*Pe)),ve!==null?(Te=Math.max(Te,0),Je=Math.min(Je,ve.count)):Fe!=null&&(Te=Math.max(Te,0),Je=Math.min(Je,Fe.count));const st=Je-Te;if(st<0||st===1/0)return;de.setup(O,F,ge,V,ve);let at,He=I;if(ve!==null&&(at=ie.get(ve),He=q,He.setIndex(at)),O.isMesh)F.wireframe===!0?(M.setLineWidth(F.wireframeLinewidth*dt()),He.setMode(L.LINES)):He.setMode(L.TRIANGLES);else if(O.isLine){let Mt=F.linewidth;Mt===void 0&&(Mt=1),M.setLineWidth(Mt*dt()),O.isLineSegments?He.setMode(L.LINES):O.isLineLoop?He.setMode(L.LINE_LOOP):He.setMode(L.LINE_STRIP)}else O.isPoints?He.setMode(L.POINTS):O.isSprite&&He.setMode(L.TRIANGLES);if(O.isBatchedMesh)if(qe.get("WEBGL_multi_draw"))He.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Mt=O._multiDrawStarts,Me=O._multiDrawCounts,Kt=O._multiDrawCount,We=ve?ie.get(ve).bytesPerElement:1,Vt=C.get(F).currentProgram.getUniforms();for(let ri=0;ri<Kt;ri++)Vt.setValue(L,"_gl_DrawID",ri),He.render(Mt[ri]/We,Me[ri])}else if(O.isInstancedMesh)He.renderInstances(Te,st,O.count);else if(V.isInstancedBufferGeometry){const Mt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Me=Math.min(V.instanceCount,Mt);He.renderInstances(Te,st,Me)}else He.render(Te,st)};function co(_,D,V){_.transparent===!0&&_.side===2&&_.forceSinglePass===!1?(_.side=1,_.needsUpdate=!0,mr(_,D,V),_.side=0,_.needsUpdate=!0,mr(_,D,V),_.side=2):mr(_,D,V)}this.compile=function(_,D,V=null){V===null&&(V=_),b=Q.get(V),b.init(D),P.push(b),V.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(b.pushLight(O),O.castShadow&&b.pushShadow(O))}),_!==V&&_.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(b.pushLight(O),O.castShadow&&b.pushShadow(O))}),b.setupLights();const F=new Set;return _.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const re=O.material;if(re)if(Array.isArray(re))for(let ce=0;ce<re.length;ce++){const ge=re[ce];co(ge,V,O),F.add(ge)}else co(re,V,O),F.add(re)}),b=P.pop(),F},this.compileAsync=function(_,D,V=null){const F=this.compile(_,D,V);return new Promise(O=>{function re(){if(F.forEach(function(ce){C.get(ce).currentProgram.isReady()&&F.delete(ce)}),F.size===0){O(_);return}setTimeout(re,10)}qe.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let gs=null;function Dd(_){gs&&gs(_)}function ho(){Di.stop()}function uo(){Di.start()}const Di=new Sa;Di.setAnimationLoop(Dd),typeof self!="undefined"&&Di.setContext(self),this.setAnimationLoop=function(_){gs=_,le.setAnimationLoop(_),_===null?Di.stop():Di.start()},le.addEventListener("sessionstart",ho),le.addEventListener("sessionend",uo),this.render=function(_,D){if(D!==void 0&&D.isCamera!==!0){Re("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;T!==null&&T.renderStart(_,D);const V=le.enabled===!0&&le.isPresenting===!0,F=v!==null&&(N===null||V)&&v.begin(E,N);if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(le.cameraAutoUpdate===!0&&le.updateCamera(D),D=le.getCamera()),_.isScene===!0&&_.onBeforeRender(E,_,D,N),b=Q.get(_,P.length),b.init(D),b.state.textureUnits=G.getTextureUnits(),P.push(b),Ct.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Ve.setFromProjectionMatrix(Ct,Oi,D.reversedDepth),gt=this.localClippingEnabled,Qe=Se.init(this.clippingPlanes,gt),S=xe.get(_,w.length),S.init(),w.push(S),le.enabled===!0&&le.isPresenting===!0){const re=E.xr.getDepthSensingMesh();re!==null&&vs(re,D,-1/0,E.sortObjects)}vs(_,D,0,E.sortObjects),S.finish(),E.sortObjects===!0&&S.sort(ue,Ae,D.reversedDepth),pt=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,pt&&Le.addToRenderList(S,_),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Qe===!0&&Se.beginShadows();const O=b.state.shadowsArray;if(Ee.render(O,_,D),Qe===!0&&Se.endShadows(),(F&&v.hasRenderPass())===!1){const re=S.opaque,ce=S.transmissive;if(b.setupLights(),D.isArrayCamera){const ge=D.cameras;if(ce.length>0)for(let ve=0,Pe=ge.length;ve<Pe;ve++){const Ne=ge[ve];po(re,ce,_,Ne)}pt&&Le.render(_);for(let ve=0,Pe=ge.length;ve<Pe;ve++){const Ne=ge[ve];fo(S,_,Ne,Ne.viewport)}}else ce.length>0&&po(re,ce,_,D),pt&&Le.render(_),fo(S,_,D)}N!==null&&K===0&&(G.updateMultisampleRenderTarget(N),G.updateRenderTargetMipmap(N)),F&&v.end(E),_.isScene===!0&&_.onAfterRender(E,_,D),de.resetDefaultState(),j=-1,ee=null,P.pop(),P.length>0?(b=P[P.length-1],G.setTextureUnits(b.state.textureUnits),Qe===!0&&Se.setGlobalState(E.clippingPlanes,b.state.camera)):b=null,w.pop(),w.length>0?S=w[w.length-1]:S=null,T!==null&&T.renderEnd()};function vs(_,D,V,F){if(_.visible===!1)return;if(_.layers.test(D.layers)){if(_.isGroup)V=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(D);else if(_.isLightProbeGrid)b.pushLightProbeGrid(_);else if(_.isLight)b.pushLight(_),_.castShadow&&b.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||Ve.intersectsSprite(_)){F&&je.setFromMatrixPosition(_.matrixWorld).applyMatrix4(Ct);const re=U.update(_),ce=_.material;ce.visible&&S.push(_,re,ce,V,je.z,null)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||Ve.intersectsObject(_))){const re=U.update(_),ce=_.material;if(F&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),je.copy(_.boundingSphere.center)):(re.boundingSphere===null&&re.computeBoundingSphere(),je.copy(re.boundingSphere.center)),je.applyMatrix4(_.matrixWorld).applyMatrix4(Ct)),Array.isArray(ce)){const ge=re.groups;for(let ve=0,Pe=ge.length;ve<Pe;ve++){const Ne=ge[ve],Fe=ce[Ne.materialIndex];Fe&&Fe.visible&&S.push(_,re,Fe,V,je.z,Ne)}}else ce.visible&&S.push(_,re,ce,V,je.z,null)}}const O=_.children;for(let re=0,ce=O.length;re<ce;re++)vs(O[re],D,V,F)}function fo(_,D,V,F){const{opaque:O,transmissive:re,transparent:ce}=_;b.setupLightsView(V),Qe===!0&&Se.setGlobalState(E.clippingPlanes,V),F&&M.viewport(ne.copy(F)),O.length>0&&pr(O,D,V),re.length>0&&pr(re,D,V),ce.length>0&&pr(ce,D,V),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function po(_,D,V,F){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[F.id]===void 0){const Fe=qe.has("EXT_color_buffer_half_float")||qe.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[F.id]=new $t(1,1,{generateMipmaps:!0,type:Fe?Ai:fi,minFilter:Sr,samples:Math.max(4,et.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ze.workingColorSpace})}const O=b.state.transmissionRenderTarget[F.id],re=F.viewport||ne;O.setSize(re.z*E.transmissionResolutionScale,re.w*E.transmissionResolutionScale);const ce=E.getRenderTarget(),ge=E.getActiveCubeFace(),ve=E.getActiveMipmapLevel();E.setRenderTarget(O),E.getClearColor(tt),Ze=E.getClearAlpha(),Ze<1&&E.setClearColor(16777215,.5),E.clear(),pt&&Le.render(V);const Pe=E.toneMapping;E.toneMapping=0;const Ne=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),b.setupLightsView(F),Qe===!0&&Se.setGlobalState(E.clippingPlanes,F),pr(_,V,F),G.updateMultisampleRenderTarget(O),G.updateRenderTargetMipmap(O),qe.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let Te=0,Je=D.length;Te<Je;Te++){const{object:st,geometry:at,material:He,group:Mt}=D[Te];if(He.side===2&&st.layers.test(F.layers)){const Me=He.side;He.side=1,He.needsUpdate=!0,mo(st,V,F,at,He,Mt),He.side=Me,He.needsUpdate=!0,Fe=!0}}Fe===!0&&(G.updateMultisampleRenderTarget(O),G.updateRenderTargetMipmap(O))}E.setRenderTarget(ce,ge,ve),E.setClearColor(tt,Ze),Ne!==void 0&&(F.viewport=Ne),E.toneMapping=Pe}function pr(_,D,V){const F=D.isScene===!0?D.overrideMaterial:null;for(let O=0,re=_.length;O<re;O++){const ce=_[O],{object:ge,geometry:ve,group:Pe}=ce;let Ne=ce.material;Ne.allowOverride===!0&&F!==null&&(Ne=F),ge.layers.test(V.layers)&&mo(ge,D,V,ve,Ne,Pe)}}function mo(_,D,V,F,O,re){_.onBeforeRender(E,D,V,F,O,re),_.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),O.onBeforeRender(E,D,V,F,_,re),O.transparent===!0&&O.side===2&&O.forceSinglePass===!1?(O.side=1,O.needsUpdate=!0,E.renderBufferDirect(V,D,F,O,_,re),O.side=0,O.needsUpdate=!0,E.renderBufferDirect(V,D,F,O,_,re),O.side=2):E.renderBufferDirect(V,D,F,O,_,re),_.onAfterRender(E,D,V,F,O,re)}function mr(_,D,V){D.isScene!==!0&&(D=vt);const F=C.get(_),O=b.state.lights,re=b.state.shadowsArray,ce=O.state.version,ge=te.getParameters(_,O.state,re,D,V,b.state.lightProbeGridArray),ve=te.getProgramCacheKey(ge);let Pe=F.programs;F.environment=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?D.environment:null,F.fog=D.fog;const Ne=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap;F.envMap=Z.get(_.envMap||F.environment,Ne),F.envMapRotation=F.environment!==null&&_.envMap===null?D.environmentRotation:_.envMapRotation,Pe===void 0&&(_.addEventListener("dispose",ni),Pe=new Map,F.programs=Pe);let Fe=Pe.get(ve);if(Fe!==void 0){if(F.currentProgram===Fe&&F.lightsStateVersion===ce)return vo(_,ge),Fe}else ge.uniforms=te.getUniforms(_),T!==null&&_.isNodeMaterial&&T.build(_,V,ge),_.onBeforeCompile(ge,E),Fe=te.acquireProgram(ge,ve),Pe.set(ve,Fe),F.uniforms=ge.uniforms;const Te=F.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(Te.clippingPlanes=Se.uniform),vo(_,ge),F.needsLights=Bd(_),F.lightsStateVersion=ce,F.needsLights&&(Te.ambientLightColor.value=O.state.ambient,Te.lightProbe.value=O.state.probe,Te.directionalLights.value=O.state.directional,Te.directionalLightShadows.value=O.state.directionalShadow,Te.spotLights.value=O.state.spot,Te.spotLightShadows.value=O.state.spotShadow,Te.rectAreaLights.value=O.state.rectArea,Te.ltc_1.value=O.state.rectAreaLTC1,Te.ltc_2.value=O.state.rectAreaLTC2,Te.pointLights.value=O.state.point,Te.pointLightShadows.value=O.state.pointShadow,Te.hemisphereLights.value=O.state.hemi,Te.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Te.spotLightMatrix.value=O.state.spotLightMatrix,Te.spotLightMap.value=O.state.spotLightMap,Te.pointShadowMatrix.value=O.state.pointShadowMatrix),F.lightProbeGrid=b.state.lightProbeGridArray.length>0,F.currentProgram=Fe,F.uniformsList=null,Fe}function go(_){if(_.uniformsList===null){const D=_.currentProgram.getUniforms();_.uniformsList=cr.seqWithValue(D.seq,_.uniforms)}return _.uniformsList}function vo(_,D){const V=C.get(_);V.outputColorSpace=D.outputColorSpace,V.batching=D.batching,V.batchingColor=D.batchingColor,V.instancing=D.instancing,V.instancingColor=D.instancingColor,V.instancingMorph=D.instancingMorph,V.skinning=D.skinning,V.morphTargets=D.morphTargets,V.morphNormals=D.morphNormals,V.morphColors=D.morphColors,V.morphTargetsCount=D.morphTargetsCount,V.numClippingPlanes=D.numClippingPlanes,V.numIntersection=D.numClipIntersection,V.vertexAlphas=D.vertexAlphas,V.vertexTangents=D.vertexTangents,V.toneMapping=D.toneMapping}function Nd(_,D){if(_.length===0)return null;if(_.length===1)return _[0].texture!==null?_[0]:null;A.setFromMatrixPosition(D.matrixWorld);for(let V=0,F=_.length;V<F;V++){const O=_[V];if(O.texture!==null&&O.boundingBox.containsPoint(A))return O}return null}function Od(_,D,V,F,O){D.isScene!==!0&&(D=vt),G.resetTextureUnits();const re=D.fog,ce=F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial?D.environment:null,ge=N===null?E.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:ze.workingColorSpace,ve=F.isMeshStandardMaterial||F.isMeshLambertMaterial&&!F.envMap||F.isMeshPhongMaterial&&!F.envMap,Pe=Z.get(F.envMap||ce,ve),Ne=F.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Fe=!!V.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),Te=!!V.morphAttributes.position,Je=!!V.morphAttributes.normal,st=!!V.morphAttributes.color;let at=0;F.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(at=E.toneMapping);const He=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Mt=He!==void 0?He.length:0,Me=C.get(F),Kt=b.state.lights;if(Qe===!0&&(gt===!0||_!==ee)){const Ye=_===ee&&F.id===j;Se.setState(F,_,Ye)}let We=!1;F.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==Kt.state.version||Me.outputColorSpace!==ge||O.isBatchedMesh&&Me.batching===!1||!O.isBatchedMesh&&Me.batching===!0||O.isBatchedMesh&&Me.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Me.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Me.instancing===!1||!O.isInstancedMesh&&Me.instancing===!0||O.isSkinnedMesh&&Me.skinning===!1||!O.isSkinnedMesh&&Me.skinning===!0||O.isInstancedMesh&&Me.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Me.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Me.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Me.instancingMorph===!1&&O.morphTexture!==null||Me.envMap!==Pe||F.fog===!0&&Me.fog!==re||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==Se.numPlanes||Me.numIntersection!==Se.numIntersection)||Me.vertexAlphas!==Ne||Me.vertexTangents!==Fe||Me.morphTargets!==Te||Me.morphNormals!==Je||Me.morphColors!==st||Me.toneMapping!==at||Me.morphTargetsCount!==Mt||!!Me.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(We=!0):(We=!0,Me.__version=F.version);let Vt=Me.currentProgram;We===!0&&(Vt=mr(F,D,O),T&&F.isNodeMaterial&&T.onUpdateProgram(F,Vt,Me));let ri=!1,Ei=!1,ln=!1;const Ke=Vt.getUniforms(),lt=Me.uniforms;if(M.useProgram(Vt.program)&&(ri=!0,Ei=!0,ln=!0),F.id!==j&&(j=F.id,Ei=!0),Me.needsLights){const Ye=Nd(b.state.lightProbeGridArray,O);Me.lightProbeGrid!==Ye&&(Me.lightProbeGrid=Ye,Ei=!0)}if(ri||ee!==_){M.buffers.depth.getReversed()&&_.reversedDepth!==!0&&(_._reversedDepth=!0,_.updateProjectionMatrix()),Ke.setValue(L,"projectionMatrix",_.projectionMatrix),Ke.setValue(L,"viewMatrix",_.matrixWorldInverse);const Ye=Ke.map.cameraPosition;Ye!==void 0&&Ye.setValue(L,Bt.setFromMatrixPosition(_.matrixWorld)),et.logarithmicDepthBuffer&&Ke.setValue(L,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&Ke.setValue(L,"isOrthographic",_.isOrthographicCamera===!0),ee!==_&&(ee=_,Ei=!0,ln=!0)}if(Me.needsLights&&(Kt.state.directionalShadowMap.length>0&&Ke.setValue(L,"directionalShadowMap",Kt.state.directionalShadowMap,G),Kt.state.spotShadowMap.length>0&&Ke.setValue(L,"spotShadowMap",Kt.state.spotShadowMap,G),Kt.state.pointShadowMap.length>0&&Ke.setValue(L,"pointShadowMap",Kt.state.pointShadowMap,G)),O.isSkinnedMesh){Ke.setOptional(L,O,"bindMatrix"),Ke.setOptional(L,O,"bindMatrixInverse");const Ye=O.skeleton;Ye&&(Ye.boneTexture===null&&Ye.computeBoneTexture(),Ke.setValue(L,"boneTexture",Ye.boneTexture,G))}O.isBatchedMesh&&(Ke.setOptional(L,O,"batchingTexture"),Ke.setValue(L,"batchingTexture",O._matricesTexture,G),Ke.setOptional(L,O,"batchingIdTexture"),Ke.setValue(L,"batchingIdTexture",O._indirectTexture,G),Ke.setOptional(L,O,"batchingColorTexture"),O._colorsTexture!==null&&Ke.setValue(L,"batchingColorTexture",O._colorsTexture,G));const Ti=V.morphAttributes;if((Ti.position!==void 0||Ti.normal!==void 0||Ti.color!==void 0)&&ke.update(O,V,Vt),(Ei||Me.receiveShadow!==O.receiveShadow)&&(Me.receiveShadow=O.receiveShadow,Ke.setValue(L,"receiveShadow",O.receiveShadow)),(F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial)&&F.envMap===null&&D.environment!==null&&(lt.envMapIntensity.value=D.environmentIntensity),lt.dfgLUT!==void 0&&(lt.dfgLUT.value=Ju()),Ei){if(Ke.setValue(L,"toneMappingExposure",E.toneMappingExposure),Me.needsLights&&Fd(lt,ln),re&&F.fog===!0&&pe.refreshFogUniforms(lt,re),pe.refreshMaterialUniforms(lt,F,me,se,b.state.transmissionRenderTarget[_.id]),Me.needsLights&&Me.lightProbeGrid){const Ye=Me.lightProbeGrid;lt.probesSH.value=Ye.texture,lt.probesMin.value.copy(Ye.boundingBox.min),lt.probesMax.value.copy(Ye.boundingBox.max),lt.probesResolution.value.copy(Ye.resolution)}cr.upload(L,go(Me),lt,G)}if(F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(cr.upload(L,go(Me),lt,G),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&Ke.setValue(L,"center",O.center),Ke.setValue(L,"modelViewMatrix",O.modelViewMatrix),Ke.setValue(L,"normalMatrix",O.normalMatrix),Ke.setValue(L,"modelMatrix",O.matrixWorld),F.uniformsGroups!==void 0){const Ye=F.uniformsGroups;for(let Ln=0,cn=Ye.length;Ln<cn;Ln++){const _o=Ye[Ln];_e.update(_o,Vt),_e.bind(_o,Vt)}}return Vt}function Fd(_,D){_.ambientLightColor.needsUpdate=D,_.lightProbe.needsUpdate=D,_.directionalLights.needsUpdate=D,_.directionalLightShadows.needsUpdate=D,_.pointLights.needsUpdate=D,_.pointLightShadows.needsUpdate=D,_.spotLights.needsUpdate=D,_.spotLightShadows.needsUpdate=D,_.rectAreaLights.needsUpdate=D,_.hemisphereLights.needsUpdate=D}function Bd(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return K},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(_,D,V){const F=C.get(_);F.__autoAllocateDepthBuffer=_.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),C.get(_.texture).__webglTexture=D,C.get(_.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:V,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(_,D){const V=C.get(_);V.__webglFramebuffer=D,V.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(_,D=0,V=0){N=_,k=D,K=V;let F=null,O=!1,re=!1;if(_){const ce=C.get(_);if(ce.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(L.FRAMEBUFFER,ce.__webglFramebuffer),ne.copy(_.viewport),fe.copy(_.scissor),ye=_.scissorTest,M.viewport(ne),M.scissor(fe),M.setScissorTest(ye),j=-1;return}else if(ce.__webglFramebuffer===void 0)G.setupRenderTarget(_);else if(ce.__hasExternalTextures)G.rebindTextures(_,C.get(_.texture).__webglTexture,C.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){const Pe=_.depthTexture;if(ce.__boundDepthTexture!==Pe){if(Pe!==null&&C.has(Pe)&&(_.width!==Pe.image.width||_.height!==Pe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");G.setupDepthRenderbuffer(_)}}const ge=_.texture;(ge.isData3DTexture||ge.isDataArrayTexture||ge.isCompressedArrayTexture)&&(re=!0);const ve=C.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(ve[D])?F=ve[D][V]:F=ve[D],O=!0):_.samples>0&&G.useMultisampledRTT(_)===!1?F=C.get(_).__webglMultisampledFramebuffer:Array.isArray(ve)?F=ve[V]:F=ve,ne.copy(_.viewport),fe.copy(_.scissor),ye=_.scissorTest}else ne.copy(Ce).multiplyScalar(me).floor(),fe.copy(Ie).multiplyScalar(me).floor(),ye=Xe;if(V!==0&&(F=z),M.bindFramebuffer(L.FRAMEBUFFER,F)&&M.drawBuffers(_,F),M.viewport(ne),M.scissor(fe),M.setScissorTest(ye),O){const ce=C.get(_.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+D,ce.__webglTexture,V)}else if(re){const ce=D;for(let ge=0;ge<_.textures.length;ge++){const ve=C.get(_.textures[ge]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+ge,ve.__webglTexture,V,ce)}}else if(_!==null&&V!==0){const ce=C.get(_.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ce.__webglTexture,V)}j=-1},this.readRenderTargetPixels=function(_,D,V,F,O,re,ce,ge=0){if(!(_&&_.isWebGLRenderTarget)){Re("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=C.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&ce!==void 0&&(ve=ve[ce]),ve){M.bindFramebuffer(L.FRAMEBUFFER,ve);try{const Pe=_.textures[ge],Ne=Pe.format,Fe=Pe.type;if(_.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ge),!et.textureFormatReadable(Ne)){Re("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!et.textureTypeReadable(Fe)){Re("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=_.width-F&&V>=0&&V<=_.height-O&&L.readPixels(D,V,F,O,$.convert(Ne),$.convert(Fe),re)}finally{const Pe=N!==null?C.get(N).__webglFramebuffer:null;M.bindFramebuffer(L.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(_,D,V,F,O,re,ce,ge=0){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=C.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&ce!==void 0&&(ve=ve[ce]),ve)if(D>=0&&D<=_.width-F&&V>=0&&V<=_.height-O){M.bindFramebuffer(L.FRAMEBUFFER,ve);const Pe=_.textures[ge],Ne=Pe.format,Fe=Pe.type;if(_.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ge),!et.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!et.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Te),L.bufferData(L.PIXEL_PACK_BUFFER,re.byteLength,L.STREAM_READ),L.readPixels(D,V,F,O,$.convert(Ne),$.convert(Fe),0);const Je=N!==null?C.get(N).__webglFramebuffer:null;M.bindFramebuffer(L.FRAMEBUFFER,Je);const st=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Tl(L,st,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Te),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,re),L.deleteBuffer(Te),L.deleteSync(st),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(_,D=null,V=0){const F=Math.pow(2,-V),O=Math.floor(_.image.width*F),re=Math.floor(_.image.height*F),ce=D!==null?D.x:0,ge=D!==null?D.y:0;G.setTexture2D(_,0),L.copyTexSubImage2D(L.TEXTURE_2D,V,0,0,ce,ge,O,re),M.unbindTexture()},this.copyTextureToTexture=function(_,D,V=null,F=null,O=0,re=0){let ce,ge,ve,Pe,Ne,Fe,Te,Je,st;const at=_.isCompressedTexture?_.mipmaps[re]:_.image;if(V!==null)ce=V.max.x-V.min.x,ge=V.max.y-V.min.y,ve=V.isBox3?V.max.z-V.min.z:1,Pe=V.min.x,Ne=V.min.y,Fe=V.isBox3?V.min.z:0;else{const lt=Math.pow(2,-O);ce=Math.floor(at.width*lt),ge=Math.floor(at.height*lt),_.isDataArrayTexture?ve=at.depth:_.isData3DTexture?ve=Math.floor(at.depth*lt):ve=1,Pe=0,Ne=0,Fe=0}F!==null?(Te=F.x,Je=F.y,st=F.z):(Te=0,Je=0,st=0);const He=$.convert(D.format),Mt=$.convert(D.type);let Me;D.isData3DTexture?(G.setTexture3D(D,0),Me=L.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(G.setTexture2DArray(D,0),Me=L.TEXTURE_2D_ARRAY):(G.setTexture2D(D,0),Me=L.TEXTURE_2D),M.activeTexture(L.TEXTURE0),M.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,D.flipY),M.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),M.pixelStorei(L.UNPACK_ALIGNMENT,D.unpackAlignment);const Kt=M.getParameter(L.UNPACK_ROW_LENGTH),We=M.getParameter(L.UNPACK_IMAGE_HEIGHT),Vt=M.getParameter(L.UNPACK_SKIP_PIXELS),ri=M.getParameter(L.UNPACK_SKIP_ROWS),Ei=M.getParameter(L.UNPACK_SKIP_IMAGES);M.pixelStorei(L.UNPACK_ROW_LENGTH,at.width),M.pixelStorei(L.UNPACK_IMAGE_HEIGHT,at.height),M.pixelStorei(L.UNPACK_SKIP_PIXELS,Pe),M.pixelStorei(L.UNPACK_SKIP_ROWS,Ne),M.pixelStorei(L.UNPACK_SKIP_IMAGES,Fe);const ln=_.isDataArrayTexture||_.isData3DTexture,Ke=D.isDataArrayTexture||D.isData3DTexture;if(_.isDepthTexture){const lt=C.get(_),Ti=C.get(D),Ye=C.get(lt.__renderTarget),Ln=C.get(Ti.__renderTarget);M.bindFramebuffer(L.READ_FRAMEBUFFER,Ye.__webglFramebuffer),M.bindFramebuffer(L.DRAW_FRAMEBUFFER,Ln.__webglFramebuffer);for(let cn=0;cn<ve;cn++)ln&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,C.get(_).__webglTexture,O,Fe+cn),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,C.get(D).__webglTexture,re,st+cn)),L.blitFramebuffer(Pe,Ne,ce,ge,Te,Je,ce,ge,L.DEPTH_BUFFER_BIT,L.NEAREST);M.bindFramebuffer(L.READ_FRAMEBUFFER,null),M.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(O!==0||_.isRenderTargetTexture||C.has(_)){const lt=C.get(_),Ti=C.get(D);M.bindFramebuffer(L.READ_FRAMEBUFFER,H),M.bindFramebuffer(L.DRAW_FRAMEBUFFER,Y);for(let Ye=0;Ye<ve;Ye++)ln?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,lt.__webglTexture,O,Fe+Ye):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,lt.__webglTexture,O),Ke?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ti.__webglTexture,re,st+Ye):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ti.__webglTexture,re),O!==0?L.blitFramebuffer(Pe,Ne,ce,ge,Te,Je,ce,ge,L.COLOR_BUFFER_BIT,L.NEAREST):Ke?L.copyTexSubImage3D(Me,re,Te,Je,st+Ye,Pe,Ne,ce,ge):L.copyTexSubImage2D(Me,re,Te,Je,Pe,Ne,ce,ge);M.bindFramebuffer(L.READ_FRAMEBUFFER,null),M.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Ke?_.isDataTexture||_.isData3DTexture?L.texSubImage3D(Me,re,Te,Je,st,ce,ge,ve,He,Mt,at.data):D.isCompressedArrayTexture?L.compressedTexSubImage3D(Me,re,Te,Je,st,ce,ge,ve,He,at.data):L.texSubImage3D(Me,re,Te,Je,st,ce,ge,ve,He,Mt,at):_.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,re,Te,Je,ce,ge,He,Mt,at.data):_.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,re,Te,Je,at.width,at.height,He,at.data):L.texSubImage2D(L.TEXTURE_2D,re,Te,Je,ce,ge,He,Mt,at);M.pixelStorei(L.UNPACK_ROW_LENGTH,Kt),M.pixelStorei(L.UNPACK_IMAGE_HEIGHT,We),M.pixelStorei(L.UNPACK_SKIP_PIXELS,Vt),M.pixelStorei(L.UNPACK_SKIP_ROWS,ri),M.pixelStorei(L.UNPACK_SKIP_IMAGES,Ei),re===0&&D.generateMipmaps&&L.generateMipmap(Me),M.unbindTexture()},this.initRenderTarget=function(_){C.get(_).__webglFramebuffer===void 0&&G.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?G.setTextureCube(_,0):_.isData3DTexture?G.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?G.setTexture2DArray(_,0):G.setTexture2D(_,0),M.unbindTexture()},this.resetState=function(){k=0,K=0,N=null,M.reset(),de.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=ze._getUnpackColorSpace()}},Qa=2060200;function ju(e){const t=new Gl;t.background=new Oe(Qa),t.fog=new Vl(Qa,22,38);const i=new Qu({canvas:e,antialias:!0,alpha:!1,powerPreference:"high-performance",failIfMajorPerformanceCaveat:!1});i.setPixelRatio(Math.min(2,window.devicePixelRatio)),i.shadowMap.enabled=!0,i.shadowMap.type=1;const n=6.5,r=new sr(-6.5,n,n,-6.5,1,40);r.position.set(8,6,6),r.lookAt(0,0,0);const s=new mi;s.add(r),s.rotation.set(0,-Math.PI/2,0),t.add(s);const a=new xc(10474751,12887412,.42);t.add(a);const o=new Ec(16777215,.38);t.add(o);const c=new yc(16774630,1.05);c.position.set(5,14,6),c.castShadow=!0,c.shadow.mapSize.set(1024,1024),c.shadow.camera.left=-9,c.shadow.camera.right=9,c.shadow.camera.bottom=-9,c.shadow.camera.top=9,c.shadow.camera.near=1,c.shadow.camera.far=32,c.shadow.bias=-8e-4,c.shadow.normalBias=.04,t.add(c);const l=new wt(new es(48,48),new ec({opacity:.28}));l.rotation.x=-Math.PI/2,l.position.y=-.28,l.receiveShadow=!0,t.add(l);const u=()=>{var d,h;const p=e.parentElement,x=(d=p==null?void 0:p.clientWidth)!==null&&d!==void 0?d:0,y=(h=p==null?void 0:p.clientHeight)!==null&&h!==void 0?h:0,m=Math.min(x||1/0,y||1/0),f=Math.max(120,Math.floor(Number.isFinite(m)?m:Math.min(650,window.innerWidth)));i.setSize(f,f,!1),e.style.width="100%",e.style.height="100%",e.style.aspectRatio="1 / 1"};return u(),window.addEventListener("resize",u),typeof ResizeObserver!="undefined"&&e.parentElement&&new ResizeObserver(u).observe(e.parentElement),document.addEventListener("dblclick",d=>d.preventDefault()),{scene:t,renderer:i,camera:r,cameraPivot:s,resize:u}}function ed(){return typeof window!="undefined"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Rt(e){return ed()?Math.min(70,e):e}function it(e){return{col:e.col,row:e.row,ori:e.ori}}function Ft(e){return e.ori==="standing"?[{col:e.col,row:e.row}]:e.ori==="flatX"?[{col:e.col,row:e.row},{col:e.col+1,row:e.row}]:[{col:e.col,row:e.row},{col:e.col,row:e.row+1}]}function td(e,t){const{col:i,row:n,ori:r}=e;return r==="standing"?t==="left"?{col:i-2,row:n,ori:"flatX"}:t==="right"?{col:i+1,row:n,ori:"flatX"}:t==="up"?{col:i,row:n-2,ori:"flatZ"}:{col:i,row:n+1,ori:"flatZ"}:r==="flatX"?t==="left"?{col:i-1,row:n,ori:"standing"}:t==="right"?{col:i+2,row:n,ori:"standing"}:t==="up"?{col:i,row:n-1,ori:"flatX"}:{col:i,row:n+1,ori:"flatX"}:t==="up"?{col:i,row:n-1,ori:"standing"}:t==="down"?{col:i,row:n+2,ori:"standing"}:t==="left"?{col:i-1,row:n,ori:"flatZ"}:{col:i+1,row:n,ori:"flatZ"}}function id(e,t){const{col:i,row:n}=e;return t==="left"?{col:i-1,row:n,ori:"standing"}:t==="right"?{col:i+1,row:n,ori:"standing"}:t==="up"?{col:i,row:n-1,ori:"standing"}:{col:i,row:n+1,ori:"standing"}}function nd(e,t){if(e.ori!=="standing"||t.ori!=="standing")return!1;const i=Math.abs(e.col-t.col),n=Math.abs(e.row-t.row);return i===1&&n===0||i===0&&n===1}function rd(e,t){return e.row===t.row?{col:Math.min(e.col,t.col),row:e.row,ori:"flatX"}:{col:e.col,row:Math.min(e.row,t.row),ori:"flatZ"}}function sd(e){return e.ori==="standing"?{x:e.col,y:1,z:e.row}:e.ori==="flatX"?{x:e.col+.5,y:.5,z:e.row}:{x:e.col,y:.5,z:e.row+.5}}function ja(e){return e.ori==="standing"?{sx:1,sy:2,sz:1}:e.ori==="flatX"?{sx:2,sy:1,sz:1}:{sx:1,sy:1,sz:2}}function ad(e){const t=e.length,i=Math.max(...e.map(n=>n.length),1);return{grid:e.map(n=>{const r=n.split("");for(;r.length<i;)r.push(".");return r}),cols:i,rows:t}}function ur(e,t){const i=[];for(let n=0;n<e.length;n++)for(let r=0;r<e[n].length;r++)e[n][r]===t&&i.push([r,n]);return i}function od(e,t=0){var i,n,r,s,a,o,c,l;const u=(i=(n=(r=e.layers)===null||r===void 0?void 0:r[t])!==null&&n!==void 0?n:(s=e.layers)===null||s===void 0?void 0:s[0])!==null&&i!==void 0?i:e.map;if(!u)throw new Error("LevelDef needs map or layers");const{grid:d,cols:h,rows:p}=ad(u);let x=0,y=0;for(let T=0;T<p;T++)for(let z=0;z<h;z++)d[T][z]==="@"&&(x=z,y=T);const m=ur(d,"s"),f=ur(d,"S");let R=0,A=0;const S=((a=e.switches)!==null&&a!==void 0?a:[]).map(T=>{const z=T.type==="hard"?f[A++]:m[R++];return z?{...T,col:z[0],row:z[1]}:{...T}}),b=ur(d,"p"),w=((o=e.splitPads)!==null&&o!==void 0?o:[]).map((T,z)=>{const H=b[z];return H?{...T,col:H[0],row:H[1]}:{...T}}),P=ur(d,"t"),v=((c=e.teleports)!==null&&c!==void 0?c:[]).map((T,z)=>{const H=P[z];return H?{...T,col:H[0],row:H[1]}:{...T}}),E=new Map,W=new Map;for(const T of(l=e.bridges)!==null&&l!==void 0?l:[]){E.set(T.id,T.cells);for(const[z,H]of T.cells)W.set(`${z},${H}`,T.id)}return{def:e,grid:d,cols:h,rows:p,startCol:x,startRow:y,bridgeCells:E,cellToBridge:W,switches:S,splitPads:w,teleports:v}}function ds(e,t,i){return t<0||i<0||t>=e.cols||i>=e.rows?".":e.grid[i][t]}function on(e,t,i,n,r={}){if(r[`${t},${i}`])return".";const s=ds(e,t,i);if(s==="b"){const a=e.cellToBridge.get(`${t},${i}`);return!a||!n[a]?".":"x"}return s==="s"||s==="S"||s==="p"||s==="u"||s==="t"||s==="c"||s==="@"?"x":s}function ld(e,t,i={},n={}){const r=Ft(t);if(r.length===1){const o=on(e,r[0].col,r[0].row,i,n);return o==="."||o==="z"||o==="f"}const s=on(e,r[0].col,r[0].row,i,n),a=on(e,r[1].col,r[1].row,i,n);return s==="z"||a==="z"?!0:s==="."&&a==="."}function cd(e,t,i={},n={}){const r=Ft(t);return r.length!==2?!1:on(e,r[0].col,r[0].row,i,n)==="o"&&on(e,r[1].col,r[1].row,i,n)==="o"}function hd(e,t,i,n=!1){const r=e.switches;if(!r.length)return i;const s=Ft(t);let a={...i},o=!1;for(const c of r)if(s.some(l=>l.col===c.col&&l.row===c.row)&&!(c.type==="hard"&&(n||t.ori!=="standing")))for(const l of c.bridgeIds)c.mode==="toggle"&&(a[l]=!a[l],o=!0);return o?a:i}function ud(e,t,i=!1){if(i||t.ori!=="standing"||!e.teleports.length)return null;for(const n of e.teleports){if(t.col!==n.col||t.row!==n.row)continue;const[r,s]=n.dest;return r===t.col&&s===t.row?null:{col:r,row:s,ori:"standing"}}return null}function fs(e,t,i,n){if(!t.length)return n;const r=new Set(i.map(o=>`${o.col},${o.row}`));let s=n,a=!1;for(const o of t){const c=`${o.col},${o.row}`;r.has(c)||n[c]||ds(e,o.col,o.row)==="c"&&(a||(s={...n},a=!0),s[c]=!0)}return s}function Cn(e){"@babel/helpers - typeof";return Cn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Cn(e)}function dd(e,t){if(Cn(e)!="object"||!e)return e;var i=e[Symbol.toPrimitive];if(i!==void 0){var n=i.call(e,t||"default");if(Cn(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function fd(e){var t=dd(e,"string");return Cn(t)=="symbol"?t:t+""}function he(e,t,i){return(t=fd(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var pd=class{constructor(e,t){he(this,"layer",new mi),he(this,"startCol",0),he(this,"startRow",0),he(this,"offsetX",0),he(this,"offsetZ",0),he(this,"def",null),he(this,"parsed",null),he(this,"tweens",void 0),he(this,"geo",new ji(1,.25,1)),he(this,"mats",{x:new Et({color:15988215,metalness:0,roughness:.82}),o:new Et({color:2071384,emissive:675116,emissiveIntensity:.16,metalness:0,roughness:.72}),z:new Et({color:14042426,metalness:0,roughness:.78}),f:new Et({color:15246103,metalness:0,roughness:.8}),b:new Et({color:10406376,metalness:0,roughness:.78}),s:new Et({color:15783274,metalness:0,roughness:.75}),S:new Et({color:14252074,metalness:0,roughness:.75}),p:new Et({color:10980288,metalness:0,roughness:.78}),u:new Et({color:5220568,metalness:0,roughness:.78}),t:new Et({color:3066048,emissive:1011562,emissiveIntensity:.28,metalness:.05,roughness:.62}),c:new Et({color:10134445,metalness:0,roughness:.92})}),he(this,"ringGeo",new jl(.28,.045,8,20)),he(this,"ringMat",new Et({color:14221307,emissive:6220500,emissiveIntensity:.45,metalness:.1,roughness:.4})),he(this,"bridgeMeshes",new Map),he(this,"crumbleMeshes",new Map),this.tweens=t,e.add(this.layer)}load(e,t=0,i={},n={}){this.clearImmediate(),this.bridgeMeshes.clear(),this.crumbleMeshes.clear(),this.def=e,this.parsed=od(e,t),this.startCol=this.parsed.startCol,this.startRow=this.parsed.startRow,this.offsetX=-this.parsed.cols/2+.5,this.offsetZ=-this.parsed.rows/2+.5,this.layer.position.set(this.offsetX,0,this.offsetZ);for(let s=0;s<this.parsed.rows;s++)for(let a=0;a<this.parsed.cols;a++){const o=this.parsed.grid[s][a];if(o===".")continue;if(o==="b"){var r;const l=this.createTile(this.mats.b,a,s);l.visible=!!i[(r=this.parsed.cellToBridge.get(`${a},${s}`))!==null&&r!==void 0?r:""],this.bridgeMeshes.set(`${a},${s}`,l);continue}const c=o==="@"?"x":o;if(this.mats[c]){const l=this.createTile(this.mats[c],a,s);if(o==="t"&&this.addTeleportRing(l),o==="c"){const u=`${a},${s}`;this.crumbleMeshes.set(u,l),n[u]&&(l.visible=!1,l.scale.set(.05,1,.05))}}}}setLayer(e,t,i={}){this.def&&this.load(this.def,e,t,i)}syncBridges(e){if(this.parsed)for(const[t,i]of this.bridgeMeshes){const n=this.parsed.cellToBridge.get(t),r=!!(n&&e[n]);if(i.visible===r)continue;i.visible=!0;const s={v:r?.2:1};new bt(s,this.tweens).to({v:r?1:.05},Rt(220)).onUpdate(()=>i.scale.set(s.v,1,s.v)).onComplete(()=>{i.visible=r,r&&i.scale.set(1,1,1)}).start()}}syncCollapsed(e){for(const[t,i]of this.crumbleMeshes){if(!e[t]){i.visible=!0,i.scale.set(1,1,1),i.position.y=-.125;continue}if(!i.visible&&i.scale.x<.1)continue;i.visible=!0;const n={v:1,y:-.125};new bt(n,this.tweens).to({v:.05,y:-.55},Rt(260)).easing(mt.Quadratic.In).onUpdate(()=>{i.scale.set(n.v,1,n.v),i.position.y=n.y}).onComplete(()=>{i.visible=!1}).start()}}createTile(e,t,i){const n=new wt(this.geo,e);n.position.set(t,-.125,i),n.receiveShadow=!0,n.castShadow=!0,this.layer.add(n);const r={v:.72};return n.scale.set(r.v,1,r.v),new bt(r,this.tweens).delay((t+i)*16).to({v:1},Rt(260)).easing(mt.Cubic.Out).onUpdate(()=>n.scale.set(r.v,1,r.v)).start(),n}addTeleportRing(e){const t=new wt(this.ringGeo,this.ringMat);t.rotation.x=Math.PI/2,t.position.y=.18,t.castShadow=!1,t.receiveShadow=!1,e.add(t)}isDeath(e,t,i={}){return this.parsed?ld(this.parsed,e,t,i):!0}isWin(e,t,i={}){return this.parsed?cd(this.parsed,e,t,i):!1}toWorld(e,t){return{x:this.offsetX+e,z:this.offsetZ+t}}shake(){const e=[];for(const t of this.layer.children){const i=t;e.push({mesh:i,x:i.position.x,y:i.position.y,z:i.position.z})}for(const t of e)new bt(t.mesh.position,this.tweens).to({x:t.x+(Math.random()-.5)*.12,y:t.y+(Math.random()-.5)*.12*.6,z:t.z+(Math.random()-.5)*.12},Rt(90)).easing(mt.Quadratic.Out).yoyo(!0).repeat(3).onComplete(()=>{t.mesh.position.set(t.x,t.y,t.z),t.mesh.rotation.set(0,0,0)}).start()}remove(e){for(const t of this.layer.children){const i=t,n={v:1};new bt(n,this.tweens).to({v:0},Rt(280)).easing(mt.Quadratic.InOut).onUpdate(()=>i.scale.setScalar(n.v)).start()}new bt({t:0},this.tweens).to({t:1},Rt(420)).onComplete(()=>{this.clearImmediate(),e()}).start()}clearImmediate(){for(;this.layer.children.length;)this.layer.remove(this.layer.children[0])}},md=class{constructor(e,t,i){he(this,"pivot",new mi),he(this,"mesh",void 0),he(this,"pivotB",new mi),he(this,"meshB",void 0),he(this,"state",{col:0,row:0,ori:"standing"}),he(this,"stateB",null),he(this,"active",0),he(this,"canMove",!0),he(this,"tweens",void 0),he(this,"level",void 0),he(this,"activeTween",null),he(this,"matA",new Et({color:3819092,metalness:.08,roughness:.72})),he(this,"matB",new Et({color:7044234,metalness:.06,roughness:.74})),he(this,"matActive",new Et({color:2372679,metalness:.1,roughness:.68})),this.level=t,this.tweens=i,this.mesh=new wt(new ji(1,1,1),this.matA),this.mesh.castShadow=!0,this.pivot.add(this.mesh),e.add(this.pivot),this.meshB=new wt(new ji(1,1,1),this.matB),this.meshB.castShadow=!0,this.pivotB.add(this.meshB),this.pivotB.visible=!1,e.add(this.pivotB)}get isSplit(){return this.stateB!==null}sizeOf(e,t){return t?{sx:1,sy:1,sz:1}:ja(e)}centerOf(e,t){return t?{x:e.col,y:.5,z:e.row}:sd(e)}placeEntity(e,t,i,n=1){const r=this.centerOf(t,i),s=this.sizeOf(t,i),{x:a,z:o}=this.level.toWorld(r.x,r.z),c=e==="a"?this.pivot:this.pivotB,l=e==="a"?this.mesh:this.meshB;c.visible=!0,c.rotation.set(0,0,0),l.position.set(0,0,0),l.rotation.set(0,0,0),l.scale.set(s.sx*n,s.sy*n,s.sz*n),c.position.set(a,r.y,o)}placeMerged(e,t=1){this.state=it(e),this.stateB=null,this.active=0,this.pivotB.visible=!1,this.placeEntity("a",e,!1,t),this.refreshMaterials()}placeSplit(e,t,i=0){this.state=it(e),this.stateB=it(t),this.active=i,this.placeEntity("a",e,!0),this.placeEntity("b",t,!0),this.refreshMaterials()}animateSplit(e,t,i){this.canMove=!1,this.stopTween();const n=it(this.state),[r,s]=this.splitStartCenters(n,e,t);this.state=it(e),this.stateB=it(t),this.active=0;const a=this.level.toWorld(r.x,r.z),o=this.level.toWorld(s.x,s.z),c=this.level.toWorld(e.col,e.row),l=this.level.toWorld(t.col,t.row);this.pivot.visible=!0,this.pivotB.visible=!0,this.pivot.rotation.set(0,0,0),this.pivotB.rotation.set(0,0,0),this.mesh.position.set(0,0,0),this.meshB.position.set(0,0,0),this.mesh.rotation.set(0,0,0),this.meshB.rotation.set(0,0,0),this.mesh.scale.set(1,1,1),this.meshB.scale.set(1,1,1),this.pivot.position.set(a.x,r.y,a.z),this.pivotB.position.set(o.x,s.y,o.z),this.refreshMaterials();const u=Math.max(Math.hypot(c.x-a.x,c.z-a.z),Math.hypot(l.x-o.x,l.z-o.z)),d=Rt(Math.min(460,280+u*50)),h={u:0};this.activeTween=new bt(h,this.tweens).to({u:1},d).easing(mt.Cubic.Out).onUpdate(()=>{const p=h.u,x=Math.sin(Math.PI*p)*.28;this.pivot.position.set(a.x+(c.x-a.x)*p,r.y+(.5-r.y)*p+x,a.z+(c.z-a.z)*p),this.pivotB.position.set(o.x+(l.x-o.x)*p,s.y+(.5-s.y)*p+x,o.z+(l.z-o.z)*p)}).onComplete(()=>{this.activeTween=null,this.placeEntity("a",e,!0),this.placeEntity("b",t,!0),this.canMove=!0,i()}).start()}animateTeleport(e,t){this.canMove=!1,this.stopTween();const i=it(this.state);this.state=it(e),this.stateB=null,this.active=0,this.pivotB.visible=!1;const n=this.centerOf(i,!1),r=this.centerOf(e,!1),s=this.level.toWorld(n.x,n.z),a=this.level.toWorld(r.x,r.z),o=this.sizeOf(i,!1);this.placeEntity("a",i,!1),this.refreshMaterials();const c={u:0},l=Rt(420);this.activeTween=new bt(c,this.tweens).to({u:1},l).easing(mt.Cubic.InOut).onUpdate(()=>{const u=c.u,d=u<.45?1-u/.45*.88:(u-.45)/.55*.88+.12,h=u<.45?0:(u-.45)/.55,p=s.x+(a.x-s.x)*h,x=s.z+(a.z-s.z)*h,y=n.y+(r.y-n.y)*h+Math.sin(Math.PI*h)*.55;this.mesh.scale.set(o.sx*d,o.sy*d,o.sz*d),this.pivot.position.set(p,y,x)}).onComplete(()=>{this.activeTween=null,this.placeEntity("a",e,!1),this.canMove=!0,t()}).start()}splitStartCenters(e,t,i){const n=e.ori==="standing"?[{x:e.col,y:.5,z:e.row},{x:e.col,y:1.5,z:e.row}]:e.ori==="flatX"?[{x:e.col,y:.5,z:e.row},{x:e.col+1,y:.5,z:e.row}]:[{x:e.col,y:.5,z:e.row},{x:e.col,y:.5,z:e.row+1}],r=(a,o)=>(a.x-o.col)**2+(a.z-o.row)**2,s=r(n[0],t)+r(n[1],i);return r(n[0],i)+r(n[1],t)<s?[n[1],n[0]]:[n[0],n[1]]}refreshMaterials(){if(!this.isSplit){this.mesh.material=this.matA;return}this.mesh.material=this.active===0?this.matActive:this.matA,this.meshB.material=this.active===1?this.matActive:this.matB}toggleActive(){this.isSplit&&(this.active=this.active===0?1:0,this.refreshMaterials())}reset(e,t){this.stopTween(),this.canMove=!1,this.placeMerged(e,1);const i=ja(e),n={v:.75};this.mesh.scale.set(i.sx*n.v,i.sy*n.v,i.sz*n.v),new bt(n,this.tweens).to({v:1},Rt(250)).easing(mt.Quadratic.Out).onUpdate(()=>{this.mesh.scale.set(i.sx*n.v,i.sy*n.v,i.sz*n.v)}).onComplete(()=>{this.canMove=!0,t==null||t()}).start()}tryMove(e,t,i){if(!this.canMove)return!1;const n=this.isSplit,r=!n||this.active===0?"a":"b",s=r==="a"?this.state:this.stateB,a=n?id(s,e):td(s,e),o=this.planFlip(s,a,e,r,n);return this.canMove=!1,this.animateFlip(o,()=>{r==="a"?this.state=it(a):this.stateB=it(a),this.placeEntity(r,a,n),this.canMove=!0,t()},i),!0}planFlip(e,t,i,n,r){const s=this.centerOf(e,r);let a={x:s.x,y:0,z:s.z},o="z",c=0;const l=.5;i==="left"?(o="z",c=Math.PI/2,r||e.ori==="standing"?a={x:s.x-l,y:0,z:s.z}:e.ori==="flatX"?a={x:s.x-1,y:0,z:s.z}:a={x:s.x-l,y:0,z:s.z}):i==="right"?(o="z",c=-Math.PI/2,r||e.ori==="standing"?a={x:s.x+l,y:0,z:s.z}:e.ori==="flatX"?a={x:s.x+1,y:0,z:s.z}:a={x:s.x+l,y:0,z:s.z}):i==="up"?(o="x",c=-Math.PI/2,r||e.ori==="standing"?a={x:s.x,y:0,z:s.z-l}:e.ori==="flatZ"?a={x:s.x,y:0,z:s.z-1}:a={x:s.x,y:0,z:s.z-l}):(o="x",c=Math.PI/2,r||e.ori==="standing"?a={x:s.x,y:0,z:s.z+l}:e.ori==="flatZ"?a={x:s.x,y:0,z:s.z+1}:a={x:s.x,y:0,z:s.z+l});const u=this.level.toWorld(a.x,a.z);return{pivotWorld:{x:u.x,y:0,z:u.z},axis:o,angle:c,next:t,target:n,asCube:r}}animateFlip(e,t,i){const n=e.target==="a"?this.state:this.stateB,r=this.sizeOf(n,e.asCube),s=this.centerOf(n,e.asCube),a=this.level.toWorld(s.x,s.z),o=e.target==="a"?this.pivot:this.pivotB,c=e.target==="a"?this.mesh:this.meshB;o.position.set(e.pivotWorld.x,e.pivotWorld.y,e.pivotWorld.z),o.rotation.set(0,0,0),c.position.set(a.x-e.pivotWorld.x,s.y-e.pivotWorld.y,a.z-e.pivotWorld.z),c.scale.set(r.sx,r.sy,r.sz);const l={x:0,y:0,z:0},u=e.axis==="z"?{z:e.angle}:{x:e.angle};this.activeTween=new bt(l,this.tweens).to(u,Rt(230)).easing(mt.Cubic.In).onUpdate(()=>{o.rotation.set(l.x,l.y,l.z)}).onComplete(()=>{this.activeTween=null,i==null||i(),t()}).start()}fall(e){this.canMove=!1,this.stopTween();const t={v:1,y:0},i=[this.mesh,...this.pivotB.visible?[this.meshB]:[]],n=[this.pivot,...this.pivotB.visible?[this.pivotB]:[]],r=i.map(a=>({x:a.scale.x,y:a.scale.y,z:a.scale.z})),s=n.map(a=>a.position.y);new bt(t,this.tweens).to({v:0,y:-1.2},Rt(340)).easing(mt.Quadratic.In).onUpdate(()=>{i.forEach((a,o)=>a.scale.set(r[o].x*t.v,r[o].y*t.v,r[o].z*t.v)),n.forEach((a,o)=>{a.position.y=s[o]+t.y})}).onComplete(e).start()}win(e){this.canMove=!1,this.stopTween();const t=this.pivot.position.y,i={y:t,spin:0},n=this.mesh.scale.x,r=this.mesh.scale.y,s=this.mesh.scale.z,a=new bt(i,this.tweens).to({y:t+.85,spin:Math.PI*1.5},Rt(520)).easing(mt.Cubic.Out).onUpdate(()=>{this.pivot.position.y=i.y,this.pivot.rotation.y=i.spin}),o={v:1},c=new bt(o,this.tweens).to({v:0},Rt(300)).easing(mt.Quadratic.In).onUpdate(()=>this.mesh.scale.set(n*o.v,r*o.v,s*o.v)).onComplete(e);a.chain(c).start()}stopTween(){this.activeTween&&(this.activeTween.stop(),this.activeTween=null)}},dr=[{map:["@xxxxxxoo"],chapter:"基础"},{map:["@xxxxxx","......x","......x","......x","...o..x","...o..x","...xxxx"],chapter:"基础"},{map:["@xxxxxx.x","........x","........x",".ooxx.xxx","........."],chapter:"基础"},{map:["......xx..","..........","@xxxxxxxoo"],chapter:"基础"},{map:[".........xx","@xooxxxxxxx"],chapter:"基础"},{map:["@xoo",".xxx"],chapter:"基础"},{map:["..o","@xo","x.x"],chapter:"基础"},{map:["zz....","xx....","x@.xoo"],chapter:"基础",hint:"别让砖块落到红色区域。"},{map:["....xx.","....xx.","....xx.","....x..",".......","@xxxxxx",".....oo"],chapter:"基础"},{map:["@.x....",".x.x...","....x.x",".o.x.x.",".ox.x.x"],chapter:"基础"},{map:["xxxxxx","xxx..x","x....x","x.oo.x","x..x.x","x..x.x","@..xxx"],chapter:"基础"},{map:["@.x.xxx.x.x","xxx.x.x.x.x",".x..xxx.xxx","...........","x.x..x..xxx","xxx..x..x.o","xxx..x..x.o"],chapter:"基础"},{map:["@xxxx","x.z.x","x.z.x","x...x","x.oox","xxxxx"],chapter:"基础"},{map:["@xxxxx","x...x.","x.x.x.","x.x.oo","x.xxx."],chapter:"基础"},{map:["..x..x..","@xxxxxx.","..x..x.x",".....x.x",".z...x.x",".z.oox.x","...xxxx."],chapter:"基础"},{map:["@xx","xff",".oo"],chapter:"脆弱",hint:"橙色砖只能横躺通过；竖着站上去会碎。"},{map:["@x.x","xff.","..oo"],chapter:"脆弱"},{map:["@xff","x..x",".xoo"],chapter:"脆弱"},{map:["@xxx","xffx","..oo"],chapter:"脆弱"},{map:["@xxf","xf.x","x..x","..oo"],chapter:"脆弱"},{map:["@fxx","xff.x","x..x",".xoo"],chapter:"脆弱"},{map:["@xxf","xff.x","x..x","..oo"],chapter:"脆弱"},{map:["@xfxx","xff.x","x..x","..oo"],chapter:"脆弱"},{map:["@sbboo"],chapter:"桥梁",hint:"踩上黄色按钮，会开关隐藏的蓝桥。",bridges:[{id:"A",cells:[[2,0],[3,0]],initiallyOpen:!1}],switches:[{col:1,row:0,type:"soft",bridgeIds:["A"],mode:"toggle"}]},{map:["@xxs","xbb.","..oo"],chapter:"桥梁",bridges:[{id:"A",cells:[[1,1],[2,1]],initiallyOpen:!1}],switches:[{col:3,row:0,type:"soft",bridgeIds:["A"],mode:"toggle"}]},{map:["@xxs","bb..","xxoo"],chapter:"桥梁",bridges:[{id:"A",cells:[[0,1],[1,1]],initiallyOpen:!1}],switches:[{col:3,row:0,type:"soft",bridgeIds:["A"],mode:"toggle"}]},{map:["@x.s","bb.x","x.oo"],chapter:"桥梁",bridges:[{id:"A",cells:[[0,1],[1,1]],initiallyOpen:!1}],switches:[{col:3,row:0,type:"soft",bridgeIds:["A"],mode:"toggle"}]},{map:["@x.s","xbb.","x.oo"],chapter:"桥梁",bridges:[{id:"A",cells:[[1,1],[2,1]],initiallyOpen:!1}],switches:[{col:3,row:0,type:"soft",bridgeIds:["A"],mode:"toggle"}]},{map:["@xxs",".bb.","x.oo"],chapter:"桥梁",bridges:[{id:"A",cells:[[1,1],[2,1]],initiallyOpen:!1}],switches:[{col:3,row:0,type:"soft",bridgeIds:["A"],mode:"toggle"}]},{map:["@xs.","xbb.","..oo"],chapter:"桥梁",bridges:[{id:"A",cells:[[1,1],[2,1]],initiallyOpen:!1}],switches:[{col:2,row:0,type:"soft",bridgeIds:["A"],mode:"toggle"}]},{map:["@s..","xbbx","x.oo"],chapter:"桥梁",bridges:[{id:"A",cells:[[1,1],[2,1]],initiallyOpen:!1}],switches:[{col:1,row:0,type:"soft",bridgeIds:["A"],mode:"toggle"}]},{map:["@..x","xxSx","bb.x","..oo"],chapter:"桥梁",hint:"橙色按钮要竖着踩上去，才会开关蓝桥。",bridges:[{id:"A",cells:[[0,2],[1,2]],initiallyOpen:!1}],switches:[{col:2,row:1,type:"hard",bridgeIds:["A"],mode:"toggle"}]},{map:["@xxx","..Sx","bb.x","..oo"],chapter:"桥梁",bridges:[{id:"A",cells:[[0,2],[1,2]],initiallyOpen:!1}],switches:[{col:2,row:1,type:"hard",bridgeIds:["A"],mode:"toggle"}]},{map:["@x.x","xS..","bb.x","..oo"],chapter:"桥梁",bridges:[{id:"A",cells:[[0,2],[1,2]],initiallyOpen:!1}],switches:[{col:1,row:1,type:"hard",bridgeIds:["A"],mode:"toggle"}]},{map:["@xxS","....","bb.x","..oo"],chapter:"桥梁",bridges:[{id:"A",cells:[[0,2],[1,2]],initiallyOpen:!1}],switches:[{col:3,row:0,type:"hard",bridgeIds:["A"],mode:"toggle"}]},{map:["@x.x","x.Sx","bb.x","x.oo"],chapter:"桥梁",bridges:[{id:"A",cells:[[0,2],[1,2]],initiallyOpen:!1}],switches:[{col:2,row:1,type:"hard",bridgeIds:["A"],mode:"toggle"}]},{map:["@sbb.","xxSbb","...oo"],chapter:"桥梁",bridges:[{id:"A",cells:[[2,0],[3,0]],initiallyOpen:!1},{id:"B",cells:[[3,1],[4,1]],initiallyOpen:!1}],switches:[{col:1,row:0,type:"soft",bridgeIds:["A"],mode:"toggle"},{col:2,row:1,type:"hard",bridgeIds:["B"],mode:"toggle"}]},{map:["@pxxx","x...x","xx.oo"],chapter:"分裂",hint:"碰到紫砖会分成两块。按“切换”换一块控制；两块相遇会合成一块。",splitPads:[{col:1,row:0,destA:[0,1],destB:[4,1]}]},{map:["@xpxx","x...x","xx.oo"],chapter:"分裂",splitPads:[{col:2,row:0,destA:[0,1],destB:[4,1]}]},{map:["@xxpx","x...x","xx.oo"],chapter:"分裂",splitPads:[{col:3,row:0,destA:[0,1],destB:[4,1]}]},{map:["@p.xx","x..x.","x..x.","x.oo."],chapter:"分裂",splitPads:[{col:1,row:0,destA:[0,2],destB:[3,2]}]},{map:["@x.px","x..x.","x..xx","..oo."],chapter:"分裂",splitPads:[{col:3,row:0,destA:[0,1],destB:[3,1]}]},{map:["@xxxp","x...x","x.z.x","xx.oo"],chapter:"分裂",splitPads:[{col:4,row:0,destA:[0,1],destB:[4,1]}]},{map:["@pxxx","x.z.x","x...x","xx.oo"],chapter:"分裂",splitPads:[{col:1,row:0,destA:[0,2],destB:[4,2]}]},{map:["@xpx.","x..x.","x..x.","x.oo."],chapter:"分裂",splitPads:[{col:2,row:0,destA:[0,1],destB:[3,2]}]},{map:["@x.px","xxxxx","x...x","xx.oo"],chapter:"分裂",splitPads:[{col:3,row:0,destA:[0,2],destB:[4,2]}]},{map:["@x.px","x.z.x","xxxxx","xx.oo"],chapter:"分裂",splitPads:[{col:3,row:0,destA:[0,2],destB:[4,2]}]},{map:["@xp.x","x.z.x","x...x","xx.oo"],chapter:"分裂",splitPads:[{col:2,row:0,destA:[0,1],destB:[4,1]}]},{layers:[["@xu","xxx"],[".xu","oo."]],chapter:"多层",hint:"竖着踩蓝色砖，会切换到另一层。"},{layers:[["@xux","xxxx"],[".xux","oo.."]],chapter:"多层"},{layers:[["@xuxx","xxxxx"],[".xuxx","oo..."]],chapter:"多层"},{layers:[["@xu.x","xxxx."],[".xu.x","oo.x."]],chapter:"多层"},{layers:[["@xux.","x.x.x","xxxxx"],[".xux.","x...x","oo..."]],chapter:"多层"},{layers:[["@xux.","x.x.x","zxxxx"],[".xux.","x...x","oo..."]],chapter:"多层"},{layers:[["@xux.","xf.xx","xxxxx"],[".xux.","x...x","oo..."]],chapter:"多层"},{map:["@xxt..xoo"],chapter:"传送",hint:"竖着踩上青色砖，整块砖会出现在另一边。",teleports:[{dest:[6,0]}]},{map:["@xx...","x.x...","xxt..xoo"],chapter:"传送",teleports:[{dest:[5,2]}]},{map:["@xx...","xxx...","xxt..xoo"],chapter:"传送",teleports:[{dest:[5,2]}]},{map:["@xx...",".xx...","xxt..xoo"],chapter:"传送",teleports:[{dest:[5,2]}]},{map:["@x.x..","xxx...","xxt..xoo"],chapter:"传送",teleports:[{dest:[5,2]}]},{map:["@xxx..","x.x...","xxt..xoo"],chapter:"传送",teleports:[{dest:[5,2]}]},{map:["@xxt..xxxt..xoo"],chapter:"传送",teleports:[{dest:[6,0]},{dest:[12,0]}]},{map:["@x....","x.xx..","x.t..xoo"],chapter:"传送",teleports:[{dest:[5,2]}]},{map:["@xxx..","x.....","xxt..xoo"],chapter:"传送",teleports:[{dest:[5,2]}]},{map:["@xx...","x..x..","xxt..xoo"],chapter:"传送",teleports:[{dest:[5,2]}]},{map:["@xxz..","x.x...","xxt..xoo"],chapter:"传送",teleports:[{dest:[5,2]}]},{map:["@xx...","x.t..xoo","x...z..."],chapter:"传送",teleports:[{dest:[5,1]}]},{map:["@xx...","x.f...","xxt..xoo"],chapter:"传送",teleports:[{dest:[5,2]}]},{map:["@cc","..x",".oo"],chapter:"崩塌",hint:"灰色裂砖离开后会塌掉，别把自己堵死。"},{map:["@cc.",".xx.",".oo."],chapter:"崩塌"},{map:["@xcc",".xxx",".xoo"],chapter:"崩塌"},{map:["@cccx",".xxx.",".xoo."],chapter:"崩塌"},{map:["@xccc",".xxxx",".xxoo"],chapter:"崩塌"},{map:["@cc.c","xx.xx",".xoo."],chapter:"崩塌"},{map:["@cccc","x.xxx","..xoo"],chapter:"崩塌"},{map:["@xccx","cxxxx","..xoo"],chapter:"崩塌"},{map:["@ccc.",".x.x.",".xoo."],chapter:"崩塌"},{map:["@xccc",".xxxz",".xxoo"],chapter:"崩塌"}],Yt=dr.length;function ps(e){return dr[e]}function eo(e){var t;const i={};for(const n of(t=e.bridges)!==null&&t!==void 0?t:[])i[n.id]=n.initiallyOpen;return i}function to(){return{}}function io(e,t,i){return{block:{col:t,row:i,ori:"standing"},blockB:null,active:0,bridges:eo(e),collapsed:to(),layer:0}}var gd=class{constructor(){he(this,"handler",null),he(this,"enabled",!0),he(this,"onKey",e=>{if(!this.enabled)return;const t={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"up",ArrowDown:"down",a:"left",A:"left",d:"right",D:"right",w:"up",W:"up",s:"down",S:"down"}[e.key];t&&(e.preventDefault(),this.emit(t))}),window.addEventListener("keydown",this.onKey);for(const e of["pad-up","pad-down","pad-left","pad-right"]){const t=document.getElementById(e);t==null||t.addEventListener("pointerdown",i=>{i.preventDefault();const n=t.dataset.dir;this.emit(n)})}}onMove(e){this.handler=e}setEnabled(e){this.enabled=e}emit(e){!this.enabled||!this.handler||this.handler(e)}},vd=class{constructor(){he(this,"ctx",null),he(this,"muted",!1)}ensure(){if(this.muted)return null;if(!this.ctx){const e=window.AudioContext||window.webkitAudioContext;this.ctx=new e}return this.ctx.state==="suspended"&&this.ctx.resume(),this.ctx}unlock(){this.ensure()}setMuted(e){this.muted=e}beep(e,t,i=.25,n="sine"){const r=this.ensure();if(!r)return;const s=r.createOscillator(),a=r.createGain();s.type=n,s.frequency.value=e,a.gain.value=i,s.connect(a),a.connect(r.destination);const o=r.currentTime;a.gain.setValueAtTime(i,o),a.gain.exponentialRampToValueAtTime(.001,o+t/1e3),s.start(o),s.stop(o+t/1e3)}move(){this.beep(190+Math.random()*25,45,.16,"triangle")}land(){this.beep(120,35,.14,"sine")}fail(){this.beep(140,80,.22,"sawtooth"),setTimeout(()=>this.beep(90,200,.2,"sine"),70)}win(){[262,330,392,523,659].forEach((e,t)=>{setTimeout(()=>this.beep(e,140,.18,"triangle"),t*85)})}clearLevel(){this.beep(440,60,.14,"sine"),setTimeout(()=>this.beep(554,90,.16,"sine"),70)}},_d=[5,11,12,8,14,7,6,10,19,14,19,14,12,6,13,3,6,6,6,7,4,7,7,3,10,10,9,10,11,8,10,14,16,11,12,17,10,7,7,8,10,9,10,10,8,8,6,9,6,6,6,6,7,8,7,3,9,9,9,9,9,5,9,9,9,9,8,9,3,3,9,9,8,6,8,7,9,8];function xd(e){var t;return(t=_d[e-1])!==null&&t!==void 0?t:Number.POSITIVE_INFINITY}var no=Yt*3;function Md(e,t){const i=xd(t);return e<=i?3:e<=i+3?2:1}function ro(e){return e.reduce((t,i)=>t+(Number(i)||0),0)}function fr(){return Array.from({length:Yt},()=>0)}var so="fan-zhuan-kuai-progress-v3",Sd=["fan-zhuan-kuai-progress-v2","fan-zhuan-kuai-progress-v1"],ao={maxCleared:0,lastPlayed:1,muted:!1,stars:fr()};function yd(e,t){const i=fr();if(Array.isArray(e)){for(let n=0;n<Yt;n++){const r=Math.floor(Number(e[n])||0);i[n]=Math.min(3,Math.max(0,r))}return i}for(let n=0;n<t;n++)i[n]=1;return i}function Ed(){try{let e=localStorage.getItem(so);for(const n of Sd){if(e)break;e=localStorage.getItem(n)}if(!e)return{...ao,stars:fr()};const t=JSON.parse(e),i=Number(t.maxCleared)||0;return{maxCleared:i,lastPlayed:Number(t.lastPlayed)||1,muted:!!t.muted,stars:yd(t.stars,i)}}catch{return{...ao,stars:fr()}}}function ms(e){try{localStorage.setItem(so,JSON.stringify(e))}catch{}}function Td(e,t,i){var n;const r={...e,stars:e.stars.slice()},s=t-1;return s<0||s>=Yt||(r.stars[s]=Math.max((n=r.stars[s])!==null&&n!==void 0?n:0,i)),r}function bd(e,t){return e<=t||e===t+1}function Ad(e,t){return!bd(e,t)}var oo="http://www.w3.org/2000/svg",wd={"icon-lock":'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',"icon-grid":'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',"icon-undo":'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 1 1 0 11H12"/>',"icon-restart":'<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/>',"icon-swap":'<path d="M16 3h5v5"/><path d="M8 21H3v-5"/><path d="M21 3 14 10"/><path d="m3 21 7-7"/><rect x="8.5" y="8.5" width="3" height="3" rx="0.5"/><rect x="12.5" y="12.5" width="3" height="3" rx="0.5"/>',"icon-sound":'<path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',"icon-mute":'<path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="m22 9-6 6"/><path d="m16 9 6 6"/>',"icon-star":'<path d="M12 3.2 14.4 9l6.1.5-4.7 3.9 1.5 5.9L12 15.8 6.7 19.3l1.5-5.9L3.5 9.5 9.6 9z"/>',"icon-check":'<path d="M5 13.5 9.5 18 19 7"/>'};function Pn(e,t="icon"){var i;const n=document.createElementNS(oo,"svg");n.setAttribute("class",t),n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("aria-hidden","true"),n.setAttribute("focusable","false");const r="2",s=(i=wd[e])!==null&&i!==void 0?i:"",a=new DOMParser().parseFromString(`<svg xmlns="${oo}">${s}</svg>`,"image/svg+xml").documentElement;if(a.querySelector("parsererror"))return n;for(const o of Array.from(a.childNodes)){const c=document.importNode(o,!0);if(c.nodeType===Node.ELEMENT_NODE){const l=c;l.setAttribute("stroke","currentColor"),l.setAttribute("stroke-width",r),l.setAttribute("stroke-linecap","round"),l.setAttribute("stroke-linejoin","round"),l.setAttribute("fill",e==="icon-star"?"currentColor":"none")}n.appendChild(c)}return n}function Dt(e){const t=document.getElementById(e);if(!t)throw new Error(`缺少页面元素 #${e}，请强制刷新后重试`);return t}function lo(e,t,i,n,r){if(!e)return;const s=document.createElement("span");s.className="select-stat-nums";const a=document.createElement("strong");a.textContent=String(n);const o=document.createElement("span");o.className="select-stat-sep",o.textContent="/";const c=document.createElement("span");c.className="select-stat-cap",c.textContent=String(r),s.append(a,o,c);const l=document.createElement("span");l.className="select-stat-meta";const u=document.createElement("span");u.className="select-stat-label",u.textContent=i,l.append(u,s),e.replaceChildren(Pn(t,"select-stat-icon"),l),e.setAttribute("aria-label",`${i} ${n} / ${r}`)}function Rd(e,t){const i=document.createElement("span");i.className=t;for(let n=0;n<3;n++){const r=Pn("icon-star",n<e?"cell-star lit":"cell-star");i.append(r)}return i}function In(e,t,i){e.replaceChildren(),e.append(Pn(t)),e.classList.add("btn-icon"),e.setAttribute("aria-label",i),e.title=i}function Cd(){const e=[];let t="",i=1;for(let r=0;r<Yt;r++){var n;const s=(n=dr[r].chapter)!==null&&n!==void 0?n:"关卡";s!==t&&(t&&e.push({name:t,start:i,end:r}),t=s,i=r+1)}return t&&e.push({name:t,start:i,end:Yt}),e}var Pd=class{constructor(){he(this,"levelLabel",Dt("level-label")),he(this,"movesLabel",Dt("moves-label")),he(this,"muteBtn",Dt("btn-mute")),he(this,"hintEl",document.getElementById("hint-mechanic")),he(this,"fanfareEl",document.getElementById("clear-fanfare")),he(this,"fanfareStars",document.getElementById("clear-stars")),he(this,"fanfareCaption",document.getElementById("clear-caption")),he(this,"swapBtn",document.getElementById("btn-swap")),In(Dt("btn-select"),"icon-grid","选关"),In(Dt("btn-undo"),"icon-undo","撤销"),In(Dt("btn-restart"),"icon-restart","重来"),this.swapBtn&&In(this.swapBtn,"icon-swap","切换")}setLevel(e){this.levelLabel.textContent=`第 ${e} / ${Yt} 关`}setMoves(e){this.movesLabel.textContent=`步数 ${e}`}setMuted(e){In(this.muteBtn,e?"icon-mute":"icon-sound","声音"),this.muteBtn.setAttribute("aria-pressed",e?"true":"false")}setHint(e){this.hintEl&&(e?(this.hintEl.textContent=e,this.hintEl.classList.remove("hidden")):(this.hintEl.textContent="",this.hintEl.classList.add("hidden")))}showClear(e,t){if(!(!this.fanfareEl||!this.fanfareStars||!this.fanfareCaption)){this.fanfareStars.replaceChildren();for(let i=0;i<3;i++){const n=Pn("icon-star",i<e?"clear-star lit":"clear-star");this.fanfareStars.append(n)}this.fanfareCaption.textContent=`本关用了 ${t} 步，顺利到家！`,this.fanfareEl.classList.remove("hidden")}}hideClear(){var e,t;(e=this.fanfareEl)===null||e===void 0||e.classList.add("hidden"),(t=this.fanfareStars)===null||t===void 0||t.replaceChildren(),this.fanfareCaption&&(this.fanfareCaption.textContent="")}setSwapVisible(e){this.swapBtn&&this.swapBtn.classList.toggle("hidden",!e)}},Id=class{constructor(){he(this,"overlay",Dt("overlay")),he(this,"panelSelect",Dt("panel-select")),he(this,"panelWin",Dt("panel-win")),he(this,"chaptersEl",Dt("level-chapters")),he(this,"progressEl",document.getElementById("select-progress")),he(this,"starsEl",document.getElementById("select-stars")),he(this,"winText",Dt("win-text")),he(this,"onPick",null),he(this,"current",1),he(this,"progress",{maxCleared:0,lastPlayed:1,muted:!1,stars:Array.from({length:Yt},()=>0)}),Dt("btn-close-select").addEventListener("click",()=>this.hide()),Dt("btn-win-select").addEventListener("click",()=>{this.hideWin(),this.show(this.current,this.progress)}),window.addEventListener("keydown",e=>{if(e.key==="Escape"&&!this.overlay.classList.contains("hidden")){if(e.preventDefault(),!this.panelWin.classList.contains("hidden")){this.hide();return}this.hide()}})}onSelect(e){this.onPick=e}show(e,t){this.current=e,this.progress=t,this.overlay.classList.remove("hidden"),this.overlay.inert=!1,this.overlay.setAttribute("aria-hidden","false"),this.panelSelect.classList.remove("hidden"),this.panelWin.classList.add("hidden"),this.render()}hide(){var e;this.releaseFocusFromOverlay(),this.overlay.classList.add("hidden"),this.overlay.inert=!0,this.overlay.setAttribute("aria-hidden","true"),this.panelSelect.classList.add("hidden"),this.panelWin.classList.add("hidden"),(e=document.getElementById("btn-select"))===null||e===void 0||e.focus({preventScroll:!0})}showWin(e,t){this.progress=t,this.overlay.classList.remove("hidden"),this.overlay.inert=!1,this.overlay.setAttribute("aria-hidden","false"),this.panelSelect.classList.add("hidden"),this.panelWin.classList.remove("hidden");const i=ro(t.stars);this.winText.textContent=`共走 ${e} 步，点亮 ${i} / ${no} 颗星。`}hideWin(){this.panelWin.classList.add("hidden")}releaseFocusFromOverlay(){const e=document.activeElement;e instanceof HTMLElement&&this.overlay.contains(e)&&e.blur()}render(){const e=this.progress.maxCleared;lo(this.progressEl,"icon-check","已通关",e,Yt),lo(this.starsEl,"icon-star","星星",ro(this.progress.stars),no),this.chaptersEl.replaceChildren();for(const t of Cd()){const i=document.createElement("section");i.className="level-chapter";const n=document.createElement("header");n.className="chapter-head";const r=document.createElement("span");r.className="chapter-name",r.textContent=t.name;const s=document.createElement("span");s.className="chapter-range",s.textContent=`${t.start}–${t.end}`,n.append(r,s),i.appendChild(n);const a=document.createElement("div");a.className="level-grid";for(let o=t.start;o<=t.end;o++)a.appendChild(this.makeCell(o,e));i.appendChild(a),this.chaptersEl.appendChild(i)}}makeCell(e,t){const i=document.createElement("button");i.type="button",i.className="level-cell";const n=Ad(e,t),r=document.createElement("span");if(r.className="level-num",r.textContent=String(e),n)i.classList.add("locked"),i.append(r,Pn("icon-lock","icon icon-badge")),i.title="先完成前面的关卡",i.setAttribute("aria-label",`第 ${e} 关已锁定`);else if(e<=t){var s;const a=(s=this.progress.stars[e-1])!==null&&s!==void 0?s:1;i.classList.add("cleared"),i.append(r,Rd(a,"cell-stars")),i.setAttribute("aria-label",`第 ${e} 关，已通关，${a} 星`)}else i.classList.add("next"),i.append(r),i.setAttribute("aria-label",`第 ${e} 关，可挑战`);return e===this.current&&i.classList.add("current"),i.addEventListener("click",()=>{var a;if(n){i.animate([{transform:"translateX(0)"},{transform:"translateX(-4px)"},{transform:"translateX(4px)"},{transform:"translateX(0)"}],{duration:200});return}this.hide(),(a=this.onPick)===null||a===void 0||a.call(this,e)}),i}},Ld=class{constructor(){var e;he(this,"tweens",new _s),he(this,"sceneSetup",void 0),he(this,"level",void 0),he(this,"player",void 0),he(this,"input",new gd),he(this,"sfx",new vd),he(this,"hud",new Pd),he(this,"select",new Id),he(this,"progress",void 0),he(this,"levelNo",1),he(this,"moves",0),he(this,"totalMoves",0),he(this,"history",[]),he(this,"world",io(dr[0],0,0)),he(this,"busy",!1),he(this,"loop",n=>{requestAnimationFrame(this.loop),this.tweens.update(n),this.sceneSetup.renderer.render(this.sceneSetup.scene,this.sceneSetup.camera)});const t=document.getElementById("game-canvas");this.sceneSetup=ju(t),this.level=new pd(this.sceneSetup.scene,this.tweens),this.player=new md(this.sceneSetup.scene,this.level,this.tweens),this.progress=Ed(),this.sfx.setMuted(this.progress.muted),this.hud.setMuted(this.progress.muted),this.input.onMove(n=>this.handleDir(n)),this.select.onSelect(n=>this.loadLevel(n)),document.getElementById("btn-select").addEventListener("click",()=>{this.select.show(this.levelNo,this.progress)}),document.getElementById("btn-undo").addEventListener("click",()=>this.undo()),document.getElementById("btn-restart").addEventListener("click",()=>this.restart()),document.getElementById("btn-mute").addEventListener("click",()=>this.toggleMute()),(e=document.getElementById("btn-swap"))===null||e===void 0||e.addEventListener("click",()=>this.swapEntity()),window.addEventListener("keydown",n=>{(n.key==="r"||n.key==="R")&&this.restart(),(n.key==="z"||n.key==="Z"||n.key==="Backspace")&&(n.preventDefault(),this.undo()),(n.key===" "||n.code==="Space")&&(n.preventDefault(),this.swapEntity())});const i=Math.min(Math.max(1,this.progress.lastPlayed),this.progress.maxCleared+1,Yt);this.loadLevel(i),requestAnimationFrame(this.loop)}snapshot(){return{block:it(this.player.state),blockB:this.player.stateB?it(this.player.stateB):null,active:this.player.active,bridges:{...this.world.bridges},collapsed:{...this.world.collapsed},layer:this.world.layer}}applySnapshot(e){this.world={block:it(e.block),blockB:e.blockB?it(e.blockB):null,active:e.active,bridges:{...e.bridges},collapsed:{...e.collapsed},layer:e.layer},e.blockB?this.player.placeSplit(e.block,e.blockB,e.active):this.player.placeMerged(e.block),this.level.syncBridges(e.bridges),this.level.syncCollapsed(e.collapsed)}loadLevel(e){var t;this.busy=!1,this.levelNo=e,this.moves=0,this.history=[],this.progress.lastPlayed=e,ms(this.progress);const i=ps(e-1),n=eo(i),r=to();this.level.load(i,0,n,r),this.world=io(i,this.level.startCol,this.level.startRow),this.world.bridges=n,this.world.collapsed=r,this.player.reset(this.world.block),this.hud.setLevel(e),this.hud.setMoves(0);const s=(t=i.hint)!==null&&t!==void 0?t:e===1?"把砖块翻进绿色终点。":"";this.hud.setHint(s),this.hud.hideClear(),this.hud.setSwapVisible(!1),this.input.setEnabled(!0)}handleDir(e){if(this.sfx.unlock(),this.busy||!this.player.canMove)return;const t=this.snapshot();this.player.tryMove(e,()=>this.afterMove(t),()=>this.sfx.land())&&this.sfx.move()}punchCamera(){const e=this.sceneSetup.cameraPivot,t=e.position.y,i={y:t};new bt(i,this.tweens).to({y:t+.18},Rt(140)).easing(mt.Quadratic.Out).yoyo(!0).repeat(1).onUpdate(()=>{e.position.y=i.y}).onComplete(()=>{e.position.y=t}).start()}swapEntity(){this.busy||!this.player.isSplit||(this.player.toggleActive(),this.world.active=this.player.active,this.sfx.beep(240,40,.12))}afterMove(e){this.history.push(e),this.history.length>50&&this.history.shift(),this.moves++,this.totalMoves++,this.hud.setMoves(this.moves);const t=ps(this.levelNo-1),i=this.level.parsed;let n={...this.world.bridges},r={...this.world.collapsed};const s=e.blockB?e.active===0?e.block:e.blockB:e.block,a=Ft(s),o=this.player.isSplit?this.player.active===0?this.player.state:this.player.stateB:this.player.state;n=hd(i,o,n,this.player.isSplit),this.world.bridges=n,this.level.syncBridges(n);const c=ud(i,this.player.state,this.player.isSplit);if(c){const d=Ft(c);r=fs(i,a,d,r),this.world.collapsed=r,this.level.syncCollapsed(r),this.busy=!0,this.input.setEnabled(!1),this.sfx.beep(560,70,.16,"sine"),this.player.animateTeleport(c,()=>{if(this.world.block=it(this.player.state),this.world.blockB=null,this.world.active=0,this.busy=!1,this.input.setEnabled(!0),this.level.isDeath(this.player.state,n,r)){this.onDeath();return}this.level.isWin(this.player.state,n,r)&&this.onWin()}),this.world.block=it(c);return}if(!this.player.isSplit&&i.splitPads.length){const d=Ft(this.player.state);for(const h of i.splitPads)if(d.some(p=>p.col===h.col&&p.row===h.row)){const p={col:h.destA[0],row:h.destA[1],ori:"standing"},x={col:h.destB[0],row:h.destB[1],ori:"standing"},y=[...Ft(p),...Ft(x)];r=fs(i,a,y,r),this.world.collapsed=r,this.level.syncCollapsed(r),this.busy=!0,this.input.setEnabled(!1),this.sfx.beep(320,80,.2),this.player.animateSplit(p,x,()=>{this.world.block=it(this.player.state),this.world.blockB=this.player.stateB?it(this.player.stateB):null,this.world.active=this.player.active,this.hud.setSwapVisible(!0),this.busy=!1,this.input.setEnabled(!0),(this.cubeDead(this.player.state)||this.player.stateB&&this.cubeDead(this.player.stateB))&&this.onDeath()}),this.world.block=it(p),this.world.blockB=it(x),this.world.active=0;return}}if(this.player.isSplit&&this.player.stateB&&nd(this.player.state,this.player.stateB)){const d=rd(this.player.state,this.player.stateB);this.player.placeMerged(d),this.world.block=it(d),this.world.blockB=null,this.hud.setSwapVisible(!1),this.sfx.beep(400,60,.18)}if(t.layers&&t.layers.length>1&&!this.player.isSplit&&Ft(this.player.state).some(d=>ds(i,d.col,d.row)==="u")&&this.player.state.ori==="standing"){const d=(this.world.layer+1)%t.layers.length;d!==this.world.layer&&(this.world.layer=d,this.level.setLayer(d,this.world.bridges,r),this.player.placeMerged(this.player.state),this.sfx.beep(280,70,.15))}const l=this.player.stateB?[...Ft(this.player.state),...Ft(this.player.stateB)]:Ft(this.player.state),u=this.world.collapsed;if(r=fs(i,a,l,u),r!==u&&(this.world.collapsed=r,this.level.syncCollapsed(r),this.sfx.beep(150,50,.12,"triangle")),this.world.block=it(this.player.state),this.world.blockB=this.player.stateB?it(this.player.stateB):null,this.world.active=this.player.active,this.player.isSplit){const d=this.cubeDead(this.player.state),h=this.cubeDead(this.player.stateB);if(d||h){this.onDeath();return}return}if(this.level.isDeath(this.player.state,n,r)){this.onDeath();return}this.level.isWin(this.player.state,n,r)&&this.onWin()}cubeDead(e){const t=on(this.level.parsed,e.col,e.row,this.world.bridges,this.world.collapsed);return t==="."||t==="z"}onDeath(){this.busy=!0,this.input.setEnabled(!1),this.sfx.fail(),this.level.shake(),this.player.fall(()=>{this.history=[],this.moves=0,this.hud.setMoves(0),this.loadLevel(this.levelNo),this.busy=!1})}onWin(){this.busy=!0,this.input.setEnabled(!1),this.sfx.win(),this.punchCamera();const e=this.moves,t=Md(e,this.levelNo);this.progress=Td(this.progress,this.levelNo,t),this.levelNo>this.progress.maxCleared&&(this.progress.maxCleared=this.levelNo),ms(this.progress),this.hud.showClear(t,e),this.player.win(()=>{if(this.levelNo>=Yt){this.hud.hideClear(),this.select.showWin(this.totalMoves,this.progress),this.busy=!1;return}this.sfx.clearLevel(),window.setTimeout(()=>{this.hud.hideClear(),this.level.remove(()=>{this.loadLevel(this.levelNo+1),this.busy=!1})},800)})}undo(){if(this.busy||!this.player.canMove)return;const e=this.history.pop();e&&(this.moves=Math.max(0,this.moves-1),this.hud.setMoves(this.moves),ps(this.levelNo-1).layers&&e.layer!==this.world.layer&&this.level.setLayer(e.layer,e.bridges,e.collapsed),this.applySnapshot(e),this.hud.setSwapVisible(!!e.blockB),this.sfx.beep(160,40,.15))}restart(){this.busy||this.loadLevel(this.levelNo)}toggleMute(){this.progress.muted=!this.progress.muted,this.sfx.setMuted(this.progress.muted),this.hud.setMuted(this.progress.muted),ms(this.progress)}};try{new Ld}catch(e){const t=e instanceof Error?e.message:String(e);console.error("[翻砖块]",t,e);const i=document.createElement("div");i.setAttribute("role","alert"),i.style.cssText="position:fixed;inset:12px;z-index:99;padding:16px;border-radius:12px;background:#fff;color:#c0392b;font:600 14px/1.5 sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.2);white-space:pre-wrap",i.textContent=t.includes("WebGL")?"暂时无法显示立体画面。请换用较新的浏览器，或在浏览器设置中打开硬件加速后重试。":"游戏暂时无法启动。请刷新页面后再试。",document.body.appendChild(i)}})();
