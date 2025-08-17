---
applyTo: '**'
---

# 📘 Exemplos práticos de boas e más práticas de codificação em PHP

Este documento serve como referência prática para manter um padrão de código limpo, legível e profissional. Os exemplos abaixo mostram **como não fazer** (`❌`) e **como fazer corretamente** (`✅`), seguindo as diretrizes estabelecidas no projeto.

---

## 1. Comentários com `#` ao invés de `//`

```php
# ❌ Incorreto
// Soma os valores
function calcularPreco($a, $b) {
    return $a + $b;
}

# ✅ Correto
# Soma os valores
function calcularPreco($a, $b) {
    return $a + $b;
}
```

---

## 2. Padrão de chaves K&R

```php
# ❌ Incorreto (Allman style)
function exemplo()
{
    echo 'Teste';
}

# ✅ Correto (K&R)
function exemplo() {
    echo 'Teste';
}
```

---

## 3. Nomeação de variáveis e clareza

```php
# ❌ Incorreto
function calc($x, $y) {
    return $x + $y;
}

# ✅ Correto
function calcularPrecoComTaxa(float $valor, float $taxa): float {
    return $valor + ($valor * $taxa);
}
```

---

## 4. Tipagem e uso de strict_types

```php
# ❌ Incorreto
function somar($a, $b) {
    return $a + $b;
}

# ✅ Correto
declare(strict_types=1);

function somar(int $a, int $b): int {
    return $a + $b;
}
```

---

## 5. Arrays associativos com alinhamento

```php
# ❌ Incorreto
$dados = [
    'nome' => 'João',
    'idade'=> 30,
    'email' =>  'joao@email.com'
];

# ✅ Correto
$dados = [
    'nome'  => 'João',
    'idade' => 30,
    'email' => 'joao@email.com'
];
```

---

## 6. SRP – Single Responsibility Principle

```php
# ❌ Incorreto
function processarPedido($pedido) {
    salvarPedidoNoBanco($pedido);
    enviarEmailConfirmacao($pedido['cliente']);
    gerarNotaFiscal($pedido);
}

# ✅ Correto
function processarPedido($pedido) {
    salvarPedido($pedido);
    notificarCliente($pedido['cliente']);
    emitirNotaFiscal($pedido);
}
```

---

## 7. Injeção de dependência

```php
# ❌ Incorreto
class PedidoService {
    public function __construct() {
        $this->email = new EmailService();
    }
}

# ✅ Correto
class PedidoService {
    public function __construct(private EmailService $email) {}
}
```

---

## 8. Código testável

```php
# ❌ Incorreto
function obterCliente() {
    return buscarClientePorId($_POST['id']);
}

# ✅ Correto
function obterCliente(int $id) {
    return buscarClientePorId($id);
}
```

---

## 9. Tratamento de exceções

```php
# ❌ Incorreto
try {
    executarConsulta();
} catch (Exception $e) {
    echo $e->getMessage();
}

# ✅ Correto
try {
    executarConsulta();
} catch (PDOException $e) {
    registrarErro($e->getMessage());
    mostrarMensagemAmigavel();
}
```

---

## 10. SQL seguro com PDO

```php
# ❌ Incorreto
$stmt = $pdo->query("SELECT * FROM usuarios WHERE email = '$email'");

# ✅ Correto
$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = :email");
$stmt->execute(['email' => $email]);
```

---

> Use este guia para revisar seu código e manter um padrão profissional em todo o projeto.
