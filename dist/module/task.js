var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ServiceError } from "./errors";
export class UploadBtnTask {
    constructor(opts) {
        this.abort = false;
        this.executed = false;
        this.start = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { files, providerId } = this.opts;
                this.log("UploadClient: Init Task");
                this.check();
                this.executed = true;
                this.log("UploadClient: Start progress");
                const progress = {
                    totalBytes: files.reduce((a, f) => a + f.file.size, 0),
                    loadedBytes: 0,
                    loadedPercent: 0,
                    filesBytes: files.map((f) => f.file.size),
                    filesLoadedBytes: files.map(() => 0),
                    filesLoadedPercent: files.map(() => 0),
                };
                this.progress(Object.assign(Object.assign({}, progress), { filesBytes: [...progress.filesBytes], filesLoadedBytes: [...progress.filesLoadedBytes], filesLoadedPercent: [...progress.filesLoadedPercent] }));
                this.log("UploadClient: Get signed URLS");
                const signResponse = yield this.getSignedUrls({
                    apiKey: this.opts.apiKey,
                    providerId: providerId,
                    files: files.map((f) => ({
                        key: f.key || f.file.name,
                        acl: f.acl,
                        type: f.file.type,
                    })),
                });
                if (signResponse.files.length !== files.length) {
                    throw new ServiceError("mismatch_length_signed_urls_and_files");
                }
                this.log("UploadClient: Upload files");
                const uploadedFiles = [];
                for (let i = 0; i < files.length; i++) {
                    if (this.abort) {
                        break;
                    }
                    const file = files[i].file;
                    const key = signResponse.files[i].key;
                    const acl = signResponse.files[i].acl;
                    const url = signResponse.files[i].signedUrl;
                    uploadedFiles[i] = {
                        key: key,
                        file: file,
                        success: false,
                        responseCode: 0,
                        error: "",
                    };
                    try {
                        this.log("UploadClient: Upload file", url, file);
                        yield this.putObject({
                            url, acl, file,
                            progressCallback: (bytes, xhr) => {
                                progress.filesLoadedBytes[i] = bytes;
                                progress.filesLoadedPercent[i] = (bytes / progress.filesBytes[i]) * 100;
                                progress.loadedBytes = progress.filesLoadedBytes.reduce((a, v) => a + v, 0);
                                progress.loadedPercent = (progress.loadedBytes / progress.totalBytes) * 100;
                                if (this.abort) {
                                    xhr.abort();
                                }
                                else {
                                    this.progress(Object.assign(Object.assign({}, progress), { filesBytes: [...progress.filesBytes], filesLoadedBytes: [...progress.filesLoadedBytes], filesLoadedPercent: [...progress.filesLoadedPercent] }));
                                }
                            },
                        });
                        uploadedFiles[i].success = true;
                        uploadedFiles[i].responseCode = 200;
                    }
                    catch (e) {
                        if (this.abort) {
                            uploadedFiles[i].error = "aborted";
                            uploadedFiles[i].responseCode = e.status ? e.status : 0;
                        }
                        else if (e.status) {
                            uploadedFiles[i].error = `failed_request`;
                            uploadedFiles[i].responseCode = e.status;
                        }
                        else {
                            uploadedFiles[i].error = `could_not_initiate_request`;
                            console.log(e);
                        }
                    }
                }
                return uploadedFiles;
            }
            catch (e) {
                if (e instanceof ServiceError) {
                    throw e;
                }
                throw new ServiceError("internal_error", e);
            }
        });
        this.stop = () => {
            this.abort = true;
        };
        this.onProgress = (fn) => {
            this.progress = fn;
        };
        this.check = () => {
            const { apiKey, providerId, files } = this.opts;
            if (this.executed) {
                throw new ServiceError("task_already_executed");
            }
            if (this.abort) {
                throw new ServiceError("task_already_aborted");
            }
            if (!apiKey) {
                throw new ServiceError("missing_api_key");
            }
            if (!providerId) {
                throw new ServiceError("missing_provider_id");
            }
            if (!files || !files.length || files.length === 0) {
                throw new ServiceError("task_no_files");
            }
        };
        this.getSignedUrls = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.apiUrl, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const responseData = yield response.json();
            if (response.status !== 200) {
                throw new ServiceError(responseData.code);
            }
            return responseData;
        });
        this.putObject = ({ url, file, acl, progressCallback }) => {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(xhr);
                        }
                        else {
                            reject(xhr);
                        }
                    }
                };
                xhr.upload.onprogress = (e) => {
                    if (e.lengthComputable) {
                        progressCallback(e.loaded, xhr);
                    }
                };
                xhr.open("PUT", url);
                xhr.setRequestHeader("Content-Type", file.type);
                if (acl) {
                    xhr.setRequestHeader("x-amz-acl", acl);
                }
                xhr.send(file);
            });
        };
        this.log = (...d) => {
            if (this.opts.log) {
                console.log(...d);
            }
        };
        this.opts = opts;
        this.apiUrl = opts.isTest ?
            "http://localhost:3002/v1/signed-urls" :
            "https://upload-api.pathof.dev/v1/signed-urls";
        this.progress = () => { };
    }
}
//# sourceMappingURL=task.js.map