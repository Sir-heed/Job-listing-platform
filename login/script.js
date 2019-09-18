$(document).ready(function(){
    $("form.login-form").on('submit',function(){
        let username = $('input[name=username]').val()
        let password = $('input[name=password]').val()   
        if ( username != "" && password != ""){
            $.ajax({
            type: 'GET',
            url:`http://localhost:3000/users?username=${username}&password=${password}`,
            success: function(result){
                let msg = ""
                if (result.length == 1){
                    window.location = "../index.html"
                }
                else {
                    let output = $("#message")
                    msg = "Invalid username and password!"
                    output.html(msg)
                    output.addClass("alert alert-warning")
                }
            }
            })
        }
        return false;
    });
  });