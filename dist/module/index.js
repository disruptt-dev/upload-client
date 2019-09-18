import { UploadBtnTask } from "./task";
export default class UploadClient {
    constructor(opts) {
        this.setApiKey = (key) => {
            this.opts.apiKey = key;
        };
        this.upload = (opts) => {
            return new UploadBtnTask(Object.assign(Object.assign({}, this.opts), opts));
        };
        this.opts = opts;
    }
}
//# sourceMappingURL=index.js.map