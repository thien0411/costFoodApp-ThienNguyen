/*
*Cse 120 Homework 4 Food Cost App
*
* Thien Nguyen
*/

//Declare Array to hold the data.
var childCost = [];


childCost[0] = [93.40, 125.10, 141.70, 174.00];
childCost[1] = [102.40, 131.10, 158.00, 192.4];
childCost[2] = [107.70, 135.40, 168.10, 206.10];
childCost[3] = [137.10, 190.80, 229.60, 273.00 ];
childCost[4] = [154.60, 206.30, 266.50, 30.60];

var maleCost = [];

maleCost[0] = [166.60, 236.30, 297.30, 348.40];
maleCost[1] = [172.00, 240.80, 306.40, 351.40];
maleCost[2] = [185.00, 239.20, 299.70, 368.50];
maleCost[3] = [168.50, 225.30, 280.20, 338.70];
maleCost[4] = [169.80, 225.50, 275.80, 341.90];


var femaleCost = [];

femaleCost[0] = [166.70, 204.10, 245.50, 301.40];
femaleCost[1] = [163.80, 204.00, 246.80, 304.40];
femaleCost[2] = [163.90, 207.20, 255.50, 326.50];
femaleCost[3] = [162.20, 201.50, 251.50, 303.60];
femaleCost[4] = [157.30, 198.90, 247.30, 298.60];




function monthlyPlan(){

var mainTotal = 0;

    var totalThifty = 0;
    var toatalLowCost = 0;
    var Moderate = 0;
    var Liberal = 0;


  var planType = ($("#plan").val())*1;


var totalChildrenCost = 0;
  for(var i = 0; i < numChild ; i++ ){


    var childRow = $("#AgeChild" + i).val();


    mainTotal =  mainTotal +  childCost[childRow][planType];
    totalChildrenCost = totalChildrenCost + childCost[childRow][planType];  //data for 1st graph;



      //data for 2nd graph
    totalThifty += childCost[childRow][0];;
    toatalLowCost += childCost[childRow][1];;
    Moderate += childCost[childRow][2];;
    Liberal += childCost[childRow][3];;



  }





  var totalMaleCost = 0;
  var totalFemaleCost = 0;


  for(var i = 0; i < numAdult ; i++ ){


    if( ($("#adultGenderID"  + i).val()) === 'M' ){



      var adultRow = $("#adultAgeID" + i).val();

     mainTotal =  mainTotal +  maleCost[adultRow][planType];  //data for Main Result


      totalMaleCost = totalMaleCost + maleCost[adultRow][planType];  //data for 1st graph;


        //data for 2nd graph
      totalThifty += maleCost[childRow][0];;
    toatalLowCost += maleCost[childRow][1];;
     Moderate += maleCost[childRow][2];;
     Liberal += maleCost[childRow][3];;




    } else {


      var adultRow = $("#adultAgeID" + i).val();

      console.log("adult row: " + adultRow);

      mainTotal =  mainTotal +  femaleCost[adultRow][planType]; //data for Main Result


      totalFemaleCost = totalFemaleCost + femaleCost[adultRow][planType];   //data for 1st graph;

            //data for 2nd graph
      totalThifty += femaleCost[childRow][0];;
    toatalLowCost += femaleCost[childRow][1];;
    Moderate += femaleCost[childRow][2];;
    Liberal += femaleCost[childRow][3];;



    }



  }


//Adjust based on third footnote for family size
    var totalMember = numChild + numAdult;

  if(totalMember ==1)  mainTotal = mainTotal+mainTotal*0.2;
  else if (totalMember == 2) mainTotal = mainTotal + mainTotal*0.1;
  else if (totalMember ==3) mainTotal = mainTotal + mainTotal*0.05;
  else if (totalMember == 4) mainTotal = mainTotal;
  else if (totalMember == 5 || totalMember == 6) mainTotal = mainTotal - mainTotal*0.05;
  else if (totalMember >= 7) mainTotal = mainTotal - mainTotal*0.1;



    console.log(mainTotal);
    addResutBox("The total monthly meal  plan cost of your family is: $" + mainTotal.toFixed(2));


//assuming table area

  $('#AssumingTableArea tbody').empty();
  var rateTotal = mainTotal;

  for (var i = 0; i < 10; i ++){


        var newRow = "<tr>" +
                      "<td>Year " + (i+1) + "</td>" +
                      "<td>" + "$" + rateTotal.toFixed(2) + "</td>" +

                    "</tr>";


      $("#AssumingTableArea tbody").append(newRow);

       rateTotal = rateTotal +  rateTotal*0.008;



    }











    //give data to the first visualization graph
    foo(totalChildrenCost, totalMaleCost,totalFemaleCost );


    //Give date for the 2nd graph
     foo2(totalThifty, toatalLowCost,Moderate, Liberal );

}

function generateChild(){

  $("#generateChild").empty();


  numChild = ($("#numChild").val())*1;


	//console.log(numChild);


  //check error
  if(numChild < 0 || isNaN(numChild) || numChild !== parseInt(numChild)){

        addErrorBox("You need to input a positive interger value and can't input a string value!!");
      return;
  }


  for(var i = 0; i < numChild; i++){

     /* var childAge = " <div id=\"childAgeDiv\" class=\"col-md-2\">Age of Child  " + (i+1) + " (1 to 11)</div>"

                          + "<div class=\"col-md-3\"><input type=\"text\" id=\"childAge" + (i+1)  + "\" value=\"\"/></div>" +  "<br></br>";

    */

   var  AgeDropbox =  "<p>Select the age of children" + (i+1) +
           "<select id=" + "AgeChild" + i +  "  \"> "  +
               "<option value=\"0\">(1 year)</option>" +
               "<option value=\"1\">(2-3 years)</option>" +
               "<option value=\"2\">(4-5 years)</option>" +
               "<option value=\"3\">(6-8 years)</option>" +
               "<option value=\"4\">(9-11 years)</option>" +
           "</select>" +
       "</p>"



      $("#generateChild").append(AgeDropbox);
    $('#generateChild').hide().fadeIn("slow");

  }

}


function generateAdult(){


  //get the value

  numAdult = ($("#numAdult").val())*1;
  //check error
  if(numAdult < 0 || isNaN(numAdult) || numAdult !== parseInt(numAdult)  ){

        addErrorBox("You need to input a positive interger value and can't input a string value!!");
      return;
  }


  for(var i = 0; i < numAdult; i++){

    /*
    var adultAge = " <div id=\"childAgeDiv\" class=\"col-md-2\">Age of adult " + (i+1) + " (12 to 71+)</div>"

                          + "<div class=\"col-md-3\"><input type=\"text\" id=\"adultAge"+ (i+1)  + "\" value=\"\"/></div>" +  "<br></br>";

      var adultGender = " <div id=\"childGenderDiv\" class=\"col-md-2\">Gender of Adult " + (i+1) + " (M or F)</div>"

                          + "<div class=\"col-md-3\"><input type=\"text\" id=\"adultGender" + (i+1)  + "\" value=\"\"/></div>" +  "<br></br>";

*/
      //var ageID = "adultAgeID" + i;

    var adultAgeDrobox = "<p>Select the age of adult" + (i+1) +
           "<select id=" + "adultAgeID" + i +  "  \"> "  +
               "<option value=\"0\">(12-13 year)</option>" +
               "<option value=\"1\">(14-18 years)</option>" +
               "<option value=\"2\">(19-50 years)</option>" +
               "<option value=\"3\">(51-70 years)</option>" +
               "<option value=\"4\">(71+ years)</option>" +
           "</select>" +
       "</p>"




      var adultGenderDrobox = "<p>Select the gender of adult" + (i+1) +
           "<select id=" + "adultGenderID" + i +  "  \"> "  +
               "<option value=\"M\">(M)</option>" +
               "<option value=\"F\">(F)</option>" +

           "</select>" +
       "</p>"



    $("#generateAdult").append(adultAgeDrobox);
   $("#generateAdult").append(adultGenderDrobox);
  }

}

function addResutBox(resultMessage) {
  var resultDiv = '<div class="alert alert-success alert-dismissible" role="alert">' +
                 '<button type="button" class="close" data-dismiss="alert">' +
                 '<span aria-hidden="true" style="cursor: pointer;">&times;</span>' +
                 '<span class="sr-only">Close</span></button>' +
                 '<strong></strong> '+resultMessage+'</div>';
  $('#resultArea').empty();
  $('#resultArea').append(resultDiv);
  $('#resultArea').hide().fadeIn("slow");
}



function addErrorBox(errorMessage) {
  var errorDiv = '<div class="alert alert-danger alert-dismissible" role="alert">' +
                 '<button type="button" class="close" data-dismiss="alert">' +
                 '<span aria-hidden="true" style="cursor: pointer;">&times;</span>' +
                 '<span class="sr-only">Close</span></button>' +
                 '<strong>ERROR!</strong> '+errorMessage+'</div>';
  $('#errorArea').empty();
  $('#errorArea').append(errorDiv);
  $('#errorArea').hide().fadeIn("slow");
}

