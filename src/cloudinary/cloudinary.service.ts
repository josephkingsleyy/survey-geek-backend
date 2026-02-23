import { Injectable, Inject } from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { UpdateCloudinaryDto } from './dto/update-cloudinary.dto';
import { CreateCloudinaryDto } from './dto/create-cloudinary.dto';

@Injectable()
export class CloudinaryService {
  constructor(@Inject('Cloudinary') private cloudinary: typeof Cloudinary) {}

  async uploadImage(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        {
          folder: 'survey_geek',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  // ===== Optional resource CRUD stubs =====

  create(createCloudinaryDto: CreateCloudinaryDto) {
    return 'This action adds a new cloudinary';
  }

  async findAll() {
    const resources = await this.cloudinary.api.resources({
      type: 'upload',
      prefix: 'survey_geek/',
    });
    const mappedResources = resources.resources.map((r) => ({
      publicId: r.public_id,
      url: r.secure_url,
      format: r.format,
      createdAt: r.created_at,
    }));

    return { resources: mappedResources };
  }

  async findOne(publicId: string) {
    try {
      const resource = await this.cloudinary.api.resource(publicId);
      return {
        publicId: resource.public_id,
        url: resource.secure_url,
        format: resource.format,
        createdAt: resource.created_at,
        bytes: resource.bytes,
        width: resource.width,
        height: resource.height,
      };
    } catch (error) {
      throw new Error(`File not found: ${publicId}`);
    }
  }

  update(id: number, updateCloudinaryDto: UpdateCloudinaryDto) {
    return `This action updates a #${id} cloudinary`;
  }

  async remove(public_id: string): Promise<any> {
    console.log('publ', public_id);

    try {
      const result = await this.cloudinary.uploader.destroy(public_id);
      return result;
    } catch (error) {
      throw new Error('Failed to delete image: ' + error.message);
    }
  }
}
