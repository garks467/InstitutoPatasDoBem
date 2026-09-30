function lerStorage(chave, padrao) {
    try {
        const bruto = localStorage.getItem(chave);
        return bruto ? JSON.parse(bruto) : padrao;
    } catch (e) {
        console.error('Erro ao ler localStorage:', e);
        return padrao;
    }
}

function gravarStorage(chave, valor) {
    try {
        localStorage.setItem(chave, JSON.stringify(valor));
    } catch (e) {
        console.error('Erro ao gravar localStorage:', e);
    }
}

function adicionarRegistro(chave, registro) {
    const lista = lerStorage(chave, []);
    lista.push(registro);
    gravarStorage(chave, lista);
    return lista;
}

function listarRegistros(chave) {
    return lerStorage(chave, []);
}