import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
export class ResponseDto<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  data: T[];
}

export const ApiResponseDto = <T extends Type<any>>(data: T) => {
  return applyDecorators(
    ApiExtraModels(ResponseDto, data),
    ApiOkResponse({
      description: '성공',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              success: {
                type: 'boolean',
              },
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(data) },
              },
            },
          },
        ],
      },
    }),
  );
};
