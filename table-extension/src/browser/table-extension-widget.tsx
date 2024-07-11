import * as React from 'react';
import { injectable, postConstruct, inject } from '@theia/core/shared/inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';
import { Message } from '@theia/core/lib/browser';
import App from './App';
@injectable()
export class CopyExtensionWidget extends ReactWidget {

    static readonly ID = 'copy-extension:widget';
    static readonly LABEL = 'Telemetri Tablo Grafiği';

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    @postConstruct()
    protected init(): void {
        this.doInit()
    }

    protected async doInit(): Promise<void> {
        this.id = CopyExtensionWidget.ID;
        this.title.label = CopyExtensionWidget.LABEL;
        this.title.caption = CopyExtensionWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-window-maximize'; // example widget icon.
        this.update();
    }

    render(): React.ReactElement {
        return (
            <>
            <App/>
            </>
    )
        
    }

    protected displayMessage(): void {
        this.messageService.info('Congratulations: CopyExtension Widget Successfully Created!');
    }

    protected onActivateRequest(msg: Message): void {
        super.onActivateRequest(msg);
        const iframeElement = document.querySelector('iframe');
        if (iframeElement) {
            iframeElement.focus();
        }
    }
}
