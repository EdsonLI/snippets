---
applyTo: '**'
---

## Regras gerais de codificação

- Use o padrão **PSR-12** para formatação e **K&R** para chaves (`{}`).
- Use nomes **claros e autoexplicativos**, evitando abreviações desnecessárias.
- Escreva código coeso, com **responsabilidade única por classe** (SRP).
- Siga os princípios **SOLID** e **Clean Code**.
- Evite **código duplicado**, **condições aninhadas profundas** e **efeitos colaterais**.
- Prefira **retornos antecipados** (`early return`) sempre que aplicável.
- Use **tipagem explícita** em parâmetros e retornos sempre que possível.
- Priorize **funções puras**: sem alteração de estado externo e com saída previsível.
- Em PHP, use `#` para comentários, inclusive em blocos de múltiplas linhas.
- Não utilize **emojis** ou caracteres especiais em nomes e comentários.
- Em **arrays associativos extensos**, alinhe os `=>` verticalmente para facilitar leitura.

---

## Organização do código

- Agrupe funções e métodos com responsabilidades similares em classes ou arquivos dedicados.
- Separe claramente **lógica de negócio**, **apresentação** e **acesso a dados**.
- Use uma estrutura em camadas: `Controllers`, `Services`, `Repositories`, `DTOs`, `Entities`, `Helpers`, etc.
- Evite lógica de banco de dados nos controladores — delegue a repositórios.

---

## Orientação a Objetos (OOP)

- Prefira **composição** a herança, quando viável.
- Utilize **injeção de dependência** via construtor em vez de instanciar diretamente.
- Mantenha as classes **pequenas** e **focadas**.
- Evite "God objects" com múltiplas responsabilidades.
- Use `readonly` em propriedades imutáveis (PHP 8.1+).
- Utilize `enum` (PHP 8.1+) para valores fixos em vez de strings/literals soltos.

---

## Backend / APIs

- Siga o padrão **RESTful** para rotas (GET, POST, PUT, DELETE).
- Valide os dados de entrada antes de processá-los.
- Retorne respostas JSON bem estruturadas com **status codes apropriados**.
- Utilize **DTOs** e objetos de request para transporte e validação de dados.
- Em estruturas de resposta JSON, mantenha uma **estrutura previsível e limpa**.

---

## Testabilidade e manutenção

- Escreva código de forma a ser facilmente testável: funções puras, baixo acoplamento e dependências injetáveis.
- Evite usar `new` em lógica de negócio; prefira **injeção ou fábricas**.
- Não dependa diretamente de `$_POST`, `$_GET`, `$_SESSION`, etc. — abstraia com serviços ou objetos apropriados.

---

## Segurança e tratamento de erros

- Nunca exponha exceções diretamente ao usuário. Trate-as e registre logs adequadamente.
- Evite armazenar ou transmitir senhas em texto puro.
- Use `htmlspecialchars` ou ferramentas seguras para sanitizar saídas HTML.
- Sempre use **prepared statements** (PDO ou ORM) para evitar SQL Injection.
- Nunca exponha dados sensíveis (senhas, tokens, CPF, etc.) em logs.

---

## Organização do projeto e dependências

- Use **PSR-4** para autoload de classes.
- Mantenha o `composer.json` organizado, com scripts úteis e descrição do projeto.
- Dê preferência a dependências estáveis e bem mantidas, com versionamento claro.
- Versione o `composer.lock` para garantir reprodução de builds.

---

## Convenções adicionais

- Use `match` (PHP 8+) em vez de longos blocos `if/elseif`, quando aplicável.
- Em `try/catch`, capture exceções específicas sempre que possível.
- Padronize a indentação com **4 espaços** por nível.
