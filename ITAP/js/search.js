/*
* @Author: 刘炎
* @Date:   2019-07-10 21:54:43
* @Last Modified by:   刘炎
* @Last Modified time: 2019-07-11 11:06:24
*/
function myFunction() {
  // 声明变量
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");
  rows = table.rows;

  // 循环表格每一行，查找匹配项
  for (i = 0; i < tr.length; i++) {
  	for(j = 0; j < rows[i].cells.length; j++)
  	{
  		//td = rows[i].cells[j];
  	 

  		td = tr[i].getElementsByTagName("td")[0];

    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";

      } else {
        tr[i].style.display = "none";
      }
    }
    }
}

}


  