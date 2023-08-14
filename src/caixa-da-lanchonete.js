class CaixaDaLanchonete {
  // função principal do caixa
  calcularValorDaCompra(metodoDePagamento, itens) {
    // validação de método de pagamento
    const indiceSobreValorBruto =
      this.validaMetodoDePagamento(metodoDePagamento);
    if (!indiceSobreValorBruto) {
      return "Forma de pagamento inválida!";
    }
    // validação geral dos itens do pedido
    const validacaoItens = this.validaItens(itens);
    if (validacaoItens !== "itensValidados") {
      return validacaoItens;
    }

    // calculo final
    const valorBruto = this.calculaValorBruto(itens);
    const valorLiquido = `R$ ${(valorBruto * indiceSobreValorBruto)
      .toFixed(2)
      .replace(".", ",")}`;

    return valorLiquido;

    // return valorLiquido.toLocaleString("pt-BR", {
    //   style: "currency",
    //   currency: "BRL",
    // });
  }

  validaMetodoDePagamento(metodoDePagamento) {
    if (metodoDePagamento === "credito") {
      return 1.03;
    }
    if (metodoDePagamento === "dinheiro") {
      return 0.95;
    }
    if (metodoDePagamento === "debito") {
      return 1;
    }
    return null;
  }

  validaItens(itens) {
    // variáveis booleanas para verificação dos pares extra-principal
    let itemExtraCafe = false;
    let itemPrincipalCafe = false;
    let itemExtraSanduiche = false;
    let itemPrincipalSanduiche = false;

    // verificação de carrinho de compras vazio
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    // veriricação de Item Invalido (pedidos incompletos, pedidos com itens inexistentes no cardápio, quantidade nula de item)
    for (let item of itens) {
      let itemArray = item.split(",");
      // pedidos incompletos
      if (itemArray.length !== 2) {
        return "Item inválido!";
      }
      // pedidos sem valor numérico na quantidade do item
      if (!this.cardapio[itemArray[0]] || isNaN(itemArray[1])) {
        return "Item inválido!";
      }

      // conferencia dos pares extra-principal
      if (this.cardapio[itemArray[0]].tipo === "extra") {
        if (this.cardapio[itemArray[0]].extraDe === "cafe") {
          itemExtraCafe = true;
        } else if (this.cardapio[itemArray[0]].extraDe === "sanduiche") {
          itemExtraSanduiche = true;
        }
      }
      if (itemArray[0] === "cafe") {
        itemPrincipalCafe = true;
      }
      if (itemArray[0] === "sanduiche") {
        itemPrincipalSanduiche = true;
      }

      // pedidos com quantidade nula de itens
      if (
        Number(itemArray[1]) <= 0 ||
        !Number.isInteger(Number(itemArray[1]))
      ) {
        return "Quantidade inválida!";
      }
    }
    if (
      (itemExtraCafe && !itemPrincipalCafe) ||
      (itemExtraSanduiche && !itemPrincipalSanduiche)
    ) {
      console.log(
        itemExtraCafe,
        itemExtraSanduiche,
        itemPrincipalCafe,
        itemPrincipalSanduiche
      );
      return "Item extra não pode ser pedido sem o principal";
    }
    // itens válidos
    return "itensValidados";
  }

  calculaValorBruto(itens) {
    let valorBruto = 0;
    for (let item of itens) {
      let itemArray = item.split(",");
      valorBruto += Number(itemArray[1]) * this.cardapio[itemArray[0]].valor;
    }
    return valorBruto;
  }

  cardapio = {
    cafe: {
      valor: 3.0,
      tipo: "principal",
      extraDe: null,
    },
    chantily: {
      valor: 1.5,
      tipo: "extra",
      extraDe: "cafe",
    },
    suco: {
      valor: 6.2,
      tipo: "principal",
      extraDe: null,
    },
    sanduiche: {
      valor: 6.5,
      tipo: "principal",
      extraDe: null,
    },
    queijo: {
      valor: 2.0,
      tipo: "extra",
      extraDe: "sanduiche",
    },
    salgado: {
      valor: 7.25,
      tipo: "principal",
      extraDe: null,
    },
    combo1: {
      valor: 9.5,
      tipo: "combo",
      extraDe: null,
    },
    combo2: {
      valor: 7.5,
      tipo: "combo",
      extraDe: null,
    },
  };
}

console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("credito", [
    "cafe, 20",
    "chantily, 1",
  ])
);

export { CaixaDaLanchonete };
