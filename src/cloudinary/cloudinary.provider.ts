import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    cloudinary.config({
      cloud_name:
        process.env.CLOUDINARY_CLOUD_NAME ||
        config.get('CLOUDINARY_CLOUD_NAME'),
      api_key:
        process.env.CLOUDINARY_API_KEY || config.get('CLOUDINARY_API_KEY'),
      api_secret:
        process.env.CLOUDINARY_API_SECRET ||
        config.get('CLOUDINARY_API_SECRET'),
      // api_url: process.env.CLOUDINARY_URL || config.get('CLOUDINARY_URL'),
      secure: true,
    });
    return cloudinary;
  },
};
