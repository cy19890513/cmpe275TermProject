package edu.cmpe275.group275.openhack.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST")
                .allowedHeaders("Accept", "Origin", "X-Requested-With", "Content-Type", "Last-Modified", "Set-Cookie", "x-auth-token")
                .exposedHeaders("Accept", "Origin", "X-Requested-With", "Content-Type", "Last-Modified", "Set-Cookie", "x-auth-token")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
