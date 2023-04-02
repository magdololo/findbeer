export interface Beer{
    id: number,
    name: string,
    tagline: string,
    first_brewed: string,
    description: string,
    image_url: string,
    abv: number,
    ibu: number,
    ingredients: {
        malt: [{
            name: string,
            amount: {
                value: number,
                unit: string
            }
        }],
        hops: [{
            name: string,
            amount: {
                value: number,
                unit: string
            },
            add: string,
            attribute: string
        }],
        yeast: string
    }
}
