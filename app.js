const result = document.getElementById("search-result");
result.innerHTML = `<p>Type in something first...</p>`

let MAX_RESULTS = 20;

const xobj = new XMLHttpRequest()
let pokedex = []
xobj.overrideMimeType('application/json')
xobj.open('GET', 'one2one.json', true)  // 3rd param is "async: true"
xobj.onreadystatechange = _ => {
    if( xobj.readyState == 4 && xobj.status == "200" ) {
        // .open won't return a value, just returns undefined

        pokedex = JSON.parse(xobj.responseText)
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

function changeMaxResults(number) {
    MAX_RESULTS = parseInt(number)
}

function searchPokemon(input) {
    if(input.value === '')  return;

    let regex_name = '\\w*';
    for (c of input.value) {
        if(c === '_')
            regex_name = regex_name.concat('\\w')
        else
            regex_name = regex_name.concat(c)
            regex_name = regex_name.concat('\\w*')
    }

    const poke_regex = RegExp(regex_name, 'i')
    const possibilities = pokedex.filter(({name}) => poke_regex.test(name))
                                 .slice(0, MAX_RESULTS);

    result.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Pokemon</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
                ${possibilities.map(p => `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.name}</td>
                    <td>
                        <a href=${`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${p.id}.png`}>
                            <img src=${`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/sprites/${p.id}MS.png`} />
                        </a>
                    </td>
                </tr>`).join('')}
            </tbody>
        </table>
        `

    console.debug(`Search: ${input.value}\nRegex Expression: ${regex_name}`)
}
