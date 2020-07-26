export type Feature = {
  id: number, 
  name: string
}

export type OtherFeature = {
  selected: boolean
}

export type FeatureSelect = Feature &  OtherFeature