
$(document).ready(() => {

    //to open up the login-menu
    $('.login-icon').on('click', () => {
        $('.login-form').slideToggle();
        $('.subscribe-form').slideUp();
        $('.unsub-form').slideUp();
        $('.user-menu').slideUp();
        $('.comments-section').removeClass('z');
        $('.change-form').slideUp();
    })

    //used to close the login-menu with a click outside it
    let mouse_is_inside = false;

    $('.login-form').hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });

    $('.subscribe-form').hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });

    $('.unsub-form').hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });

    $('.login-icon').hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });

    $('.unsubscribe').hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });

    $('.change-password').hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });

    $('.change-form').hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });

    let mouse_is_in = false;

    $('.user').hover(function(){
        mouse_is_in=true;
    }, function() {
        mouse_is_in=false;
    })

    $('.user-menu').hover(function(){
        mouse_is_in=true;
    }, function() {
        mouse_is_in=false;
    })
    

    //click outside login-menu to close it
    $(document).on('click', e => {
        if(! mouse_is_inside) {
            $('.login-form').slideUp();
            $('.subscribe-form').slideUp();
            $('.unsub-form').slideUp();
            $('.change-form').slideUp();
            $('.comment-menu').hide();
        }
        if (! mouse_is_in) {
            $('.user-menu').slideUp();
            $('.comments-section').removeClass('z');
        }
    })

    //to switch menu from login to subscribe
    $('#subscribe').on('click', () => {
        $('.login-form').hide();
        $('.subscribe-form').slideDown();
    })

    //to switch menu from subscribe to login
    $('#login').on('click', () => {
        $('.login-form').slideDown();
        $('.subscribe-form').hide();
    })

    //toggle show password
    $('#subscribe-password').on('click', () => {
        if ($('#new-password').atrr('type') == 'password') {
            $('#new-password').atrr('type', 'text');
        } else {
            $('#new-password').attr('type', 'password');
        }
    });


    //toggle password visibility for login-password
    $("#login-password").change(function(){
        // Check the checkbox state
        if ($(this).is(':checked')) {
         $("#password").attr("type","text");
        } else {
         $("#password").attr("type","password");
        }
    });

    let loginStorage = false;
    $('#stay-login').change(function() {
        if ($(this).is(':checked')) {
            loginStorage = true;
        } else {
            loginStorage = false;
        }
    })

    //toggle password visibility for subscribe-password
    $('#subscribe-password').change(function() {
        if ($(this).is(':checked')) {
            $('#new-password').attr('type', 'text');
        } else {
            $('#new-password').attr('type', 'password');
        }
    })

    //toggle password visibility for unsubscribe-password
    $('#unsub-password').change(function() {
        if ($(this).is(':checked')) {
            $('#old-password').attr('type', 'text');
        } else {
            $('#old-password').attr('type', 'password');
        }
    })

    //toggle password visibility for change-password
    $('#change-password-check').change(function() {
        if ($(this).is(':checked')) {
            $('#change-password').attr('type', 'text');
        } else {
            $('#change-password').attr('type', 'password');
        }
    })

    //toggle password visibility for change-new-password
    $('#change-new-password-check').change(function() {
        if ($(this).is(':checked')) {
            $('#change-new-password').attr('type', 'text');
        } else {
            $('#change-new-password').attr('type', 'password');
        }
    })


    const subscribe = () => {
         // getting the values from the input-fields
         const userName = $('#new-username').val();
         const password = $('#new-password').val();
 
         //object to put username/password combination in
         const newUser = {
             userName: userName,
             password: password
         };
 
         const regex = /^[a-zA-Z0-9]{6,}$/;
         if (regex.test(userName) == false) {
             $('.sub-data').html("username only accepts letters and numbers and must be at least 6 characters");
         } else if (regex.test(password) == false) {
             $('.sub-data').html("password only accepts letters and numbers and must be at least 6 characters");
         } else {
             //url of the server
             const url = "http://localhost:3000/posts";
 
             // check if username already exists in the server-array
             $.getJSON(url, function(data) {
                 console.log(data);
                 if (data.some(e => e.userName == newUser.userName)) {
                     $('.sub-data').html('Username already exists');
                     console.log(newUser.userName);
                     return;
                 } else {
                     //make a post request to the local server to save the new data there if username doesn't already exist
                     $.post(url, newUser,  function(){
                         $('.sub-data').html('Subscribed succesfull! Your username is ' + newUser.userName + ' and your new password is ' + newUser.password + '. You can now log in');
                         $('#new-username').val('');
                         $('#new-password').val('');
                     });
                 }
             }) 
         }
    }
    
    //clicking subscribe button
    $('#subscribe-button').on('click', () => {
        //trigger subscribe function
        subscribe();     
    })

    //or subscribe by pressing enter when on the input-fields for subscribe
    $('#new-username').on('keyup', event => {
        //if enter is pressed...
        if (event.keyCode === 13) {
            //trigger subscribe function
            subscribe();
        }
    })

    $('#new-password').on('keyup', event => {
        //if enter is pressed...
        if (event.keyCode === 13) {
            //trigger subscribe function
            subscribe();
        }
    })

    //variable to hold the user that is logged in
    let user = null;

    const checkLocalStorage = () => {
        if (localStorage.getItem('userName')) {
            user = localStorage.getItem('userName');
            $('.user').html(user);
            $('.comments-user').html(user);
        }
    }

    //when entering the browser check for info about user in the localStorage
    checkLocalStorage();

    //function for login
    const login = () => {
        //if there is already a user logged in send message:
        if (user != null) {
            $('.data').html('You are already logged in. Log out first')
        } else {
            //getting the values from the input-fields
            const userName = $('#username').val();
            const password = $('#password').val();

            const regex = /^[a-zA-Z0-9]{6,}$/;
            if (regex.test(userName) == false) {
                $('.data').html("username only accepts letters and numbers and must be at least 6 characters");
            } else if (regex.test(password) == false) {
                $('.data').html("password only accepts letters and numbers and must be at least 6 characters");
            } else {
                //url of the server
                const url = "http://localhost:3000/posts";

                //get data from the server
                $.getJSON(url, function(data) {
                    // console.log(data);

                    //check if the username exists in the database on the server
                    if (data.some(e => e.userName == userName)) {
                        //if username exists loop through them to check the password
                        for (let i = 1; i < data.length; i++) {
                            // console.log(data[i].userName);
                            // console.log(data[i].password);
                            if (data[i].userName == userName) {
                                if (data[i].password == password) {
                                    $('.data').html('You are now logged in');
                                    
                                    //clear the input-fields
                                    $('#username').val('');
                                    $('#password').val('');
                                    $('#stay-login').prop('checked', false);
                                    $('#login-password').prop('checked', false);

                                    //if username exists and password is correct put userName in the user variable and show the username next to the menu
                                    user = userName;
                                    $('.user').html(user);
                                    $('.comments-user').html(user);

                                    //if localStorage checkbox is check then loginStorage = true; then userName is stored in localstorage
                                    if (loginStorage == true) {
                                        localStorage.setItem('userName', userName);
                                    }

                                    showComments();

                                    return;
                                } else {
                                    $('.data').html('Incorrect password');
                                    return;
                                }
                            }
                        } 
                    } else {
                        $('.data').html(`Username doesn't exist`);
                    }   
                }, "json") 
            } 
        }  
    }

    //clicking login-button
    $('#login-button').on('click', () => {
        //trigger login function
        login();
    })

    //or login by pressing enter when on the inputfields for login
    $('#password').on('keyup', event => {
        //if enter is pressed...
        if (event.keyCode === 13) {
            //trigger login function
            login();
        }
    })

    $('#username').on('keyup', event => {
        //if enter is pressed...
        if (event.keyCode === 13) {
            //trigger login function
            login();
        }
    })

    //clicking on the username in the menu leads to a personal menu
    $('.user').on('click', () => {
        $('.user-menu').slideToggle();
        $('.comments-section').toggleClass('z');
    })

    //clicking on logout leads to "are you sure?"-menu
    $('.logout').on('click', () => {
        $('.logout-menu').show();
    })

    //leave the menu and stay logged in 
    $('#logout-no').on('click', () => {
        $('.logout-menu').hide();
    })

    //log out the user, remove it's name from the menu and open confirmation
    $('#logout-yes').on('click', () => {
        user = null;
        $('.user').html('');
        $('.comments-user').html(user);
        $('.user-menu').hide();
        $('.logout-menu').hide();
        $('.logged-out').show();
        localStorage.removeItem('userName');
    })

    //click ok-button to go back to the site
    $('#logout-ok').on('click', () => {
        $('.logged-out').hide();
        $('.data').html('');
    })

    //click on unsubscribe to enter unsubscribe-menu
    $('.unsubscribe').on('click', () => {
        $('.unsub-form').slideDown();
        $('.login-form').slideUp();
        $('.subscribe-form').slideUp();
        $('.user-menu').hide();
    })

    //variable to pass the id to the ajax delete request
    //set in the unsubscribe function
    let idToRemove;

    //unsubscribe function
    const unsubscribe = () => {
        // getting the values from the input-fields
        const userName = $('#old-username').val();
        const password = $('#old-password').val();

        if (userName != user) {
            $('.unsub-data').html('Incorrect username. You can only delete the account with which you are logged in at the moment.');
        } else {

            //url of the server
            const url = "http://localhost:3000/posts";
           
            //get data from the server
            $.get(url, function(data) {

                //check if the username exists in the database on the server
                if (data.some(e => e.userName == userName)) {
                    //if username exists loop through them to check the password
                    for (let i = 1; i < data.length; i++) {
                        if (data[i].userName == userName) {
                            if (data[i].password == password) {
                                //specify the id to remove
                                idToRemove = data[i].id;
                                $('.unsub-menu').show();
                                
                                return;
                            } else {
                                $('.unsub-data').html('Incorrect password');
                                return;
                            }
                        }
                    } 
                } else {
                    $('.unsub-data').html(`Username doesn't exist`);
                }   
            }, "json") 
        }
   }

   //if clicking yes on the "are you sure?"-menu remove login-info from the server
    $('#unsub-yes').on('click', () => {

        $('.unsub-menu').hide();

        //url of the server
        const url = "http://localhost:3000/posts";

        //get value of the input value for message
        const userName = $('#old-username').val();

        //delete request to delete the login-info from the server
        $.ajax({
            url: url + '/' + idToRemove,
            method: 'delete',
            success: function() {
                $('.unsub-data').html('Account with username ' + userName + ' is succesfully removed!');

                //delete the current user and remove it's username from the menu
                user = null;
                $('.user').html('');
                $('.comments-user').html(user);

                //remove username from localstorage
                localStorage.removeItem('userName');

                //remove the values from the input fields
                $('#old-username').val('');
                $('#old-password').val('');
                $('#unsub-password').prop('checked', false);

                //open "you are now unsubbed"-menu
                $('.unsubbed').show();
            }
        });
    })

    //if answer to "are you sure?" is no then leave menu
    $('#unsub-no').on('click', () => {
        $('.unsub-menu').hide();
    })

    //leave the "you are now unsubbed"-menu with ok click
    $('#unsub-ok').on('click', () => {
        $('.unsubbed').hide();
    })

   

    //clicking unsubscribe-button
    $('#unsub-button').on('click', () => {
        //trigger unsubscribe function
        unsubscribe();
    })

    //or unsubscribe by pressing enter when on the inputfields for unsubscribe
    $('#old-password').on('keyup', event => {
        //if enter is pressed...
        if (event.keyCode === 13) {
            //trigger unsubscribe function
            unsubscribe();
        }
    })

    $('#old-username').on('keyup', event => {
        //if enter is pressed...
        if (event.keyCode === 13) {
            //trigger unsubscribe function
            unsubscribe();
        }
    })

    //to open up the change password menu and close all the others that are currently opened
    $('.change-password').on('click', () => {
        $('.change-form').slideDown();
        $('.unsub-form').slideUp();
        $('.login-form').slideUp();
        $('.subscribe-form').slideUp();
        $('.user-menu').hide();
    })

    let idToChange;

    //function to change password
    const changePassword = () => {
        const userName = $('#change-username').val();
        const password = $('#change-password').val();
        const newPassword = $('#change-new-password').val();

        

        if (userName != user) {
            $('.change-data').html('Incorrect username. You can only change password of the account with which you are logged in at the moment.');
        } else {
            //url of the server
            const url = "http://localhost:3000/posts";
           
            //get data from the server
            $.get(url, function(data) {

                //check if the username exists in the database on the server
                if (data.some(e => e.userName == userName)) {
                    //if username exists loop through them to check the password
                    for (let i = 1; i < data.length; i++) {
                        if (data[i].userName == userName) {
                            if (data[i].password == password) {
                                //to check if the new password contains at least 6 characters with only numbers and letters
                                const regex = /^[a-zA-Z0-9]{6,}$/;
                                if (regex.test(newPassword) == false) {
                                    $('.change-data').html("New password only accepts letters and numbers and must be at least 6 characters");
                                } else {
                                    //specify the id to change
                                    idToChange = data[i].id;
                                    $('.change-menu').show();
                                
                                return;
                                }    
                            } else {
                                $('.change-data').html('Incorrect password');
                                return;
                            }
                        }
                    } 
                } else {
                    $('.change-data').html(`Username doesn't exist`);
                }   
            }, "json")
        }
    }

    $('#change-no').on('click', () => {
        $('.change-menu').hide();
    })

    $('#change-yes').on('click', () => {
        const newPassword = $('#change-new-password').val();
        const userName = $('#change-username').val();

        $('.change-menu').hide();

        //url of the server
        const url = "http://localhost:3000/posts";

        //put-request to change the password in the server
        $.ajax({
            url: url + '/' + idToChange,
            method: 'put',
            data: "userName=" + userName + "&password=" + newPassword,
            success: function() {
                $('.change-data').html('Account with username ' + userName + ' has changed password succesfully! New password is ' + newPassword);

                //remove the values from the input fields
                $('#change-username').val('');
                $('#change-password').val('');
                $('#change-password-check').prop('checked', false);
                $('#change-new-password').val('');
                $('#change-new-password-check').prop('checked', false);

                //open "you are now unsubbed"-menu
                $('.changed').show();
            }
        });
    })

     //clicking change-password-button
     $('#change-button').on('click', () => {
        //trigger changePassword function
        changePassword();
    })

    //or unsubscribe by pressing enter when on the inputfields for change password
    $('#change-password').on('keyup', event => {
        //if enter is pressed...
        if (event.keyCode === 13) {
            //trigger changePassword function
            changePassword();
        }
    })

    $('#change-username').on('keyup', event => {
        //if enter is pressed...
        if (event.keyCode === 13) {
            //trigger changePassword function
            changePassword();
        }
    })

    $('#change-new-password').on('keyup', event => {
        //if enter is pressed...
        if (event.keyCode === 13) {
            //trigger changePassword function
            changePassword();
        }
    })

    //to close the confirmation menu when password is changed
    $('#change-ok').on('click', () => {
        $('.changed').hide();
    })




    //comment-section -------------------------------------------------------------------------------------------------------

    //clicking submit button
    $('#comment-submit').on('click', () => {
        //if no user is logged in send text, if user is logged in trigger function sendComment()
        if (user != null) {
            sendComment();
        } else {
            $('.comments-data').html('You must be logged in to submit a comment')
        }
        
    })

    const sendComment = () => {
        const comment = $('#text-field').val();
        
        const url = "http://localhost:3000/comments";

        const commentInfo = {
            userName: user,
            comment: comment,
            plus: 0,
            min: 0
        }

        $.post(url, commentInfo,  function(){
            showComments();
            $('.text-field').val('');
        });
    }

    //function when vistitor enters the page and to show comments after a change
    const showComments = () => {

        $('.comment-container').remove();

        const url = "http://localhost:3000/comments";

        //for every comment in the server make new elements (same as in the .post request)
        $.getJSON(url, function(data) {
            for (let i = 1; i < data.length; i++) {

                if (!("reactionOnComment" in data[i])) {

                    //create new div (comment-container) to put new elements in 
                    let newDiv = document.createElement('div');
                    newDiv.classList.add('comment-container');
                    newDiv.setAttribute('id', data[i].id);
                    $('#comments').prepend(newDiv);

                    //make new elements
                    const userName = data[i].userName;
                    const comment = data[i].comment;
                    let tagForUserName = document.createElement('p');
                    let tagForComment = document.createElement('p');
                    let tagForOptions = document.createElement('img');

                    //create specific id for options icon
                    let newID = 'options-' + data[i].id;
                    tagForOptions.setAttribute('id', newID);

                    //give new elements content and styling
                    tagForOptions.setAttribute('src', 'ellipsis-v-solid.svg');
                    tagForOptions.classList.add("comment-options");
                    tagForUserName.innerHTML = userName;
                    tagForComment.innerHTML = comment;
                    tagForUserName.classList.add("username-comment");
                    tagForComment.classList.add("comment-comment");

                    //give the comment itself an id for changing the comment 
                    tagForComment.setAttribute('id', 'comment-' + data[i].id);

                    //put new elements in its div
                    $('#' + data[i].id).prepend(tagForComment);
                    $('#' + data[i].id).prepend(tagForUserName);
                    $('#' + data[i].id).prepend(tagForOptions);

                    //make a menu for comment-options
                    let commentOptions = document.createElement('div');
                    commentOptions.classList.add('comment-menu');
                    let optionsID = 'options-comment-' + data[i].id;
                    commentOptions.setAttribute('id', optionsID);

                    //make content of comment-options and give it id
                    let menuDeleteComment = document.createElement('p');
                    let menuChangeComment = document.createElement('p');
                    let deleteID = 'delete-comment-' + data[i].id;
                    let changeID = 'change-comment-' + data[i].id;
                    menuDeleteComment.setAttribute('id', deleteID);
                    menuChangeComment.setAttribute('id', changeID);
                    menuDeleteComment.innerHTML = '- Delete Comment';
                    menuChangeComment.innerHTML = '- Change Comment';

                    //put new menu in the DOM
                    commentOptions.append(menuChangeComment);
                    commentOptions.append(menuDeleteComment);
                    $('#' + data[i].id).append(commentOptions);

                    //make option to react on comment
                    const react = document.createElement('img');
                    react.classList.add('react');
                    const reactID = 'react-' + data[i].id;
                    react.setAttribute('id', reactID);
                    react.setAttribute('src', 'comments-regular.svg');
                    $('#' + data[i].id).append(react);

                    //make new textfield  to react on comment
                    let reactComment = document.createElement('textarea');
                    reactComment.classList.add('react-textfield');
                    reactComment.setAttribute('id', 'react-textfield-' + data[i].id);

                    //make new button to react on comment
                    let reactButton = document.createElement('button');
                    reactButton.classList.add('react-button');
                    reactButton.setAttribute('id', 'react-button-' + data[i].id);
                    reactButton.innerHTML = 'Submit Comment';

                    //append elements to the div
                    $('#' + data[i].id).append(reactComment, reactButton);
                    $('.react-textfield').hide();
                    $('.react-button').hide();


                    //make new textfield to change comment
                    let newTextField = document.createElement('textarea');
                    newTextField.classList.add('change-textfield');
                    newTextField.setAttribute('id', 'text-field-' + data[i].id);
                    newTextField.innerHTML = tagForComment.innerHTML;
                    $('#' + data[i].id).append(newTextField);

                    //make new button for changing comment
                    let newTextButton = document.createElement('button');
                    newTextButton.classList.add('change-comment-button');
                    newTextButton.setAttribute('id', 'button-' + data[i].id);
                    newTextButton.innerHTML = 'Change Comment';
                    $('#' + data[i].id).append(newTextButton);

                    //make new button for keeping comment
                    let keepButton = document.createElement('button');
                    keepButton.classList.add('change-comment-button');
                    keepButton.setAttribute('id', 'keepbutton-' + data[i].id);
                    keepButton.innerHTML = 'Keep Comment';
                    $('#' + data[i].id).append(keepButton);

                    //make + and - buttons to like or dislike comments
                    //+ and - symbols
                    const plus = document.createElement('p');
                    const min = document.createElement('p');
                    plus.classList.add('plus');
                    min.classList.add('min');
                    plus.innerHTML = '+';
                    min.innerHTML = '-';
                    plus.setAttribute('id', 'plus-' + data[i].id);
                    min.setAttribute('id', 'min-' + data[i].id);
                    
                    //number of + and - clicked by users
                    const plusNumber = document.createElement('p');
                    const minNumber = document.createElement('p');
                    plusNumber.classList.add('plus-number');
                    minNumber.classList.add('min-number');
                    plusNumber.setAttribute('id', 'plus-number-' + data[i].id);
                    minNumber.setAttribute('id', 'min-number-' + data[i].id);

                    plusNumber.innerHTML = data[i].plus;
                    minNumber.innerHTML = data[i].min;

                    $('#' + data[i].id).append(plus, min, plusNumber, minNumber);

                    //to show if the user has already rated a comment
                    if (user in data[i] && data[i][user] == 'plus') {
                        $('#plus-' + data[i].id).css({
                            color: "green",
                            transform: "scale(150%)"
                        })
                    } else if (user in data[i] && data[i][user] == 'min') {
                        $('#min-' + data[i].id).css({
                            color: 'red',
                            transform: "scale(150%)"
                        })
                    }
                } else {
                    //this section is for creating the subcomments

                    //to get id of the headComment to put the subComment in
                    let reactPostID = data[i].reactionOnComment;

                    let divForReaction = document.createElement('div');
                    divForReaction.setAttribute('id', 'div-reaction-' + data[i].id);
                    divForReaction.classList.add('div-react');
                    
                    let placeForUserName = document.createElement('p');
                    placeForUserName.classList.add('react-username');
                    placeForUserName.innerHTML = data[i].userName;

                    let placeForComment = document.createElement('p');
                    placeForComment.classList.add('reaction-comment');
                    placeForComment.innerHTML = data[i].comment;

                    divForReaction.append(placeForUserName, placeForComment);
                    $('#' + reactPostID).append(divForReaction);

                    //create trash icon to delete comment
                    let tagForTrash = document.createElement('img');

                    //create specific id for trash icon
                    let newID = 'react-delete-' + data[i].id;
                    tagForTrash.setAttribute('id', newID);

                    //give new elements content and styling
                    tagForTrash.setAttribute('src', 'trash-alt-solid.svg');
                    tagForTrash.classList.add("react-delete");

                    $('#div-reaction-' + data[i].id).prepend(tagForTrash);   
                    
                    //make + and - buttons to like or dislike comments
                    //+ and - symbols
                    const plus = document.createElement('p');
                    const min = document.createElement('p');
                    plus.classList.add('plus');
                    min.classList.add('min');
                    plus.innerHTML = '+';
                    min.innerHTML = '-';
                    plus.setAttribute('id', 'plus-' + data[i].id);
                    min.setAttribute('id', 'min-' + data[i].id);
                    
                    //number of + and - clicked by users
                    const plusNumber = document.createElement('p');
                    const minNumber = document.createElement('p');
                    plusNumber.classList.add('plus-number');
                    minNumber.classList.add('min-number');
                    plusNumber.setAttribute('id', 'plus-number-' + data[i].id);
                    minNumber.setAttribute('id', 'min-number-' + data[i].id);

                    plusNumber.innerHTML = data[i].plus;
                    minNumber.innerHTML = data[i].min;

                    $('#div-reaction-' + data[i].id).append(plus, min, plusNumber, minNumber);

                    //to show if the user has already rated a comment
                    if (user in data[i] && data[i][user] == 'plus') {
                        $('#plus-' + data[i].id).css({
                            color: "green",
                            transform: "scale(150%)"
                        })
                    } else if (user in data[i] && data[i][user] == 'min') {
                        $('#min-' + data[i].id).css({
                            color: 'red',
                            transform: "scale(150%)"
                        })
                    }
                }
            }

            //to hide the comment-menu when clicking outside of it
            //connected with $(document).on(click)
            $('.comment-options').hover(function(){ 
                mouse_is_inside=true; 
            }, function(){ 
                mouse_is_inside=false; 
            });
        
            $('.comment-menu').hover(function(){ 
                mouse_is_inside=true; 
            }, function(){ 
                mouse_is_inside=false; 
            });

            //click + buttons
            $('.plus').on('click', event => {
                let idPlus = $(event.currentTarget).attr('id');
                let idNumber = idPlus.split('-')[1];

                //get data from the server to check if the user is not rating his own comments and to check if the user has already rated a comment
                $.getJSON(url, function(data) {

                for (let i = 1; i < data.length; i++) {
                    if (data[i].id == idNumber) {
                        if (data[i].userName != user && user != null) {
                            if (user in data[i] && data[i][user] == 'plus') {
                                return;
                            } else if (user in data[i] && data[i][user] == 'min') {
                                const newPlus = Number(data[i].plus) + 1;
                                const newMin = Number(data[i].min) - 1;

                                if ("reactionOnComment" in data[i]) {
                                    $.ajax({
                                        url: url + '/' + data[i].id,
                                        method: 'put',
                                        data: "userName=" + data[i].userName + "&comment=" + data[i].comment + "&plus=" + newPlus + "&min=" + newMin + "&" + user + "=plus&reactionOnComment=" + data[i].reactionOnComment,
                                        success: function () {
                                            $('#plus-number-' + data[i].id).html((Number(data[i].plus) +1).toString());
                                            $('#plus-' + data[i].id).css({
                                                color: "green",
                                                transform: "scale(150%)"
                                            })
                                            $('#min-number-' + data[i].id).html((Number(data[i].min) -1).toString());
                                            $('#min-' + data[i].id).css({
                                                color: 'black',
                                                transform: "scale(100%)"
                                            })
                                        }
                                    })
                                } else {
                                    $.ajax({
                                        url: url + '/' + data[i].id,
                                        method: 'put',
                                        data: "userName=" + data[i].userName + "&comment=" + data[i].comment + "&plus=" + newPlus + "&min=" + newMin + "&" + user + "=plus",
                                        success: function () {
                                            $('#plus-number-' + data[i].id).html((Number(data[i].plus) +1).toString());
                                            $('#plus-' + data[i].id).css({
                                                color: "green",
                                                transform: "scale(150%)"
                                            })
                                            $('#min-number-' + data[i].id).html((Number(data[i].min) -1).toString());
                                            $('#min-' + data[i].id).css({
                                                color: 'black',
                                                transform: "scale(100%)"
                                            })
                                        }
                                    })
                                } 
                            } else {
                                const newPlus = Number(data[i].plus) + 1;
                                const newMin = data[i].min;

                                if ("reactionOnComment" in data[i]) {
                                    $.ajax({
                                        url: url + '/' + data[i].id,
                                        method: 'put',
                                        data: "userName=" + data[i].userName + "&comment=" + data[i].comment + "&plus=" + newPlus + "&min=" + newMin + "&" + user + "=plus&reactionOnComment=" + data[i].reactionOnComment,
                                        success: function () {
                                            $('#plus-number-' + data[i].id).html((Number(data[i].plus) +1).toString());
                                            $('#plus-' + data[i].id).css({
                                                color: "green",
                                                transform: "scale(150%)"
                                            })
                                        }
                                    })
                                } else {
                                    $.ajax({
                                        url: url + '/' + data[i].id,
                                        method: 'put',
                                        data: "userName=" + data[i].userName + "&comment=" + data[i].comment + "&plus=" + newPlus + "&min=" + newMin + "&" + user + "=plus",
                                        success: function () {
                                            $('#plus-number-' + data[i].id).html((Number(data[i].plus) +1).toString());
                                            $('#plus-' + data[i].id).css({
                                                color: "green",
                                                transform: "scale(150%)"
                                            })
                                        }
                                    })
                                }    
                            }       
                        } else {
                            alert("You can only rate another one's comment and/or have to be logged in")
                        }
                    }
                }
            })
        })

            //click - buttons
            $('.min').on('click', event => {
                let idMin = $(event.currentTarget).attr('id');
                let idNumber = idMin.split('-')[1];

                $.getJSON(url, function(data) {

                for (let i = 1; i < data.length; i++) {
                    if (data[i].id == idNumber) {
                        if (data[i].userName != user && user != null) {

                            if (user in data[i] && data[i][user] == 'min') {
                                return;
                            } else if (user in data[i] && data[i][user] == 'plus') {
                                const newPlus = Number(data[i].plus) - 1;
                                const newMin = Number(data[i].min) + 1;

                                if ("reactionOnComment" in data[i]) {
                                    $.ajax({
                                        url: url + '/' + data[i].id,
                                        method: 'put',
                                        data: "userName=" + data[i].userName + "&comment=" + data[i].comment + "&plus=" + newPlus + "&min=" + newMin + "&" + user + "=min&reactionOnComment=" + data[i].reactionOnComment,
                                        success: function () {
                                            $('#plus-number-' + data[i].id).html((Number(data[i].plus) -1).toString());
                                            $('#plus-' + data[i].id).css({
                                                color: "black",
                                                transform: "scale(100%)"
                                            });
                                            $('#min-number-' + data[i].id).html((Number(data[i].min) +1).toString());
                                            $('#min-' + data[i].id).css({
                                                color: 'red',
                                                transform: "scale(150%)"
                                            })
                                        }
                                    })
                                } else {
                                    $.ajax({
                                        url: url + '/' + data[i].id,
                                        method: 'put',
                                        data: "userName=" + data[i].userName + "&comment=" + data[i].comment + "&plus=" + newPlus + "&min=" + newMin + "&" + user + "=min",
                                        success: function () {
                                            $('#plus-number-' + data[i].id).html((Number(data[i].plus) -1).toString());
                                            $('#plus-' + data[i].id).css({
                                                color: "black",
                                                transform: "scale(100%)"
                                            });
                                            $('#min-number-' + data[i].id).html((Number(data[i].min) +1).toString());
                                            $('#min-' + data[i].id).css({
                                                color: 'red',
                                                transform: "scale(150%)"
                                            })
                                        }
                                    })
                                }

                                
                            } else {
                                const newPlus = data[i].plus;
                                const newMin = Number(data[i].min) + 1;

                                if ("reactionOnComment" in data[i]) {
                                    $.ajax({
                                        url: url + '/' + data[i].id,
                                        method: 'put',
                                        data: "userName=" + data[i].userName + "&comment=" + data[i].comment + "&plus=" + newPlus + "&min=" + newMin + "&" + user + "=min&reactionOnComment=" + data[i].reactionOnComment,
                                        success: function () {
                                            $('#min-number-' + data[i].id).html((Number(data[i].min) +1).toString());
                                            $('#min-' + data[i].id).css({
                                                color: "red",
                                                transform: "scale(150%)"
                                            })
                                        }
                                    })       
                                } else {
                                    $.ajax({
                                        url: url + '/' + data[i].id,
                                        method: 'put',
                                        data: "userName=" + data[i].userName + "&comment=" + data[i].comment + "&plus=" + newPlus + "&min=" + newMin + "&" + user + "=min",
                                        success: function () {
                                            $('#min-number-' + data[i].id).html((Number(data[i].min) +1).toString());
                                            $('#min-' + data[i].id).css({
                                                color: "red",
                                                transform: "scale(150%)"
                                            })
                                        }
                                    })
                                }
                            }
                        } else {
                            alert("You can only rate another one's comment and/or have to be logged in")
                        }
                    }
                }
                })
            })

            //click on options-icon to show the options for the specific comment
            $('.comment-options').on('click', event => {
                let id = $(event.currentTarget).attr('id');
                let idOptions = id.split('-')[1];

                $('#options-comment-' + idOptions).toggle();

                //click on delete option
                $('#delete-comment-' + idOptions).on('click', () => {

                    //to check if the user is the one who wants to delete the comment
                    for (let i = 1; i < data.length; i++) {
                        if (data[i].id == idOptions) {
                            if (data[i].userName == user) {
                                //pop up new menu to ask if the user is sure
                                $('.delete-comment-menu').show();
                                $('#options-comment-' + idOptions).hide();
                                $('#delete-comment-no').on('click', () => {
                                    $('.delete-comment-menu').hide();
                                })
                                //if the user is sure trigger deleteComment-function
                                $('#delete-comment-yes').on('click', () => {
                                    deleteComment(idOptions);
                                    $('.delete-comment-menu').hide();
                                })
                            return;
                            } else {
                                alert('you can only delete your own comments');
                                $('#options-comment-' + idOptions).hide();
                                return;
                            }
                        }                      
                    }                    
                })

                //change comment from the comment-options
                $('#change-comment-' + idOptions).on('click', () => {
                    for (let i = 1; i < data.length; i++) {
                        if (data[i].id == idOptions) {
                            if (data[i].userName == user) {
                                
                                //show the specific text-field to change the comment
                                $('#text-field-' + data[i].id).show();
                                $('#button-' + idOptions).css('display', 'inline');
                                $('#keepbutton-' + idOptions).css('display', 'inline');
                                $('#options-comment-' + idOptions).hide();
                                    
                                return;
                            } else {
                                alert('you can only change your own comments');
                                $('#options-comment-' + idOptions).hide();
                                return;
                            }
                        }
                    } 
                })

                //press keepbutton. just go back
                $('#keepbutton-' + idOptions).on('click', () => {
                    $('#keepbutton-' + idOptions).hide();
                    $('#button-' + idOptions).hide();
                    $('#text-field-' + idOptions).hide();
                })

                //press change button. change comment
                $('#button-' + idOptions).on('click', () => {
                    $('#button-' + idOptions).hide();
                    const url = "http://localhost:3000/comments/" + idOptions;

                    const newComment = $('#text-field-' + idOptions).val();

                    $.ajax({
                        url: url,
                        method: 'put',
                        data: "userName=" + user + "&comment=" + newComment + "&plus=0&min=0",
                        success: function () {
                            $('#comment-' + idOptions).html(newComment);
                            $('#text-field-' + idOptions).hide();
                            $('#keepbutton-' + idOptions).hide();
                        }
                    })
                })
            })

            //click on react-icon to create text-field for reaction
            $('.react').on('click', event => {
                let id = $(event.currentTarget).attr('id');
                let idOptions = id.split('-')[1];

                $('#react-textfield-' + idOptions).toggle();
                $('#react-button-' + idOptions).toggle();
            })

            //click on submit-button to react on a comment
            $('.react-button').on('click', event => {
                if (user == null) {
                    alert('You have to be logged in to comment')
                } else {
                    let id = $(event.currentTarget).attr('id');
                    let idOptions = id.split('-')[2];

                    let reactionComment = $('#react-textfield-' + idOptions).val();
                    const url = "http://localhost:3000/comments";

                    let objectToSend = {
                        comment: reactionComment,
                        userName: user,
                        plus: 0, 
                        min: 0,
                        reactionOnComment: idOptions
                    }

                    $.post(url, objectToSend, function() {
                        showComments();
                        $('#testing').get(0).scrollIntoView();
                    })
                }
            })
            
            //click on trash-icon to remove subcomment
            $('.react-delete').on('click', event => {
                let id = $(event.currentTarget).attr('id');
                let idOptions = id.split('-')[2];

                const url = "http://localhost:3000/comments";

                $.getJSON(url, function (data) {
                    for (let i = 1; i < data.length; i++) {
                        if (data[i].id == idOptions) {
                            if (data[i].userName == user) {
                                //pop up new menu to ask if the user is sure
                                $('.delete-comment-menu').show();
                                $('#delete-comment-no').on('click', () => {
                                    $('.delete-comment-menu').hide();
                                })
                                //if the user is sure trigger deleteComment-function
                                $('#delete-comment-yes').on('click', () => {
                                    deleteComment(idOptions);
                                    $('.delete-comment-menu').hide();
                                })
                            } else {
                                alert("You can only delete your own comments");
                            } 
                        }
                    }
                })

                
            })
        })
    }

    showComments();

    //function to delete specific comment 
    const deleteComment = (idToDelete) => {
        const url = "http://localhost:3000/comments";

        $.ajax({
            url: url + '/' + idToDelete,
            method: 'delete',
            success: function () {
                $('#' + idToDelete).remove();
                $('#div-reaction-' + idToDelete).remove();
                $('.comment-deleted').show();
            }
        })
    }

    $('#comment-deleted-ok').on('click', () => {
        $('.comment-deleted').hide();
    })

})



