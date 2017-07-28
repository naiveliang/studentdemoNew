package com.example.studentdemo.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.annotation.PreDestroy;
import javax.sql.DataSource;

/**
 * Created by mlamp on 2017/7/20
 */
@Configuration   //定义当前类为配置类
@EnableAutoConfiguration(exclude = DataSourceAutoConfiguration.class)  //开启自动配置，并屏蔽默认的数据源
@PropertySource(ignoreResourceNotFound=false, value={"classpath:/config/jdbc.properties"})//引入配置文件
@ComponentScan//开启自动扫描
@MapperScan("com.example.studentdemo.mapper")//设置扫描数据库操作接口的包路径
public class DatabaseConfig {
    @Autowired
    private Environment env;
    private HikariDataSource dataSource;

    @Bean(destroyMethod="close") //每个bean都是一个对象，此函数返回的对象dataSource就是一个bean，交由spring容器管理，因为设置了@ComponentScan，所以spring容器会自动扫描到它
    public DataSource dataSource(){//数据源bean
        HikariConfig config = new HikariConfig();
        config.setDriverClassName(env.getProperty("mysql.driverClassName"));
        config.setAutoCommit(false);
        config.setJdbcUrl(env.getProperty("mysql.ip")+env.getProperty("mysql.url"));
        config.setUsername(env.getProperty("mysql.username"));
        config.setPassword(env.getProperty("mysql.password"));
        dataSource = new HikariDataSource(config);
        return dataSource;
    }

    @Bean
    public SqlSessionFactory sqlSessionFactory() throws Exception{
        final SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(dataSource());
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        sessionFactory.setConfigLocation(resolver.getResource("classpath:/config/mybatis-config.xml"));//mybatis配置文件
        sessionFactory.setMapperLocations(resolver.getResources("classpath:/mapper/*.xml"));//mybatis映射脚本文件
        return sessionFactory.getObject();
    }

    @PreDestroy
    public void close(){
        if(this.dataSource != null){
            this.dataSource.close();
        }
    }

    @Bean
    public DataSourceTransactionManager transactionManager(){
        return new DataSourceTransactionManager(dataSource());
    }
}

