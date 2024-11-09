let container = document.getElementsByClassName("container")[0]
let btn = document.querySelector("button");
let input = document.querySelector(".input");


btn.addEventListener("click", () => {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    if (data.length === 0) {
        alert("No Data Available");
        displaydata(data);
    } else {
        let result = data.filter(obj => obj["category"] === input.value);
        displaydata(result);
    }
})

// input.addEventListener("input" ,() =>{
//         let data = JSON.parse(localStorage.getItem("data")) || [];
//         if(data.length == 0){
//             alert("no items to display");
//             displaydata(data);
//         }
//         else{
//             let result = data.filter(product => product["category"].toLoweCase().includes(input.value.toLowerCase()));
//             displaydata(result);
//         }
    
// });
async function  getdata(){
    let response = await fetch('https://fakestoreapi.com/products')
    let data =await response.json();
    localStorage.setItem("data",JSON.stringify(data));
    displaydata(data);
}
function displaydata(data){
    container.innerHTML="";
    if(data.length == 0){
        console.log("no items to display")
    }
    else{
        data.forEach((ele,index) => {
            let div=document.createElement("div");
            div.className="item"
            div.innerHTML = `
                <p><img src="${ele["image"]}">
                <p><b>ID:</b>${ele["id"]}</p>
                <p><b>TITLE:</b>${ele["title"]}</p>
                <p><b>PRICE:</b>${ele["price"]}</p>
                <p><b>DESCIPTION:</b>${ele["description"]}</p>
                <p><b>CATEGORY:</b>${ele["category"]}</p>  
            `
            let button = document.createElement("button");
            button.textContent = "Delete";
            button.className="delete"
            button.onclick = () => {
                deletedata(index);
            }
            div.appendChild(button);
            container.appendChild(div);

        });
    }

}
function deletedata(index){
    let element = JSON.parse(localStorage.getItem("data")) || [];
    element.splice(index,1)
    localStorage.setItem("data",JSON.stringify(element));
    displaydata(element);
}
getdata();