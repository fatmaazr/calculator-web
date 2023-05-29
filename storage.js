const CACHE_KEY = "calculation_history";

function checkForStorage() {
    return typeof(Storage) !== "undefined"
}

function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        } //JSON.parse untuk mengubah nilai objek menjadi string kembali pada bentuk objek javaScript
  
        historyData.unshift(data);
  
        if (historyData.length > 5) {
            historyData.pop();
        }
  
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    } //JSON.stringify untuk mengubah objek JavaScript ke dalam bentuk String.
}

//JSON adalah JavaScript Object Notation
//unshift() untuk menambahkan nilai baru pada array yang ditempatkan pada awal index
//pop() untuk untuk menghapus nilai index terakhir pada array, sehingga ukuran array historyData tidak akan pernah lebih dari 5

function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
} //untuk mendapatkan data dari localStorage. Fungsi ini mengembalikan nilai array dari localStorage jika sudah memiliki nilai sebelumnya melalui JSON.parse(). Namun jika localStorage masih kosong, fungsi ini akan mengembalikan nilai array kosong.

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");
  
  
    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";
  
  
    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";
  
  
        historyList.appendChild(row);
    }
} //untuk merender data riwayat kalkulasi pada tabel HTML

renderHistory();