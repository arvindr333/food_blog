let imgs=["images/slider1.jpg","images/slider2.jpg","images/slider3.jpg"];
let i=0;
setInterval(()=>{let s=document.getElementById("slide"); if(s){s.src=imgs[i];i=(i+1)%imgs.length;}},3000);
function searchFood(){
let input=document.getElementById("search").value.toLowerCase();
let cards=document.getElementsByClassName("card");
for(let c of cards){
let title=c.innerText.toLowerCase();
c.style.display=title.includes(input)?"block":"none";
}}