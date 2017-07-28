package com.example.studentdemo.mapper;

import com.example.studentdemo.entity.Classes;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ClassMapper {
    public List<Classes> getAllClasses();
    public Integer getIdByName(String name);
}
