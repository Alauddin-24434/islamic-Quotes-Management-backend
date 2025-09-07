import { IUser } from "../../interfaces/user.interfcae";

declare global {
    namespace Express {
        interface Request {
            user?: {
                _id: string;
                role: string;
                email: string;
            };
        }
    }
}
