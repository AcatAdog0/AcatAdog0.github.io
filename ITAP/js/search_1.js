/*
* @Author: 刘炎
* @Date:   2019-07-11 21:14:13
* @Last Modified by:   刘炎
* @Last Modified time: 2019-07-11 21:17:30
*/


$(document).on('keyup', '.searchValue', function () {
    searchValue(this);
});
 
 
function searchValue(input) {
 
    var searchValue = input.value.toLowerCase();
    var table = $("table").find("tbody tr");
    table.each(
        function () {
            // if(!searchValue)return false;
            var e = jQuery(this);
            var eValue = e.text().toLowerCase();
            if (!eValue.match(searchValue)) {
                e.hide();
            }
            else {
                e.show()
            }
        }
    );
 
};
