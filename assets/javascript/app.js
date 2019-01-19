$(document).ready(function() {


//Create an array of question objects to loop through
var questions = [
    {
        askQuestion: 'Test question #1?', 
        answers: ['one', 'two', 'three'],
        correctAnswer: 0, //this indicates the index number of the correct answer
    },
    {
        askQuestion: 'Test question #2?',
        answers: ['uno', 'dos', 'tres'],
        correctAnswer: 1,
    }
];
//initialize global variable that will hold the time 
var timeRunningOut = 30; //seconds
//initialize variables to keep track of scores
var score = 0;
var correct = 0;
var wrong = 0;
var questionIndex = 0;  //this can help to keep track of which question is being generated

//select button tag & start on click function
var startButton = $('button').on('click', function() {
    //select button tag to be removed, and later replaced with new html content (questions)
    $('button').remove();  //esta esta funcionando bien!
    //call loopThroughQuestions funciton
    //loopThroughQuestions(); 
    //show hidden html
    $('#mainDiv').show();
    generateQuestion();


});

/* First attempt: working with question object 
I tried to loop through the object question, but I am having a hard time figuring out how to print one question at a time since both of them are printed in the same line
//loop through the questions inside of the array to generate our questions and add them to the removed button (line 25)
function loopThroughQuestions() {
    for(var i = 0; i < questions.length; i++) {
        $('#mainDiv').addClass('questionObject');
        $('#mainDiv').append(questions[i].question); //this is printing both of my question on the page
        questionIndex += '<button>' + questions.question + '</button>';  //test
        console.log('test ' + questionIndex);


        //now, I have to figure out how to display it on the page//////
        console.log(questions[i]);
        
        
        //timer starts decrementing by 1 per second/////////

    }
};
*/

//Second attempt: 
function generateQuestion() {
    //make reference to the 'questions' array and the first 'questionIndex' variable, which for now is equal to zero
    var currentQuestion = questions[questionIndex];
    //grab reference to mainDiv h2 tag and add the first question
    $('h2').text(currentQuestion.askQuestion);
    for(var i =0; i < currentQuestion.answers.length; i++) {
        var options = $('li');
        //test
        $('.emptyDiv').append(currentQuestion.answers[i]);
        //options.append(currentQuestion.answers[i]);
        console.log(currentQuestion.answers[i]);
    }

}

//this function will have an if/else statement to compare the user's input to the answers
function conditionsCorrectAnswer() {
     
}



//create function to decrement time 
var timeDecrementCount = setTimeout(function() {
    timeRunningOut--;
    console.log(timeRunningOut);
}, 1000);

//closes $(document).ready(function() 
});
