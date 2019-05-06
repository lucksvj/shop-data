 class SelectList{
     constructor(tbody){
        this.tbody=document.querySelector(tbody);
      // 默认为第一页
         this.pageIndex =1;
         Object.defineProperty(this,"count",{
         writable:false,
         value:5
        });
        // 默认总页数为1；
        this.pageCount= 1;
        this.init();
     }
     init () {
     let {pageIndex, count} = this; //解构赋值
     console.log({pageIndex, count} )
      tools.ajaxGetPromise("api/v1/select.php",{pageIndex,count}).then(data => {
        if(data.res_code === 1){
          this.render(data.res_body.data);
          this.pageCount = data.res_body.pageCount;
          console.log(this.pageCount)
          pagination.render(this);
         
        // 把整个selectList实例传递过去
        }else{
          // 查询失败的话弹出失败信息
          alert(data.res_message);
        }
      })
    }
  
     render(list){
      let html="";
      list.forEach((shop,index)=>{
       html+= `<tr data-id="${shop.id}">
        <td>${(this.pageIndex-1)*this.count + index + 1}</td>
        <td>${shop.name}</td>
        <td>
          <span>${shop.price}</span>
          <input type="text" class="inputPrice">
        </td>
        <td>
          <span>${shop.num}</span>
          <input type="text" class="inputNum">
        </td>
        <td>
          <button type="button" class="btn btn-xs btn-edit btn-success">编辑</button>
          <button type="button" class="btn btn-xs btn-del btn-danger">删除</button>
          <button type="button" class="btn btn-xs btn-ok btn-info">确定</button>
          <button type="button" class="btn btn-xs btn-cancel btn-warning">取消</button>
        </td>
      </tr>`;
      });
      this.tbody.innerHTML = html;
     }
 }
 let getShop = new SelectList("#tbody");
