package org.fhbc.botn;

import org.fhbc.botn.dto.AddEntryRequest;
import org.fhbc.botn.dto.SubmitVotesRequest;
import org.junit.Test;

import com.google.gson.Gson;

public class DumpToJson {

	Gson gson = new Gson();
	
	@Test
	public void dumpToJson () {
		SubmitVotesRequest req = new SubmitVotesRequest();
		
		req.setGameId(100);
		req.setMemberId(100);
		req.setFirst(101);
		req.setSecond(102);
		req.setThird(103);
		
		System.out.println(gson.toJson(req));
	}
}
