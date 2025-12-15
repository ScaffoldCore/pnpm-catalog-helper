import { parseDocument, YAMLMap } from 'yaml'

export const stringifyYamlWithTopLevelBlankLine = (value: string) => {
    const doc = parseDocument(value)

    if (doc.contents && doc.contents instanceof YAMLMap) {
        const items = doc.contents.items

        items.forEach((item: any, index: number) => {
            if (index > 0) {
                item.key.commentBefore = '\n'
            }
        })
    }

    return doc.toString()
}
