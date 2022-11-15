package org.fhbc.botn;

import org.fhbc.botn.dto.AddEntryRequest;
import org.fhbc.botn.dto.GetEntriesRequest;
import org.fhbc.botn.dto.GetEntriesResponse;
import org.fhbc.botn.dto.GameDto;
import org.fhbc.botn.dto.JoinGameRequest;
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
	public GameDto initGame() {
		return handler.initGame();
	}
	
	@PostMapping("/joinGame")
	public GameDto joinGame(@RequestBody JoinGameRequest req) {
		return handler.joinGame(req);
	}

	@PostMapping("/addEntry")
	public void addEntry(@RequestBody AddEntryRequest req) {
		handler.addEntry(req);
	}

	@PostMapping("/getEntries")
	public GetEntriesResponse getEntries(@RequestBody GetEntriesRequest req) {
		return handler.getEntries(req);
	}
}
