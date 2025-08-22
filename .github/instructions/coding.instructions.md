---
applyTo: '**'
---

## Regras gerais de codificação

- Utilize identação padrão PSR-12.
- Sempre utilize o padrão K&R para chaves de abertura e fechamento de métodos, classes e estruturas de controle.
- Somente quando criar código em PHP, em qualquer escopo, ao inserir comentários, ao invés de utilizar `//`, use `#` no início da linha. 
- Para comentários de várias linhas, utilize `#` no início de cada linha.
- Evite usar emojis ou caracteres especiais em nomes de classes, métodos, variáveis e comentários.
- Em arrays associativos extensos, alinhe verticalmente os operadores `=>` para facilitar a leitura visual.
- Evite o uso de estilos css inline, sempre utilize classes CSS.
- Use nomes descritivos e autoexplicativos para métodos, variáveis e classes — evite abreviações desnecessárias.
- Métodos e funções devem ser curtos (preferencialmente até 30 linhas).
- Evite condições aninhadas profundas; prefira retornar cedo (`early return`) quando aplicável.
- Utilize tipagem explícita em parâmetros e retornos sempre que possível.
- Priorize funções puras: que não alteram o estado externo e têm saída previsível.
- Agrupe funções e métodos em arquivos ou classes com responsabilidades únicas (SRP – Single Responsibility Principle).
- Separe claramente lógica de negócio, apresentação e acesso a dados.
- Siga a estrutura em camadas: `Controllers`, `Services`, `Repositories`, `DTOs`, `Entities`, `Helpers`, etc.
- Não inclua lógica de banco de dados diretamente em controladores — utilize repositórios.
- Utilize composição ao invés de herança, quando possível.
- Prefira injeção de dependências (via construtor) a instanciar objetos diretamente em métodos.
- Evite "God objects": classes com muitas funções ou responsabilidades misturadas.
- Use `readonly` em propriedades imutáveis (PHP 8.1+).
- Quando possível, use `enum` (PHP 8.1+) para representar valores fixos no lugar de strings ou inteiros soltos.
- Escreva código de forma que seja facilmente testável: funções puras, dependências injetáveis, sem acoplamento forte com recursos externos.
- Evite dependência direta de `$_POST`, `$_GET`, `$_SESSION`, etc. em funções — abstraia via serviços ou DTOs.

## Segurança e tratamento de erros

- Nunca exponha exceções diretamente ao usuário — trate e registre adequadamente.
- Nunca armazene ou envie senhas em texto puro.
- Use `htmlspecialchars` ou bibliotecas de templates seguras para sanitizar saídas HTML.
- Sempre use prepared statements (PDO ou ORM) para evitar SQL Injection.
- Nunca registre ou exponha dados sensíveis como tokens, senhas, CPF, etc. em logs.

## Organização do projeto e dependências

- Use PSR-4 para autoload de classes.
- Mantenha o `composer.json` organizado, com dependências claras, scripts úteis e descrição do projeto.
- Prefira dependências de pacotes estáveis e bem mantidos, com versionamento adequado.
- Utilize `composer.lock` versionado no repositório para controle reprodutível de dependências.
- Ao gerar código para CSS ou JavaScript, coloque sempre em um arquivo único, o que já existir nos diretórios assets/css e assets/js ou coding/indexing/assets/css e coding/indexing/assets/js, o que corresponder ao escopo onde for necessário gerar ajustes css ou js.
---

## Extras

- Em `try/catch`, capture exceções específicas, não genéricas (`Exception`), quando possível.
- Utilize `match` (PHP 8+) no lugar de longos `if/elseif` onde aplicável.
- Padronize espaços e indentação com 4 espaços por nível de bloco.
- Ao retornar dados estruturados (JSON ou array), preserve uma estrutura clara e previsível para facilitar o consumo por outras partes do sistema.