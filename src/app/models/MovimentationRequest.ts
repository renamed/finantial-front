export interface MovimentationRequest {
    periodId: string;
    institutionId: string;
    categoryId: string;
    value: number;
    description: string;
    date: Date;
}