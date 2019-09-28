
export interface InputFile {
  file: File;
  key?: string;
  acl?: string;
}
export interface UploadedFile {
  key: string;
  file: File;
  responseCode?: number;
  errorCode?: string;
}

export interface TaskUploadProgress {
  totalBytes: number;
  loadedBytes: number;
  loadedPercent: number;
  filesLoadedPercent: number[];
  filesLoadedBytes: number[];
  filesBytes: number[];
}
export type ProgressCallback = (p: TaskUploadProgress) => void;

export interface UploadClientOpts {
  apiKey: string;
  log?: boolean;
}
export interface UploadFunctionOpts {
  files: InputFile[];
  providerId: string;
  throwUploadError?: boolean;
}
export type UploadBtnTaskOptions = UploadClientOpts & UploadFunctionOpts;

export interface APIGetSignedUrlsReq {
  apiKey: string;
  providerId: string;
  files: Array<{
    key: string;
    type: string;
    acl?: string;
  }>;
}
export interface APIGetSignedUrlsRes {
  files: Array<{
    signedUrl: string;
    key: string;
    acl?: string;
  }>;
}

export interface APIPutObjectReq {
  url: string;
  file: File;
  acl?: string;
  progressCallback: (bytes: number, xhr: XMLHttpRequest) => void;
}