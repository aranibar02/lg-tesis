function renderFilterMenu(filters){
    let column = 0;
    let row = 0;
    const contentHtml =  filters.map((item) => {
        return `<input type="hidden" id=columCategori>`
    }).join(" ");
} 


html += '<input type="hidden" id="ColumCategoria_'+id+'" value="'+value.productTypeId+'">';
html += '<li class="itemmenu '+value.productTypeId+' grid" id="'+id+'_Inicio" column="1" row="'+id+'" data-type="'+value.productTypeId+'">';
html += '   <img class="item-background" src="'+value.photo+'" style="display: none;">'
html += '   <div class="item" >';
html += '       <p>'+value.name+'</p>'
html += '   </div>';
html += '</li>';