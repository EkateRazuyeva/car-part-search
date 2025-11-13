export interface Part {
    Name: string;
    ManufacturerName: string;
    URL: string;
    LetterDate: string;
    ManufacturerId: number;
    Type: string;
    CoverLetterURL: string;
    ModelYearFrom: number | null;
    ModelYearTo: number | null;
}

export interface GetParts {
    Count: number;
    Message: string;
    Results: Part[];
    SearchCriteria: string;
}

interface VehicleType {
    GVWRFrom: string;
    GVWRTo: string;
    IsPrimary: boolean;
    Name: string;
}

interface ManufacturerType {
    Name: string;
}

export interface ManufacturerDetails {
    Address: string;
    Address2: string | null;
    City: string;
    ContactEmail: string;
    ContactFax: string | null;
    ContactPhone: string;
    Country: string;
    DBAs: string | null;
    EquipmentItems: any[];
    LastUpdated: string;
    ManufacturerTypes: ManufacturerType[];
    Mfr_CommonName: string | null;
    Mfr_ID: number;
    Mfr_Name: string;
    OtherManufacturerDetails: string | null;
    PostalCode: string;
    PrimaryProduct: string | null;
    PrincipalFirstName: string;
    PrincipalLastName: string | null;
    PrincipalPosition: string;
    StateProvince: string;
    SubmittedName: string;
    SubmittedOn: string;
    SubmittedPosition: string;
    VehicleTypes: VehicleType[];
}

export interface DetailsResponse {
    Count: number;
    Message: string;
    Results: ManufacturerDetails[];
    SearchCriteria: string | null;
}