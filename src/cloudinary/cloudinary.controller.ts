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
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('Cloudinary Media')
@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @ApiOperation({ summary: 'Create a Cloudinary media record' })
  @Post()
  create(@Body() createCloudinaryDto: CreateCloudinaryDto) {
    return this.cloudinaryService.create(createCloudinaryDto);
  }

  @ApiOperation({ summary: 'Get all Cloudinary media records' })
  @Get()
  findAll() {
    return this.cloudinaryService.findAll();
  }

  @ApiOperation({ summary: 'Get Cloudinary image details by publicId' })
  @ApiQuery({ name: 'publicId', description: 'Cloudinary public ID' })
  @Get(':id')
  findOne(@Query('publicId') publicId: string) {
    return this.cloudinaryService.findOne(publicId);
  }

  @ApiOperation({ summary: 'Update Cloudinary record by ID' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCloudinaryDto: UpdateCloudinaryDto,
  ) {
    return this.cloudinaryService.update(+id, updateCloudinaryDto);
  }

  @ApiOperation({ summary: 'Delete Cloudinary file by publicId' })
  @ApiQuery({ name: 'publicId', description: 'Cloudinary public ID' })
  @Delete('delete')
  async deleteImage(@Query('publicId') publicId: string) {
    if (!publicId) {
      return { message: 'publicId query parameter is required' };
    }

    const result = await this.cloudinaryService.remove(publicId);
    return {
      message: 'Image deleted successfully',
      result,
    };
  }

  @ApiOperation({ summary: 'Upload file / image to Cloudinary' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({ name: 'maxSizeKB', required: false, description: 'Max allowed size in KB (default 1024)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully.' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('maxSizeKB') maxSizeKBStr?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided.');
    }

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
