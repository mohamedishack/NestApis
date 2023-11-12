// external-api.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios'; // Import axios

@Injectable()
export class ExternalApiService {
  // Method to fetch data from the external API
  async fetchDataFromExternalApi(): Promise<any> {
    try {
      const response = await axios.get('https://external-api.com/data');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Method to send user data to the external API
  async sendUserDataToExternalApi(userData: any): Promise<any> {
    try {
      const response = await axios.post('https://external-api.com/user', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Other API interaction methods
}
