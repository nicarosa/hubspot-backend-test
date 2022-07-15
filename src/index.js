const myTableDraft = document.getElementById('draftTable')
const myTablePublished = document.getElementById('publishedTable')
const submitButton = document.getElementById('submitButton')
const updateButton = document.getElementById('updateButton')
const deleteButton = document.getElementById('deleteButton')
const publishButton = document.getElementById('publishButton')

const url = 'http://localhost:8080'

fetch(url + '/rows/draft')
    .then(response => response.json())
    .then(data => {
        data.forEach(row => {
            const contact = `<tr><th scope="row">` + row.id + `</th><td>` + row.values.name + `</td><td>` + row.values.last_name + `</td><td>` + row.values.document_id + `</td></tr>`
            myTableDraft.insertAdjacentHTML("beforeend", contact)
        })
    })

fetch(url + '/rows')
    .then(response => response.json())
    .then(data => {
        data.forEach(row => {
            const contact = `<tr><th scope="row">` + row.id + `</th><td>` + row.values.name + `</td><td>` + row.values.last_name + `</td><td>` + row.values.document_id + `</td></tr>`
            myTablePublished.insertAdjacentHTML("beforeend", contact)
        })
    })

submitButton.addEventListener('click', async _ => {

    if(document.getElementById("nameInput").value === "" || document.getElementById("lastNameInput").value === "" || document.getElementById("documentInput").value === ""){
        alert("The name, last name and document id fields must be provided to create")
    }else{
        try{
            const response = await fetch(url + '/rows/draft', {
                method: 'post',
                body: JSON.stringify({
                    name: document.getElementById("nameInput").value,
                    last_name: document.getElementById("lastNameInput").value,
                    document_id: document.getElementById("documentInput").value
                }),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json())
        }catch(err){
            console.error(err)
        }
    }
})

updateButton.addEventListener('click', async _ => {
    
    if(document.getElementById("nameInput").value === "" || document.getElementById("lastNameInput").value === "" || document.getElementById("documentInput").value === "" || document.getElementById("idInput").value === ""){
        alert("The name, last name, document id and ID fields must be provided to update")
    }else{
        try{      
            const response = await fetch(url + '/rows/draft/' + document.getElementById("idInput").value, {
                method: 'put',                                 
                body: JSON.stringify({
                    name: document.getElementById("nameInput").value,
                    last_name: document.getElementById("lastNameInput").value,
                    document_id: document.getElementById("documentInput").value              
                }),
                headers: {"Content-type": "application/json; charset=UTF-8"},             
            })
            .then(response => response.json())
        }catch(err){
            console.error(err)
        }
    }   
})

deleteButton.addEventListener('click', async _ => {

    if(document.getElementById("idInput").value === "" ){
        alert("The id must be provided to delete")
    }else{
        try{      
            const response = await fetch(url + '/rows/draft/' + document.getElementById("idInput").value, {
                method: 'delete',                                 
                headers: {"Content-type": "application/json; charset=UTF-8"},             
            })
            .then(response => response.json())
        }catch(err){
            console.error(err)
        }
    }
})

publishButton.addEventListener('click', async _ => {

    try{      
        const response = await fetch(url + '/rows', {
            method: 'put',                                 
            headers: {"Content-type": "application/json; charset=UTF-8"},             
        })
        .then(response => response.json())
    }catch(err){
        console.error(err)
    }

    window.location.reload()
})

