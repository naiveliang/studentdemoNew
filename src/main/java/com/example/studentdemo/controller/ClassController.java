package com.example.studentdemo.controller;

import com.example.studentdemo.entity.Classes;
import com.example.studentdemo.mapper.ClassMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class ClassController {

    @Autowired
    private ClassMapper classMap;

    @RequestMapping(value = "/getAllClasses", method = RequestMethod.GET)
    @ResponseBody
    public List<Classes> getAllClass(){
//        try{
//            Thread thread = Thread.currentThread();
//            thread.sleep(5000);
//        }catch (InterruptedException e) {
//            e.printStackTrace();
//        }
        return classMap.getAllClasses();
    }

    @RequestMapping(value = "/getIdByName/{name}", method = RequestMethod.GET)
    @ResponseBody
    public Integer getIdByName(@PathVariable String name){
        return classMap.getIdByName(name);
    }
}
