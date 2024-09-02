import mammoth from "mammoth";

export class DocxReader {
  /** DocxParser */
  async loadDataAsContent(fileContent: Uint8Array): Promise<string> {
    // Note: await mammoth.extractRawText({ arrayBuffer: fileContent });  is not working
    // So we need to convert to Buffer first
    const buffer = Buffer.from(fileContent);
    const { value } = await mammoth.extractRawText({ buffer });
    return value
  }
}
