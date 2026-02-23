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
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudinaryService.uploadImage(file);
    return {
      message: 'File uploaded successfully',
      url: result.secure_url,
      result: result,
    };
  }
}
