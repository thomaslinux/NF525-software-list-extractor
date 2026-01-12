// switch the view to PAR MARQUE
afficheOptionSelection('lienMarque'); 

// Select NF525
let listProduitCSV = "Marque,Nom,Version,Environnement,Categorie,Numero";
setTimeout(() => {
    document.getElementById('marqueRecherche').value = '3731';
    document.getElementById('marqueRecherche').dispatchEvent(new Event('change')); 
}, 500);

// const
setTimeout(() => { 
    document.getElementById('clientsMarque').selectedIndex = 1;
    const clientsMarque = document.getElementById('clientsMarque');
    const marqueResultat = document.querySelector('#marqueResultat');
    clientsMarque.addEventListener('change',() => {
        ligneEnCSV(document.querySelector('#marqueResultat').innerHTML);
    });
}, 500);

function everyMarque() {     
    for (let i = 0; i < clientsMarque.length; i++) {
        clientsMarque.selectedIndex = i;
        clientsMarque.dispatchEvent(new Event('change'));
        ligneEnCSV(marqueResultat.innerHTML);
    };
}

clientsMarque.selectedIndex = 5;
clientsMarque.dispatchEvent(new Event('change'));

function ligneEnCSV(code_html) {
    const editeur = clientsMarque.options[clientsMarque.selectedIndex].text;
    // console.log(editeur);
    const tbodyMatch = code_html.match(/<tbody[\s\S]*?<\/tbody>/);
    // console.log(tbodyMatch);
    const tbodyContent = tbodyMatch[0]; // Get the <tbody> content
    // console.log(tbodyContent);
    const trMatches = tbodyContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/g);
    // console.log("trMatches: \n" + trMatches);
    // Clean up whitespace in each <tr>
    const trCleaned = trMatches.map(tr => 
        tr.replace(/\s+/g, '') // Remove all spaces
        .replace(/<\/td>/g, ',') // Replace </td> with a comma
        .replace(/<\/tr>/g, '\n') // Replace </tr> with a newline
        .replace(/<[^>]+>/g, '') // Remove other HTML tags
        .replace('/n,',',')
    );

    const result = trCleaned.map(tr =>
        editeur + ','  + tr
        .replace(',,',',')
    )

    console.log("\n" + result);
    listProduitCSV += "\n" + result;
} 