//assign the reference to the db to a variable named database
var database = firebase.database();

//initial values
var name = "";
var destination = "";
var firstTime = ""; //to be entered in military time
var frequency = 0;

$("#submit").on("click",function(event){
event.preventDefault();

name = $("#train_name").val().trim();
destination = $("#train_dest").val().trim();
firstTime = $("#train_first_time").val().trim();
frequency = $("#train_freq").val().trim();

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % frequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = frequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

var myNextTrain = nextTrain.toString();

database.ref().push({
    name: name,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency,
    nextTrain: myNextTrain,
    minAway: tMinutesTillTrain
    });
});

database.ref().on("child_added", function(childSnapshot) {

    //change the HTML
    $("#t-body").append("<tr><td>"
    + childSnapshot.val().name
    + "</td><td>"
    + childSnapshot.val().destination
    + "</td><td>"
    + childSnapshot.val().frequency
    + "</td><td>"
    + childSnapshot.val().nextTrain
    + "</td><td>"
    + childSnapshot.val().minAway
    + "</td></tr>")

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// $("clear").on("click", function(event){
//     event.preventDefault();
//     database.ref().remove();
//     // $("#tbodyid").empty();

// });
