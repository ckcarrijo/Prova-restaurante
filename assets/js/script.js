let botaoAdicionar = document.querySelector('#botaoAdicionar')
botaoAdicionar.addEventListener('click', async function (e){
    e.preventDefault()
    let form = document.querySelector('.formAdd')

    let pessoa = receberValoresDoForm(form)

   let row 

   let imagemCodificada =  await converterParaBase64(pessoa.imagem)
    localStorage.setItem('imagem' , imagemCodificada)
    


   switch (pessoa.time){
    case 'fullStack':
        row = document.querySelector('.fullStack') 
        pessoa.corFundo = '#5cb85c'
        break
        case 'frontEnd':
            row = document.querySelector('.frontEnd') 
            pessoa.corFundo = '#0275d8'
            break
            case 'backEnd':
                row = document.querySelector('.backEnd') 
                pessoa.corFundo = '#f0ad4e'
                break
            case 'dataScience': 
            row = document.querySelector('.dataScience')   
            pessoa.corFundo = '#d9534f'
                break
            case 'mobile': 
            row = document.querySelector('.mobile') 
            pessoa.corFundo = '#333'
                break
            case 'uxEDesign':
                row = document.querySelector('.uxEDesign')   
                pessoa.corFundo = '#5dc0de'  
                break
   }
   row.appendChild(await adicionarCard(pessoa))

})
function receberValoresDoForm(form){
    let pessoa = {
        nome: form.nome.value,
        cargo: form.cargo.value,
        imagem: form.imagem.files[0],
        time: form.time.value
    }

    return pessoa 
}

function adicionarDescricao(pessoa){

    let nomePessoa = document.createElement('h4')
    nomePessoa.textContent = pessoa.nome
    nomePessoa.classList.add('text-center')
    nomePessoa.style.color = pessoa.corFundo

    let cargoPessoa = document.createElement('P')
    cargoPessoa.textContent = pessoa.cargo
    cargoPessoa.classList.add('text-center')
    cargoPessoa.style.color = pessoa.corFundo

    let figcaption = document.createElement('figcaption')
    figcaption.appendChild(nomePessoa)
    figcaption.appendChild(cargoPessoa)
    
    return figcaption
}
 async function montarCard(pessoa){
    let foto = document.createElement('img')

    let imagemCodificada = localStorage.getItem('imagem')
    foto.setAttribute('src', 'data:image/png;base64,' + imagemCodificada)
    foto.classList.add('rounded-circle')
    foto.classList.add('img-fluid')
    foto.classList.add('foto')

    let figure = document.createElement('figuere')
    figure.classList.add('card')
    figure.appendChild(adicionarDescricao(pessoa))
    figure.style.backgroundImage = 'linear-gradient(to top, white 60%, '+pessoa.corFundo+' 40%)'
    figure.appendChild(foto)
    return figure
}

 async function adicionarCard(pessoa){
    let card = await montarCard(pessoa)
   
    let coluna = document.createElement('div')
    coluna .classList.add('col-md-3')
    coluna.appendChild(card)
    
    return coluna    
}

async function converterParaBase64(imagem){
    return new Promise(resolve => {
        let reader = new FileReader()
        reader.readAsDataURL(imagem)
        reader.onload = function(){
            let imagemCodificada = reader.result.split(',')[1]
            resolve(imagemCodificada)
        }
    })
}
