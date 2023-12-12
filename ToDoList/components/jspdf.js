import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function createPDF(task) {
    const pdfDoc = await PDFDocument.create();
  
    // Embed the Times Roman font
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
    // Add a blank page to the document
    const page = pdfDoc.addPage();
  
    // Get the width and height of the page
    const { width, height } = page.getSize();
  
    // Draw a string of text toward the top of the page
    const fontSize = 15;
  
    const textPDF = `ID Tarea: ${task.id} \n  
    Tarea: ${task.title} \n 
    Completada: ${task.isCompleted ? "Si" : "No"} 
    \n Fecha impresion: ${new Date().toLocaleString()}`;
  
    page.drawText(textPDF, {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: helveticaBoldFont,
      color: rgb(0, 0.53, 0.71),
    });
  
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
  
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    // Crear URL para el blob de arriba
    const urlBlob = URL.createObjectURL(blob);
  
    // Crear enlace descarga
    const enlacePdf = document.createElement("a");
    enlacePdf.href = urlBlob;
    enlacePdf.download = `${task.title.substring(
      0,
      4
    )}_${new Date().toLocaleDateString()}.pdf`;
  
    // Agregar enlace al DOM
    document.body.appendChild(enlacePdf);
    enlacePdf.click();
    enlacePdf.remove()
  }