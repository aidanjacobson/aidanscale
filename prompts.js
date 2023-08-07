function promptForNumber(question, value="", currentlyRating=false) {
    numberInputContainer.removeAttribute("hidden");
    if (currentlyRating) {
        editor.setAttribute("hidden", true);
    } else {
        main.setAttribute("hidden", true);
    }
    numberInputPrompt.innerText = question;
    numberInput.value = value;
    if (value != "") numberInput.select();
    numberInput.focus();
    return new Promise(function(resolve) {
        numberInput.onchange = function() {
            numberInputContainer.setAttribute("hidden", true);
            if (currentlyRating) {
                editor.removeAttribute("hidden");
            } else {
                main.removeAttribute("hidden");
            }
            numberInput.blur();
            resolve(+numberInput.value);
        }
        numberInput.onkeypress = function(e) {
            if (e.keyCode == 13) {
                numberInputContainer.setAttribute("hidden", true);
                if (currentlyRating) {
                    editor.removeAttribute("hidden");
                } else {
                    main.removeAttribute("hidden");
                }
                numberInput.blur();
                resolve(+numberInput.value);
            }
        }
    });
}

function promptForPassword(question, value="", currentlyRating=false) {
    passwordInputContainer.removeAttribute("hidden");
    if (currentlyRating) {
        editor.setAttribute("hidden", true);
    } else {
        main.setAttribute("hidden", true);
    }
    passwordInputPrompt.innerText = question;
    passwordInput.value = value;
    if (value != "") passwordInput.select();
    passwordInput.focus();
    return new Promise(function(resolve) {
        passwordInput.onchange = function() {
            passwordInputContainer.setAttribute("hidden", true);
            if (currentlyRating) {
                editor.removeAttribute("hidden");
            } else {
                main.removeAttribute("hidden");
            }
            passwordInput.blur();
            resolve(passwordInput.value);
        }
        passwordInput.onkeypress = function(e) {
            if (e.keyCode == 13) {
                passwordInputContainer.setAttribute("hidden", true);
                if (currentlyRating) {
                    editor.removeAttribute("hidden");
                } else {
                    main.removeAttribute("hidden");
                }
                passwordInput.blur();
                resolve(passwordInput.value);
            }
        }
    });
}

function promptForText(question, value="", currentlyRating=false) {
    textInputContainer.removeAttribute("hidden");
    if (currentlyRating) {
        editor.setAttribute("hidden", true);
    } else {
        main.setAttribute("hidden", true);
    }
    textInputPrompt.innerText = question;
    textInput.value = value;
    if (value != "") textInput.select();
    textInput.focus();
    return new Promise(function(resolve) {
        textInput.onchange = function() {
            textInputContainer.setAttribute("hidden", true);
            if (currentlyRating) {
                editor.removeAttribute("hidden");
            } else {
                main.removeAttribute("hidden");
            }
            textInput.blur();
            resolve(textInput.value);
        }
        textInput.onkeypress = function(e) {
            if (e.keyCode == 13) {
                textInputContainer.setAttribute("hidden", true);
                if (currentlyRating) {
                    editor.removeAttribute("hidden");
                } else {
                    main.removeAttribute("hidden");
                }
                textInput.blur();
                resolve(textInput.value);
            }
        }
    });
}