$(document).ready(function() {


//Create an array of question objects to loop through
var questions = [
    {
        askQuestion: 'Test question #1?', 
        answer1: 'one',
        answer2: 'two',
        answer3: 'three',
        correctAnswer: 'one', //this indicates the index number of the correct answer
    },
    {
        askQuestion: 'Test question #2?', 
        answer1: 'uno',
        answer2: 'dos',
        answer3: 'tres',
        correctAnswer: 'dos',
    }
];
//initialize global variable that will hold the time 
var timeRunningOut = 30 * 1000; //seconds
//initialize variables to keep track of scores
var score = 0;
var correct = 0;
var wrong = 0;
var questionIndex = 0;  //this can help to keep track of which question is being generated
var userInput;
var i = 0;





//select button tag & start on click function
var startButton = $('button').on('click', function() {
    //select button tag to be removed, and later replaced with new html content (questions)
    $('button').remove();  //esta esta funcionando bien!
    //call loopThroughQuestions funciton
    //loopThroughQuestions(); 
    //show hidden html
    $('#mainDiv').show();
    printQuestion();
    //generateQuestion();
    //display time
    $('#timeCountDown').text(30);


});

function printQuestion() {
    if(i  < questions.length) {
        $('h2').append(questions[i].askQuestion);
        $('.firstOption').append(questions[i].answer1);
        $('.secondOption').append(questions[i].answer2);
        $('.thirdOption').append(questions[i].answer3); //1st question and 1st set of answers are printed on the page uffff! x fin!!!!!
        
    }
};

function userClickedLi() {
$('li').on('click', function() {
    //how can I capture the value of the clicked <li> selected by the user???????
    //add a value to all li tags
    $('.firstOption').attr('value', questions[i].answer1);
    $('.secondOption').attr('value', questions[i].answer1);
    $('.thirdOption').attr('value', questions[i].answer1);
    //userInput = $('.firstOption').val();
    console.log($('.firstOption').val());
    //conditions();
});
}

//set conditions
function conditions() {
    if(userInput === questions[i].correctAnswer) { 
    console.log(userInput);
    alert(userInput);
    //alert('you got it!');
    score++;
    i++;
    //here I have to remove the first question and answers before running printQuestion()
    //printQuestion();
}
else{
    score--;
    //alert('good luck next time!');
}
};






//now, how can I make the options clickable: made changes in css file
/*next, I have to create a click event funciton to capture when an li tag is clicked on.
Effect: declare conditions comparing user's input to the  VALUE of 'correctAnswer' */
/*
function userClicksOnLi() {
    $('li').on('click', function() {
        if(userInput === question[i].correctAnser) {
            alert('you got it!');
            score++;
        }

    });
};
*/



/*
//First attempt: working with question object 
//I tried to loop through the object question, but I am having a hard time figuring out how to print one question at a time since both of them are printed in the same line
//loop through the questions inside of the array to generate our questions and add them to the removed button (line 25)
function loopThroughQuestions() {
    for(var i = 0; i < questions.length; i++) {
        $('#mainDiv h2').addClass('questionObject');
        $('#mainDiv h2').append(questions[i].askQuestion); //this is printing both of my question on the page
        //questionIndex += '<button>' + questions.question + '</button>';  //test
        console.log('test: current question index' + questionIndex);
        //now, I have to figure out how to display it on the page//////
        console.log(questions[i]);
        
        
        //timer starts decrementing by 1 per second/////////

    }
}; 
*/

/*
//third attempt: comment out second attempt and go back to fist attempt
function generateQuestion() {
    //make reference to the 'questions' array and the first 'questionIndex' variable, which for now is equal to zero
    var currentQuestion = questions[questionIndex];
    //grab reference to mainDiv h2 tag and add the first question
    $('h2').text(currentQuestion.askQuestion);
    console.log(currentQuestion.askQuestion);
    //since the loop is not working for me, I will try to grab each li by id
    $('.firstOption').text(currentQuestion.answer1);
    $('.secondOption').text(currentQuestion.answer2);
    $('.thirdOption').text(currentQuestion.answer3);

   
    //increment index number of the questions array by 1
    //questionIndex++;
    //generateQuestion(); 


                        /* second attempt commented out
                        for(var i =0; i < currentQuestion.answers.length; i++) {
                            //var options = $('li');
                            //test
                            //$('.emptyDiv').append(currentQuestion.answers[i]);
                            //options.append(currentQuestion.answers[i]);
                            //console.log(currentQuestion.answers[i]);
                        }

} */

//this function will have an if/else statement to compare the user's input to the answers
function conditionsCorrectAnswer() {
     
}



/*
//create fundtion to decrement time
vat timeCountDown = 
if (!clockRunning) {
    intervalId = setInterval(count, 1000);
    clockRunning = true;
*/




//closes $(document).ready(function() 
});




/*first attempt
create function to decrement time 
var timeDecrementCount = setTimeout(function() {
    timeRunningOut--;
    console.log(timeRunningOut);
    }, 30 * 1000);*/