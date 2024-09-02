/**
 * Read the text of a PDF
 */
export class PDFReader extends FileReader {
  async loadDataAsContent(content: Uint8Array): Promise<string> {
    // XXX: create a new Uint8Array to prevent "Please provide binary data as `Uint8Array`, rather than `Buffer`." error if a Buffer passed
    if (content instanceof Buffer) {
      content = new Uint8Array(content);
    }
    const { totalPages, text } = await readPDF(content);
    return text.join('')
  }
}

async function readPDF(data: Uint8Array): Promise<{
  totalPages: number;
  text: string[];
}> {
  const { extractText } = await import("unpdf");
  return (await extractText(data)) as {
    totalPages: number;
    text: string[];
  };
}
