define("plugins/uploadfile/1.0.0/uploadfile",["jquery","parsejson","swfobject"],function(a){var b=a("jquery"),c=a("parsejson"),d=a("swfobject"),e={ok:200,error:300,timeout:301},f={url:seajs.data.base+"plugins/uploadfile/1.0.0/uploadfile.swf",width:"100%",height:"100%",version:"10.0.0"},g={menu:"false",quality:"high",wmode:"transparent",allowFullScreen:"true",allowScriptAccess:"always"},h=function(a){var c=b.extend({container:"",name:"uploadfile",url:"",filekey:"file",opacity:1,width:"100%",height:"100%",vars:null,params:null,attrs:null,success:null,error:null,start:null,isdebug:!1},a),e="string"==typeof c.container?b(c.container):c.container;if(mining.utils.isEmpty(e)||mining.utils.isEmpty(c.url))return void seajs.log("Uploadfile Say:[Error] 缺少必选参数！");var h="uploadfilecontent"+j("uploadfilecontent");e.append('<div id="'+h+'"></div>');var i=b.extend({},f,{width:c.width,height:c.height});c.vars=b.extend({},c.vars,{url:c.url,filekey:c.filekey,opacity:c.opacity}),c.params=b.extend({},g,c.params),c.attrs=b.extend({},c.attrs,{id:c.name,name:c.name});var k=j(c.attrs.id);0!=k&&(c.attrs={id:c.attrs.id+k,name:c.attrs.name+k}),b.extend(c.vars,{instanceId:c.attrs.id}),mining.downloadfile[c.attrs.id]=c,d.embedSWF(i.url,h,i.width,i.height,i.version,d.installUrl,c.vars,c.params,c.attrs)};window.uploadfileStart=function(a){var c=mining.uploadfile[a.id];mining.utils.isEmpty(c)||mining.utils.isEmpty(c.start)||!b.isFunction(c.start)||c.start.call(this,a)},window.uploadfileSuccess=function(a){var d=mining.uploadfile[a.id],f="";mining.utils.isEmpty(d)||(mining.utils.isEmpty(a.data)||(f=i(c(a.data))),f==e.error||f==e.timeout?uploadfileError(a):!mining.utils.isEmpty(d.success)&&b.isFunction(d.success)&&d.success.call(this,a))},window.uploadfileError=function(a){var c=mining.uploadfile[a.id];mining.utils.isEmpty(c)||mining.utils.isEmpty(c.error)||!b.isFunction(c.error)||c.error.call(this,a)},window.console_log=function(a){op.isdebug&&seajs.log(a)};var i=function(a){return mining.utils.isEmpty(a)||mining.utils.isEmpty(a.statusCode)?e.ok:a.statusCode==e.error?e.error:a.statusCode==e.timeout?e.timeout:e.ok},j=function(a){for(var c=0;1e3>c&&b("#"+a+c).size()>0;)c++;return c};return{init:h}});