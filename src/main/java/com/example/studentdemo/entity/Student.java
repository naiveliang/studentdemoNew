package com.example.studentdemo.entity;

import org.springframework.stereotype.Repository;

@Repository//注解持久层
public class Student {
    private Integer id;//学号
    private Integer cid;//班级
    private String name;//姓名
    private String age;
    private String sex;
    private String address;

    public void setId(Integer id){

        this.id = id;
    }
    public Integer getId(){

        return this.id;
    }
    public void setCid(Integer cid){

        this.cid = cid;
    }
    public Integer getCid(){

        return this.cid;
    }
    public void setName(String name){

        this.name = name;
    }
    public String getName(){

        return this.name;
    }
    public void setAge(String age){
        this.age = age;
    }
    public String getAge() {
        return age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
