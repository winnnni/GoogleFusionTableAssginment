/**
 * @author
 */
/* For this assignment, I am going to start with the data set and webpage from what we have used in class.
 * The data set is from FRED, which is the unemployment from 1948.
 * I want to creat two charts on my webpage showing good economy and bad economy
 * I define "good economy" as unemployment rate below 6, and "bad economy" as over 7 
 */
/*
 * program outline
 * 1. load jQuery (JQuery, Google javascript, then my custom scripts)
 * 2. load custom script file
 * 3. console to test scripts connected
 * 4. add document ready
 * 5. create function activiated on document ready
 * 6. console log in that function
 * 7. load google viz library
 * 8. load data
 * 9. feed data to library and place result on a page
 * 		9.1 format the data in the way that the lib can consume
 * 		9.2 google viz format: arrays in array
 * 		9.3 "observations": date and value
 * 			feed data to lib
 * 			figure out the type of chart I want
 * 			tell library where i want to draw the data
 * 			add options: headline of my chart 
 */
console.log ("The First step, I am going to refine unemployment data set.");

//USUNEMPLOYMENT is the local name of thejason file i just loaded
//USUNEMPLOYMENT is the name i picked myself, can be any.


function dataLoaded(USUNEMPLOYMENT){
	
	console.log(USUNEMPLOYMENT);
	
	var gRefinedUnemploymentData = new google.visualization.DataTable();
	//Variable that refers to a Google visuliaztion object begins with "g"
	
	//when i add column, put in the column name
	//second parameter is the name of the column
	gRefinedUnemploymentData.addColumn('string', USUNEMPLOYMENT.columns[0]);
	gRefinedUnemploymentData.addColumn('number', USUNEMPLOYMENT.columns[1]);

	gRefinedUnemploymentData.addRows(USUNEMPLOYMENT.rows);
	//copy and paste "addColumn" and "addRows" from google
	//in my data set, I already have properties that can be used as headernames
	
	//create options object to actually customeize
	//I need two headlines to distinguish two different line charts
	var options1 = {
          title: "good economy--unemployment rate below 6"
        };

	var options2 = {
          title: "bad economy--unemployment rate over 7"
        };
	//figure out what type of chart i want
	var myLineChart1 = new google.visualization.LineChart(document.getElementById("goodeconomyDiv"));
	//copy paste the Div I created in the webpage
        myLineChart1.draw(gRefinedUnemploymentData,options1);

	//since I have two charts, I var another line chart name and draw new chart
	var myLineChart2 = new google.visualization.LineChart(document.getElementById("badeconomyDiv"));
	//copy paste the Div I created in the webpage
        myLineChart2.draw(gRefinedUnemploymentData,options2);
}

function googleLoaded(){
	console.log("I can see line charts now.");
	
	
	//use the jQeury get function to load my json file
	//takes 3 parameter 
	//first is the name of the file
	//second is the function to call once the file is loaded, I keep the "dataLoaded"
	//third is a string of the file type to expect
	$.get("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1tAbuVjBmg2V3kehcxjjHMdN5rzEmMTYzyG-_8jF5+WHERE+VALUE<6&key=AIzaSyCanjIpR_ywL5C-JN0Wv7jmtkaqOuJJAlY", dataLoaded,"json");

	$.get("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1tAbuVjBmg2V3kehcxjjHMdN5rzEmMTYzyG-_8jF5+WHERE+VALUE>7&key=AIzaSyCanjIpR_ywL5C-JN0Wv7jmtkaqOuJJAlY", dataLoaded2,"json");
}
function pageLoaded(){
	
	console.log("I have all preparations done!");
	
	// load the google viz library
	google.load("visualization", "1", {packages:["corechart"], callback:"googleLoaded"});
	// add call back after the packages
	
}
$(document).ready(pageLoaded);
// get document ready first
