module.exports = {
    semi: false,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    arrowParens: 'always',
    overrides: [
        {
            files: '**/*.scss',
            options: {
                singleQuote: false,
            },
        },
    ],
}
