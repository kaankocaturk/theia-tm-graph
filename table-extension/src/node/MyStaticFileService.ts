import { injectable } from 'inversify';
import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';
import * as express from 'express';
import * as path from 'path';

@injectable()
export class MyStaticFileService implements BackendApplicationContribution {
    configure(app: express.Application): void {
        const assetsPath = path.join(__dirname, '../../../assets');
        console.log(`MyStaticFileService: Serving static files from: ${assetsPath}`);
        
        app.use('/assets', express.static(assetsPath));
        
        // Log each request to the assets directory
        app.use('/assets', (req, res, next) => {
            console.log(`MyStaticFileService: Request for: ${req.url}`);
            next();
        }); 

        app.get('/heartbeat', (req, res) => {
            console.log('Heartbeat endpoint was called');
            res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
        });
    }
}
