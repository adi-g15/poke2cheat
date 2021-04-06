const result = document.getElementById("search-result");
result.innerHTML = `<p>Type in something first...</p>`

const xobj = new XMLHttpRequest()
let pokedex = []
xobj.overrideMimeType('application/json')
xobj.open('GET', 'one2one.json', true)  // 3rd param is "async: true"
xobj.onreadystatechange = _ => {
    if( xobj.readyState == 4 && xobj.status == "200" ) {
        // .open won't return a value, just returns undefined

        for (p of JSON.parse(xobj.responseText)) {
            pokedex.push(p['name'])
        }
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

function searchPokemon(input) {
    if(input.value === '')  return;

    console.log(`Input was ${input}`)
    let regex_name = '';
    for (c of input.value) {
        regex_name = regex_name.concat(c)
        if(c === '_')
            regex_name = regex_name.concat('\\w')
        else
            regex_name = regex_name.concat('\\w*')
    }

    const poke_regex = RegExp(regex_name, 'i')
    const possibilities = pokedex.filter(val => poke_regex.test(val));
    
    console.log("Possibilities: ", possibilities)
}
