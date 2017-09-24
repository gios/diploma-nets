import * as dotenv from 'dotenv';
dotenv.config();
import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as convert from 'koa-convert';
import * as helmet from 'koa-helmet';
import * as Router from 'koa-router';
import * as serve from 'koa-static';
import * as winston from 'winston';

import { initRoutes } from './routes/routes-init';

const app = new Koa();
const router = new Router();

app.use(helmet());
app.use(serve('public'));
app.use(convert(bodyparser()));

router.get('/', async (ctx) => {
  ctx.body = 'amigo';
});

// Routes
initRoutes(app);
app.use(router.routes());
app.use(router.allowedMethods());

winston.info(`Application is running on port ${process.env.PORT || 3000}`);
app.listen(process.env.PORT || 3000);
