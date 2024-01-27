async function convertToPDF() {
    const fileInput = document.getElementById('fileInput');
    const pdfContainer = document.getElementById('pdfContainer');
    const resultText = document.getElementById('resultText');
    const loadingAnimation = document.getElementById('loadingAnimation');

    const file = fileInput.files[0];
    if (file) {
        resultText.style.display = "block";
        resultText.innerText = 'Converting...'; // Menampilkan teks "Converting..." saat konversi sedang berlangsung
        loadingAnimation.style.display = 'inline-block'; // Menampilkan animasi loading
        const type = detectImageFormat(file);
        setTimeout(async function () {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = async function (event) {
                const arrayBuffer = event.target.result;
                const pdfData = await generatePDF(arrayBuffer, type);
                const pdfObject = `<object width="100%" height="500" data="${pdfData}" type="application/pdf"></object>`;
                pdfContainer.style.display = "block";
                pdfContainer.innerHTML = pdfObject;
                resultText.style.display = "block";
                resultText.innerText = 'Result'; // Menampilkan teks "Result" setelah konversi selesai
                loadingAnimation.style.display = 'none'; // Sembunyikan animasi loading setelah konversi selesai
            };
        }, 1000); // Menunda eksekusi fungsi berikutnya selama 3 detik (3000 milidetik)
    } else {
        alert('Please select an image file.');
    }
}


async function generatePDF(arrayBuffer, type) {
    const { PDFDocument, degrees } = PDFLib; // Perhatikan bahwa kami menggunakan PDFLib di sini
    const pdfDoc = await PDFDocument.create();
    let image;

    if (type == "image/png") {
        image = await pdfDoc.embedPng(arrayBuffer);
    }
    else {
        image = await pdfDoc.embedJpg(arrayBuffer);
    }

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    page.drawImage(image, {
        x: 0,
        y: 0,
        width: width,
        height: height,
        rotate: degrees(0),
    });

    const pdfBytes = await pdfDoc.save();
    return URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
}

function detectImageFormat(file) {
    const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];

    if (file && allowedFormats.includes(file.type)) {
        return file.type;
    } else {
        return alert("Mohon Input Gambar JPG/PNG"), window.location.reload();
        // Format tidak didukung atau tidak ada file yang diunggah
    }
}


async function cancelPdf() {
    document.getElementById("pdfContainer").style.display = "none";
    document.getElementById("resultText").style.display = "none";
    document.getElementById('loadingAnimation').style.display = "none";
}