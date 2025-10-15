import { IsNumber, IsString } from "class-validator";

export class CreateSectionDto {
    @IsNumber()
    surveyId: number;

    @IsString()
    title: string;

    @IsString()
    description?: string;

    @IsNumber()
    order?: number;
}