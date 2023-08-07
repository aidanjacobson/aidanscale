function promptForNumber(question, value="", currentlyRating=false) {
    numberInputContainer.removeAttribute("hidden");
    if (currentlyRating) {
        editor.setAttribute("hidden", true);
    } else {
        main.setAttribute("hidden", true);
    }
    numberInputPrompt.innerText = question;
    numberInput.value = value;
    numberInput.focus();
    return new Promise(function(resolve) {
        numberInput.onchange = function() {
            numberInputContainer.setAttribute("hidden", true);
            if (currentlyRating) {
                editor.removeAttribute("hidden");
            } else {
                main.removeAttribute("hidden");
            }
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
    passwordInput.focus();
    return new Promise(function(resolve) {
        passwordInput.onchange = function() {
            passwordInputContainer.setAttribute("hidden", true);
            if (currentlyRating) {
                editor.removeAttribute("hidden");
            } else {
                main.removeAttribute("hidden");
            }
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
    textInput.focus();
    return new Promise(function(resolve) {
        textInput.onchange = function() {
            textInputContainer.setAttribute("hidden", true);
            if (currentlyRating) {
                editor.removeAttribute("hidden");
            } else {
                main.removeAttribute("hidden");
            }
            resolve(textInput.value);
        }
        textInput.onkeypress = function(e) {
            textInputContainer.setAttribute("hidden", true);
            if (currentlyRating) {
                editor.removeAttribute("hidden");
            } else {
                main.removeAttribute("hidden");
            }
            if (e.keyCode == 13) {
                resolve(textInput.value);
            }
        }
    });
}