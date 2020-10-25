import {
    Get,
    QueryParam,
    OnUndefined,
    Param,
    Post,
    Body,
    Put,
    Delete,
    JsonController,
    Authorized
} from 'routing-controllers';
import { Role } from '../models/Role';
import { Page } from '../shared/Page';

@Authorized(['ADM'])
@JsonController('/roles')
export class RolesController {

    @Get()
    index(@QueryParam('name') name: string) {

        const where: any = {};

        if (name) {
            where.name = name;
        }

        return new Page();
    }

    @Get('/:id')
    @OnUndefined(404)
    show(@Param('id') id: number) {

        return { message: 'Not implemented' };
    }

    @Post()
    async store(@Body() role: Role) {

        return { message: 'Not implemented' };
    }

    @Put('/:id')
    async update(
        @Param('id') id: number,
        @Body() role: Role
    ) {

        return { message: 'Not implemented' };
    }

    @Delete('/:id')
    async destroy(@Param('id') id: number) {

        return { message: 'Not implemented' };
    }
}