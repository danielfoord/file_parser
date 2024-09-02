/**
 * Read a .txt file
 */

export class TextFileReader {
  async loadDataAsContent(fileContent: Uint8Array): Promise<string> {
    const decoder = new TextDecoder("utf-8");
    const dataBuffer = decoder.decode(fileContent);
    return dataBuffer;
  }
}
