let allData = [];

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

// take the user input value
// loop through the data
// match the input value to datas city OR state
// create an li element to display that data and append it to the ul element

const userInput = document.getElementById("user-input");
const listContainer = document.querySelector(".list-container");

function findMatches(userInput, allData) {
    return allData.filter((item) => {
        let keyword = new RegExp(userInput, "gi");
        return item.city.match(keyword) || item.state.match(keyword);
    });
}

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

            return `<li><span class="" > ${city}, ${state}</span>
            <span class="population" >${match.population}</span></li>`;
        })
        //join to turn array into string
        .join("");
    listContainer.innerHTML = finalResults;
}

userInput.addEventListener("keyup", displayMatches);

//doesn't work as it doesn't update li objects, just appends on every keyup

// userInput.addEventListener('keyup', () => {
//     inputValue = userInput.value;

//     let keyword = new RegExp(inputValue, 'gi');

//     allData.filter(item => {
//         if(item.city.match(keyword) || item.state.match(keyword)) {

//                 `
//                 // let listItem = document.createElement('LI');
//                 // listItem.innerHTML = `${item.city}, ${item.state}`

//                 //  listContainer.appendChild(listItem);

//         }
//     })

// })
