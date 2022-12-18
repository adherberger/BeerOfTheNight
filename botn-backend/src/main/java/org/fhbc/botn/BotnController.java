package org.fhbc.botn;

import org.fhbc.botn.dto.AddEntryRequest;
import org.fhbc.botn.dto.AddEntryResponse;
import org.fhbc.botn.dto.GetEntriesRequest;
import org.fhbc.botn.dto.GetEntriesResponse;
import org.fhbc.botn.dto.InitGameRequest;
import org.fhbc.botn.dto.JoinGameRequest;
import org.fhbc.botn.dto.JoinGameResponse;
import org.fhbc.botn.dto.SubmitVotesRequest;
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
	public JoinGameResponse initGame(@RequestBody InitGameRequest req) {
		return handler.initGame(req);
	}
	
	@PostMapping("/joinGame")
	public JoinGameResponse joinGame(@RequestBody JoinGameRequest req) {
		return handler.joinGame(req);
	}

	@PostMapping("/addEntry")
	public AddEntryResponse addEntry(@RequestBody AddEntryRequest req) {
		return handler.addEntry(req);
	}

	@PostMapping("/getEntries")
	public GetEntriesResponse getEntries(@RequestBody GetEntriesRequest req) {
		return handler.getEntries(req);
	}
	
	@PostMapping("/submitVotes")
	public boolean submitVotes(@RequestBody SubmitVotesRequest req) {
		handler.submitVotes(req);
		return true;
	}

}
