let db = []

const getDB = () => JSON.parse(localStorage.getItem('animes')) ?? []

const setDB = (db) => localStorage.setItem('animes', JSON.stringify(db))

const criarAnime = (nome, foto, indice) => {
    const item = document.createElement('section')
    item.classList.add('grid-item') 
    item.innerHTML = `
        <button id="close" onclick="removerItem(${indice})"></button>
        <a><img src="${foto}" data-indice=${indice}></a>
        <div id="nomeanime" data-indice=${indice}>${nome}</div>
    `
    document.getElementById('gridContainer').appendChild(item)
}


const limparAnimesDuplicados = () => {
    const container = document.getElementById('gridContainer')
    // enquanto container tiver um primeiro filho
    // remova o ultimo filho que foi adicionado ao animes
    while (container.firstChild) { container.removeChild(container.lastChild) }
}

const atualizarTela = () => {
    limparAnimesDuplicados()
    const db = getDB()
    db.forEach ( (item, indice) => criarAnime(item.nome, item.foto, indice))
}

const inserirAnime = () => {
    var nome = prompt('Insira o nome do seu anime')
    if (nome == "") {
        return
    }
    while (nome.length >= 48) {
        alert("O nome do seu anime não pode ultrapassar 48 caracteres por favor digite novamente!")
        var nome = prompt('Insira o nome do seu anime')
    }
    var foto = prompt('Insira o link da foto do seu anime')
    if (foto) {
        if (foto.endsWith(".png") || foto.endsWith(".jpg") || foto.endsWith(".JPG")) {
            foto = foto
        } else {
            alert("Foto invalida foi adicionada a foto padrão")
            foto = 'https://i.redd.it/dtljzwihuh861.jpg'
        }
    } else {
        foto = 'https://i.redd.it/dtljzwihuh861.jpg'
    }
    const db = getDB()
    db.push ({'nome': nome, 'foto': foto})
    setDB(db)
    atualizarTela()
}

const removerItem = (indice) => {

    // pegue o banco
    const DB = getDB()

    // faca um splice (corte) no seu (banco que eh um array) do indice, so uma posicao
    DB.splice (indice, 1)

    // set do splice no seu banco, permitir a persistencia dos dado
    setDB(DB)

    // atualizar tela
    atualizarTela()

}

atualizarTela()
