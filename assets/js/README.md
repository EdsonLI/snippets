# Reorganização de Arquivos JavaScript

Este documento descreve a nova organização de arquivos JavaScript no projeto, que foram consolidados para melhor manutenção e performance.

## Nova Estrutura de Diretórios

```
assets/
└── js/
    ├── core/              # Scripts principais do site
    │   └── main-core.js   # (Funções essenciais do tema)
    ├── snippets/          # Scripts relacionados aos snippets
    │   └── snippets-core.js (Gerenciamento de snippets)
    ├── icons/             # Scripts relacionados aos ícones
    │   └── tech-icons-fix.js (Correções e configurações de ícones)
    ├── utils/             # Scripts utilitários
    │   └── (futuros scripts utilitários)
    └── script-loader.js   # Carregador central de scripts
```

## Arquivos Consolidados

### 1. `main-core.js`
Combina funcionalidades de:
- `main.js`
- Inicialização de componentes de UI
- Gerenciamento de tooltips
- Navegação móvel

### 2. `snippets-core.js`
Combina funcionalidades de:
- `snippet-loader.js`
- `snippets-manager.js`
- `snippet-external-links.js`
- `snippet-scroll-indicator.js`
- Funcionalidades relacionadas ao Isotope

### 3. `tech-icons-fix.js`
Combina funcionalidades de:
- `bootstrap-icon-fix.js`
- `git-icon-fix.js`
- `jquery-icon-fix.js`
- `php-icon-fix.js`
- `sql-icon-fix.js`
- `w3schools-icon-fix.js`

### 4. `script-loader.js`
Novo arquivo que gerencia o carregamento sequencial dos scripts consolidados.

## Como Atualizar as Referências de Script

Para utilizar os novos scripts consolidados, substitua todas as referências aos scripts individuais por uma única referência ao `script-loader.js`.

### Antes:
```html
<script src="assets/js/main.js"></script>
<script src="assets/js/snippet-loader.js"></script>
<script src="assets/js/snippets-manager.js"></script>
<!-- Outros scripts individuais -->
```

### Depois:
```html
<script src="assets/js/script-loader.js"></script>
```

## Benefícios da Nova Estrutura

1. **Menos requisições HTTP**: Melhor performance de carregamento da página
2. **Código organizado**: Arquivos agrupados por funcionalidade
3. **Manutenção simplificada**: Alterações relacionadas ficam no mesmo arquivo
4. **Versionamento melhorado**: Atualizações mais coerentes
5. **Facilita depuração**: Estrutura lógica para rastreamento de problemas

## Próximos Passos

1. Atualizar as referências de script em todas as páginas HTML
2. Verificar se todas as funcionalidades estão funcionando corretamente
3. Otimizar scripts com minificação para produção
