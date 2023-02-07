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
            name: 'actor',
            type: 'array',
            title: 'Best Actor',
            of: [{
                type: 'reference',
                to: [{type: 'actor'}]
            }]
        },
    ]
}