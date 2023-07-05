function truncate(id){
    let postNo = id.at(-1);
    console.log(postNo)
    let span2 = document.querySelector(`#span${postNo}`)
    span2.classList.toggle("hidden")
    let btn = document.querySelector(`#button${postNo}`);
    if(btn.textContent == '....ReadMore') btn.textContent = 'ReadLess'
    else btn.textContent = '....ReadMore'
}