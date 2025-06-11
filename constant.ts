export type StoryOption = {
    type: "preset" | "custom"
    label: string
}

export type StyleOption = {
    name: string;
    image: string;
}

export const storyOptions: StoryOption[] = [
    {type: 'preset', label: 'Adventure Story'},
    {type: 'preset', label: 'Funny Story'},
    {type: 'preset', label: 'Scary Story'},
    {type: 'preset', label: 'Inspirational Story'},
    {type: 'preset', label: 'Romantic Story'},
    {type: 'preset', label: 'Sci-fi Story'},
    {type: 'preset', label: 'Thriller Store'},
    {type: 'custom', label: 'Custom Prompt'}
]

export const styleOptions: StyleOption[] = [
    {name: 'Artistic', image: '/images/artistic.jpg'},
    {name: 'Realistic', image: '/images/realistic.jpg'},
    {name: 'Fantasy', image: '/images/fantasy.jpg'},
    {name: 'Dark', image: '/images/dark.png'},
    {name: 'Water Color', image: '/images/watercolor.jpg'},
    {name: 'GTA', image: '/images/gta.png'},
    {name: 'Comic', image: '/images/comic.jpg'},
    {name: 'Paint', image: '/images/paint.jpg'}
]