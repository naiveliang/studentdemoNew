seajs.timestamp="20140104";
seajs.config({
	alias:{"seajs-combo":"seajs/seajs-combo/1.0.1/seajs-combo",
			"seajs-log":"seajs/seajs-log/1.0.1/seajs-log",
			"seajs-style":"seajs/seajs-style/1.0.2/seajs-style",
			"seajs-debug":"seajs/seajs-debug/1.1.1/seajs-debug",
			dialog:"gallery/artdialog/6.0.0/dialog-plus",
			codemirror:"gallery/codemirror/4.5.1/codemirror",
			contextmenu:"gallery/contextmenu/1.6.6/contextmenu",
			cookie:"gallery/cookie/1.0.2/cookie",
			d3:"gallery/d3/3.5.5/d3",
			datatables:"gallery/datatables/1.10.2/datatables.bootstrap",
			daterangepicker:"gallery/daterangepicker/1.3.7/daterangepicker",
			datetimepicker:"gallery/datetimepicker/2.0.0/datetimepicker",
			easing:"gallery/easing/1.3.0/easing",
			echarts:"gallery/echarts/2.2.1/echarts-all",
			fullcalendar:"gallery/fullcalendar/2.3.1/fullcalendar",
			html5shiv:"gallery/html5shiv/3.7.0/html5shiv",
			htmlclean:"gallery/htmlclean/1.4.0/htmlclean",
			jqueryui:"gallery/jqueryui/1.11.2/jqueryui",
			jquery:"gallery/jquery/1.11.1/jquery",
			metadata:"gallery/metadata/1.0.0/metadata",
			moment:"gallery/moment/2.9.0/moment",
			"moment-range":"gallery/moment-range/1.0.9/moment-range",
			mousewheel:"gallery/mousewheel/3.1.12/mousewheel",
			plupload:"gallery/plupload/2.1.2/plupload",
			respond:"gallery/respond/1.4.2/respond",
			scrollbar:"gallery/scrollbar/3.0.9/mCustomScrollbar",
			select2:"gallery/select2/3.5.1/select2",
			swfobject:"gallery/swfobject/2.3.0/swfobject",
			treetable:"gallery/treetable/3.2.0/treetable",
			ztree:"gallery/ztree/3.5.17/ztree",
			ajax:"plugins/ajax/1.0.0/ajax",
			copy:"plugins/copy/1.0.0/copy",
			parsejson:"plugins/parsejson/1.0.0/parsejson",
			router:"plugins/router/1.0.0/router",
			"st-grid":"plugins/st-grid/3.0.0/st-grid",
			uploadfile:"plugins/uploadfile/1.0.0/uploadfile",
			validate:"plugins/validate/1.0.0/validate",
			utils:"utils/utils",
			init:"init/init",
			pagination:"plugins/paginations/jquery_pagination",
			ligercore:"plugins/ligerui/core/base",
			ligerdrag:"plugins/ligerui/plugins/ligerDrag",
		},
	base:(typeof staticUrl=="undefined"?"/js":staticUrl)+"/common",
	map:[[/(^(?!.*(config|jquery|seajs-log|seajs-style|seajs-combo|seajs-debug)\.(css|js)).*)$/i,"$1?t="+seajs.timestamp]],
	preload:["seajs-log","seajs-style","init",seajs.timestamp=="20140104"?"":"seajs-combo"],
	//debug:seajs.timestamp=="20160127"?true:false,
	charset:"utf-8"
});
seajs.use("init");