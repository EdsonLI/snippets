// SYNTAX HIGHLIGHTING DEFINITIVO - CSS PURO
// Esta versão funciona 100% sem dependências externas

$(document).ready(function() {
    console.log('🎨 INICIANDO SYNTAX HIGHLIGHTER DEFINITIVO');
    
    // CSS inline para colorir código
    const css = `
    <style id="syntax-colors">
        pre code {
            display: block;
            padding: 15px !important;
            background: #2d3748 !important;
            color: #e2e8f0 !important;
            border-radius: 6px !important;
            font-family: 'Fira Code', 'Courier New', monospace !important;
            line-height: 1.5 !important;
            overflow-x: auto !important;
            margin: 10px 0 !important;
        }
        
        /* PHP */
        .php-keyword { color: #9f7efe !important; font-weight: bold !important; }
        .php-variable { color: #ed8796 !important; }
        .php-string { color: #a6da95 !important; }
        .php-comment { color: #6e738d !important; font-style: italic !important; }
        .php-function { color: #8aadf4 !important; }
        .php-tag { color: #f5a97f !important; font-weight: bold !important; }
        
        /* JavaScript */
        .js-keyword { color: #c6a0f6 !important; font-weight: bold !important; }
        .js-function { color: #8aadf4 !important; }
        .js-string { color: #a6da95 !important; }
        .js-comment { color: #6e738d !important; font-style: italic !important; }
        .js-number { color: #f5a97f !important; }
        .js-operator { color: #91d7e3 !important; }
        
        /* CSS */
        .css-property { color: #8aadf4 !important; }
        .css-value { color: #a6da95 !important; }
        .css-selector { color: #f5a97f !important; font-weight: bold !important; }
        .css-comment { color: #6e738d !important; font-style: italic !important; }
        
        /* HTML */
        .html-tag { color: #ed8796 !important; font-weight: bold !important; }
        .html-attribute { color: #8aadf4 !important; }
        .html-value { color: #a6da95 !important; }
        .html-comment { color: #6e738d !important; font-style: italic !important; }
        
        /* SQL */
        .sql-keyword { color: #c6a0f6 !important; font-weight: bold !important; }
        .sql-string { color: #a6da95 !important; }
        .sql-comment { color: #6e738d !important; font-style: italic !important; }
        .sql-number { color: #f5a97f !important; }
    </style>
    `;
    
    // Injetar CSS
    if (!$('#syntax-colors').length) {
        $('head').append(css);
        console.log('✅ CSS de sintaxe injetado');
    }
    
    // Função para colorir PHP
    function colorirPHP(texto) {
        return texto
            // Tags PHP
            .replace(/(&lt;\?php|&lt;\?|<\?php|<\?|\?\&gt;|\?>)/g, '<span class="php-tag">$1</span>')
            // Palavras-chave
            .replace(/\b(class|function|public|private|protected|static|const|var|if|else|elseif|endif|while|for|foreach|endforeach|do|switch|case|default|break|continue|return|try|catch|finally|throw|new|extends|implements|interface|abstract|final|namespace|use|as|global|isset|empty|unset|array|echo|print|include|require|include_once|require_once)\b/g, '<span class="php-keyword">$1</span>')
            // Variáveis
            .replace(/(\$[a-zA-Z_][a-zA-Z0-9_]*)/g, '<span class="php-variable">$1</span>')
            // Strings
            .replace(/(["'])([^"']*)\1/g, '<span class="php-string">$1$2$1</span>')
            // Comentários
            .replace(/(\/\/.*$|#.*$)/gm, '<span class="php-comment">$1</span>')
            .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="php-comment">$1</span>')
            // Funções
            .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="php-function">$1</span>(');
    }
    
    // Função para colorir JavaScript
    function colorirJS(texto) {
        return texto
            // Palavras-chave
            .replace(/\b(var|let|const|function|if|else|for|while|do|switch|case|default|break|continue|return|try|catch|finally|throw|new|this|typeof|instanceof|in|of|class|extends|constructor|static|async|await|import|export|from|default)\b/g, '<span class="js-keyword">$1</span>')
            // Strings
            .replace(/(["'`])([^"'`]*)\1/g, '<span class="js-string">$1$2$1</span>')
            // Comentários
            .replace(/(\/\/.*$)/gm, '<span class="js-comment">$1</span>')
            .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="js-comment">$1</span>')
            // Números
            .replace(/\b(\d+\.?\d*)\b/g, '<span class="js-number">$1</span>')
            // Operadores
            .replace(/(\+|\-|\*|\/|%|=|!|&|\||<|>)/g, '<span class="js-operator">$1</span>')
            // Funções
            .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="js-function">$1</span>(');
    }
    
    // Função para colorir CSS
    function colorirCSS(texto) {
        return texto
            // Seletores
            .replace(/^([.#]?[a-zA-Z0-9_-]+[^{]*)\s*\{/gm, '<span class="css-selector">$1</span> {')
            // Propriedades
            .replace(/\s*([a-zA-Z-]+)\s*:/g, ' <span class="css-property">$1</span>:')
            // Valores
            .replace(/:([^;]+);/g, ': <span class="css-value">$1</span>;')
            // Comentários
            .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="css-comment">$1</span>');
    }
    
    // Função para colorir HTML
    function colorirHTML(texto) {
        return texto
            // Tags
            .replace(/&lt;(\/?[a-zA-Z0-9]+)([^&gt;]*)&gt;/g, function(match, tag, attrs) {
                let coloredAttrs = attrs.replace(/([a-zA-Z-]+)=(["'])([^"']*)\2/g, '<span class="html-attribute">$1</span>=<span class="html-value">$2$3$2</span>');
                return '&lt;<span class="html-tag">' + tag + '</span>' + coloredAttrs + '&gt;';
            })
            // Comentários
            .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="html-comment">$1</span>');
    }
    
    // Função para colorir SQL
    function colorirSQL(texto) {
        return texto
            // Palavras-chave
            .replace(/\b(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|TABLE|DATABASE|INDEX|VIEW|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|FULL|ON|GROUP|ORDER|BY|HAVING|LIMIT|UNION|AND|OR|NOT|NULL|TRUE|FALSE|AS|DISTINCT|COUNT|SUM|AVG|MAX|MIN|LIKE|IN|BETWEEN|EXISTS|CASE|WHEN|THEN|ELSE|END)\b/gi, '<span class="sql-keyword">$1</span>')
            // Strings
            .replace(/(["'])([^"']*)\1/g, '<span class="sql-string">$1$2$1</span>')
            // Comentários
            .replace(/(--.*$)/gm, '<span class="sql-comment">$1</span>')
            .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="sql-comment">$1</span>')
            // Números
            .replace(/\b(\d+\.?\d*)\b/g, '<span class="sql-number">$1</span>');
    }
    
    // Função principal para aplicar cores
    function aplicarCores() {
        console.log('🔍 Procurando blocos de código...');
        
        const blocos = $('pre code, code');
        console.log(`📝 Encontrados ${blocos.length} blocos de código`);
        
        let processados = 0;
        
        blocos.each(function() {
            const $this = $(this);
            
            // Evitar reprocessamento
            if ($this.hasClass('colorido')) {
                return;
            }
            
            let texto = $this.html();
            const textoOriginal = $this.text();
            
            // Detectar linguagem
            let linguagem = 'texto';
            if ($this.hasClass('language-php') || textoOriginal.includes('<?php') || textoOriginal.includes('$')) {
                linguagem = 'php';
            } else if ($this.hasClass('language-javascript') || textoOriginal.includes('function') || textoOriginal.includes('$(')) {
                linguagem = 'javascript';
            } else if ($this.hasClass('language-css') || (textoOriginal.includes('{') && textoOriginal.includes(':'))) {
                linguagem = 'css';
            } else if ($this.hasClass('language-html') || textoOriginal.includes('<html') || textoOriginal.includes('<!DOCTYPE')) {
                linguagem = 'html';
            } else if ($this.hasClass('language-sql') || textoOriginal.toUpperCase().includes('SELECT') || textoOriginal.toUpperCase().includes('INSERT')) {
                linguagem = 'sql';
            }
            
            // Aplicar coloração baseada na linguagem
            switch(linguagem) {
                case 'php':
                    texto = colorirPHP(texto);
                    break;
                case 'javascript':
                    texto = colorirJS(texto);
                    break;
                case 'css':
                    texto = colorirCSS(texto);
                    break;
                case 'html':
                    texto = colorirHTML(texto);
                    break;
                case 'sql':
                    texto = colorirSQL(texto);
                    break;
            }
            
            $this.html(texto).addClass('colorido');
            processados++;
            
            console.log(`✅ Bloco ${processados} colorido como ${linguagem}`);
        });
        
        console.log(`🏁 ${processados} blocos de código coloridos`);
    }
    
    // Executar imediatamente
    aplicarCores();
    
    // Executar quando novo conteúdo AJAX
    $(document).on('snippets-loaded', function() {
        console.log('📡 Novo conteúdo AJAX detectado');
        setTimeout(aplicarCores, 100);
    });
    
    // Observer para mudanças no DOM
    const observer = new MutationObserver(function(mutations) {
        let temNovoCodigo = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        if (node.tagName === 'PRE' || node.tagName === 'CODE' || 
                            node.querySelector && (node.querySelector('pre') || node.querySelector('code'))) {
                            temNovoCodigo = true;
                        }
                    }
                });
            }
        });
        
        if (temNovoCodigo) {
            console.log('🔄 DOM mudou, reaplicando cores...');
            setTimeout(aplicarCores, 200);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('🎨 SYNTAX HIGHLIGHTER DEFINITIVO ATIVADO');
});
