export class CreateNotificationDto {
  userId: number;
  title: string;
  message: string;
  type: string; // "payment" | "survey" | "system"
}