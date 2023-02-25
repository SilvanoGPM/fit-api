import { Pageable } from '@app/repositories/pages.type';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class GenericService {
  public getPageParamsByQuery({ page: rawPage, size: rawSize }: Pageable) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_SIZE = 10;

    const page = rawPage ? Number(rawPage) : DEFAULT_PAGE;
    const size = rawSize ? Number(rawSize) : DEFAULT_SIZE;

    if (isNaN(page) || isNaN(size)) {
      throw new BadRequestException('Page or size is invalid!', {
        cause: new Error(),
        description: 'Only numerical values ​​are accepted',
      });
    }

    return { page, size };
  }
}
