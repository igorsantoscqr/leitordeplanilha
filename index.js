const { GooogleSpreadsheet } = require('google-spreadsheet');
const credencials = require('./credentials.json');
const arquivo = require('./arquivo.json');
const { JWT } = require('google-auth-library');

const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets'
];

const jwt = new JWT({
    email: credencials.client_email,
    key: credencials.private_key,
    scopes: SCOPES,
});


async function GetDoc(id, jwt) {
    const doc = new GooogleSpreadsheet(arquivo.id, jwt)
    await doc.loadinfo()
    return doc
}

async function ReadWorkSheet() {
    let sheet = (await GetDoc()).sheetsByIndex[0]
    let rows = await sheet.getRows()
    let users = rows.map(row => {
        return row.toObject()
    })
    return users
}