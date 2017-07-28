define(function(require, exports, module) {
	"use strict";
	(function($) {
		var pluginName = "bs_pagination";
		var colorenm = {
			out:{
				"bgcolor":"#071424",
				"border":"1px solid #172940"
			},
			over:{
				"bgcolor":"#172b4c",
				"border":"1px solid #3b536b"
			}
		}
		/*
		 * public methods
		 * -------------------------------------------------------
		 */
		var methods = {
			/**
			 * @lends $.fn.bs_pagination
			 */
			init : function(options) {

				var elem = this;

				return this
						.each(function() {

							/**
							 * settings and defaults using $.extend, settings
							 * modification will affect elem.data() and vice
							 * versa
							 */
							var settings = elem.data(pluginName);
							if (typeof settings == "undefined") {
								var bootstrap_version = "3";
								if (options.hasOwnProperty("bootstrap_version")
										&& options["bootstrap_version"] == "2") {
									bootstrap_version = "2";
								}
								var defaults = methods.getDefaults.call(elem,
										bootstrap_version);
								settings = $.extend({}, defaults, options);
							} else {
								settings = $.extend({}, settings, options);
							}
							if (settings.totalRows == 0) {
								settings.totalRows = settings.totalPages
										* settings.rowsPerPage;
							}
							elem.data(pluginName, settings);

							// bind events
							elem.unbind("onChangePage").bind("onChangePage",
									settings.onChangePage);
							elem.unbind("onLoad").bind("onLoad",
									settings.onLoad);

							// retrieve options
							var container_id = elem.attr("id"),

							nav_list_id = create_id(
									settings.nav_list_id_prefix, container_id), nav_top_id = create_id(
									settings.nav_top_id_prefix, container_id), nav_prev_id = create_id(
									settings.nav_prev_id_prefix, container_id), nav_item_id_prefix = create_id(
									settings.nav_item_id_prefix, container_id)
									+ "_", nav_next_id = create_id(
									settings.nav_next_id_prefix, container_id), nav_last_id = create_id(
									settings.nav_last_id_prefix, container_id),

							goto_page_id = create_id(
									settings.nav_goto_page_id_prefix,
									container_id), rows_per_page_id = create_id(
									settings.nav_rows_per_page_id_prefix,
									container_id), rows_info_id = create_id(
									settings.nav_rows_info_id_prefix,
									container_id),

							html = "", previous_selection, current_selection, selector_nav_top, selector_nav_prev, selector_nav_pages, selector_nav_next, selector_nav_last, selector_go_to_page, selector_rows_per_page;
							var selector_goto_page_bt;

							/*
							 * CREATE NAV PANEL
							 * -----------------------------------------
							 */
							if (settings.bootstrap_version == "3") {

								/*
								 * containerClass: "well", mainWrapperClass:
								 * "row",
								 * 
								 * navListContainerClass: "turn_page_box",
								 * navListWrapperClass: "pagesbox",
								 */

								html += '<div class="'
										+ settings.mainWrapperClass + '">';// row
								html += '<div class="tablenumlist">共&nbsp<span class="total_num"></span>&nbsp条数据&nbsp&nbsp&nbsp&nbsp共&nbsp<span class="total_pages"></span>&nbsp页</div>';
								html += '<div class="'
										+ settings.navListContainerClass + '">';// turn_page_box
								html += '<div class="'
										+ settings.navListWrapperClass + '">';// pagesbox
								/* html += '<span class="up_page">＜</span>'; */
								html += '<ul id="' + nav_list_id + '" class="'
										+ settings.navListClass + '">';
								html += '</ul>';
								html += '</div>';
								/* html += '<span class="down_page">＞</span> '; */
								html += '&nbsp;&nbsp;&nbsp;当前为第<span class="page_now">1</span>页&nbsp';
								html += '跳转至<input type="text" class="chose_page" id="goto_page_txt' + container_id +"\">页";
								html += '<button class="turn_page" id="goto_page_bt' + container_id +  '">跳转</button>';

								html += '</div>';

								if (settings.showGoToPage
										&& settings.visiblePageLinks < settings.totalPages) {
									html += '<div class="'
											+ settings.navGoToPageContainerClass
											+ '">';
									html += '<div class="input-group">';
									html += '<span class="input-group-addon" title="'
											+ rsc_bs_pag.go_to_page_title
											+ '"><i class="'
											+ settings.navGoToPageIconClass
											+ '"></i></span>';
									html += '<input id="' + goto_page_id
											+ '" type="text" class="'
											+ settings.navGoToPageClass
											+ '" title="'
											+ rsc_bs_pag.go_to_page_title
											+ '">';
									html += '</div>';
									html += '</div>';
								}
								if (settings.showRowsPerPage) {
									html += '<div class="'
											+ settings.navRowsPerPageContainerClass
											+ '">';
									html += '<div class="input-group">';
									html += '<span class="input-group-addon" title="'
											+ rsc_bs_pag.rows_per_page_title
											+ '"><i class="'
											+ settings.navRowsPerPageIconClass
											+ '"></i></span>';
									html += '<input id="' + rows_per_page_id
											+ '" value="'
											+ settings.rowsPerPage
											+ '" type="text" class="'
											+ settings.navRowsPerPageClass
											+ '" title="'
											+ rsc_bs_pag.rows_per_page_title
											+ '">';
									html += '</div>';
									html += '</div>';
								}
								if (settings.showRowsInfo) {
									html += '<div class="'
											+ settings.navInfoContainerClass
											+ '">';
									html += '<div id="' + rows_info_id
											+ '" class="'
											+ settings.navInfoClass
											+ '"></div>';
									html += '</div>';
								}

							} else {

								html += '<div class="'
										+ settings.mainWrapperClass + '">';

								html += '<div class="'
										+ settings.navListContainerClass + '">';
								html += '<div class="'
										+ settings.navListWrapperClass + '">';
								html += '<ul id="' + nav_list_id + '" class="'
										+ settings.navListClass + '">';
								html += '</ul>';
								html += '</div>';
								html += '</div>';

								if ((settings.showGoToPage && settings.visiblePageLinks < settings.totalPages)
										|| settings.showRowsPerPage) {

									html += '<div class="'
											+ settings.navInputsContainerClass
											+ '">';

									if (settings.showGoToPage
											&& settings.visiblePageLinks < settings.totalPages) {
										html += '<div class="'
												+ settings.navGoToPageWrapperClass
												+ '">';
										html += '<span class="add-on" title="'
												+ rsc_bs_pag.go_to_page_title
												+ '"><i class="'
												+ settings.navGoToPageIconClass
												+ '"></i></span>';
										html += '<input id="' + goto_page_id
												+ '" type="text" class="'
												+ settings.navGoToPageClass
												+ '" title="'
												+ rsc_bs_pag.go_to_page_title
												+ '">';
										html += '</div>';
									}
									if (settings.showRowsPerPage) {
										html += '<div class="'
												+ settings.navRowsPerPageWrapperClass
												+ '">';
										html += '<span class="add-on" title="'
												+ rsc_bs_pag.rows_per_page_title
												+ '"><i class="'
												+ settings.navRowsPerPageIconClass
												+ '"></i></span>';
										html += '<input id="'
												+ rows_per_page_id
												+ '" value="'
												+ settings.rowsPerPage
												+ '" type="text" class="'
												+ settings.navRowsPerPageClass
												+ '" title="'
												+ rsc_bs_pag.rows_per_page_title
												+ '">';
										html += '</div>';
									}

									html += '</div>';
								}

								if (settings.showRowsInfo) {
									html += '<div class="'
											+ settings.navInfoContainerClass
											+ '">';
									html += '<div id="' + rows_info_id
											+ '" class="'
											+ settings.navInfoClass
											+ '"></div>';
									html += '</div>';
								}
							}

							html += '</div>';

							// set nav_pane_html

							elem.html(html);

							previous_selection = null;
							current_selection = settings.currentPage;
							change_page(container_id, previous_selection,
									current_selection, true, false);

							// apply style
							elem.removeClass()
									.addClass(settings.containerClass);

							// panel events
							// ------------------------------------------------
							if (!settings.directURL) {

								// click on go to top
								selector_nav_top = "#" + nav_top_id;
								elem
										.off("click", selector_nav_top)
										.on(
												"click",
												selector_nav_top,
												function() {
													var previous_selection = settings.currentPage;
													settings.currentPage = 1;
													var current_selection = settings.currentPage;
													change_page(container_id,
															previous_selection,
															current_selection,
															true, true);
												});
								// click on go to prev
								selector_nav_prev = "#" + nav_prev_id;
								elem
										.off("click", selector_nav_prev)
										.on(
												"click",
												selector_nav_prev,
												function() {
													
													
													if (settings.currentPage > 1) {
														
														var previous_selection = settings.currentPage;
														settings.currentPage = parseInt(settings.currentPage) - 1;
														var current_selection = settings.currentPage;
														var recreate_nav = (elem
																.data("nav_start") == previous_selection);
														change_page(
																container_id,
																previous_selection,
																current_selection,
																recreate_nav,
																true);
													}
												});
								
								elem
								.off("mouseout", selector_nav_prev)
								.on(
										"mouseout",
										selector_nav_prev,
										function() {
											$(this).css({"border":colorenm.out.border,"background-color":colorenm.out.bgcolor})
										});
								elem
								.off("mouseover", selector_nav_prev)
								.on(
										"mouseover",
										selector_nav_prev,
										function() {
											$(this).css({"border":colorenm.over.border,"background-color":colorenm.over.bgcolor})
										});
								// click on go to next
								selector_nav_next = "#" + nav_next_id;
								elem
										.off("click", selector_nav_next)
										.on(
												"click",
												selector_nav_next,
												function() {
													if (settings.currentPage < settings.totalPages) {
														var previous_selection = settings.currentPage;
														settings.currentPage = parseInt(settings.currentPage) + 1;
														var current_selection = settings.currentPage;
														var recreate_nav = (elem
																.data("nav_end") == previous_selection);
														change_page(
																container_id,
																previous_selection,
																current_selection,
																recreate_nav,
																true);
													}
												});
								elem
								.off("mouseout", selector_nav_next)
								.on(
										"mouseout",
										selector_nav_next,
										function() {
											$(this).css({"border":colorenm.out.border,"background-color":colorenm.out.bgcolor})
										});
								elem
								.off("mouseover", selector_nav_next)
								.on(
										"mouseover",
										selector_nav_next,
										function() {
											$(this).css({"border":colorenm.over.border,"background-color":colorenm.over.bgcolor})
										});
								// click on go to last
								selector_nav_last = "#" + nav_last_id;
								elem
										.off("click", selector_nav_last)
										.on(
												"click",
												selector_nav_last,
												function() {
													var previous_selection = settings.currentPage;
													settings.currentPage = parseInt(settings.totalPages);
													var current_selection = settings.currentPage;
													change_page(container_id,
															previous_selection,
															current_selection,
															true, true);
												});
								
								// click on nav page item
								selector_nav_pages = '[id^="'
										+ nav_item_id_prefix + '"]';
								elem
										.off("click", selector_nav_pages)
										.on(
												"click",
												selector_nav_pages,
												function(event) {
													var previous_selection = settings.currentPage;
													var len = nav_item_id_prefix.length;
													settings.currentPage = parseInt($(
															event.target).attr(
															"id").substr(len));
													var current_selection = settings.currentPage;
													change_page(container_id,
															previous_selection,
															current_selection,
															false, true);
												});
							}

							// go to page event
							if (settings.showGoToPage || true) {

								// click the goto_page_bt
								selector_goto_page_bt = "#goto_page_bt" + container_id;
								selector_go_to_page = "#goto_page_txt" + container_id;

								elem
										.off("click", selector_goto_page_bt)
										.on(
												"click",
												selector_goto_page_bt,
												function() {
													var gtp = parseInt($(
															selector_go_to_page)
															.val());
													$(selector_go_to_page).val(
															"");
													if (!isNaN(gtp) && gtp > 0) {

														if (gtp > settings.totalPages) {
															gtp = settings.totalPages;
														}

														var previous_selection = settings.currentPage;
														settings.currentPage = gtp;
														var current_selection = gtp;

														if (settings.directURL) {
															location.href = settings
																	.directURL(current_selection);
														} else {
															change_page(
																	container_id,
																	previous_selection,
																	current_selection,
																	true, true);
														}

													}
												});

								// selector_go_to_page = "#goto_page_" +
								// goto_page_id;
								/*分页禁止非数字输入CRRCBD-376*/
								elem
								.off("keyup", selector_go_to_page)
								.on(
										"keyup",
										selector_go_to_page,
										function(event) {
											$(selector_go_to_page)
											.val($(selector_go_to_page).val().replace(/\D/gi,''));
										});

								elem
										.off("keypress", selector_go_to_page)
										.on(
												"keypress",
												selector_go_to_page,
												function(event) {
													if (event.which === 13) {
														var gtp = parseInt($(
																selector_go_to_page)
																.val());
														$(selector_go_to_page)
																.val("");
														if (!isNaN(gtp)
																&& gtp > 0) {

															if (gtp > settings.totalPages) {
																gtp = settings.totalPages;
															}

															var previous_selection = settings.currentPage;
															settings.currentPage = gtp;
															var current_selection = gtp;

															if (settings.directURL) {
																location.href = settings
																		.directURL(current_selection);
															} else {
																change_page(
																		container_id,
																		previous_selection,
																		current_selection,
																		true,
																		true);
															}

														}
														event.preventDefault(); // MSIE
														// strange
														// behaviour
													} else {
														if (!(event.which === 8
																|| event.which === 0 || (event.shiftKey === false && (event.which > 47 && event.which < 58)))) {
															event
																	.preventDefault();
														}
													}
												});
							}

							// rows per page event
							if (settings.showRowsPerPage) {
								selector_rows_per_page = "#" + rows_per_page_id;
								elem
										.off("keypress", selector_rows_per_page)
										.on(
												"keypress",
												selector_rows_per_page,
												function(event) {
													if (event.which === 13) {
														var rpp = parseInt($(
																selector_rows_per_page)
																.val());
														if (!isNaN(rpp)
																&& rpp > 0) {

															if (rpp > settings.maxRowsPerPage) {
																rpp = settings.maxRowsPerPage;
															}
															$(
																	selector_rows_per_page)
																	.val(rpp);

															settings.rowsPerPage = rpp;
															settings.totalPages = Math
																	.ceil(settings.totalRows
																			/ settings.rowsPerPage);

															var previous_selection = settings.currentPage;
															settings.currentPage = 1;
															var current_selection = 1;

															if (settings.directURL) {
																location.href = settings
																		.directURL(current_selection);
															} else {
																change_page(
																		container_id,
																		previous_selection,
																		current_selection,
																		true,
																		true);
															}

														} else {
															selector_rows_per_page
																	.val(settings.rowsPerPage);
														}
														event.preventDefault(); // MSIE
														// strange
														// behaviour
													} else {
														if (!(event.which === 8
																|| event.which === 0 || (event.shiftKey === false && (event.which > 47 && event.which < 58)))) {
															event
																	.preventDefault();
														}
													}
												});
							}

						});

			},

			/**
			 * Get plugin version
			 * 
			 * @returns {string}
			 */
			getVersion : function() {
				return "1.0.2";
			},

			/**
			 * Get default values
			 * 
			 * @example $(element).bs_pagination("getDefaults", "3");
			 * @param bootstrap_version
			 * @returns {Object}
			 */
			getDefaults : function(bootstrap_version) {
				var default_settings = {
					currentPage : 1,
					rowsPerPage : 10,
					maxRowsPerPage : 100,
					totalPages : 100,
					totalRows : 0,

					visiblePageLinks : 15,

					showGoToPage : false,
					showRowsPerPage : false,
					showRowsInfo : false,
					showRowsDefaultInfo : false,

					directURL : false, // or a function with current page as
					// argument
					disableTextSelectionInNavPane : true, // disable text
					// selection and
					// double click

					bootstrap_version : "3",

					// bootstrap 3
					// containerClass: "well",
					containerClass : "well",
					mainWrapperClass : "row",

					navListContainerClass : "turn_page_box",
					navListWrapperClass : "pagesbox",
					navListClass : "pagination pagination_custom",
					navListActiveItemClass : "active",

					navGoToPageContainerClass : "col-xs-6 col-sm-4 col-md-2 row-space",
					navGoToPageIconClass : "glyphicon glyphicon-arrow-right",
					navGoToPageClass : "form-control small-input",

					navRowsPerPageContainerClass : "col-xs-6 col-sm-4 col-md-2 row-space",
					navRowsPerPageIconClass : "glyphicon glyphicon-th-list",
					navRowsPerPageClass : "form-control small-input",

					navInfoContainerClass : "col-xs-12 col-sm-4 col-md-2 row-space",
					navInfoClass : "",

					// element IDs
					nav_list_id_prefix : "nav_list_",
					nav_top_id_prefix : "top_",
					nav_prev_id_prefix : "prev_",
					nav_item_id_prefix : "nav_item_",
					nav_next_id_prefix : "next_",
					nav_last_id_prefix : "last_",

					nav_goto_page_id_prefix : "goto_page_",
					nav_rows_per_page_id_prefix : "rows_per_page_",
					nav_rows_info_id_prefix : "rows_info_",

					onChangePage : function() { // returns page_num and
						// rows_per_page after a link
						// has clicked

					},
					onLoad : function() { // returns page_num and
						// rows_per_page on plugin load
					},

					// ajax load data
					serverpath : "/umostmodel",
					url : "/pagination/{{pagination}}/{{curpage}}",
					pagination : 1,
					queryOption : {}
				};

				if (bootstrap_version == "2") {
					default_settings.bootstrap_version = "2";

					default_settings.containerClass = "well";

					default_settings.mainWrapperClass = "row-fluid";

					default_settings.navListContainerClass = "span6";
					default_settings.navListWrapperClass = "pagination pagination_custom";
					default_settings.navListClass = "";
					default_settings.navListActiveItemClass = "active";

					default_settings.navInputsContainerClass = "span4 row-space";
					default_settings.navGoToPageWrapperClass = "input-prepend goto_page_wrapper";
					default_settings.navGoToPageIconClass = "icon-arrow-right";
					default_settings.navGoToPageClass = "small-input";
					default_settings.navRowsPerPageWrapperClass = "input-prepend rows_per_page_wrapper";
					default_settings.navRowsPerPageIconClass = "icon-th-list";
					default_settings.navRowsPerPageClass = "small-input";

					default_settings.navInfoContainerClass = "span2 row-space";
					default_settings.navInfoClass = "";
				}

				return default_settings;
			},

			/**
			 * Get any option set to plugin using its name (as string)
			 * 
			 * @example $(element).bs_pagination("getOption", some_option);
			 * @param opt
			 * @return {*}
			 */
			getOption : function(opt) {
				var elem = this;
				return elem.data(pluginName)[opt];
			},

			/**
			 * Get all options
			 * 
			 * @example $(element).bs_pagination("getAllOptions");
			 * @return {*}
			 */
			getAllOptions : function() {
				var elem = this;
				return elem.data(pluginName);
			},

			/**
			 * Destroy plugin
			 * 
			 * @example $(element).bs_pagination("destroy");
			 */
			destroy : function() {
				var elem = this;
				elem.removeData();
			},

			/**
			 * Set rows info
			 * 
			 * @example $(element).bs_pagination("setRowsInfo", info_html);
			 * @param info_html
			 */
			setRowsInfo : function(info_html) {
				var elem = this, rows_info_id = create_id(methods.getOption
						.call(elem, "getOption", "nav_rows_info_id_prefix"),
						elem.attr("id"));
				$("#" + rows_info_id).html(info_html);
			}
		};

		/**
		 * @author liuxiaohu LoadData from RemoteServer
		 * @returns {Object}
		 */
		var loadData = function(currentpage, settingoptions) {

			var settings = settingoptions;
			console.log(settings);
			var url = "";
			if (settings.serverpath && settings.url) {
				url = settings.serverpath + settings.url;
				url = url.replace("{{pagination}}", settings.pagination);
				url = url.replace("{{curpage}}", currentpage);
			} else {
				console.log("url is invalid.");
				return;
			}
			$.ajax({
				url : url,
				type : "POST",
				dataType : "JSON",
				contentType : "application/json",
				data : JSON.stringify(settingoptions.queryOption),
				async : false,
				success : function(data) {
					console.log("asdasf");
					console.log(data);
					return data;
				},
				error : function() {
					console.log("load data error.");
				}
			})
		}

		/*
		 * private methods
		 * ------------------------------------------------------
		 */

		/**
		 * @lends _private_methods
		 */

		/**
		 * Create element id
		 * 
		 * @param prefix
		 * @param plugin_container_id
		 * @return {*}
		 */
		var create_id = function(prefix, plugin_container_id) {
			return prefix + plugin_container_id;
		};

		/**
		 * Change page
		 * 
		 * @param container_id
		 *            是分页的容器
		 * @param previous_selection
		 *            前一页
		 * @param current_selection
		 *            当前页
		 * @param update_nav_items
		 *            是否调整页码
		 * @param trigger_change_page
		 *            是否换页
		 */
		var change_page = function(container_id, previous_selection,
				current_selection, update_nav_items, trigger_change_page) {

			// add the http get method
			/*
			 * currentPage: 1, rowsPerPage: 10, maxRowsPerPage: 100, totalPages:
			 * 100, totalRows: 0,
			 */
			// retrieve options, define variables
			var elem = $("#" + container_id), s = methods.getAllOptions
					.call(elem),

			nav_item_id_prefix = create_id(s.nav_item_id_prefix, container_id)
					+ "_";

			// get the data from remote server
			var url = "";
			var response_data = {};
			if (s.serverpath && s.url) {
				url = s.serverpath + s.url;
				url = url.replace("{{pagination}}", s.pagination);
				url = url.replace("{{curpage}}", current_selection);
			} else {
				console.log("url is invalid.");
				return;
			}
			$.ajax({
				url : url,
				type : "POST",
				dataType : "JSON",
				contentType : "application/json",
				data : JSON.stringify(s.queryOption),
				async : false,
				success : function(data) {
					if (data && typeof data == 'object'
							&& data['status'] == 200) {
						s.totalPages = data['entity'].totalPage;

						$("span.total_num:first", elem).text(
								data['entity'].totalSize);
						$("span.total_pages:first", elem).text(
								data['entity'].totalPage);
						if (s.totalPages == 0) {
							$("span.page_now:first", elem).text(
									0);
							$("#goto_page_txt").attr("disabled","disabled").css("cursor","not-allowed");
							$("#goto_page_bt").attr("disabled","disabled").css("cursor","not-allowed");
						} else {
							$("#goto_page_txt").removeAttr("disabled","disabled").css("cursor","inherit");
							$("#goto_page_bt").removeAttr("disabled","disabled").css("cursor","inherit");
							$("span.page_now:first", elem).text(
									data['entity'].currentPage);
						}
						
						s.totalRows = data['entity'].totalSize;
						data = JSON.stringify(data);
						data = data.replace(/"?null"?/img,"\"\"");
						data = JSON.parse(data);
						response_data = data['entity'];
					} else {
						alert("load data error.");
					}
				},
				error : function() {
					console.log("load data error.");
				}
			})

			if (update_nav_items) {

				var nav_list = create_id(s.nav_list_id_prefix, container_id), nav_top_id = create_id(
						s.nav_top_id_prefix, container_id), nav_prev_id = create_id(
						s.nav_prev_id_prefix, container_id), nav_next_id = create_id(
						s.nav_next_id_prefix, container_id), nav_last_id = create_id(
						s.nav_last_id_prefix, container_id),
				
				elem_nav_list = $("#" + nav_list), nav_html = "", nav_start = parseInt(s.currentPage), nav_end, i, mod, offset, totalSections, nav_url = "", no_url = "javascript:void(0);";

				// navigation pages numbers
				if (s.totalPages < s.visiblePageLinks) {
					nav_start = 1;
					nav_end = s.totalPages;
				} else {
					totalSections = Math
							.ceil(s.totalPages / s.visiblePageLinks);
					if (nav_start > s.visiblePageLinks * (totalSections - 1)) {
						nav_start = s.totalPages - s.visiblePageLinks + 1;
					} else {
						mod = nav_start % s.visiblePageLinks;
						offset = mod == 0 ? -s.visiblePageLinks + 1 : -mod + 1;
						nav_start += offset;
					}
					nav_end = nav_start + s.visiblePageLinks - 1;
				}

				// store nav_start nav_end
				elem.data("nav_start", nav_start);
				elem.data("nav_end", nav_end);

				// create nav pages html
				// -----------------------------------------------
				// show - hide backward nav controls
				if (nav_start > 1) {
					nav_url = s.directURL ? s.directURL(1) : no_url;
					nav_html += '<li><a style="float:none;" id="' + nav_top_id
							+ '" href="' + nav_url + '">'
							+ rsc_bs_pag.go_top_text + '</a></li>';
					nav_url = s.directURL ? s.directURL(nav_start - 1) : no_url;
					nav_html += '<li><a style="float:none;" id="' + nav_prev_id
							+ '" href="' + nav_url + '">'
							+ rsc_bs_pag.go_prev_text + '</a></li>';
					console.log(nav_html)
				}
				// show nav pages
				for (i = nav_start; i <= nav_end; i++) {
					nav_url = s.directURL ? s.directURL(i) : no_url;
					nav_html += '<li><a style="float:none;" id="'
							+ nav_item_id_prefix + i + '" href="' + nav_url
							+ '">' + i + '</a></li>';
				}
				// show - hide forward nav controls
				if (nav_end < s.totalPages) {
					nav_url = s.directURL ? s.directURL(nav_end + 1) : no_url;
					nav_html += '<li><a style="float:none;" id="' + nav_next_id
							+ '" href="' + nav_url + '">'
							+ rsc_bs_pag.go_next_text + '</a></li>';
					nav_url = s.directURL ? s.directURL(s.totalPages) : no_url;
					nav_html += '<li><a style="float:none;" id="' + nav_last_id
							+ '" href="' + nav_url + '">'
							+ rsc_bs_pag.go_last_text + '</a></li>';
				}
				elem_nav_list.html(nav_html);

				if (s.disableTextSelectionInNavPane) {
					disableSelection(elem_nav_list);
				}

			}

			// retrieve options
			var prev_elem = $("#" + nav_item_id_prefix + previous_selection), current_elem = $("#"
					+ nav_item_id_prefix + current_selection);

			// change selected page, applying appropriate styles
			prev_elem.closest("li").removeClass(s.navListActiveItemClass);
			current_elem.closest("li").addClass(s.navListActiveItemClass);

			// update title
			var active_title = rsc_bs_pag.current_page_label + " "
					+ current_selection + " " + rsc_bs_pag.total_pages_label
					+ " " + s.totalPages;
			prev_elem.prop("title", "");
			current_elem.prop("title", active_title);

			if (s.showRowsInfo && s.showRowsDefaultInfo) {
				var page_first_row = ((s.currentPage - 1) * s.rowsPerPage) + 1, page_last_row = Math
						.min(page_first_row + s.rowsPerPage - 1, s.totalRows), info_html = page_first_row
						+ "-"
						+ page_last_row
						+ " "
						+ rsc_bs_pag.total_rows_label
						+ " "
						+ s.totalRows
						+ " "
						+ rsc_bs_pag.rows_info_records
						+ " ("
						+ rsc_bs_pag.current_page_abbr_label
						+ s.currentPage
						+ rsc_bs_pag.total_pages_abbr_label
						+ s.totalPages
						+ ")", rows_info_id = create_id(
						s.nav_rows_info_id_prefix, container_id);
				$("#" + rows_info_id).html(info_html);
			}

			// trigger event onChangePage (only after some link pressed, not on
			// plugin load)

			/*
			 * if (trigger_change_page) { elem.triggerHandler("onChangePage", {
			 * currentPage: current_selection, rowsPerPage: s.rowsPerPage }); }
			 * else { elem.triggerHandler("onLoad", { currentPage:
			 * current_selection, rowsPerPage: s.rowsPerPage }); }
			 */

			if (trigger_change_page) {
				elem.triggerHandler("onChangePage", response_data);
			} else {

				elem.triggerHandler("onChangePage", response_data);

			}

		};

		/**
		 * Disable selection (jquery 1.8)
		 * http://stackoverflow.com/questions/2700000/how-to-disable-text-selection-using-jquery
		 * 
		 * @param element
		 * @return {*}
		 */
		var disableSelection = function(element) {
			return element.attr("unselectable", "on")
					.css("user-select", "none").on("selectstart", false);
		};

		/**
		 * bs_pagination - jQuery pagination plugin, based on Twitter Bootstrap.
		 * 
		 * @class bs_pagination 00
		 * @memberOf $.fn
		 */
		$.fn.bs_pagination = function(method) {
			if (this.size() != 1) {
//				var err_msg = "You must use this plugin (" + pluginName
//						+ ") with a unique element (at once)";
//				this.html('<span style="color: red;">' + 'ERROR: ' + err_msg
//						+ '</span>');
//				$.error(err_msg);
				return;
			}

			// Method calling logic
			if (methods[method]) {
				return methods[method].apply(this, Array.prototype.slice.call(
						arguments, 1));
			} else if (typeof method === "object" || !method) {
				return methods.init.apply(this, arguments);
			} else {
				$.error("Method " + method + " does not exist on jQuery."
						+ pluginName);
			}
		};
	})($);
})