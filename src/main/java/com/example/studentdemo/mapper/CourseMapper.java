package com.example.studentdemo.mapper;

import com.example.studentdemo.entity.Course;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Component
public interface CourseMapper {
    public Integer deleteByStudentId(Integer id);
    public List<Map<String,Object>> getAllCourses();
    public List<Map<String,Object>> getLikeSearchResults(@Param("searchContent") String searchContent, @Param("searchMethod") String searchMethod);
    public List<String> getAllCourseSubject();
    public List<Map<String,Object>> getAllScoreByCourseName(String subject);
}
