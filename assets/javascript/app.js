//Create an array of question objects to loop through
var questions = [
    {
        question: 'Test question #1?', 
        a1: 'Luce',
        b1: 'Thali',
        c1: 'Carmen',
        answer: 'a1',
    },
    {
        question: 'Test question #2?',
        a2: '1',
        b2: '2',
        b3: '3',
        answer: 'b2'
    }
];
//initialize global variable that will hold the time 
var timeRunningOut = 30; //seconds
//initialize variables to keep track of scores
var score = 0;
var correct = 0;
var wrong = 0;

//select button class & start on click function
var replaceButton = $('button').on('click', function() {
    //select button tag to be removed, and later replaced with new html content (questions)
    $('button').remove();
    //call loopThroughQuestions funciton
    loopThroughQuestions();
});

//loop through the questions inside of the array to generate our questions and add them to the removed button (line 25)
function loopThroughQuestions() {
    for(var i = 0; i < questions.length; i++) {
        var printQuestions = $('<div>');
        printQuestions.addClass('questionObject');
        //now, I have to figure out how to display it on the page//////
        console.log(questions[i]);
        
        //timer starts decrementing by 1 per second/////////

    }
};
                
//create function to decrement time 
var timeDecrementCount = setTimeout(function() {
    timeRunningOut--;
    console.log(timeRunningOut);
}, 1000);

