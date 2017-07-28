

define(function(require,exports,module){
    require("jquery");
    $.ajax({//没有放在函数里面，页面加载时就执行，不用点击按钮时才执行。此select下拉框不能放在函数里面写，不然选中之后也不显示
        type:"GET",
        url:"/getAllClasses",
        success:function(msg){
            $.each(msg,function(i,value){//i是下标，value是对象
                var tmp = "<option value='"+value.id+"'>"+value.name+"</option>";
                $("#updateSelect").append(tmp);
                $("#insertSelect").append(tmp);
            })
        }
    })


    $("#searchButton").click(function(){
        var context = $("#searchInput").val();
        if(context.length==0){
            $("#searchResult").text("请输入id！");
            return;
        }
        $.ajax({
            type:"GET",
            url:"/getStudentById/" + context,
            success:function(msg){
                if(msg.length==0) $("#searchResult").text("此学生不存在！");
                else{
                    var res = "查询结果如下：<br><table border='1pt' align='middle'><tr><td>班级</td><td>姓名</td><td>年龄</td><td>性别</td><td>地址</td></tr>" +
                        "<tr><td>"+msg.className+"</td><td>"+msg.name+"</td><td>"+msg.age+"</td><td>"+msg.sex+"</td><td>"+msg.address+"</td></tr></table>";
                    $("#searchResult").empty();
                    $("#searchResult").append(res);
                }
            }
        })
    })

    // $("#updateInputClass").click(function(){
    //     alert($("#updateInputClass").find("option:selected").val());
    //     $("#updateInputClass option[index='0']").val();
    // })

    $("#updateButton").click(function(){
        var id = $("#updateInputId").val();
        var cid = $("#updateSelect").val();
        var name = $("#updateInputName").val();
        var age = $("#updateInputAge").val();
        var sex = $("#updateInputSex").val();
        var address = $("#updateInputAddress").val();
        if(id.length==0){
            $("#updateResult").text("请填入id！");
            return;
        }
        if(cid==0){
            $("#updateResult").text("请选择班级！");
            return;
        }
        $("#updateResult").empty();
        var stu = {};
        stu.id = id;
        stu.cid = cid;
        stu.name = name;
        stu.age = age;
        stu.sex = sex;
        stu.address = address;
        $.ajax({
            type: "POST",
            url: "/updateStudent",
            data: JSON.stringify(stu),
            contentType:"application/json",
            success: function (msg) {
                if (msg==0)  $("#updateResult").text("此学生不存在！");
                else $("#updateResult").text("修改成功！");
            }
        });
    })

    $("#deleteButton").click(function(){
        var id = $("#deleteInputId").val();
        $.ajax({
            type: "GET",
            url: "/deleteStudent/"+id,
            success: function (msg) {
                if (msg==0)  $("#deleteResult").text("此学生不存在！");
                else $("#deleteResult").text("修改成功！");
            }
        });
    })

    $("#insertButton").click(function(){
        var cid = $("#insertSelect").val();
        var name = $("#insertInputName").val();
        var age = $("#insertInputAge").val();
        var sex = $("#insertInputSex").val();
        var address = $("#insertInputAddress").val();
        if(cid==0){
            $("#insertResult").text("请选择班级！");
            return;
        }
        if(name.length==0){
            $("#insertResult").text("请输入姓名！");
            return;
        }
        if(age.length==0){
            $("#insertResult").text("请输入年龄！");
            return;
        }
        if(sex.length==0){
            $("#insertResult").text("请输入性别！");
            return;
        }
        if(address.length==0){
            $("#insertResult").text("请输入地址！");
            return;
        }
        $("#insertResult").empty();
        var stu = {};
        stu.cid = cid;
        stu.name = name;
        stu.age = age;
        stu.sex = sex;
        stu.address = address;
        $.ajax({
            type: "POST",
            url: "/insertStudent",
            data: JSON.stringify(stu),
            contentType:"application/json",
            success: function (msg) {
                if (msg==0)  $("#insertResult").text("此学生已存在！");
                else $("#insertResult").text("插入成功！");
            }
        });
    })

    $("#clearInsert").click(function() {
        $("#insertSelect").val("请选择");
        $("#insertInputName").val("");
        $("#insertInputAge").val("");
        $("#insertInputSex").val("");
        $("#insertInputAddress").val("");
    })

})