import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateWithdrawalDto {
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    accountNumber: string;

    @IsString()
    @IsNotEmpty()
    accountName: string;

    @IsString()
    @IsNotEmpty()
    bankName: string;

    @IsString()
    @IsOptional()
    note?: string = "Withdrawal Request";
}
