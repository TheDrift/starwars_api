const base_url = 'https://swapi.dev/api/'
const $prev = document.querySelector('.prev')
const $next = document.querySelector('.next')
const $container = document.querySelector('.container')
const $wrapper = document.querySelector('.wrapper')
const $currentPage = document.querySelector('.currentPage')
const $page = document.querySelector('.page')
let currentPage = 1
let pages = 9
window.addEventListener('load' , () =>{
  getURl(`${base_url}people/` , 'page=1' , cb =>{
    cardTemplate(cb.results)
  })
})
function getURl(url , query, cb){
  fetch(`${url}?${query}`)
  .then(r => r.json())
  .then(res =>{cb(res)})
}
function cardTemplate(base){
  const card = base.map(({name, url}) =>{
    return ` 
      <div class="card">
        <div class="card-header">
        ${name}
        </div>
        <img src="https://lumiere-a.akamaihd.net/v1/images/og-generic_02031d2b.png?region=0%2C0%2C1200%2C1200" class="card-image"/>
        <div card-button> 
          <button type="submit" class="btn-submit" onclick="getInfo('${url}')" > Море </button>
        </div>
      </div>
    `
  }).join('')
  $wrapper.innerHTML = card
}
$prev.addEventListener('click', e =>{
  e.preventDefault()
  if(currentPage <= 1){
  }
  currentPage--
  getURl(`${base_url}people/` ,`page=${currentPage}`, cb =>{
    cardTemplate(cb.results)
  })
})
$next.addEventListener('click' , e =>{
  e.preventDefault()
  currentPage++
  
  getURl(`${base_url}people/` ,`page=${currentPage}`, cb =>{
    cardTemplate(cb.results)
  })
})
function getInfo(url){
  getURl(url, '', cb =>{
    $container.innerHTML = `
      <button onclick='back()' class='back'>Иди домой</button>
      <div class="about">
        <div class="about_wrapper">
          <h1>Имя:${cb.name}</h1>
          <h3>Насколько высок:${cb.height}</h3>
          <h3>Насколько жирний:${cb.mass}</h3>
          <h3>Джендер:${cb.gender}</h3>
          <h3>Цвет волос:${cb.hair_color}</h3>
          <h3>Цвет кожи:${cb.skin_color}</h3>
          <h3>Цвет глаз:${cb.eye_color}</h3>
        </div>
      </div>
    `
  })
}
function back(){
  window.location.reload()
}