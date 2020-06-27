import { NestExpressApplication } from '@nestjs/platform-express';
import expressSetup from './express';
import nestSetup from './nest';

export default (app: NestExpressApplication) => {
    expressSetup(app);
    nestSetup(app);
};