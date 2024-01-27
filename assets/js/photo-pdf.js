async function convertToPDF() {
    const fileInput = document.getElementById('fileInput');
    const pdfContainer = document.getElementById('pdfContainer');
    const resultText = document.getElementById('resultText');
    const loadingAnimation = document.getElementById('loadingAnimation');

    const file = fileInput.files[0];
    if (file) {
        resultText.innerText = 'Converting...'; // Menampilkan teks "Converting..." saat konversi sedang berlangsung
        loadingAnimation.style.display = 'inline-block'; // Menampilkan animasi loading

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async function (event) {
            const arrayBuffer = event.target.result;
            const pdfData = await generatePDF(arrayBuffer);
            const pdfObject = `<object width="100%" height="500" data="${pdfData}" type="application/pdf"></object>`;
            pdfContainer.innerHTML = pdfObject;
            resultText.innerText = 'Result'; // Menampilkan teks "Result" setelah konversi selesai
            loadingAnimation.style.display = 'none'; // Sembunyikan animasi loading setelah konversi selesai
            loadingAnimation.style.animation = 'none'; // Hentikan animasi loading
        };
    } else {
        alert('Please select an image file.');
    }
}

async function generatePDF(arrayBuffer) {
    const { PDFDocument, degrees } = PDFLib; // Perhatikan bahwa kami menggunakan PDFLib di sini
    const pdfDoc = await PDFDocument.create();
    const image = await pdfDoc.embedJpg(arrayBuffer);

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
