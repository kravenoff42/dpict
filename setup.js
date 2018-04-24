var mysql      = require('mysql');
var connection = mysql.createConnection({
    host: "mydata.cumqlzvaxiop.us-east-1.rds.amazonaws.com",
    user: "mydatauser",
    password: "AcCr4D4t4",
    database : 'mydata'
});
 
connection.connect();
 
connection.query("CREATE TABLE projects (`projectName` varchar(50), `dateCreated` date, `projectDescription` varchar(300), `dueDate` date, `multipliers` varchar(150), `isArchived` boolean, `hasOutline` boolean, `inCollection` boolean);", function (error, results, fields) {
  if (error) throw error;
  console.log('table created');
});
connection.query("INSERT INTO projects (`projectName`, `dateCreated`, `projectDescription`, `dueDate`, `multipliers`, `isArchived`, `hasOutline`, `inCollection`) VALUES ('list-maker', DATE '2016-01-16', 'A proof of concept for a to do app, inspired by a Codecademy challenge.', NULL, 'Easily Completed, Interesting Domain', '1', '1', '1'), ('no-context', DATE '2016-01-28', 'A quote generator made for one of the <a href=\"https://www.freecodecamp.org/kravenoff42\">Free Code Camp</a> projects.', NULL, 'Easily Completed, Interesting Domain', '1', '1', '1'), ('search-wiki', DATE '2016-02-29', 'This is an interface for Wikipedia using there API, made for one of the <a href=\"https://www.freecodecamp.org/kravenoff42\">Free Code Camp</a> projects.', NULL, 'Easily Completed, Interesting Domain', '1', '1', '1'),('whats-my-weather', DATE '2016-04-30', 'This is a webpage that shows you the current weather using the open weather API and the flickr API for images. This was made for one of the <a href=\"https://www.freecodecamp.org/kravenoff42\">Free Code Camp</a> projects.', NULL, 'Easily Completed, Interesting Domain', '0', '1', '1'), ('adrift', DATE '2017-10-03', 'A \"RAFT\" clone in space with an isometric view.', NULL, 'Easily Monetized, Interesting Domain', '0', '1', '1'),  ('teaching-exchange', DATE '2017-10-03', 'A market place app to trading tutoring sessions, using hours as currency.', NULL, 'Interesting Domain, Working with Others, Personal Tool', '0', '0', '0'), ('p5-pixel-js', DATE '2017-10-04', 'Pixel art asset making library to extend p5.', NULL, 'Interesting Domain, Working with Others, Personal Tool', '0', '0', '1'), ('job-view', DATE '2017-10-04', 'A way to visualize the job landscape, and tweak parameters according you your skills and desired career parameters.', NULL, 'Interesting Domain, Personal Tool', '0', '0', '0'), ('kravenoffs_kollection', DATE '2017-10-07', 'Adding a landing page for my projects visible from gh-pages.', NULL, 'Easily Completed, Prerequisite, Personal Tool', '1', '1', '0'), ('project-backlog', DATE '2017-10-07', 'A backlog of the world toughest technical problems and steps to solve them.', NULL, 'Interesting Domain, Working with Others, Personal Tool', '0', '0', '0'), ('minecraft-tunnel-planner', DATE '2017-10-07', 'A simple app that lets you plan out a tunnel that will land precisely where you need it.', NULL, 'Easily Completed, Personal Tool', '0', '1', '1'),('p5-svg-gen', DATE '2017-10-07', 'A SVG creation interface that works with p5.svg.js', NULL, 'Interesting Domain. Working with Others. Personal Tool', '0', '0', '1'), ('asteroids', DATE '2017-10-08', 'An Asteroids clone made in p5.js.', NULL, 'Easily Completed. Interesting Domain', '1', '1', '1'), ('timeline-writer', DATE '2017-10-10', 'A simple interface for writing a narrative in timeline format, or creating a timeline for an existing narrative.', NULL, 'Interesting Domain', '0', '0', '1'), ('tweet-shirts', DATE '2017-10-10', 'A twitter bot that runs sentiment analysis on trending tweets and selective highly positive of highly negative topics and generates t-shirt designs based on the associated hashtag.', NULL, 'Easily Monetized, Interesting Domain. Personal Tool', '0', '0', '0'), ('code-namer', DATE '2017-10-10', 'A small app that taps into the word-nik API to generate a list of code-names that will be alphabetical and thematically related, to make it easy to name projects and their proceeding generations', NULL, 'Easily Completed, Interesting Domain, Personal Tool', '0', '0', '1'), ('verata-codex', DATE '2017-10-10', 'A Natural language Processing script that analyzes and categorizes laws and bills. making it easier to interpret laws and translate them to machine readable forms as well as other lanuages.', NULL, 'Interesting Domain, Prerequisite, Working with Others', '0', '0', '0'), ('doodle-app', DATE '2017-10-10', 'A small app that has a UI for drawing in the canvas hopefully to be used in some kind of game in the future.', NULL, 'Easily Completed, Interesting Domain, Prerequisite, Personal Tool', '0', '0', '1'), ('geo-coloring-pages', DATE '2017-10-12', 'A small algorithm for generating coloring pages for my daughter.', NULL, 'Easily Completed, Interesting Domain, Personal Tool', '1', '1', '1'), ('ani-hero', DATE '2017-10-14', 'A widget for storing several visual animations made in p5.', NULL, 'Easily Completed. Interesting Domain, Prerequisite, Personal Tool', '1', '1', '1'), ('vanNeumannSim', DATE '2017-10-27', 'A 2D sim of your life as a Van Neumann Probe Control AI, loosely based on the Bobiverse Series by Dennis E. Taylor.', NULL, 'Easily Monetized, Interesting Domain, Personal Tool', '0', '0', '0'),('MineCode', DATE '2017-10-27', 'A Minecraft mod that help visualize and gameify coding concepts, where player mine raw code to craft programs.', NULL, 'Interesting Domain, Working with Others, Personal Tool', '0', '0', '0'), ('cost-of-living', DATE '2017-10-29', 'A budgeting software that takes in your yearly income a breaks down a budget based on your monthly costs, and allows you to weight you preferences for spending.', NULL, 'Easily Monetized, Interesting Domain, Prerequisite, Personal Tool', '0', '0', '0'), ('my-first-rogue', DATE '2017-11-12', 'A pretty simple rogue-like game that I built in JS.', NULL, 'Easily Completed, Interesting Domain, Prerequisite, Personal Tool', '1', '1', '1'), ('blog', DATE '2017-11-12', 'This is my obligatory blog for post my thoughts on life and coding.', DATE '2017-11-30', 'Easily Completed, Prerequisite, Personal Tool', '0', '0', '0'), ('bury-your-dead', DATE '2017-11-15', 'A top-down adventure where you are an underkeeper defending yourself against and re-burying zombies.', NULL, 'Easily Monetized, Interesting Domain, Personal Tool', '0', '1', '1'),('code-clicker', DATE '2017-12-17', 'An idle clicker game with a software theme, one click is one line of code and you automate with AI', NULL, 'Easily Monetized, Interesting Domain, Personal Tool', '0', '0', '1');", function (error, results, fields) {
  if (error) throw error;
  console.log('table populated');
});

connection.query('SELECT * FROM projects', function (error, results, fields) {
  if (error) throw error;
  console.log('current rows: ', results.length);
});
 
connection.end();