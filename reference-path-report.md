# Relatório de Verificação de Referências de Arquivos

Este relatório identifica os arquivos CSS e JavaScript referenciados nas páginas do projeto que possuem caminhos incorretos ou que não existem mais na estrutura de arquivos.

## Arquivos Referenciados em `coding/indexing/index.html` com Problemas

A página `coding/indexing/index.html` contém várias referências a arquivos CSS e JavaScript que precisam de atenção:

### Arquivos CSS Inexistentes

Os seguintes arquivos CSS são referenciados mas não existem na estrutura atual:

1. `../assets/css/tech-icons-common.css`
2. `../assets/css/tech-badges-new.css`
3. `../assets/css/madbuilder-svg-fix.css` 
4. `../assets/css/sql-icon-custom.css`
5. `../assets/css/jquery-icon-simple.css`
6. `../assets/css/bootstrap-icon-custom.css`
7. `../assets/css/w3schools-icon-custom.css`
8. `../assets/css/css-icon-custom.css`
9. `../assets/css/isotope-icon-custom.css`

### Arquivos JavaScript Inexistentes

Os seguintes arquivos JavaScript são referenciados mas não existem na estrutura atual:

1. `../assets/js/tech-badges-new.js`

### Recomendações de Correção

#### Opção 1: Atualizar Referências para Arquivos Existentes

Substituir as referências aos arquivos que não existem pelos equivalentes atuais:

| Arquivo Inexistente | Substituir Por |
|---------------------|----------------|
| `tech-icons-common.css` | `tech-icons-universal.css` |
| `tech-badges-new.css` | Remover se não necessário |
| `tech-badges-new.js` | Remover se não necessário |

#### Opção 2: Criar os Arquivos Faltantes

Verificar no histórico ou na pasta de backups se estes arquivos existiam anteriormente e restaurá-los, ou criar versões vazias destes arquivos para evitar erros 404.

## Arquivos Carregados Dinamicamente em `scripts.js`

O arquivo `scripts.js` na pasta `coding/indexing/assets/` carrega dinamicamente os seguintes arquivos HTML:

1. `./snippets_git.html` - Este arquivo existe no sistema

## Recomendações Gerais

1. **Consolidação de CSS**: Considerar a consolidação de vários arquivos CSS pequenos em arquivos maiores agrupados por função
2. **Revisão de Dependências**: Verificar se todos os scripts e estilos são realmente necessários
3. **Verificação de Carregamento**: Implementar verificação de existência de arquivos antes de tentar carregá-los em JavaScript
4. **Padronização de Caminhos**: Usar caminhos relativos consistentes ou considerar o uso de caminhos absolutos a partir da raiz do site

## Próximos Passos

1. Aplicar as correções sugeridas nos arquivos `index.html`
2. Testar a funcionalidade após as alterações
3. Remover referências a arquivos que não são mais necessários
4. Documentar quaisquer mudanças significativas na estrutura de arquivos
