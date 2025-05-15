import { Body, Inject, Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'process';

@Injectable()
export class UploadService {
  private s3: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID') || '',
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY') || '',
      },
      endpoint: this.configService.get('S3_ENDPOINT'),
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<{ url: string }> {
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
    const fileName = `${uuidv4()}-${file.originalname}`;
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3.send(new PutObjectCommand(params));
    const fileUrl = `${this.configService.get<string>('S3_ENDPOINT')}/${bucketName}/${fileName}`;
    return { url: fileUrl };
  }
}
