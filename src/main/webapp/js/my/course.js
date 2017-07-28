define(function(require,exports,module) {
    require("jquery");
    function init() {
        $.ajax({
            type: "GET",
            url: "/getAllCourses",
            success: function (msg) {
                $("#courseBody").empty();
                if (msg) {
                    $.each(msg, function (key, value) {//key是下标，value是对象
                        var tmp = "<tr><td>" + value.studentName + "</td><td>" + value.className + "</td><td>" + value.subject + "</td><td>" + value.score+ "</td></tr>";
                        $("#courseBody").append(tmp);
                    })
                }
            }
        })
    }
    init();
    $("#searchButton").click(function(){
        var searchInput = $("#searchInput").val();
        var method = $("#selectMethod").val();
        $.ajax({
            type: "GET",
            url: "/getLikeSearchResults/"+searchInput+"/"+method,
            success: function(msg){
                $("#courseBody").empty();
                if (msg) {
                    $.each(msg, function (key, value) {//key是下标，value是对象
                        var courseInfo = "<tr><td>" + value.studentName + "</td><td>" + value.className + "</td><td>" + value.subject + "</td><td>" + value.score+ "</td></tr>";
                        $("#courseBody").append(courseInfo);
                    })
                }
            }
        })
    })


})