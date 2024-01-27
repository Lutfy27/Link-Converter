let hasil = "";
function generateThumbnail() {
    var fileUrl = document.getElementById("fileUrl").value;
    var fileId = getFileId(fileUrl);
    var thumbnailUrl = "https://drive.google.com/thumbnail?id=" + fileId;
    document.getElementById("thumbnailUrl").value = thumbnailUrl;
}

document.getElementById("fileUrl").addEventListener("input", function () {
    var fileUrl = this.value;
    var fileId = getFileId(fileUrl);
});

function getFileId(url) {
    var startIndex = url.indexOf("/d/") + 3;
    var endIndex = url.indexOf("/view");
    var result = url.substring(startIndex, endIndex);
    var thumbnailUrl = "https://drive.google.com/thumbnail?id=" + result + "&sz=w1000";
    document.getElementById("thumbnailUrl").value = thumbnailUrl;
    hasil = thumbnailUrl;
    var sendToImg = document.getElementById("image");
    sendToImg.src = thumbnailUrl;
}

function getExampleLink() {
    var getExLnk = document.getElementById("fileUrl").value = 'https://drive.google.com/file/d/1n4J1muP-qU_p_cCu4b8z5TWxwbV1vRT0/view?usp=drive_link';
    getFileId(getExLnk);
}

var textarea; // Variabel untuk menyimpan referensi textarea
function copyToClipboard() {
    if (!textarea) {
        // Buat elemen textarea baru jika belum ada
        textarea = document.createElement("textarea");
        // Tambahkan ke body dokumen
        document.body.appendChild(textarea);
    }

    textarea.style.display = 'block';
    // Masukkan teks yang ingin disalin ke dalam textarea
    textarea.value = hasil;
    // Seleksi teks dalam textarea
    textarea.select();

    try {
        var successful = document.execCommand('copy');
        // Sembunyikan textarea dari tampilan pengguna
        textarea.style.display = 'none';
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
        if (successful) {
            alert("URL copied to clipboard!");
        } else {
            alert("Unable to copy. Please try again or use alternative method.");
        }
    } catch (err) {
        console.error('Unable to copy to clipboard: ', err);
        alert("Error copying to clipboard. Please try again or use alternative method.");
    }
}