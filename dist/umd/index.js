(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.UploadClient = factory());
}(this, function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    var errors = {
        missing_api_key: "You must set an API key before uploading files",
        missing_provider_id: "You must set a 'providerId' in upload options",
        task_already_executed: "An upload task may only be started once",
        task_already_aborted: "Upload task already aborted, it can no longer start",
        task_no_files: "Property 'files' is missing or is an empty array",
        mismatch_length_signed_urls_and_files: "Something went wrong internally, please contact us",
        internal_error: "Something went wrong internally, please contact us",
        invalid_api_key: "API key doesn't match any application",
        invalid_provider_id: "Provider ID doesn't match any application providers",
        not_enough_uploads: "Not enough upload credits on this application to satisfy request"
    };
    var ServiceError = (function (_super) {
        __extends(ServiceError, _super);
        function ServiceError(code, e) {
            var _this = _super.call(this, errors[code]) || this;
            _this.name = "ServiceError";
            _this.code = code;
            _this.thrown = e;
            return _this;
        }
        return ServiceError;
    }(Error));

    var UploadBtnTask = (function () {
        function UploadBtnTask(opts) {
            var _this = this;
            this.abort = false;
            this.executed = false;
            this.start = function () { return __awaiter(_this, void 0, Promise, function () {
                var _a, files, providerId, progress_1, signResponse, uploadedFiles, _loop_1, this_1, i, state_1, e_1;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 6, , 7]);
                            _a = this.opts, files = _a.files, providerId = _a.providerId;
                            this.log("UploadClient: Init Task");
                            this.check();
                            this.executed = true;
                            this.log("UploadClient: Start progress");
                            progress_1 = {
                                totalBytes: files.reduce(function (a, f) { return a + f.file.size; }, 0),
                                loadedBytes: 0,
                                loadedPercent: 0,
                                filesBytes: files.map(function (f) { return f.file.size; }),
                                filesLoadedBytes: files.map(function () { return 0; }),
                                filesLoadedPercent: files.map(function () { return 0; }),
                            };
                            this.progress(__assign(__assign({}, progress_1), { filesBytes: __spreadArrays(progress_1.filesBytes), filesLoadedBytes: __spreadArrays(progress_1.filesLoadedBytes), filesLoadedPercent: __spreadArrays(progress_1.filesLoadedPercent) }));
                            this.log("UploadClient: Get signed URLS");
                            return [4, this.getSignedUrls({
                                    apiKey: this.opts.apiKey,
                                    providerId: providerId,
                                    files: files.map(function (f) { return ({
                                        key: f.key || f.file.name,
                                        acl: f.acl,
                                        type: f.file.type,
                                    }); }),
                                })];
                        case 1:
                            signResponse = _b.sent();
                            if (signResponse.files.length !== files.length) {
                                throw new ServiceError("mismatch_length_signed_urls_and_files");
                            }
                            this.log("UploadClient: Upload files");
                            uploadedFiles = [];
                            _loop_1 = function (i) {
                                var file, key, acl, url, e_2;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (this_1.abort) {
                                                return [2, "break"];
                                            }
                                            file = files[i].file;
                                            key = signResponse.files[i].key;
                                            acl = signResponse.files[i].acl;
                                            url = signResponse.files[i].signedUrl;
                                            uploadedFiles[i] = {
                                                key: key,
                                                file: file,
                                                success: false,
                                                responseCode: 0,
                                                error: "",
                                            };
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 3, , 4]);
                                            this_1.log("UploadClient: Upload file", url, file);
                                            return [4, this_1.putObject({
                                                    url: url, acl: acl, file: file,
                                                    progressCallback: function (bytes, xhr) {
                                                        progress_1.filesLoadedBytes[i] = bytes;
                                                        progress_1.filesLoadedPercent[i] = (bytes / progress_1.filesBytes[i]) * 100;
                                                        progress_1.loadedBytes = progress_1.filesLoadedBytes.reduce(function (a, v) { return a + v; }, 0);
                                                        progress_1.loadedPercent = (progress_1.loadedBytes / progress_1.totalBytes) * 100;
                                                        if (_this.abort) {
                                                            xhr.abort();
                                                        }
                                                        else {
                                                            _this.progress(__assign(__assign({}, progress_1), { filesBytes: __spreadArrays(progress_1.filesBytes), filesLoadedBytes: __spreadArrays(progress_1.filesLoadedBytes), filesLoadedPercent: __spreadArrays(progress_1.filesLoadedPercent) }));
                                                        }
                                                    },
                                                })];
                                        case 2:
                                            _a.sent();
                                            uploadedFiles[i].success = true;
                                            uploadedFiles[i].responseCode = 200;
                                            return [3, 4];
                                        case 3:
                                            e_2 = _a.sent();
                                            if (this_1.abort) {
                                                uploadedFiles[i].error = "aborted";
                                                uploadedFiles[i].responseCode = e_2.status ? e_2.status : 0;
                                            }
                                            else if (e_2.status) {
                                                uploadedFiles[i].error = "failed_request";
                                                uploadedFiles[i].responseCode = e_2.status;
                                            }
                                            else {
                                                uploadedFiles[i].error = "could_not_initiate_request";
                                                console.log(e_2);
                                            }
                                            return [3, 4];
                                        case 4: return [2];
                                    }
                                });
                            };
                            this_1 = this;
                            i = 0;
                            _b.label = 2;
                        case 2:
                            if (!(i < files.length)) return [3, 5];
                            return [5, _loop_1(i)];
                        case 3:
                            state_1 = _b.sent();
                            if (state_1 === "break")
                                return [3, 5];
                            _b.label = 4;
                        case 4:
                            i++;
                            return [3, 2];
                        case 5: return [2, uploadedFiles];
                        case 6:
                            e_1 = _b.sent();
                            if (e_1 instanceof ServiceError) {
                                throw e_1;
                            }
                            throw new ServiceError("internal_error", e_1);
                        case 7: return [2];
                    }
                });
            }); };
            this.stop = function () {
                _this.abort = true;
            };
            this.onProgress = function (fn) {
                _this.progress = fn;
            };
            this.check = function () {
                var _a = _this.opts, apiKey = _a.apiKey, providerId = _a.providerId, files = _a.files;
                if (_this.executed) {
                    throw new ServiceError("task_already_executed");
                }
                if (_this.abort) {
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
            this.getSignedUrls = function (data) { return __awaiter(_this, void 0, Promise, function () {
                var response, responseData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, fetch(this.apiUrl, {
                                method: "POST",
                                mode: "cors",
                                cache: "no-cache",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(data),
                            })];
                        case 1:
                            response = _a.sent();
                            return [4, response.json()];
                        case 2:
                            responseData = _a.sent();
                            if (response.status !== 200) {
                                throw new ServiceError(responseData.code);
                            }
                            return [2, responseData];
                    }
                });
            }); };
            this.putObject = function (_a) {
                var url = _a.url, file = _a.file, acl = _a.acl, progressCallback = _a.progressCallback;
                return new Promise(function (resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                resolve(xhr);
                            }
                            else {
                                reject(xhr);
                            }
                        }
                    };
                    xhr.upload.onprogress = function (e) {
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
            this.log = function () {
                var d = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    d[_i] = arguments[_i];
                }
                if (_this.opts.log) {
                    console.log.apply(console, d);
                }
            };
            this.opts = opts;
            this.apiUrl = opts.isTest ?
                "http://localhost:3002/v1/signed-urls" :
                "https://upload-api.pathof.dev/v1/signed-urls";
            this.progress = function () { };
        }
        return UploadBtnTask;
    }());

    var UploadClient = (function () {
        function UploadClient(opts) {
            var _this = this;
            this.setApiKey = function (key) {
                _this.opts.apiKey = key;
            };
            this.upload = function (opts) {
                return new UploadBtnTask(__assign(__assign({}, _this.opts), opts));
            };
            this.opts = opts;
        }
        return UploadClient;
    }());

    return UploadClient;

}));
//# sourceMappingURL=index.js.map
