const deleteText = document.querySelectorAll('.fa-trash')
const plusText = document.querySelectorAll('.fa-plus')
const minusText = document.querySelectorAll('.fa-minus')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

Array.from(plusText).forEach((element)=>{
    element.addEventListener('click', addQty)
})

Array.from(minusText).forEach((element)=>{
    element.addEventListener('click', subQty)
})

async function deleteItem(){
    const sName = this.parentNode.childNodes[3].innerText
    const bName = this.parentNode.childNodes[7].innerText
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'sectionS': sName,
              'nameS': bName
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addQty(){
    const sName = this.parentNode.childNodes[3].innerText
    const bName = this.parentNode.childNodes[7].innerText
    const tqty = Number(this.parentNode.childNodes[11].innerText)
    try{
        const response = await fetch('addOneQty', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'sectionS': sName,
              'nameS': bName,
              'qtyS': tqty
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function subQty(){
    const sName = this.parentNode.childNodes[3].innerText
    const bName = this.parentNode.childNodes[7].innerText
    const tqty = Number(this.parentNode.childNodes[11].innerText)
    try{
        const response = await fetch('subOneQty', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'sectionS': sName,
              'nameS': bName,
              'qtyS': tqty
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}