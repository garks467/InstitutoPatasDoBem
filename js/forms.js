function mostrarFeedback(form, mensagem, tipo) {
    let div = form.querySelector('.alerta-feedback');
    if (!div) {
        div = document.createElement('div');
        div.className = 'alerta alerta-feedback';
        div.setAttribute('role', 'status');
        form.appendChild(div);
    }
    div.className = 'alerta alerta-feedback alerta-' + tipo;
    div.textContent = mensagem;
}

function atualizarBotao(form) {
    const botao = form.querySelector('button[type="submit"]');
    if (!botao) return;
    botao.disabled = !form.checkValidity();
}

function mostrarErroCampo(campo, mensagem) {
    let span = campo.parentElement.querySelector('.erro-campo[data-para="' + campo.id + '"]');
    if (!span) {
        span = document.createElement('span');
        span.className = 'erro-campo';
        span.setAttribute('data-para', campo.id);
        span.setAttribute('role', 'alert');
        campo.insertAdjacentElement('afterend', span);
    }
    span.textContent = mensagem;
    campo.setAttribute('aria-invalid', 'true');
}

function limparErroCampo(campo) {
    const span = campo.parentElement.querySelector('.erro-campo[data-para="' + campo.id + '"]');
    if (span) span.remove();
    campo.removeAttribute('aria-invalid');
}

function validarCampo(campo) {
    if (!campo.matches('input, textarea')) return true;
    if (campo.type === 'radio') return true;

    if (campo.validity.valueMissing) {
        mostrarErroCampo(campo, 'Este campo é obrigatório.');
        return false;
    }
    if (campo.validity.patternMismatch) {
        mostrarErroCampo(campo, campo.title || 'Formato inválido.');
        return false;
    }
    if (campo.validity.typeMismatch) {
        mostrarErroCampo(campo, 'Formato inválido para este campo.');
        return false;
    }
    if (campo.validity.tooShort) {
        mostrarErroCampo(campo, 'Muito curto.');
        return false;
    }
    if (campo.validity.tooLong) {
        mostrarErroCampo(campo, 'Muito longo.');
        return false;
    }

    limparErroCampo(campo);
    return true;
}

document.addEventListener('submit', function (evento) {
    const form = evento.target;
    if (!form.matches('#form-contato, #form-cadastro')) return;

    evento.preventDefault();

    const campos = form.querySelectorAll('input, textarea');
    let tudoOk = true;
    campos.forEach(function (campo) {
        if (campo.type === 'radio') return;
        if (!validarCampo(campo)) tudoOk = false;
    });

    if (!tudoOk) {
        const primeiroErro = form.querySelector('[aria-invalid="true"]');
        if (primeiroErro) primeiroErro.focus();
        return;
    }

    const dados = Object.fromEntries(new FormData(form).entries());
    dados.data = new Date().toISOString();

    if (form.id === 'form-cadastro') {
        adicionarRegistro('patas:cadastros', dados);
        if (typeof renderizarCadastrosSalvos === 'function') {
            renderizarCadastrosSalvos();
        }
    } else {
        adicionarRegistro('patas:contatos', dados);
    }

    mostrarFeedback(form, 'Enviado com sucesso! Entraremos em contato em breve.', 'sucesso');
    form.reset();
    form.querySelectorAll('.erro-campo').forEach(function (e) { e.remove(); });
    atualizarBotao(form);
});

document.addEventListener('input', function (evento) {
    const campo = evento.target;
    const form = campo.closest('form');
    if (!form || !form.matches('#form-contato, #form-cadastro')) return;

    if (campo.matches('input, textarea') && campo.type !== 'radio') {
        validarCampo(campo);
    }
    atualizarBotao(form);
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('#form-contato, #form-cadastro').forEach(atualizarBotao);
});