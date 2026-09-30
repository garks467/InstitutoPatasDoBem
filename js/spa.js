document.addEventListener('DOMContentLoaded', function () {
    const rotas = {
        '#/': '../html/index.html',
        '#/projetos': '../html/projetos.html',
        '#/cadastro': '../html/cadastro.html'
    };

    const mapaArquivos = {
        'index.html': '#/',
        'projetos.html': '#/projetos',
        'cadastro.html': '#/cadastro'
    };

    function atualizarMenuAtivo(hash) {
        const links = document.querySelectorAll('nav a');
        links.forEach(function (link) {
            link.removeAttribute('aria-current');

            const href = link.getAttribute('href');
            if (!href) return;

            const arquivo = href.split('#')[0].split('/').pop();
            const rotaDoLink = mapaArquivos[arquivo];

            if (rotaDoLink === hash) {
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    function scrollParaAncora(id) {
        const el = document.getElementById(id);
        if (!el) return;
        const suave = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: suave ? 'smooth' : 'auto' });
    }

    async function renderizar(hash) {
        const url = rotas[hash];
        if (!url) return;

        try {
            const resposta = await fetch(url);
            if (!resposta.ok) throw new Error('Falha ao carregar ' + url);
            const html = await resposta.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const novoMain = doc.querySelector('main');
            const novoAside = doc.querySelector('body > aside');

            const mainAtual = document.querySelector('main');
            mainAtual.innerHTML = novoMain.innerHTML;

            const asideAtual = document.querySelector('body > aside');
            if (asideAtual && novoAside) {
                asideAtual.innerHTML = novoAside.innerHTML;
            }

            document.title = doc.title;
            atualizarMenuAtivo(hash);

            if (typeof renderizarVoluntariado === 'function') {
                renderizarVoluntariado();
            }

            if (typeof renderizarCadastrosSalvos === 'function') {
                renderizarCadastrosSalvos();
            }

            const ancora = sessionStorage.getItem('ancora-pendente');
            if (ancora) {
                sessionStorage.removeItem('ancora-pendente');
                setTimeout(function () { scrollParaAncora(ancora); }, 100);
            }
        } catch (erro) {
            console.error('Erro ao carregar página:', erro);
        }
    }

    document.addEventListener('click', function (evento) {
        const link = evento.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href) return;

        if (href.startsWith('http') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:')) {
            return;
        }

        if (href.startsWith('#') && !href.startsWith('#/')) {
            return;
        }

        const partes = href.split('#');
        const arquivo = partes[0].split('/').pop();
        const ancora = partes[1];
        const rota = mapaArquivos[arquivo];

        if (rota) {
            evento.preventDefault();

            if (location.hash === rota) {
                renderizar(rota).then(function () {
                    if (ancora) scrollParaAncora(ancora);
                });
            } else {
                if (ancora) {
                    sessionStorage.setItem('ancora-pendente', ancora);
                }
                location.hash = rota;
            }
        }
    });

    window.addEventListener('hashchange', function () {
        renderizar(location.hash);
    });
});