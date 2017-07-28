package com.example.studentdemo.controller;

import com.example.studentdemo.entity.Student;
import com.example.studentdemo.mapper.ClassMapper;
import com.example.studentdemo.mapper.CourseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import com.example.studentdemo.mapper.StudentMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller //标识此类为控制器，告诉spring容器此类负责接收数据和响应。
public class StudentController {

    @Autowired  //自动注入，由spring来注入对象
    private StudentMapper studentMap;

    @Autowired
    private CourseMapper courseMap;

//    @RequestMapping(value = "/", method = RequestMethod.GET)//请求映射，接收前台的url（localhost:8080/）请求
//    @ResponseBody //可加可不加
//    public String mainPage(){
//        return "/pages/student.html";
//    }//返回student，意思是返回student.html，因为在文件applications.properties中已经设置了网页文件的前缀和后缀，如下：
//    # 页面（浏览器中）默认前缀目录
//    spring.mvc.view.prefix=/pages/
//            # 页面（浏览器）默认后缀
//    spring.mvc.view.suffix=.html
//需要注意的是，整个项目中，每一个RequestMapping都不能重复，不然会出现编译错误。
    //因为此处是@RequestMapping("/")，所以映射的就是localhost:8080，就是说在浏览器中输入localhost:8080,访问的就是student.html文件。
    //若想访问course.html文件，则输入localhost:8080/pages/course.html

//    public Boolean isExist(Integer id){//查询某id是否存在
//        Integer inte = stuMap.isExist(id);
//        return inte!=null;
//    }

    @RequestMapping(value = "/getStudentById/{id}", method = RequestMethod.GET)//{id}为前台通过url传递过来的参数
    @ResponseBody
    public Map<String,Object> getStudentById(@PathVariable Integer id ){//对于url传递过来的参数，使用@PathVariable注解来接收
        return studentMap.getStudentById(id);
    }

    @RequestMapping(value = "/getAllStudents", method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String,Object>> getAllStudents(){
        return studentMap.getAllStudents();
    }

    @RequestMapping(value = "/updateStudent", method = RequestMethod.POST)
    @ResponseBody
    public Integer updateStudent(@RequestBody Student stu){//通过json传递过来的数据，使用@RrquestBody注解来接收
        return studentMap.updateStudent(stu);
    }

    @RequestMapping(value = "/insertStudent", method = RequestMethod.POST)
    @ResponseBody
    public Integer insertStudent(@RequestBody Student stu){
        return studentMap.insertStudent(stu);
    }

    @RequestMapping(value = "/deleteStudent/{id}", method = RequestMethod.POST)
    @ResponseBody
    public Integer deleteStudent(@PathVariable Integer id){
        int deleteCourseRet = courseMap.deleteByStudentId(id);
        int deleteStudent = studentMap.deleteStudent(id) ;
        if(deleteCourseRet>0 || deleteStudent>0) return 1;
        return 0;
    }

}
