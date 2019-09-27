export const errors = {
    missing_api_key: "You must set an API key before uploading files",
    missing_provider_id: "You must set a 'providerId' in upload options",
    task_already_executed: "An upload task may only be started once",
    task_already_aborted: "Upload task already aborted, it can no longer start",
    task_no_files: "Property 'files' is missing or is an empty array",
    mismatch_length_signed_urls_and_files: "Something went wrong internally, contact us",
    internal_error: "Something went wrong internally, contact us",
    invalid_api_key: "API key doesn't match any services",
    invalid_provider_id: "Provider ID doesn't match any service providers",
    not_enough_uploads: "Not enough upload credits on this service"
};
export class ServiceError extends Error {
    constructor(code, e) {
        super(errors[code]);
        this.name = "ServiceError";
        this.code = code;
        this.thrown = e;
    }
}
//# sourceMappingURL=errors.js.map