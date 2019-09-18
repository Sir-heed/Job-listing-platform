$(document).on('submit', '#create-job-form', function(event){
    // get the form data
    let formData = {
        'title' : $('input[name=title]').val(),
        'company': $('input[name=company]').val(),
        'department': $('input[name=department]').val(),
        'location': $('input[name=location]').val(),
        'type': $('input[name=type]').val(),
        'Industry': $('input[name=industry]').val(),
        'salary': $('input[name=salary]').val(),
        'Job Summary': $('textarea[name=jobSum]').val(),
        'Minimum Qualification': $('input[name=minQual]').val(),
        'Experience Level': $('input[name=expLev]').val(),
        'Job Description': $('input[name=expLen]').val()
    }
    // process the form
    $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : 'http://localhost:3000/jobs', // the url where we want to POST
        data        : formData, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        encode      : true
    })
    // using the done promise callback
    .done(function(data) {
        alert("Job created successfully") 
        $('#create-job-form').each(function(){
            this.reset();
        });
    });
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
});