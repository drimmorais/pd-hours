package com.pdsolucoes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.pdsolucoes")
public class PdHoursControlApplication {

    public static void main(String[] args) {
        SpringApplication.run(PdHoursControlApplication.class, args);
    }
}