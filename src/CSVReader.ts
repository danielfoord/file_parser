import type { ParseConfig } from "papaparse";
import Papa from "papaparse";

/**
 * papaparse-based csv parser
 * @class CSVReader
 * @implements BaseReader
 */
export class PapaCSVReader {
  private concatRows: boolean;
  private colJoiner: string;
  private rowJoiner: string;
  private papaConfig?: ParseConfig;

  /**
   * Constructs a new instance of the class.
   * @param {boolean} [concatRows=true] - whether to concatenate all rows into one document.If set to False, a Document will be created for each row.True by default.
   * @param {string} [colJoiner=', '] - Separator to use for joining cols per row. Set to ", " by default.
   * @param {string} [rowJoiner='\n'] - Separator to use for joining each row.Only used when `concat_rows=True`.Set to "\n" by default.
   */
  constructor(
    concatRows: boolean = true,
    colJoiner: string = ", ",
    rowJoiner: string = "\n",
    papaConfig?: ParseConfig,
  ) {
    this.concatRows = concatRows;
    this.colJoiner = colJoiner;
    this.rowJoiner = rowJoiner;
    this.papaConfig = papaConfig;
  }

  /**
   * Loads data from csv files
   * @param {string} file - The path to the file to load.
   * @param {GenericFileSystem} [fs=DEFAULT_FS] - The file system to use for reading the file.
   * @returns {Promise<Document[]>}
   */
  async loadDataAsContent(fileContent: Uint8Array): Promise<string> {
    const decoder = new TextDecoder("utf-8");
    const fileContentString = decoder.decode(fileContent);
    const result = Papa.parse(fileContentString, this.papaConfig);
    const textList = result.data.map((row: any) => {
      // Compatible with header row mode
      const rowValues = Object.values(row).map((value) => String(value));
      return rowValues.join(this.colJoiner);
    });

    if (this.concatRows) {
      return textList.join(this.rowJoiner)
    } else {
      return textList.map((text) => text);
    }
  }
}
