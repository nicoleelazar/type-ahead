let allData = [];
const userInput = document.getElementById("user-input");
const listContainer = document.querySelector(".list-container");

userInput.value = "";


const url =
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

fetch(url)
    // convert returned promise to JSON data
    .then((response) => {
        return response.json();
    })

    .then((data) => {
        allData.push(...data);
    });




// find all matches
function findMatches(userInput, allData) {
    return allData.filter((item) => {
        let keyword = new RegExp(userInput, "gi");
        return item.city.match(keyword) || item.state.match(keyword);
    });
}


// display matches on each key-up
function displayMatches() {
    let allMatches = findMatches(userInput.value, allData);
    let finalResults = allMatches

        .map((match) => {
            //highllight the matches
            let highlightedMatch = new RegExp(userInput.value, "gi");
            let city = match.city.replace(
                highlightedMatch,
                `<mark>${userInput.value}</mark>`
            );

            let state = match.state.replace(
                highlightedMatch,
                `<mark>${userInput.value}</mark>`
            );

            return `<li class="list-item" ><span class="city" > ${city}, ${state}</span>
        <span class="population" >Population: ${match.population}</span></li>`;
        })
        //join to turn array into string
        .join("");


    // display list only if input field is not empty
    if (userInput.value !== "") {
        listContainer.innerHTML = finalResults;
    }
    else {
        listContainer.innerHTML = ""
    }
}

userInput.addEventListener("keyup", displayMatches);

