/* SEARCH */
export default function search() {
    // Declare variables
    var key, filter, table, tr, td, i, j;
    key = document.getElementById("key");
    filter = key.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            let tdata = td[j];
            if (tdata) {
                if (tdata.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

function triggerClick() {
    document.querySelector("#profileImg").click();
}
function displayImg(e) {
    if (e.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document
                .querySelector("#profileDisplay")
                .setAttribute("src", e.target.result);
        };
        reader.readAsDataURL(e.files[0]);
    }
}
