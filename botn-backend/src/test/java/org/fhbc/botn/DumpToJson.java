package org.fhbc.botn;

import org.fhbc.botn.dto.AddEntryRequest;
import org.junit.Test;

import com.google.gson.Gson;

public class DumpToJson {

	Gson gson = new Gson();
	
	@Test
	public void dumpToJson () {
		AddEntryRequest req = new AddEntryRequest();
		
		req.setBeerName("My IPA");
		req.setBeerStyle("IPA");
		req.setBrewer("Andy");
		req.setGameId(1001);
		
		System.out.println(gson.toJson(req));
	}
}
