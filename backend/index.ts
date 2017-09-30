import * as dotenv from 'dotenv';
dotenv.config();
import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as convert from 'koa-convert';
import * as helmet from 'koa-helmet';
import * as serve from 'koa-static';
import * as winston from 'winston';

import { initRoutes } from './routes/routes-init';

const app = new Koa();

app.use(helmet());
app.use(serve(__dirname + '/../public'));
app.use(convert(bodyparser()));

// Routes
initRoutes(app);

winston.info(`Application is running on port ${process.env.PORT || 3000}`);
app.listen(process.env.PORT || 3000);
