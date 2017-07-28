
define(function(require,exports,module){
    //alert(module.id+"\n  "+module.uri);
   // alert(module.dependencies);
    require("jquery");//引入jQuery
    require("select2");
    //$.ajax() 等价于 jQuery.ajax()，就是说$等价于jQuery
    $.ajax({//没有放在函数里面，页面加载时就执行，不用点击按钮时才执行。此select下拉框不能放在函数里面写，不然选中之后也不显示
        type:"GET",
        url:"/getAllClasses",
        //async:false,//同步执行，浏览器会被锁死，用户其它操作必须等待请求完成才可以执行。
        //ifModified: true,//(默认: false) 仅在服务器数据改变时获取新数据。使用 HTTP 包 Last-Modified 头信息判断。在jQuery 1.4中，他也会检查服务器指定的'etag'来确定数据没有被修改过。
        cache: false,//默认为true，dataType为script和jsonp时默认为false
        success:function(returnData){
            $("#selectClass").select2({width: 150,minimumResultsForSearch: Infinity});
            $.each(returnData,function(key,value){//key是下标，value是对象
                var className = "<option value='"+value.id+"'>"+value.name+"</option>";
                $("#selectClass").append(className);
            })
        }
    //     beforeSend:function(xhr){//发送请求前可修改 XMLHttpRequest 对象的函数，如添加自定义 HTTP 头。XMLHttpRequest 对象是唯一的参数。这是一个 Ajax 事件。如果返回false可以取消本次ajax请求。
    //         this;
    //     },
    //     complete:function(xhr,ts){//请求完成后回调函数 (请求成功或失败之后均调用)。参数： XMLHttpRequest 对象和一个描述成功请求类型的字符串。 Ajax 事件。
    //
    //     },
    //     contentType:application/x-www-form-urlencoded,//(默认: "application/x-www-form-urlencoded") 发送信息至服务器时内容编码类型。默认值适合大多数情况。
    //     context: document.body,//这个对象用于设置Ajax相关回调函数的上下文。也就是说，让回调函数内this指向这个对象（如果不设定这个参数，那么this就指向调用本次AJAX请求时传递的options参数）。比如指定一个DOM元素作为context参数，这样就设置了success回调函数的上下文为这个DOM元素。
    //
        })


    function init() {
        $.ajax({
            type: "GET",
            url: "/getAllStudents",
            success: function(returnData){
                $("#studentBody").empty();
                if(returnData){
                    $.each(returnData,function(key,value){//key是下标，value是对象
                        var studentInfo = "<tr><td>"+value.id+"</td><td>"+value.banji+"</td><td>"+value.name+"</td><td>"+value.age+"</td><td>"+value.sex+"</td><td>"+value.address
                            +"</td><td><button id='update' data-id='"+value.id+"'>修改</button><button id='delete' data-id='"+value.id+"'>删除</button></td></tr>"
                        $("#studentBody").append(studentInfo);
                    })
                }
            }
        })
    }
    init();

    $("#studentBody").on("click","#update",function () {
        var stu = {};
        stu.id = $(this).data("id");
        stu.cid= $("#selectClass").val();
        stu.name = $("#name").val();
        stu.age = $("#age").val();
        stu.sex = $("#sex").val();
        stu.address = $("#address").val();
        $.ajax({
            type: "POST",
            url: "/updateStudent",
            data: JSON.stringify(stu),//发送到服务器的数据。将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。查看 processData 选项说明以禁止此自动转换。必须为 Key/Value 格式。如果为数组，jQuery 将自动为不同值对应同一个名称。如 {foo:["bar1", "bar2"]} 转换为 "&foo=bar1&foo=bar2"。
            contentType:"application/json",
            success: function(returnData){
                init();
                $("#updateResult").val("修改成功！");
            }
        })
    })

    $("#studentBody").on("click","#delete",function () {
        var id = $(this).data("id")
        $.ajax({
            type: "POST",
            url: "/deleteStudent/"+id,
            success: function(returnData){
                init();
                $("#updateResult").val("删除成功！");
            }
        })
    })

    $("#insertButton").click(function(){
        var stu = {};
        stu.cid= $("#selectClass").val();
        stu.name = $("#name").val();
        stu.age = $("#age").val();
        stu.sex = $("#sex").val();
        stu.address = $("#address").val();
        $.ajax({
            type: "POST",
            url: "/insertStudent",
            data: JSON.stringify(stu),
            contentType:"application/json",
            success: function(returnData){
                init();
                $("#updateResult").val("添加成功！");
            }
        })
    })
})
