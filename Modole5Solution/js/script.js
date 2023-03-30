// (STEP 1) Load the home HTML snippet into index.html
$dc.loadHome = function () {
  var parent = $dc.get("main-content");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "snippets/home-snippet.html");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      parent.innerHTML = xhr.responseText;
      
      // (STEP 2) Choose a random category short name to be used as a Specials category
      var chosenShortName = chooseRandomCategoryShortName(categories);

      // (STEP 3) Replace {{randomCategoryShortName}} in home HTML with the chosen short name
      var homeHtml = xhr.responseText;
      homeHtml = insertProperty(homeHtml, "randomCategoryShortName", chosenShortName);

      // (STEP 4) Insert the HTML back into the DOM
      parent.innerHTML = homeHtml;
    }
  };
};

// Helper function to choose a random category short name
function chooseRandomCategoryShortName(categories) {
  var randomArrayIndex = Math.floor(Math.random() * categories.length);
  return categories[randomArrayIndex].short_name;
}

// Removes the propertyName and replaces it with the given propertyValue
function insertProperty(string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string.replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}

// Load the home page initially
$dc.loadHome();
