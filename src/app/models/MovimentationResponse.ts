import { CategoryResponse } from "./CategoryResponse";
import { InstitutionResponse } from "./InstitutionResponse";
import { PeriodResponse } from "./PeriodResponse";

export interface MovimentationResponse {
    id: string;
    category: CategoryResponse;
    institution: InstitutionResponse;
    period: PeriodResponse;
    value: number;
    description: string;
    date: Date;
}