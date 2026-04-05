
import { Context, Router } from '@oak/oak'
import { route, Controller, PageModel } from '../../mvc/index.ts'

export class HomeController extends Controller {
	@route('/')
	async index() {
		return await this.render('index', new PageModel({
			title: 'Home | ',
		}))
	}

	@route('/dream-master')
	async dreamMaster() {
		return await this.render('dream-master', new PageModel({
			title: 'Dream Master | ',
		}))
	}

	@route('/support/about-us')
	async about() {
		return await this.render('about', new PageModel({
			title: 'About the Team | ',
		}))
	}
}
