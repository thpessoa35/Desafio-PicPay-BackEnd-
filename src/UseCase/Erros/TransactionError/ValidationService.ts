import axios from "axios";
import { ErrorValidadeService } from "./ErrorsCustomization/ErrorValidateService";

export class ValidationService {
    constructor() { }

    async validateService(): Promise<{ message: string }> {
        try {
            const response = await axios.get('https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc');
            const responseData = response.data;
            return responseData

        } catch (error) {
            throw new ErrorValidadeService();
        }
    }
    async validateServiceEmail(): Promise<{ message: string }> {
        try {
            const response = await axios.get('https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6');
            return response.data
        }catch(error){
            throw new ErrorValidadeService()
        }
    }
}
