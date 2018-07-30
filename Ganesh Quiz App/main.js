let quiz
let qNo = 0
let correct = 0


function getData() {
    $.get("quiz.json",(data, status)=>{
        quiz = data
        nextQuestion()
    })
}


function submitQuestion() {
    let answer = quiz[qNo].answer
    var myAns
    options = document.getElementsByName('options')
    for(option of options)
    {
        if(option.checked) {
            myAns = option.value
            break
        }
    }
    if(myAns == undefined) {
        alert("Select any option")
        return false
    }
    if(myAns == answer)
        correct++
    qNo++
    if(qNo < quiz.length)
        nextQuestion()
    return true
}


function nextQuestion() {
    window.location.hash=""
    $('#question').text(quiz[qNo].question)
    options = quiz[qNo].options
    optionsHTML = `<input type="radio" name="options" value="a"> a) ${options.a}<br>
                    <input type="radio" name="options" value="b"> b) ${options.b}<br>
                    <input type="radio" name="options" value="c"> c) ${options.c}<br>
                    <input type="radio" name="options" value="d"> d) ${options.d}<br>`
    $('#options').html(optionsHTML)
    $('#qNo').text(`Question ${qNo+1}`)
    if(qNo+1 == quiz.length)
    {
        console.log("Hello")
        $('#next').attr("disabled","disabled")
        $('#submit').removeAttr("disabled")
    }
}


function submitQuiz() {
    if(!submitQuestion())
        return false
    window.location.hash = "result"
    resultHTML = ""
    remark = ''
    contextualClass = ''
    percentage = (correct*100)/quiz.length
    scoreText = `You have scored ${percentage}%.`
    if(percentage >= 80) {
        remark = "Congratulations!!! You are awesome."
        contextualClass = "text-success"
    }
    else if(percentage >=60) {
        remark = "Good!!! You are getting good at it."
        contextualClass = "text-success"
    }
    else if(percentage >=37) {
        remark = "Oops!! You can do much better."
        contextualClass="text-warning"
    }
    else {
        remark = "Oops!!! You need to start from the very basics. Learn from W3Schools"
        contextualClass = "text-danger"
    }

    resultHTML = `<p class="${contextualClass}">${remark} ${scoreText}`
    $('.container').load('result.html', function() {
        /* When load is done */
        $('#result').html(resultHTML)
      });
}

function windowClose() {
    console.log("Hello")
    window.open('','_parent','');
    window.close();
}

function validateUser(event) {
    username = document.getElementById('username').value
    password = document.getElementById('password').value
    $.get("login.json",(data,status)=>{
        if(username==data.username && password==data.password) {
            window.location = "quiz.html"
        }
        else {
            $('#uError').text("Username or password is incorrect.")
        }
    })
    return false
}