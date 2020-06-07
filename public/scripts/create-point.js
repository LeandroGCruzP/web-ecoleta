function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")  

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {
        for ( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")  
    const stateInput = document.querySelector("input[name=state]")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json())
    .then( cities => {
        
        for ( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)

//itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //adicionar ou remover uma clase con JavaScript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verificar si existe itens selecionados, se sim pegar itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })
    //se ja tiver selecionado, tirar la selecao
    if( alreadySelected >= 0) {
        //tirar da selecao 
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
         //se nao estiver selecionado, adicionar a selecao
         selectedItems.push(itemId)
    }

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}