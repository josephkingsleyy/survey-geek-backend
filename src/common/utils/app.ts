import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "../guards/roles.guard";

export const appProvider = {
    provide: APP_GUARD,
    useClass: RolesGuard,
}