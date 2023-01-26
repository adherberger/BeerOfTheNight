package org.fhbc.botn;

import java.util.ArrayList;
import java.util.List;

import org.fhbc.botn.dto.AddEntryForRequest;
import org.fhbc.botn.dto.AddEntryRequest;
import org.fhbc.botn.dto.AddEntryResponse;
import org.fhbc.botn.dto.Attendee;
import org.fhbc.botn.dto.GetEntriesRequest;
import org.fhbc.botn.dto.GetEntriesResponse;
import org.fhbc.botn.dto.InitGameRequest;
import org.fhbc.botn.dto.JoinGameRequest;
import org.fhbc.botn.dto.JoinGameResponse;
import org.fhbc.botn.dto.Result;
import org.fhbc.botn.dto.SubmitVotesRequest;
import org.fhbc.botn.dto.UpdateVotesResponse;
import org.fhbc.botn.dto.Vote;
import org.fhbc.botn.entity.GameEntity.GameState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.restart.RestartEndpoint;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

@RestController
@RequestMapping("/botn")
@CrossOrigin
public class BotnController {

	Gson gson = new Gson();
	
	@Autowired
	private BeerOtnHandler handler;
	
	@Autowired
	private RestartEndpoint restartEndpoint;
	
    @GetMapping("/restart")
    public void restart() {
    	//BeerOfTheNightApplication.restart();
    	
    	Thread restartThread = new Thread(() -> restartEndpoint.restart());
    	restartThread.setDaemon(false);
    	restartThread.start();
    } 
    
	@PostMapping("/initGame")
	public JoinGameResponse initGame(@RequestBody InitGameRequest req) {
		return handler.initGame(req);
	}
	
	@PostMapping("/joinGame")
	public JoinGameResponse joinGame(@RequestBody JoinGameRequest req) {
		return handler.joinGame(req,true);
	}

	@PostMapping("/addEntry")
	public AddEntryResponse addEntry(@RequestBody AddEntryRequest req) {
		System.out.println(gson.toJson(req));
		return handler.addEntry(req);
	}

	@PostMapping("/addEntryFor")
	public void addEntryFor(@RequestBody AddEntryForRequest req) {
		System.out.println(gson.toJson(req));
		handler.addEntryFor(req);
	}


	@PostMapping("/getEntries")
	public GetEntriesResponse getEntries(@RequestBody GetEntriesRequest req) {
		return handler.getEntries(req);
	}
	
	@MessageMapping("/startVoting")
	@SendTo("/botn/game-state")
	public GameState startVoting(Integer gameId) {
		return handler.startVotingForGame(gameId);
	}

	@MessageMapping("/votingComplete")
	@SendTo("/botn/game-state")
	public GameState endVoting(Integer gameId) {
		return handler.allVotesReceived(gameId);
	}
	
	@MessageMapping("/revealResults")
	@SendTo("/botn/game-state")
	public GameState revealResults(Integer gameId) {
		return handler.completeGame(gameId);
	}

	@MessageMapping("/updateAttendees")
	@SendTo("/botn/attendees")
	public List<Attendee> getAttendees(Integer gameId) {
		return handler.getAttendeesForGame(gameId);
	}

	@MessageMapping("/updateVotes")
	@SendTo("/botn/votes")
	public UpdateVotesResponse getVotes(Integer gameId) {
		UpdateVotesResponse resp = handler.getVotesForGame(gameId);
		System.out.println(gson.toJson(resp));
		return resp;
	}

	@PostMapping("/submitVotes")
	public boolean submitVotes(@RequestBody SubmitVotesRequest req) {
		handler.submitVotes(req);
		return true;
	}
	
	@GetMapping("/results/{gameId}")
	public List<Result> getResults(@PathVariable Integer gameId) {
		return handler.getResultsForGame(gameId);
	}
	
}
