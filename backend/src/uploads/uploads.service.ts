import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

@Injectable()
export class UploadsService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

     async uploadImage(filePath: string, userId: number) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'collabrative_study_platform',
        public_id: `${userId}-${Date.now()}`,
        overwrite: true,
      });

      await fs.promises.unlink(filePath);
      return result;
    } catch (error: any) {
        await fs.promises.unlink(filePath);
      throw new Error('Cloudinary upload failed: ' + error.message);
    }
  }

    async deleteImage(publicId: string) {
    try {
      await cloudinary.uploader.destroy(publicId);
      return { success: true };
    } catch (error: any) {
      throw new Error('Cloudinary delete failed: ' + error.message);
    }
  }
}
