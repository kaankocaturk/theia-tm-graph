import { ContainerModule } from '@theia/core/shared/inversify';
import { SinusGraphExtensionWidget } from './sinus-graph-extension-widget';
import { SinusGraphExtensionContribution } from './sinus-graph-extension-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    bindViewContribution(bind, SinusGraphExtensionContribution);
    bind(FrontendApplicationContribution).toService(SinusGraphExtensionContribution);
    bind(SinusGraphExtensionWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: SinusGraphExtensionWidget.ID,
        createWidget: () => ctx.container.get<SinusGraphExtensionWidget>(SinusGraphExtensionWidget)
    })).inSingletonScope();
}); 
