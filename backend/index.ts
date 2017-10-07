import * as dotenv from 'dotenv';
dotenv.config();
import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as convert from 'koa-convert';
import * as helmet from 'koa-helmet';
import * as serve from 'koa-static';
import * as jwt from 'koa-jwt';
import * as send from 'koa-send';
import * as winston from 'winston';

import { initRoutes } from './routes/routes-init';

const app = new Koa();
const SHARED_SECRET = 'nets';

app.use(helmet());
app.use(serve(__dirname + '/../public'));
app.use(async (ctx, next) => {
  if (ctx.path.split('/')[1] !== 'api') {
    await send(ctx, 'index.html', { root: __dirname + '/../public' });
  } else {
    await next();
  }
});

app.use(async (ctx: Koa.Context, next) => {
  try {
    await next();
  } catch (err) {
    if (400 < ctx.status && ctx.status < 500) {
      winston.warn(err);
    } else {
      winston.error(err);
    }

    ctx.status = err.status || 500;
    ctx.body = { status: ctx.status, message: err.message || 'Internal server error' };
    ctx.app.emit('error', err, ctx);
  }
});

app.use(convert(bodyparser()));
app.use(jwt({ secret: SHARED_SECRET }).unless({ path: [/^\/api\/login/, /^\/api\/registration/] }));

// Routes
initRoutes(app);

winston.info(`Application is running on port ${process.env.PORT || 3000}`);
app.listen(process.env.PORT || 3000);
