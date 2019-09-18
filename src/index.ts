import * as T from "./types";
import { UploadBtnTask } from "./task";

export default class UploadClient {

  private readonly opts: T.UploadClientOpts;

  constructor(opts: T.UploadClientOpts) {
    this.opts = opts;
  }

  setApiKey = (key: string) => {
    this.opts.apiKey = key;
  }

  upload = (opts: T.UploadFunctionOpts) => {
    return new UploadBtnTask({
      ...this.opts,
      ...opts,
    });
  }

}
