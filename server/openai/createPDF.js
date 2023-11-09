const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const path = require("path");
const fs = require("fs");

// LATEST
const createPDF = async (user_id, response) => {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  let currentPage = pdfDoc.addPage();
  const { width, height } = currentPage.getSize();

  const fontSize = 11;
  const lineHeight = 12;
  const spaceHeight = 6;
  let y = height - 50;
  const maxLineWidth = width - 100;

  const font = timesRomanFont;
  const color = rgb(0, 0, 0);

  const paragraphs = response.split("%%%%%");

  for (let i = 0; i < paragraphs.length; i++) {
    const words = paragraphs[i].split(" ");
    let line = "";
    for (let j = 0; j < words.length; j++) {
      const testLine = line + words[j] + " ";
      const lineWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (lineWidth > maxLineWidth) {
        currentPage.drawText(line, {
          x: 50,
          y,
          size: fontSize,
          font,
          color,
          maxWidth: maxLineWidth,
        });
        line = words[j] + " ";
        y -= lineHeight;

        if (y <= 50) {
          currentPage = pdfDoc.addPage();
          y = height - 50;
        }
      } else {
        line = testLine;
      }
    }
    currentPage.drawText(line, {
      x: 50,
      y,
      size: fontSize,
      font,
      color,
      maxWidth: maxLineWidth,
    });
    y -= lineHeight;
    y -= spaceHeight;

    if (y <= 50) {
      currentPage = pdfDoc.addPage();
      y = height - 50;
    }
  }

  const pdfBytes = await pdfDoc.save();

  const directoryPath = path.join(
    __dirname,
    "../assets_summary",
    `${user_id}_summary.pdf`
  );
  fs.writeFileSync(directoryPath, pdfBytes);
};

module.exports = { createPDF };
