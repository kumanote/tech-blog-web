import DOMParser from 'universal-dom-parser'

export interface TocItem {
  text: string
  id: string
  indent: number
}

export function parseHtml(html: string): Array<TocItem> {
  const parser = new DOMParser()
  const dom = parser.parseFromString(html, 'text/html')
  return parseToc(dom.body)
}

export function parseToc(element: any): Array<TocItem> {
  const results: Array<TocItem> = []
  if (element.id && element.textContent) {
    let indent = -1
    switch (element.tagName) {
      case 'H1':
        indent = 0
        break
      case 'H2':
        indent = 1
        break
      case 'H3':
        indent = 2
        break
    }
    if (indent >= 0) {
      results.push({
        text: element.textContent,
        id: element.id,
        indent,
      })
    }
  }
  for (let i = 0; i < element.childNodes.length; i++) {
    const child = element.childNodes[i]
    const tocOfChild = parseToc(child)
    for (let j = 0; j < tocOfChild.length; j++) {
      results.push(tocOfChild[j])
    }
  }
  return results
}
