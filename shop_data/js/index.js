class Shop{
    constructor(){
     this.tBady=document.querySelector("tbody");
     this.init();
    }
    init(){
        this.tBady.onclick=(e)=>{
           let target = e.target;
           let tr =e.target.parentNode.parentNode;
           let classList=Array.from(target.classList);
           if(classList.includes("btn-edit")){
               this.editClick(tr);
           }else if(classList.includes("btn-del")){
               this.delClick(tr);
           }else if(classList.includes("btn-ok")){
            this.okClick(tr);
           }else if(classList.includes("btn-cancel")){
            this.cancelClick(tr);
           }
        }
    }
   editClick(tr){
       
      Array.from(tr.querySelectorAll("span")).forEach(span =>{
          //把span的值赋给他的兄弟节点
          span.nextElementSibling.value=span.innerHTML;
      })
      //给tr 加上edit
     tr.classList.add("edit");
   }


   delClick(tr){
    if(confirm("确定要删除嘛？")){
        let id=tr.getAttribute("data-id");
        tools.ajaxGetPromise("api/v1/delete.php",{id}).then(data=>{
            console.log(data)
            if(data.res_conde == 1){
                alert(data.res_message);
                // 后台数据操作完成，前端重新获取
                //tr.remove()
                getShop.init();
              }else{
                alert(data.res_message);
              }
         })
       }
    //    tr.remove();
   }

   okClick(tr){
    // Array.from(tr.querySelectorAll("span")).forEach(span =>{
    //     span.innerHTML=span.nextElementSibling.value;
    // })
    // tr.classList.remove("edit");
    let inputPrice = tr.querySelector(".inputPrice"),
        inputNum = tr.querySelector(".inputNum"),
        id = tr.getAttribute("data-id"),
        price = inputPrice.value,
        num = inputNum.value;
        console.log(num)
    tools.ajaxGetPromise("api/v1/ok.php",{id,price,num}).then(data =>{
        tr.classList.remove("edit");
        alert(data.res_message);
        if(data.res_code === 1){
          inputPrice.previousElementSibling.innerHTML = inputPrice.value;
          inputNum.previousElementSibling.innerHTML = inputNum.value;
          
        }
    })

   }


   cancelClick(tr){
    tr.classList.remove("edit");
   }

}
new Shop();