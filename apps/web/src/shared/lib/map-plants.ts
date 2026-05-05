const valueMap = {
    "П": "Пискаревка",
    "К": "Колпино"
} as const

type SourceType = keyof typeof valueMap

export const mapPlants = (input: string | null) => {
    if (!input || !(input in valueMap)) return null
    return valueMap[input as SourceType]
}