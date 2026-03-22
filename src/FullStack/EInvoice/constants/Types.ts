import { BUYER_TYPE_CHOICES,
    DOCUMENT_TYPE_CHOICES,
    EINVOICE_STATUS_CHOICES, E_INVOICE_ENVIRONMENT_CHOICES, 
    PAYMENT_MODE_CHOICES, 
    SUPPLY_TYPE_CHOICES} from "./Options";










// ---- LHDN CLASSIFICATION CODE ----

export type LHDNClassificationCode = {
    id: number;
    code: string;
    description: string;
};








// ---- E-INVOICE SUBMISSION ----------------------------BEGIN------------------------------------

export type EInvoiceSubmission = {
    id: number;
    document_type: string;
    internal_document_reference: string;
    lhdn_uuid: string;
    lhdn_long_uid: string;
    lhdn_submission_uid: string;
    status: typeof EINVOICE_STATUS_CHOICES[number];
    environment: typeof E_INVOICE_ENVIRONMENT_CHOICES[number];
    validation_errors: string | null;
    error_details: string | null;
    cancellation_reason: string | null;
    cancelled_at: string | null;
    rejection_reason: string | null;
    rejected_at: string | null;
    submitted_at: string | null;
    status_last_checked: string | null;
    retry_count: number;
    date_created: string;
    validation_url: string | null;
};

export type EInvoiceSubmitResponse = {
    message: string;
    submission_uid: string;
    lhdn_uuid: string;
    status: string;
};

export type TINValidationResponse = {
    message: string;
};

export type TestCredentialsResponse = {
    message: string;
};


export type EInvoiceCancelRequest = {
    reason: string;
};




export type EInvoiceSubmitButtonProps = {
    documentType: typeof DOCUMENT_TYPE_CHOICES[number];
    documentId: number;
    einvoiceStatus: typeof EINVOICE_STATUS_CHOICES[number];
    einvoiceEnabled: boolean;
    onSubmitSuccess: () => void;
    onCancelSuccess: () => void;
    lhdnUuid: string | null;
    submittedAt: string | null;
};

export type EInvoiceQRCodeProps = {
    validationUrl: string | null;
    lhdnUuid: string | null;
    documentReference: string;
};


export type EInvoiceSubmissionHistoryProps = {
    documentType: string;
    documentId: number;
};

export type EInvoiceStatusBadgeProps = {
    status: typeof EINVOICE_STATUS_CHOICES[number];
};

export type EInvoiceSubmissionHistoryTableProps = {
    submissions: EInvoiceSubmission[];
    onSubmissionClick: (id: number) => void;
};

export type EInvoiceSubmissionHistoryDetailsProps = {
    submission: EInvoiceSubmission | undefined;
    isLoading: boolean;
    onBack: () => void;
};


// ---- E-INVOICE SUBMISSION ----------------------------END------------------------------------





export type StatusTypes = {
    bg: string;
    text: string;
    border: string;
    dot: string;
    label: string;
};









