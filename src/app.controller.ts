import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Hello } from './utils/hello';

@Controller()
@ApiExcludeController()
export class AppController {
  @Get()
  index(): Hello {
    return {
      message: 'Is a live!',
    };
  }
}
