import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, response, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const { ip, method, originalUrl } = req;
      const userAgent = req.get('user-agent') || '';

      const { statusCode } = res;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
