// switch the view to PAR MARQUE
afficheOptionSelection('lienMarque'); 

// Select NF525
setTimeout(() => {
    document.getElementById('marqueRecherche').value = '3731';
    document.getElementById('marqueRecherche').dispatchEvent(new Event('change')); 
}, 500);

// const
setTimeout(() => { 
    document.getElementById('clientsMarque').selectedIndex = 1;
    const clientsMarque = document.getElementById('clientsMarque');
    const marqueResultat = document.querySelector('#marqueResultat');
}, 1000);
const separator = ';'
let listProduitCSV = "Marque" + separator + "Nom" + separator + "Version" + separator + "Environnement" + separator + "Categorie" + separator + "Numero";

console.log("starting recuperation")

function ligneEnHTML() {
   const editeur = clientsMarque.options[clientsMarque.selectedIndex].text;
    setTimeout(() => {
    // console.log(clientsMarque.options[clientsMarque.selectedIndex].text);
    const code_html = marqueResultat.innerHTML
    const tbodyMatch = code_html.match(/<tbody[\s\S]*?<\/tbody>/);
    // console.log(tbodyMatch);
     const tbodyContent = tbodyMatch[0]; // Get the <tbody> content
    // console.log(tbodyContent);
    const trMatches = tbodyContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/g);
    // console.log("trMatches: \n" + trMatches);
    // Clean up whitespace in each <tr>
    const trCleaned = trMatches.map(tr => 
        tr
        .replace(/(\S)\s(\S)/g, '$1_$2') // replace all single space between two non-space chars with _
        .replace(/\s+/g, '') // Remove all spaces (in names of software too..)
        .replace(/<\/td>/g, separator) // Replace </td> with the separtor
        .replace(/<\/tr>/g, '\n') // Replace </tr> with a newline
        .replace(/<[^>]+>/g, '') // Remove other HTML tags
        .replace('_',' ')
    );
    const result = trCleaned.map(tr =>
        editeur + separator  + tr
        .replace(separator + separator,separator)
    )
    // console.log("\n" + result);
    listProduitCSV += "\n" + result;
}, 500);
}

function everyMarque(tourDeBoucles) {     
    let i=1;
    const id = setInterval(() => {
        if (i < tourDeBoucles) {
            clientsMarque.selectedIndex = i;
            clientsMarque.dispatchEvent(new Event('change'));
            ligneEnHTML();
            i++;
        } else {
            clearInterval(id);
            console.log("software list extracted in 'listProduitCSV'")
            console.log("write start() to download the csv")
            start();
        }
    }, 500);
}

function removeEmptyLines(s) {
  return s
    .split(/\r?\n/)           // split into lines
    .filter(line => /\S/.test(line)) // keep lines with non-whitespace
    .join('\n');             // join with single newline
}

function removeLeadingCommaPerLine(s) {
  return s
    .split(/\r?\n/)
    .map(line => line.replace(/^,\s?/, ''))
    .join('\n');
}


function downloadCSV(text, filename = 'data.csv') {
  const blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a); // needed for Firefox
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// lance la recuperation
setTimeout(() => {
    everyMarque(clientsMarque.length)
}, 1500);

function start() {
    listProduitCSV = removeEmptyLines(listProduitCSV);
    listProduitCSV = removeLeadingCommaPerLine(listProduitCSV);
    downloadCSV(listProduitCSV, 'listProduitCSV.csv');
}

// clientsMarque.selectedIndex = 5;
// clientsMarque.dispatchEvent(new Event('change'));
// clientsMarque.addEventListener('change',() => {
//     // ligneEnCSV(document.querySelector('#marqueResultat').innerHTML);
//     ligneEnHTML();
// });
// function ligneEnCSV(code_html) {
//     const editeur = clientsMarque.options[clientsMarque.selectedIndex].text;
//     // console.log(editeur);
//     const tbodyMatch = code_html.match(/<tbody[\s\S]*?<\/tbody>/);
//     // console.log(tbodyMatch);
//     const tbodyContent = tbodyMatch[0]; // Get the <tbody> content
//     // console.log(tbodyContent);
//     const trMatches = tbodyContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/g);
//     // console.log("trMatches: \n" + trMatches);
//     // Clean up whitespace in each <tr>
//     const trCleaned = trMatches.map(tr => 
//         tr.replace(/\s+/g, '') // Remove all spaces
//         .replace(/<\/td>/g, ',') // Replace </td> with a comma
//         .replace(/<\/tr>/g, '\n') // Replace </tr> with a newline
//         .replace(/<[^>]+>/g, '') // Remove other HTML tags
//         .replace('/n,',',')
//     );

//     const result = trCleaned.map(tr =>
//         editeur + ','  + tr
//         .replace(',,',',')
//     )

//     console.log("\n" + result);
//     listProduitCSV += "\n" + result;
// } 