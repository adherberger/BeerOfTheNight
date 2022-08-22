package org.fhbc.botn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ("/botn")

public class BotnController {

	@Autowired
	private BeerOtnHandler handler;
	
	@PostMapping("/initGame")
	public Object initGame() {
		return handler.initGame();
	}

}
