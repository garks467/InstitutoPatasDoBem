function renderizarVoluntariado() {
    const container = document.getElementById('lista-voluntariado');
    const template = document.getElementById('template-voluntario');

    if (!container || !template) return;

    container.innerHTML = '';

    vagasVoluntariado.forEach(function (vaga) {
        const clone = template.content.cloneNode(true);

        const badge = clone.querySelector('.badge');
        badge.textContent = vaga.badge;
        badge.classList.add(vaga.badgeClasse);

        clone.querySelector('h3').textContent = vaga.titulo;
        clone.querySelector('.descricao').textContent = vaga.descricao;

        const lista = clone.querySelector('ul');
        vaga.itens.forEach(function (item) {
            const li = document.createElement('li');
            li.textContent = item;
            lista.appendChild(li);
        });

        container.appendChild(clone);
    });
}

function renderizarCadastrosSalvos() {
    const container = document.getElementById('lista-cadastros');
    if (!container) return;

    const registros = listarRegistros('patas:cadastros');
    container.innerHTML = '';

    if (registros.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'Nenhum cadastro salvo ainda.';
        container.appendChild(p);
        return;
    }

    dayjs.locale('pt-br');
    dayjs.extend(window.dayjs_plugin_localizedFormat);

    registros.forEach(function (r) {
        const item = document.createElement('p');
        const data = dayjs(r.data).format('LL [às] HH:mm');
        item.textContent = r.nome + ' — ' + r.email + ' — ' + data;
        container.appendChild(item);
    });
}