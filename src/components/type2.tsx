export interface FoodInfos {
    from:   number;
    to:     number;
    count:  number;
    _links: FoodInfosLink;
    hits:   Hit[];
}

export interface FoodInfosLink {
    next: Next;
}

export interface Next {
    href:  string;
    title: string;
}

export interface Hit {
    recipe: Recipe;
    _links: HitLinks;
}

export interface HitLinks {
    self: Next;
}

export interface Recipe {
    uri:             string;
    label:           string;
    image:           string;
    images:          Images;
    source:          string;
    url:             string;
    shareAs:         string;
    yield:           number;
    dietLabels:      string[];
    healthLabels:    string[];
    cautions:        string[];
    ingredientLines: string[];
    ingredients:     Ingredient[];
    calories:        number;
    totalWeight:     number;
    totalTime:       number;
    cuisineType:     string[];
    mealType:        string[];
    dishType:        string[];
    totalNutrients:  Nutrients;
    totalDaily:      Nutrients;
    digest:          Digest[];
}

export interface Digest {
    label:        string;
    tag:          string;
    schemaOrgTag: null | string;
    total:        number;
    hasRDI:       boolean;
    daily:        number;
    unit:         string;
    sub?:         Digest[];
}


export interface Images {
    THUMBNAIL: ImageInfo;
    SMALL:     ImageInfo;
    REGULAR:   ImageInfo;
    LARGE?:    ImageInfo;
}

export interface ImageInfo {
    url:    string;
    width:  number;
    height: number;
}

export interface Ingredient {
    text:         string;
    quantity:     number;
    measure:      null | string;
    food:         string;
    weight:       number;
    foodCategory: string;
    foodId:       string;
    image:        string;
}

export interface NutrientsInfo {
    label:    string;
    quantity: number;
    unit:     string;
}

export interface Nutrients {
    [key:string] : NutrientsInfo,
    ENERC_KCAL:NutrientsInfo,
      FAT: NutrientsInfo,
      FASAT: NutrientsInfo,
      FATRN: NutrientsInfo,
      FAMS: NutrientsInfo,
      FAPU: NutrientsInfo,
      CHOCDF:NutrientsInfo,
      "CHOCDF.net":NutrientsInfo,
      FIBTG:NutrientsInfo,
      SUGAR: NutrientsInfo,
      "SUGAR.added": NutrientsInfo,
      PROCNT:NutrientsInfo,
      CHOLE: NutrientsInfo,
      NA: NutrientsInfo,
      CA:NutrientsInfo,
      MG:NutrientsInfo,
      K: NutrientsInfo,
      FE: NutrientsInfo,
      ZN: NutrientsInfo,
      P: NutrientsInfo,
      VITA_RAE:NutrientsInfo,
      VITC:NutrientsInfo,
      THIA: NutrientsInfo,
      RIBF: NutrientsInfo,
      NIA: NutrientsInfo,
      VITB6A: NutrientsInfo,
      FOLDFE:NutrientsInfo,
      FOLFD: NutrientsInfo,
      FOLAC: NutrientsInfo,
      VITB12: NutrientsInfo,
      VITD:NutrientsInfo,
      TOCPHA:NutrientsInfo,
      VITK1: NutrientsInfo,
      "Sugar.alcohol": NutrientsInfo,
      WATER: NutrientsInfo,
}