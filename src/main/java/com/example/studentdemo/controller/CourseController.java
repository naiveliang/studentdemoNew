package com.example.studentdemo.controller;

import com.example.studentdemo.entity.Course;
import com.example.studentdemo.mapper.CourseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
public class CourseController {

    @Autowired
    private CourseMapper courseMap;

    @RequestMapping(value = "/getAllCourses", method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String,Object>> getAllCourses(){//因为Map的值有Integer类型的，也有String类型的，所以统一用Object来存储
        return courseMap.getAllCourses();
    }

    @RequestMapping(value = "/getLikeSearchResults/{searchContent}/{searchMethod}", method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String,Object>> getLikeSearchResults(@PathVariable  String searchContent, @PathVariable  String searchMethod){
        return courseMap.getLikeSearchResults(searchContent,searchMethod);
    }

    @RequestMapping(value = "/getAllCourseSubject", method = RequestMethod.GET)
    @ResponseBody
    public List<String> getAllCourseSubject(){
        return courseMap.getAllCourseSubject();
    }

    @RequestMapping(value = "/getAllScoreByCourseName", method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String,Object>> getAllScoreByCourseName(@RequestBody Course course){
        return courseMap.getAllScoreByCourseName(course.getSubject());
    }
}
