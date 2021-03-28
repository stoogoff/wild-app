import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import orderBy from 'lodash/orderBy'


const DIR = path.join(process.cwd(), 'content')

export const getContentIds = (type) => {
	const contents = getAllContent(type)

	return contents.map(({ id }) => (
		{
			params: {
				id
			}
		}
	))
}

export const getContent = async (id) => {
	const fullPath = path.join(DIR, `${id}.md`)
	const fileContents = fs.readFileSync(fullPath, 'utf8')
	const matterResult = matter(fileContents)
	const processedContent = await remark()
		.use(html)
		.process(matterResult.content)

	return {
		id,
		contentHtml: processedContent.toString(),
		...matterResult.data
	}
}

export const getAllContent = (type) => orderBy(fs.readdirSync(DIR).map(fileName => {
	const id = fileName.replace(/\.md$/, '')
	const fullPath = path.join(DIR, fileName)
	const fileContents = fs.readFileSync(fullPath, 'utf8')
	const matterResult = matter(fileContents)

	return {
	  id,
	  ...matterResult.data
	}
}).filter(content => type ? content.type === type : true), item => item.sort)
