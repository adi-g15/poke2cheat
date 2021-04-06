const result = document.getElementById("search-result");
result.innerHTML = `<p>Type in something first...</p>`

const xobj = new XMLHttpRequest()
xobj.overrideMimeType('application/json')
xobj.open('GET', 'pokedex.json', true)  // 3rd param is "async: true"
xobj.onreadystatechange = _ => {
    if( xobj.readyState == 4 && xobj.status == "200" ) {
        // .open won't return a value, just returns undefined

        console.log(xobj.responseText)
    }
};
xobj.send(null)

// fetch("./pokedex.json", {
//     headers: {
//         'Access-Control-Allow-Origin': '*'
//     }
// })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//     })
//     .catch(err => {
//         console.error(err)
//     }) 

function searchPokemon(element) {
    console.log("Called")
    console.log(element);
}
