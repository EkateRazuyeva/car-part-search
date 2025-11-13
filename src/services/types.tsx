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
