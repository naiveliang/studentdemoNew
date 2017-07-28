define(function(require,exports,module) {
    require("jquery");
    var Cookie = require("cookie");
    $("#setCookieButton").click(function(){
        var name = $("#name").val();
        var age = $("#age").val();
        var cookietime = new Date();
        cookietime.setTime(cookietime.getTime() + (10 * 1000));//coockie保存一小时
        if(name.length>0) alert(Cookie.set("name",name,{expires:cookietime}));
        if(age.length>0) Cookie.set("age",age,{expires:7});
        window.location.href = "test02.html";
    })

    $("#getCookieButton").click(function(){
        var name = Cookie.get("name");
        var age = Cookie.get("age");
        if(name==null) $("#name").text("");
        else $("#name").text(name);
        if(age==null) $("#age").text("");
        else $("#age").text(age);
    })

    $("#removeCookieButton").click(function(){
        Cookie.remove("name");
        Cookie.remove("age");
    })

    $(function(){//在页面加载时执行本函数
        require("select2");
        var selectContent = [
            {id: 'authority.auth_code', text: '权限编码'},
            {id: 'authority.auth_name', text: '权限名称'},
            {id: 'authority.pauth_name', text: '父级权限'}
        ];
        $('#selectTemp').select2({
            data: selectContent,
            width: 150,
            placeholder: "请选择检索条件",
            minimumResultsForSearch: Infinity,//Hiding the search box
        });
        //检索框默认选项
        //$('#selectTemp').select2('val','authority.auth_code');
        $("#selectExample").select2({minimumResultsForSearch: Infinity});
        //$dialog.alert("请选择检索条件", 'error', 3000);
    })

    $("[href='##']").click(function(){
       var cur = $(this).attr2("id");
       if(cur=="studentHref"){
           $("#courseDiv").hide();
            $.ajax({
                url:"/getAllStudents",
                type:"get",
                //async:false,
                success:function(data){
                    $("#studentDiv").empty();
                    var msg = "";
                    if(data){
                        $.each(data,function(key,value){//key是下标，value是对象
                            //var str = "student" + value.id;
                            //msg += "<div><a href='#' id='"+str+"'>"+value.name+"</a></div>";
                            msg += "<div><a href='#' id='student' data-id='"+value.id+"'>"+value.name+"</a></div>";
                        })
                    }
                    $("#studentDiv").append(msg);
                }
            })
            $("#studentDiv").toggle();
       }
       if(cur=="courseHref"){
           $("#studentDiv").hide();
           $.ajax({
               url:"/getAllCourseSubject",
               type:"get",
               //async:false,
               success:function(data){
                   $("#courseDiv").empty();
                   if(data){
                       $.each(data,function(key,value){//key是下标，value是对象
                           //var str = "course" + key;
                           //var msg = "<div><a href='#' id="+str+"><font color='blue'>"+value+"</font></a></div>";
                           var msg = "<div><a href='#' id='course' data-id='"+value+"'>"+value+"</a></div>";
                           $("#courseDiv").append(msg);
                       })
                   }
               }
           })
           $("#courseDiv").toggle();
       }
        
    })

    $("#allDiv").on("click","#student",function (){
       var id = $(this).data("id");
       var content = $("#contentDiv");
       content.empty();
       //var id = cur.substring(cur.indexOf("student")+"student".length,cur.length);
        $.ajax({
            url:"/getStudentById/"+id,
            type:"get",
            success:function(data){
                var tmp =
                    "<tr><td>学号：</td><td>"+data.id+"</td></tr>" +
                    "<tr><td>姓名：</td><td>"+data.name+"</td></tr>" +
                    "<tr><td>年龄：</td><td>"+data.age+"</td></tr>" +
                    "<tr><td>性别：</td><td>"+data.sex+"</td></tr>" +
                    "<tr><td>班级：</td><td>"+data.cname+"</td></tr>" +
                    "<tr><td>地址：</td><td>"+data.address +"</td></tr>";
                content.append(tmp);
            }
        })
    })
    $("#allDiv").on("click","#course",function (){
        var name = $(this).data("id");
        var json = {};
        json.subject = name;
        var content = $("#contentDiv");
        content.empty();
        //var id = cur.substring(cur.indexOf("student")+"student".length,cur.length);
        $.ajax({
            url:"/getAllScoreByCourseName",
            type:"put",
            data:JSON.stringify(json),
            contentType:"application/json",
            success:function(data){
                var tmp ="<ul style='list-style-type:none;margin:5pt 0 5pt 10pt;'><li><span>姓名</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>分数</span></li></ul>";
                $.each(data,function(index,value){
                    if(index==0) tmp += "<ol start='1' style='margin:5pt 0 5pt 10pt;'><li><span>"+value.name+"</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>"+value.score+"</span></li>";
                    else tmp += "<li><span>"+value.name+"</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>"+value.score+"</span></li>";
                })
                tmp +="</ol>";
                content.append(tmp);
            }
        })
    })


    //
    // $("[href='#']").click(function(){
    //     alert(2);
    //     var cur = $(this).attr2("id");
    //     var content = $("#contentDiv");
    //     content.empty();
    //     if(cur.startOf("student")){//学生
    //         var id = cur.substring(cur.indexOf("student")+"student".length,cur.length);
    //         $.ajax({
    //             url:"/getStudentById/"+id,
    //             type:"get",
    //             success:function(data){
    //                 var tmp =
    //                     "<tr><td>学号：</td><td>"+data.id+"</td></tr>" +
    //                     "<tr><td>姓名：</td><td>"+data.name+"</td></tr>" +
    //                     "<tr><td>年龄：</td><td>"+data.age+"</td></tr>" +
    //                     "<tr><td>性别：</td><td>"+data.sex+"</td></tr>" +
    //                     "<tr><td>班级：</td><td>"+data.banji+"</td></tr>" +
    //                     "<tr><td>地址：</td><td>"+data.address +"</td></tr>";
    //                 content.append(tmp);
    //
    //             }
    //         })
    //     }
    //     if(cur.startOf("course")){//课程
    //
    //     }
    // })

})