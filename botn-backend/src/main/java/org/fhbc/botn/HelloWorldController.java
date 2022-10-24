package org.fhbc.botn;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {
	@GetMapping("/") 
	public String landingPage() {
		return("    <html>" + 
				"    <head>" + 
				"    </head>" + 
				"    <body>" + 
				"    <h1>Beer of the Night<h1>" + 
				"    Check out the <a href=\"/swagger-ui/index.html\">Swagger-UI</a> page" +
				"    </body>" + 
				"    </html>");
	}

}
