export default {
    name: 'player',
    type: 'document',
    title: 'Player',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name'
        },
        {
            name: 'picture',
            type: 'reference',
            title: 'Best Picture',
            to: [{type: 'picture'}],
        },
        {
            name: 'director',
            type: 'reference',
            title: 'Best Director',
            to: [{type: 'director'}],
        },
    ]
}