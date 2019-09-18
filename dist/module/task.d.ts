import * as T from "./types";
export declare class UploadBtnTask {
    private readonly opts;
    private readonly apiUrl;
    private abort;
    private executed;
    private progress;
    constructor(opts: T.UploadBtnTaskOptions);
    start: () => Promise<T.UploadedFile[]>;
    stop: () => void;
    onProgress: (fn: T.ProgressCallback) => void;
    private check;
    private getSignedUrls;
    private putObject;
    private log;
}
