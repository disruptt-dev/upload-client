
export const errors = {
  // Client errors
  missing_api_key: "You must set an API key before uploading files",
  missing_provider_id: "You must set a 'providerId' in upload options",
  task_already_executed: "An upload task may only be started once",
  task_already_aborted: "Upload task already aborted, it can no longer start",
  task_no_files: "Property 'files' is missing or is an empty array",
  mismatch_length_signed_urls_and_files: "Something went wrong internally, contact us",
  internal_error: "Something went wrong with our service, contact us",
  // Server errors
  invalid_api_key: "API key doesn't match any services",
  invalid_provider_id: "Provider ID doesn't match any service providers",
  not_enough_uploads: "Not enough upload credits on this service",
  // Upload errors
  upload_aborted: "The upload request was aborted",
  upload_failed: "One or more files failed to upload due to a network error or an error HTTP response code",
  upload_could_not_initiate: "The upload request for one or more files failed, likely due to mis-configured CORS",
};

export class ServiceError extends Error {
  code: string;
  thrown?: Error;
  constructor(code: keyof typeof errors, e?: Error) {
    super(errors[code]);
    this.name = "UploadServiceError";
    this.code = code;
    this.thrown = e;
  }
}
