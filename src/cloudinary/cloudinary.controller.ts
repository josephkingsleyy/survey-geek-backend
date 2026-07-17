import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CreateCloudinaryDto } from './dto/create-cloudinary.dto';
import { UpdateCloudinaryDto } from './dto/update-cloudinary.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  create(@Body() createCloudinaryDto: CreateCloudinaryDto) {
    return this.cloudinaryService.create(createCloudinaryDto);
  }

  @Get()
  findAll() {
    return this.cloudinaryService.findAll();
  }

  @Get(':id')
  findOne(@Query('publicId') publicId: string) {
    return this.cloudinaryService.findOne(publicId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCloudinaryDto: UpdateCloudinaryDto,
  ) {
    return this.cloudinaryService.update(+id, updateCloudinaryDto);
  }

  @Delete('delete')
  async deleteImage(@Query('publicId') publicId: string) {
    if (!publicId) {
      return { message: 'publicId query parameter is required' };
    }

    console.log('Deleting public_id:', publicId);
    const result = await this.cloudinaryService.remove(publicId);
    return {
      message: 'Image deleted successfully',
      result,
    };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('maxSizeKB') maxSizeKBStr?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided.');
    }

    // Default to 1024 KB (1 MB) if no limit is passed
    const maxSizeKB = maxSizeKBStr ? parseInt(maxSizeKBStr, 10) : 1024;
    const maxSizeBytes = maxSizeKB * 1024;

    if (file.size > maxSizeBytes) {
      throw new BadRequestException(
        `File size (${(file.size / 1024).toFixed(1)} KB) exceeds the maximum allowed size of ${maxSizeKB >= 1024 ? `${maxSizeKB / 1024} MB` : `${maxSizeKB} KB`}.`,
      );
    }

    const result = await this.cloudinaryService.uploadImage(file);
    return {
      message: 'File uploaded successfully',
      url: result.secure_url,
      result: result,
    };
  }
}
