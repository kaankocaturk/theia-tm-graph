import { ContainerModule } from 'inversify';
import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';
import { MyStaticFileService } from './MyStaticFileService';    

console.log('MyStaticFileService: ContainerModule file');

export default new ContainerModule(bind => {
    console.log('MyStaticFileService:ContainerModule');

    bind(BackendApplicationContribution).to(MyStaticFileService).inSingletonScope();
});
