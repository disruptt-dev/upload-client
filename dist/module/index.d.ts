import * as T from "./types";
import { UploadBtnTask } from "./task";
export default class UploadClient {
    private readonly opts;
    constructor(opts: T.UploadClientOpts);
    setApiKey: (key: string) => void;
    upload: (opts: T.UploadFunctionOpts) => UploadBtnTask;
}
