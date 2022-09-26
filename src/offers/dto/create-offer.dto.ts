import { IsOptional } from 'class-validator';

export class CreateOfferDto {
  public amount: number;
  @IsOptional()
  public hidden: boolean;
  public itemId: number;
}
