function init() {
    
    //Fetches the data from the URL provided in the fetch call
    fetch("https://handlers.education.launchcode.org/static/astronauts.json")
    .then((response)=>{

        //Creates crew variable from #container-list; to be populated with the astronaut events later
        let crew = document.getElementById("container-list");
        let heading = document.getElementById("heading");

        return response.json().then((json)=>{

            //Sorts the json array of objects by the value of hoursInSpace
            json = json.sort((a, b) => (a.hoursInSpace > b.hoursInSpace) ? 1 : -1);

            //Adds the number of Astronauts to the heading
            heading.innerHTML += ` ${json.length}`;

            for(i in json){
                //Creates span element to be populated with the information pulled from the json arr
                let span = document.createElement("span");
                span.innerHTML = json[i].active;

                //if the Astronaut is active
                if(json[i].active) span.classList.add("green");


                //creates the div for the astronaut obj
                let astronaut = 
                `<div class="astronaut">
                    <div class="bio">
                        <h3>${json[i].firstName} ${json[i].lastName}</h3>
                        <ul>
                            <li>Hours in space: ${json[i].hoursInSpace}</li>
                            <li>Active: ${span.outerHTML}</li>
                            <li>Skills: ${json[i].skills.join(", ")}</li>
                        </ul>
                    </div>
                    <img class="avatar" src="${json[i].picture}"/>
                </div>`;

                //Populates #container-list with the astronaut obj
                crew.innerHTML += astronaut;
            }
        })
    })
}

//ON window load, run the init function
window.onload = init;