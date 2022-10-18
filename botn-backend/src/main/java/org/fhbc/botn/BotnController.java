package org.fhbc.botn;

import org.fhbc.botn.dto.AddEntryRequest;
import org.fhbc.botn.dto.InitGameResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ("/botn")
@CrossOrigin
public class BotnController {

	@Autowired
	private BeerOtnHandler handler;
	
	@PostMapping("/initGame")
	public InitGameResponse initGame() {
		return handler.initGame();
	}

	@PostMapping("/addEntry")
	public void addEntry(@RequestBody AddEntryRequest req) {
		handler.addEntry(req);
	}

}
