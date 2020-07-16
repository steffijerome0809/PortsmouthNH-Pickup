

DROP DATABASE IF EXISTS pickup_league;
CREATE DATABASE pickup_league;


-- CREATE TABLE users (
--  id INTEGER AUTO_INCREMENT NOT NULL,
--  email VARCHAR(255) NOT NULL,
--  firstName VARCHAR(255) NOT NULL,
--  lastName VARCHAR(255) NOT NULL,
--  PASSWORD VARCHAR(255) NOT NULL,
--  PRIMARY KEY(id)
-- );
-- insert into users(email,firstname,lastname,password) values("blake@gmail.com","blake","thompson","password");
-- CREATE TABLE gameTypes (
--     id INTEGER AUTO_INCREMENT NOT NULL,
--     gameTypesName VARCHAR(255) NOT NULL, 
--     minPlayers INTEGER NOT NULL,
--     maxPlayers INTEGER NOT NULL,
--     neededToPlay BOOLEAN NOT NULL,
--     PRIMARY KEY(id)

-- );

-- insert into gameTypes(gameTypesName,minPlayers,maxPlayers,neededToPlay) values("volleyball",4,12,true);


-- ALTER TABLE gamesToBePlayed
-- ADD location_id integer not null;
USE pickup_league;


insert into Locations
    (title,createdAt,updatedAt)
values('Hanscom Park', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('Atlantic Heights Playground', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('Daniel Street Pocket Park', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('Hislop Field', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('Rock Street Park', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('Aldrich Park', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('Haven Park', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('Peirce Island Playground', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('South Street Playground', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('Langdon Park', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('Clough Field', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('Pine Street Playground', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('Goodwin Park', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('Cater Park', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('Alumni Field', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('Leary Field and Central L.L.', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('Lafayette Playground', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('Portsmouth Plains Playground', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('Pannaway Playground', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into Locations
    (title,createdAt,updatedAt)
values('Portsmouth Plains Field', '2020-01-06 20:34:38', '2020-01-06 20:34:38');


insert into GameTypes
    (gameTypesName, minPlayers, maxPlayers, neededToPlay, createdAt, updatedAt)
values('Volleyball', '4', '12', 1, '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into GameTypes
    (gameTypesName, minPlayers, maxPlayers, neededToPlay, createdAt, updatedAt)
values('Spikeball', '4', '4', 0, '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into GameTypes
    (gameTypesName, minPlayers, maxPlayers, neededToPlay, createdAt, updatedAt)
values('Soccer', '6', '12', 1, '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into GameTypes
    (gameTypesName, minPlayers, maxPlayers, neededToPlay, createdAt, updatedAt)
values('Baseball', '12', '18', '1', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into GameTypes
    (gameTypesName, minPlayers, maxPlayers, neededToPlay, createdAt, updatedAt)
values('Basketball', '4', '10', '1', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into GameTypes
    (gameTypesName, minPlayers, maxPlayers, neededToPlay, createdAt, updatedAt)
values('Rampshot', '4', '4', '0', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into GameTypes
    (gameTypesName, minPlayers, maxPlayers, neededToPlay, createdAt, updatedAt)
values('Ultimate Frisbee', '8', '16', '1', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into GameTypes
    (gameTypesName, minPlayers, maxPlayers, neededToPlay, createdAt, updatedAt)
values('Cornhole', '4', '4', '0', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into GameTypes
    (gameTypesName, minPlayers, maxPlayers, neededToPlay, createdAt, updatedAt)
values('Pickelball', '4', '4', '0', '2020-01-06 20:34:38', '2020-01-06 20:34:38');
insert into GameTypes
    (gameTypesName, minPlayers, maxPlayers, neededToPlay, createdAt, updatedAt)
values('Tennis', '2', '2', '0', '2020-01-06 20:34:38', '2020-01-06 20:34:38');


CREATE TABLE gamesToBePlayed
(
    id INTEGER
    AUTO_INCREMENT NOT NULL,
    gametypeid integer,
    location_id integer,
    primary key
    (id),
	foreign key
    (gametypeid) references gameTypes
    (id)
);

-- delete from gamesToBePlayed;
-- insert into gamesToBePlayed(gametypeid,location_id) values(1,1);

-- select gt.gameTypesName, gt.id from gamesToBePlayed g , gameTypes gt, eventlocation e where g.gametypeid=gt.id
