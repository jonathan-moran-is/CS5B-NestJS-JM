import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FILE } from 'node:dns';
import { modFilename } from 'src/utils/image.utils.upload';
import { UsuarioEntity } from './usuario.entity';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {

    constructor(private servicio:UsuariosService){

    }

    @Get()
    getAll(@Param() params){
        return this.servicio.obtenerUsuarios(params.id);
    }

    @Get(':id')
    get(@Param() params){
        return this.servicio.obtenerUsuario(params.id);
    }

    @Post()
    create(@Body() usuario:UsuarioEntity){
        return this.servicio.creaUsuario(usuario);
    }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('imagen',{
            storage: diskStorage({
                destination:'./avatars',
                filename: modFilename
            })
        })
    )
    async uploadFile(@Body() usuario:UsuarioEntity, @UploadedFile() file){
        usuario.avatar = file.filename;
        console.log(usuario);

        await this.servicio.creaUsuario(JSON.parse(JSON.stringify(usuario)));

        const response = {
            nombreOriginal: file.originalname,
            nombreFinal: file.filename
        }
        return{
            status:HttpStatus.OK,
            message:'La imagen se subio correctamente',
            data: response
        }
    }

    @Put()
    update(@Body() usuario:UsuarioEntity){
        return this.servicio.actualizarUsuario(usuario);
    }

    @Delete(':id')
    delete(@Param() params){
        return this.servicio.borrarUsuario(params.id);
    }
}
