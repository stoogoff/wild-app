
import { Application, Context, Router } from '@oak/oak'
import { PORT, PATH, BASE_MODEL, IMAGE_URL } from './config.ts'

import { HomeController } from './modules/site/home.ts'
import { TarotController } from './modules/site/tarot.ts'
import { CardRepository } from './modules/site/repository.ts'
import { router, staticFiles, Repository, SiteModel, View } from './mvc/index.ts'

const site = new SiteModel({
	url: 'https://app.wildrpg.com',
	title: 'WILD',
	type: 'website'
}, IMAGE_URL)

const view = new View(`${Deno.cwd()}/${PATH.PAGES}`, site)
const repo = new CardRepository()
const home = new HomeController(view)
const tarot = new TarotController(view, repo)


const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

// serve static files
app.use(staticFiles(`${Deno.cwd()}/${PATH.STATIC}`))

// catch all static pages which don't need a controller
app.use(async (ctx: Context) => {
	ctx.response.body = await view.renderContext(ctx)
})

app.addEventListener('listen', ({ port }) => console.log(`Listening on port: ${port}`))
app.listen({ port: PORT })
