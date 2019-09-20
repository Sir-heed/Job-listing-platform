$(document).ready(function(){
    let admin = window.sessionStorage.getItem('isAdmin');
    let username = window.sessionStorage.getItem('username')
    if (!admin){
        $("#create-job").hide();
        $('#logout').hide();
    }
    if (admin){
        $("#login").hide();
        $("#greeting").prepend(
            `<div class="card-header bg-primary" style="color: white" id="greeting-message">
                Welcome ${username}
            </div>`)
    }
    let dataList = $("#job-listings")
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/jobs",
        success: function(result){
            // console.log(result);
            let output = "<h5 class=\"card-title\">";
            const isAdmin = window.sessionStorage.getItem('isAdmin');
            for (let element of result.reverse()) {
                if (isAdmin) {
                    output += "<h5 class=\"card-title\">" + element.title + "</h5><p class=\"card-text\">" + element['Job Summary'] + "</p><button class=\"btn btn-info\" data-id='" + element.id + "' id=\"readMore\">Read More</button><button class=\"btn btn-primary\" data-id='" + element.id + "' id=\"editButton\">Edit Job</button><button class=\"btn btn-danger\" data-id='" + element.id + "' id=\"deleteButton\">Delete Job</button><hr>";
                }
                else {
                    output += "<h5 class=\"card-title\">" + element.title + "</h5><p class=\"card-text\">" + element['Job Summary'] + "</p><button class=\"btn btn-info\" data-id='" + element.id + "' id=\"readMore\">Read More</button><hr>";
                }
                // console.log(element.title)
            }
            dataList.html(output)
          }
      })
    $(document).on('click', '#logout', function(){
        window.sessionStorage.clear()
    });
});

$(document).on('click', '#readMore', function(){
    let jobId = $(this).attr('data-id');
    let url = "http://localhost:3000/jobs/" + jobId
    let homeButton = $("#homeButton")
    let changedHome = "<a class=\"nav-link\" href=\"./index.html\">Home <span class=\"sr-only\">(current)</span></a>"
    homeButton.html(changedHome)
    let title = $("#page-title")
    let changedTitle = "<a href=\"./index.html\" class=\"btn btn-primary\"> Back to home </a>"
    title.html(changedTitle)
    $.getJSON(url, function(data){
        let dataList = $("#job-listings")
        let output = "<h5 class=\"card-title\">";
        output += "<h5 class=\"card-title\">" + data.title + "</h5><h6 class=\"card-title\"> Company: " + data.company + "</h6><h6 class=\"card-title\"> Department: " + data.department + "</h6><h6 class=\"card-title\"> Location: " + data.location + "</h6><h6 class=\"card-title\"> Type: " + data.type + "</h6><h6 class=\"card-title\"> Industry: " + data.Industry + "</h6><h6 class=\"card-title\"> Salary: " + data.salary + "</h6><h6 class=\"card-title\"> Mininmum Qualification: " + data["Minimum Qualification"] + "</h6><h6 class=\"card-title\"> Experience Level: " + data["Experience Level"] + "</h6><h6 class=\"card-title\"> Experience Length: " + data["Experience Length"] + "</h6><p class=\"card-text\"> <b>Job Summary</b>: <br/>" + data['Job Summary'] + "<hr>"
        dataList.html(output)
    })
});

$(document).on('click', '#editButton', function(){
    let jobId = $(this).attr('data-id');
    let url = "http://localhost:3000/jobs/" + jobId
    let homeButton = $("#homeButton")
    let changedHome = "<a class=\"nav-link\" href=\"./index.html\">Home <span class=\"sr-only\">(current)</span></a>"
    homeButton.html(changedHome)
    let title = $("#page-title")
    let changedTitle = "<a href=\"./index.html\" class=\"btn btn-primary\"> Back to home </a>"
    title.html(changedTitle)
    $.getJSON(url, function(data){
        let dataList = $("#job-listings")
        let editHtml = `<form id="update-job-form" action="" method="PATCH">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" name="title" value="${data.title}" aria-describedby="emailHelp" placeholder="Enter Job Title" required>
                <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
            </div>
            <div class="form-group">
                <label for="company">Company</label>
                <input type="text" class="form-control" name="company" value="${data.company}" placeholder="Company" required>
            </div>
            <div class="form-group">
                <label for="department">Department</label>
                <input type="text" class="form-control" name="department" value="${data.department}" placeholder="Department" required>
            </div>
            <div class="form-group">
                <label for="location">Location</label>
                <input type="text" class="form-control" name="location" value="${data.location}" placeholder="Location" required>
            </div>
            <div class="form-group">
                <label for="type">Type</label>
                <input type="text" class="form-control" name="type" value="${data.type}" placeholder="type" required>
            </div>
            <div class="form-group">
                <label for="industry">Industry</label>
                <input type="text" class="form-control" name="industry" value="${data.Industry}" placeholder="Industry" required>
            </div>
            <div class="form-group">
                <label for="salary">Salary</label>
                <input type="text" class="form-control" name="salary" value="${data.salary}" placeholder="Salary" required>
            </div>
            <div class="form-group">
                <label for="minQual">Minimum Qualification</label>
                <input type="text" class="form-control" name="minQual" value="${data["Minimum Qualification"]}" placeholder="Minimum Qualification" required>
            </div>
            <div class="form-group">
                <label for="expLev">Experience Level</label>
                <input type="text" class="form-control" name="expLev" value="${data["Experience Level"]}" placeholder="Experience Level" required>
            </div>
            <div class="form-group">
                <label for="expLen">Experience Length</label>
                <input type="text" class="form-control" name="expLen" value="${data["Experience Length"]}" placeholder="Experience Length" required>
            </div>
            <div class="form-group">
                <label for="jobSum">Job Summary</label>
                <textarea name="jobSum" class='form-control' required>${data["Job Summary"]}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
            </form>`
        // console.log(data)
        // let output = "<h5 class=\"card-title\">";
        // output += "<h5 class=\"card-title\">" + data.title + "</h5><h6 class=\"card-title\"> Company: " + data.company + "</h6><h6 class=\"card-title\"> Department: " + data.department + "</h6><h6 class=\"card-title\"> Location: " + data.location + "</h6><h6 class=\"card-title\"> Type: " + data.type + "</h6><h6 class=\"card-title\"> Industry: " + data.industry + "</h6><h6 class=\"card-title\"> Salary: " + data.salary + "</h6><h6 class=\"card-title\"> Mininmum Qualification: " + data["Minimum Qualification"] + "</h6><h6 class=\"card-title\"> Experience Level: " + data["Experience Level"] + "</h6><h6 class=\"card-title\"> Experience Length: " + data["Experience Length"] + "</h6><p class=\"card-text\"> <b>Job Summary</b>: <br/>" + data['Job Summary'] + "<hr>"
        dataList.html(editHtml)
        $(document).on('submit', '#update-job-form', function(event){
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
                type        : 'PATCH', // define the type of HTTP verb we want to use (PATCH for our form)
                url         : 'http://localhost:3000/jobs/' + jobId, // the url where we want to PATCH
                data        : formData, // our data object
                dataType    : 'json', // what type of data do we expect back from the server
                encode      : true
            })
            // using the done promise callback
            .done(function(data) {
                alert("Job updated successfully")
                window.location = "./index.html"
            });
            // stop the form from submitting the normal way and refreshing the page
            event.preventDefault();
        })
    })
});

$(document).on('click', '#deleteButton', function(){
    let jobId = $(this).attr('data-id');
    let deleteJob = confirm("Are you sure you want to delete this job.");
    if (deleteJob == true){
        $.ajax({
            type        : 'DELETE', // define the type of HTTP verb we want to use (POST for our form)
            url         : 'http://localhost:3000/jobs/' + jobId, // the url where we want to POST
            dataType    : 'json', // what type of data do we expect back from the server
            encode      : true
        })
        // using the done promise callback
        .done(function(data) {
            alert("Job deleted successfully")
            window.location = "./index.html"
        });
    }
});