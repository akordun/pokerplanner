PokerPlanner is one of my 2014 experiments in implementing a simple web app with MongoDB, Node.js, Bootstrap, Express, and a few other technologies.

The web app is a planning poker tool that allows for creation of rooms and playing planning poker games in them. The idea is to allow for creation of Rooms and Games. Allow participants to engaging in planning as part of these Games. The results would be stored and optionally integrated with JIRA, Rally, PivotalTracker, and other agile tools. Also some interesting post-processing can be done to analyze people's voting habbits, participation rates, diff between estimate and actuals, etc. 

While the server has a few JSON services and data model implemented, the UI hasn't had much progress. I have started modifying a developer's version of SmartAdmin theme, but eventually ran out of steam. Server-side was more fun. I also spent a significant amount of time thinking through and desining the actual UX for the needed screens. That was fun too. Hacking the pre-built Bootstrap theme to implement these screens in HTML/CSS.. not so much. I should have started from scratch instead. 

Anyway, here is a description of the directory structure:

/pokerplanning  -- contains the MVC implementation on Node.js and Express 
../app 			-- controllers, models, routes, utils, database content seeder
../database		-- db instance, population batch script, seed data
../node_modules	-- node modules
../public		-- the AJAX version of the SmartAdmin theme (98% not mine). 
../../ajax		-- views modified/created by me have a 2015 timestamp. Everything is from original.

/theme			-- HTML version of the SmartAdmin theme (99.9% not mine). Only 1 file is mine (See below). 
../GAME_index.html

../design	    -- a few images showing the actual game play UI, not CRUD on Games, Rooms, etc. 

