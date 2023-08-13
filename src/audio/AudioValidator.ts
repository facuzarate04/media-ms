import { z } from "zod";


export interface IStoreValidator {
    temp_path: string
}

export const StoreValidator = z.object({
    temp_path: z.string().url(),
});