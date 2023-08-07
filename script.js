/*
    config: {
        ratings: [
            {
                label: String
                rating: Number
                timestamp: Number
            }
        ]
    }
*/

window.onload = async function() {
    await doSecurityCheck();
    await downloadConfig();
    displayRatings();
}

var configLoader;
var config = {
    ratings: []
};
const storageBin = "aidanscale";

async function doSecurityCheck() {
    if (!localStorage.scale_dkey || localStorage.scale_dkey == "") {
        localStorage.scale_dkey = await promptForPassword("Enter decryption key:");
    }
    configLoader = new ConfigLoader({
        store: storageBin,
        securityKey: localStorage.scale_dkey
    });
    var configValid = await configLoader.validate();
    if (!configValid) {
        localStorage.scale_dkey = await promptForPassword("Incorrect decryption key. Try again.");
        await doSecurityCheck();
    }
}

async function uploadConfig() {
    configLoader.config = config;
    await configLoader.uploadConfig();
}

async function downloadConfig() {
    config = await configLoader.downloadConfig();
    return config;
}

async function rate() {
    var label = await promptForText("Enter a label for your rating:");
    var rating = await promptForNumber("Enter your rating:");
    var timestamp = Date.now();

    var rating = {label, rating, timestamp};

    config.ratings.unshift(rating);
    await uploadConfig();
    displayRatings();
}

function rgbFromRating(rating) {
    var percent = rating / 10;
    var green = Math.min(percent*255*2, 255);
    var red = Math.min((1-percent)*255*2, 255);
    return `rgb(${red}, ${green}, 0)`;
}

var startingIndex = 0;
function displayRatings() {
    ratings.innerHTML = "";
    var minElement = startingIndex+1;
    var maxElement;
    for (var i = 0; i < 5; i++) {
        var ratingElement = document.createElement("div");
        var currentIndex = startingIndex + i;
        if (currentIndex >= config.ratings.length) {
            continue;
        }
        var rating = config.ratings[currentIndex];
        ratingElement.innerHTML = rating.label + "<br>" + rating.rating + " / 10";
        ratingElement.style.backgroundColor = rgbFromRating(rating.rating);
        ratingElement.classList.add("rating");
        ratingElement.setAttribute("x-config-index", currentIndex);
        ratingElement.onclick = editRating;
        ratings.append(ratingElement);
        maxElement = currentIndex+1;
    }
    if (maxElement == minElement) {
        navText.innerText = `Showing ${minElement} of ${config.ratings.length}`;
    } else {
        navText.innerText = `Showing ${minElement} to ${maxElement} of ${config.ratings.length}`;
    }
}

function navNext() {
    startingIndex += 5;
    if (startingIndex > config.ratings.length) startingIndex -= 5;
    displayRatings();
}

function navPrev() {
    startingIndex -= 5;
    if (startingIndex < 0) startingIndex = 0;
    displayRatings();
}

var currentlyEditing;

function editRating(event) {
    var index = +event.target.getAttribute("x-config-index");
    editRatingByNumber(index);
}

function editRatingByNumber(index) {
    main.setAttribute("hidden", true);
    editor.removeAttribute("hidden");
    editorLabel.innerText = config.ratings[index].label;
    editorRating.innerText = config.ratings[index].rating + " / 10";
    editorDate.innerText = timestampToDateString(config.ratings[index].timestamp);
    currentlyEditing = index;
}

async function labelChange() {
    config.ratings[currentlyEditing].label = await promptForText("Enter a new label for your rating:", config.ratings[currentlyEditing].label, true);
    await uploadConfig();
    displayRatings();
    editRatingByNumber(currentlyEditing);
}

async function ratingChange() {
    config.ratings[currentlyEditing].rating = await promptForNumber("Enter a new rating:", config.ratings[currentlyEditing].rating, true);
    await uploadConfig();
    displayRatings();
    editRatingByNumber(currentlyEditing);
}

function backToMain() {
    editor.setAttribute("hidden", true);
    main.removeAttribute("hidden");
}

function timestampToDateString(timestamp) {
    var date = new Date(timestamp);
    var hour = date.getHours();
    var apm = "AM";
    if (hour >= 12) {
        apm = "PM";
        if (hour > 12) hour-=12;
    }
    if (hour == 0) hour = 12;
    var minute = date.getMinutes().toString().padStart(2, "0");
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()-2000} at ${hour}:${minute} ${apm}`;
}

function deleteCurrent() {
    if (!confirm("Are you sure you want to delete this rating?")) return;
    config.ratings.splice(currentlyEditing, 1);
    uploadConfig();
    backToMain();
    displayRatings();
}