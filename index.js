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

async function GetDoc() {
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

async function AddUser(data = {}) {
    const response = await fetch("https://apigenerator.dronahq.com/api/epcrSy-G/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    return response.json()
}

async function TrackData() {
    let data = await ReadWorkSheet()
    data.map(async(user) => {
        let response = await AddUser(user)
        console.log(response)
    })
    return console.log('Dados copiados com sucesso')
}