let parent = document.querySelector("#parent")
function randok(){
    const sample = "0123456789ABCDEF"
    let val = "#"
    for(let i = 0; i<6; i++){
        let idx = parseInt(Math.random()*16)
        val+=sample[idx]
    }
    return(val)
}
let func = function(){
    parent.style.backgroundColor = randok()
}
let del
document.querySelector("#start").addEventListener("click",()=>{
    if(del == null){
        del = setInterval(func,1500)
    }
})
document.querySelector("#stop").addEventListener("click",()=>{
    if(del != null){
        clearInterval(del)
        del = null
    }
})