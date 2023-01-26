package org.fhbc.botn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class BeerOfTheNightApplication {

    private static ConfigurableApplicationContext context;
    
	public static void main(String[] args) {
		SpringApplication.run(BeerOfTheNightApplication.class, args);
	}

}
