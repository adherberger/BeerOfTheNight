insert into game_main (game_id,game_date,game_state,room_code,member_id) values(100,CURRENT_DATE(),1,'AAAA',null);
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

insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(100,100,100,'Man with Bandages','Kolsch');
insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(101,100,101,'FestBier','Oktoberfest');
insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(102,100,102,'Coffee Blond','Blond Ale');
insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(103,100,103,'Incinerator','IPA');
insert into entry (entry_id,game_id,member_id,beer_name,beer_style) values(104,100,104,'Goal Line Pub Pale Ale','Pale Ale');


insert into game_main (game_id,game_date,game_state,room_code,member_id) values(200,CURRENT_DATE(),1,'BBBB',null);
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