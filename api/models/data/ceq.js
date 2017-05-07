module.exports = {
    provider: {
        name: 'Cequens',
        description: 'Cequens Push Notifications',
        protocol: 'http',
        host: 'localhost',
        port: 9090,
        basePath: '/api'
    },
    services: [{
            name: 'Providers',
            operation: 'Retrieve Providers',
            description: 'Providers information',
            viewLevel: 3,
            order: 1,
            urlPath: '/providers',
            method: 'GET',
            output: {
                exclude: ['__v', 'headers']
            }
        },
        {
            name: 'Create Provider',
            operation: 'Add Provider',
            description: 'Add push notification provider',
            viewLevel: 3,
            order: 2,
            urlPath: '/providers',
            method: 'POST',
            headers: [{
                key: 'Content-Type',
                value: 'application/json'
            }],
            body: [{
                    key: 'name',
                    name: 'Provider Name'
                }, {
                    key: 'description',
                    name: 'Description'
                },
                {
                    key: 'protocol',
                    name: 'Protocol'
                },
                {
                    key: 'host',
                    name: 'Host'
                },
                {
                    key: 'port',
                    name: 'Port'
                },
                {
                    key: 'basePath',
                    name: 'BasePath'
                }
            ],
            output: {
                message: 'Provider Add Successfully'
            }
        },
        {
            name: 'Update Provider',
            operation: 'Update Provider',
            description: 'Update push notification provider',
            viewLevel: 3,
            order: 3,
            urlPath: '/providers/:providerId',
            method: 'PUT',
            headers: [{
                key: 'Content-Type',
                value: 'application/json'
            }],
            paths: [{
                key: 'providerId',
                name: 'Provider Id'
            }],
            body: [{
                    key: 'name',
                    name: 'Provider Name'
                }, {
                    key: 'description',
                    name: 'Description'
                },
                {
                    key: 'protocol',
                    name: 'Protocol'
                },
                {
                    key: 'host',
                    name: 'Host'
                },
                {
                    key: 'port',
                    name: 'Port'
                },
                {
                    key: 'basePath',
                    name: 'BasePath'
                }
            ],
            output: {
                message: 'Provider Updated Successfully'
            }
        }
    ]
};