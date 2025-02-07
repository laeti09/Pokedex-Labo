export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: {
        type: {
            name: string;
        }
    }[];

    sprites: {
        other: {
            dream_world: {
                front_default: string;
            },
            "official-artwork": {
                front_default: string;
            },
            showdown: {
                front_default: string;
            }
        }
    };

}