package org.fhbc.botn;

import org.springframework.cloud.context.restart.RestartEndpoint;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {
	@Bean
	public OpenAPI BotnOpenAPI() {
		return new OpenAPI()
	.info(new Info().title("Beer of the Night REST API")
			        .description("This is the backsend service for our Beer of the Night application.")
			        .version("0.0.1"));
	}

	@Bean
	public RestartEndpoint restartEndpoint() {
		return new RestartEndpoint();
	}
}
