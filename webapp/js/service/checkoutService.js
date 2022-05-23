function checkout() {
    let pagamentoStatus = validaPagamento()

    if (pagamentoStatus === "boleto" || pagamentoStatus === "cartao") {
        console.log("Foi")
        
    }
}

function validaPagamento(){
    let inputBoleto = document.getElementById("payment-1")
    let inputCartao = document.getElementById("payment-2")

    if (inputBoleto.checked === true) {
        return inputBoleto.value
    } else if (inputCartao.checked === true) {
        return inputCartao.value
    } else {
        alert("Selecione o método de pagamento!!")
        return null
    }

   
}