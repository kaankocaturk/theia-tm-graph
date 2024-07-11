import { ContainerModule } from '@theia/core/shared/inversify';
import { CopyExtensionWidget } from './table-extension-widget';
import { CopyExtensionContribution } from './table-extension-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    bindViewContribution(bind, CopyExtensionContribution);
    bind(FrontendApplicationContribution).toService(CopyExtensionContribution);
    bind(CopyExtensionWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: CopyExtensionWidget.ID,
        createWidget: () => ctx.container.get<CopyExtensionWidget>(CopyExtensionWidget)
    })).inSingletonScope();
}); 
