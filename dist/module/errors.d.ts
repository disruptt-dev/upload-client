export declare const errors: {
    missing_api_key: string;
    missing_provider_id: string;
    task_already_executed: string;
    task_already_aborted: string;
    task_no_files: string;
    mismatch_length_signed_urls_and_files: string;
    internal_error: string;
    invalid_api_key: string;
    invalid_provider_id: string;
    not_enough_uploads: string;
};
export declare class ServiceError extends Error {
    code: string;
    thrown?: Error;
    constructor(code: keyof typeof errors, e?: Error);
}
