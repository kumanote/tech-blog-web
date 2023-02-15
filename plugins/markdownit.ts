import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import katex from 'markdown-it-katex'

export default defineNuxtPlugin(() => {
  const md = new MarkdownIt('default', {
    linkify: true,
    breaks: true,
    html: true,
    typographer: true,
  })
  md.use(katex)
  md.use(anchor)
  return {
    provide: {
      md,
    },
  }
})
