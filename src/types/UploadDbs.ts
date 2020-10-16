export default class UploadDbs {
  public uploadDir?: string;
  public patientId?: string;
  public fileId?: string;
  public fileType?: string;
  public rawData?: string;
  public encoding?: string;
  public version?: number;

  public get fileName(): string {
    if (this.version) return `${this.patientId}_${this.fileId}_${this.version}`;
    return `${this.patientId}_${this.fileId}`;
  }

  public get filePath(): string {
    return `${this.uploadDir}/${this.fileName}${this.fileType}`;
  }
}
