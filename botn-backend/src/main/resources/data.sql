insert into game_main (game_id,game_date,game_state,room_code,member_id) values(100,CURRENT_DATE(),0,'AAAA',null);
insert into member (member_id, member_name) values(100,'Andy');
insert into game_member (game_id,member_id,is_present) values(100,100,true);
insert into member (member_id, member_name) values(101,'Kevin');
insert into game_member (game_id,member_id,is_present) values(100,101,true);
insert into member (member_id, member_name) values(102,'Scott');
insert into game_member (game_id,member_id,is_present) values(100,102,true);
insert into member (member_id, member_name) values(103,'Jeff');
insert into game_member (game_id,member_id,is_present) values(100,103,true);
insert into member (member_id, member_name) values(104,'Reid');
insert into game_member (game_id,member_id,is_present) values(100,104,true);

--member is not present, but will have an entry
insert into member (member_id, member_name) values(105,'Justin');
insert into game_member (game_id,member_id,is_present) values(100,105,false);

insert into member (member_id, member_name) values(106,'J');
insert into game_member (game_id,member_id,is_present) values(100,106,true);
insert into member (member_id, member_name) values(107,'New Kevin');
insert into game_member (game_id,member_id,is_present) values(100,107,true);
insert into member (member_id, member_name) values(108,'Rob');
insert into game_member (game_id,member_id,is_present) values(100,108,true);

--member will not have an entry, but will still have a vote 
insert into member (member_id, member_name) values(109,'Aaron');
insert into game_member (game_id,member_id,is_present) values(100,109,true);

insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(100,100,100,'Man with Bandages','Kolsch');
insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(101,100,101,'FestBier','Oktoberfest');
insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(102,100,102,'Coffee Blond','Blond Ale');
insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(103,100,103,'Incinerator','IPA');
insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(104,100,104,'Goal Line Pub Pale Ale','Pale Ale');

-- Entry for a member who is not present
insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(105,100,105,'Pale Ale','Pale Ale');

insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(106,100,106,'Table Beer','Table Beer');
insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(107,100,107,'Make Me Wanna Stout','Milk Stout');
insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(108,100,108,'Lager','Amber Lager');

insert into vote (game_id, member_id, first_id, second_id, third_id) values (100, 100, 107, 108, 106);
insert into vote (game_id, member_id, first_id, second_id, third_id) values (100, 101, 107, 100, 108);
insert into vote (game_id, member_id, first_id, second_id, third_id) values (100, 102, 101, 107, 100);
insert into vote (game_id, member_id, first_id, second_id, third_id) values (100, 103, 101, 102, 103);
insert into vote (game_id, member_id, first_id, second_id, third_id) values (100, 104, 102, 101, 107);
insert into vote (game_id, member_id, first_id, second_id, third_id) values (100, 106, 101, 103, 104);
insert into vote (game_id, member_id, first_id, second_id, third_id) values (100, 107, 107, 101, 105);
insert into vote (game_id, member_id, first_id, second_id, third_id) values (100, 108, 101, 102, 106);

-- Vote from a member who did not have an entry.
insert into vote (game_id, member_id, first_id, second_id, third_id) values (100, 109, 102, 106, 101);


insert into game_main (game_id,game_date,game_state,room_code,member_id) values(200,CURRENT_DATE(),0,'BBBB',null);
insert into member (member_id, member_name) values(200,'Andy');
insert into game_member (game_id,member_id,is_present) values(200,200,true);
insert into member (member_id, member_name) values(201,'Kevin');
insert into game_member (game_id,member_id,is_present) values(200,201,true);
insert into member (member_id, member_name) values(202,'Scott');
insert into game_member (game_id,member_id,is_present) values(200,202,true);
insert into member (member_id, member_name) values(203,'Jeff');
insert into game_member (game_id,member_id,is_present) values(200,203,true);
insert into member (member_id, member_name) values(204,'Reid');
insert into game_member (game_id,member_id,is_present) values(200,204,false);

insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(200,200,200,'Wee Light','Scottish Ale');
insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(201,200,201,'Bring the Heat','American IPA');
insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(202,200,202,'Two Hearted Clone','American IPA');
insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(203,200,203,'Maple POrter','Porter');
insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(204,200,204,'Tenured Clone','American IPA');