/**
 * @author
 */
/* I was trying to find currency exchange rate data set, but failed.
 * So I am sticking with the unemployment data from class.
 * I am creating a line chart showing the unemployment rate since 1980.
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
console.log ("The First step, I am going to create a line chart of unemployment today.");

//USUNEMPLOYMENT is the local name of thejason file i just loaded
//USUNEMPLOYMENT is the name i picked myself, can be any.


function dataLoaded(UNEMPDATA){
	
	console.log("hi");
	console.log(UNEMPDATA);
	
	var gDataTable = new google.visualization.DataTable();
	
	//when i add column, put in the column name
	//second parameter is the name of the column
	gDataTable.addColumn('string', UNEMPDATA.columns[0]);
	gDataTable.addColumn('number', UNEMPDATA.columns[1]);

	gDataTable.addRows(UNEMPDATA.rows);
	
	//create options object to actually customeize
	//I need a headline
	var options = {
          title: "Unemployment rate since 1980"
        };

	//figure out what type of chart i want
	var myLineChart = new google.visualization.LineChart(document.getElementById("linechartunempDiv"));
	//copy paste the Div I created in the webpage
        myLineChart.draw(gDataTable,options);


	var myLineChart = new google.visualization.LineChart(document.getElementById("linechartunempDiv2"));
	//copy paste the Div I created in the webpage
        myLineChart.draw(gDataTable,options);
}

function googleLoaded(){
	console.log("I can see line chart now.");
	
	
	//use the jQeury get function to load my json file
	//takes 3 parameter 
	//first is the name of the file
	//second is the function to call once the file is loaded, I keep the "dataLoaded"
	//third is a string of the file type to expect
	 $.get("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1tAbuVjBmg2V3kehcxjjHMdN5rzEmMTYzyG-_8jF5+WHERE+DATE>'1979-12-01'&key=AIzaSyCanjIpR_ywL5C-JN0Wv7jmtkaqOuJJAlY", dataLoaded,"json");

	$.get("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1tAbuVjBmg2V3kehcxjjHMdN5rzEmMTYzyG-_8jF5+WHERE+DATE>'1979-12-01'&key=AIzaSyCanjIpR_ywL5C-JN0Wv7jmtkaqOuJJAlY", dataLoaded2,"json");
}
function pageLoaded(){
	
	console.log("I have all preparations done!");
	
	// load the google viz library
	google.load("visualization", "1", {packages:["corechart"], callback:"googleLoaded"});
	// add call back after the packages
	
}
$(document).ready(pageLoaded);
// get document ready first
