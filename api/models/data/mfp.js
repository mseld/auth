var defaultApp = 'com.sample.pushnotificationsandroid';

module.exports = {
    provider: {
        name: 'MobileFirst',
        description: 'MobileFirst Push Notifications',
        protocol: 'https',
        host: 'mobilefoundation-hc-dv-server.mybluemix.net',
        port: 443,
        basePath: '/imfpush/v1',
        headers: { Authorization: '' }
    },
    services: [{
            name: 'Applications',
            operation: 'Retrieve Applications',
            description: 'Retrieves all the applications',
            viewLevel: 3,
            order: 1,
            urlPath: '/apps',
            method: 'GET',
            headers: [{
                key: 'Content-Type',
                value: 'application/json'
            }],
            parameters: [{
                key: 'expand',
                value: true
            }],
            output: {
                xPath: 'applications',
                exclude: ['enabled']
            }
        }, {
            name: 'Add Application',
            operation: 'Add Application',
            description: 'Creates a new server application for the push service',
            viewLevel: 1,
            order: 2,
            urlPath: '/apps',
            method: 'POST',
            headers: [{
                key: 'Content-Type',
                value: 'application/json'
            }],
            body: [{
                key: 'applicationId',
                name: 'Application Id'
            }, {
                key: 'enabled',
                name: 'Enabled',
                defaultValue: 'true'
            }],
            output: {
                message: 'Applications Add Successfully'
            }
        },
        {
            name: 'Push GCM Settings',
            operation: 'Apply GCM Settings',
            description: 'Updates GCM settings referenced by the applicationId',
            viewLevel: 1,
            order: 3,
            urlPath: '/apps/:applicationId/settings/gcmConf',
            method: 'PUT',
            headers: [{
                key: 'Content-Type',
                value: 'application/json'
            }],
            paths: [{
                key: 'applicationId',
                name: 'Application Id',
                defaultValue: defaultApp
            }],
            body: [{
                key: 'apiKey',
                name: 'apiKey'
            }, {
                key: 'senderId',
                name: 'senderId'
            }],
            output: {
                message: 'GCM Settings is Applied Now'
            }
        },
        {
            name: 'Push SMS Settings',
            operation: 'Apply SMS Settings',
            description: 'Updates SMS settings referenced by the applicationId',
            viewLevel: 1,
            order: 4,
            urlPath: '/apps/:applicationId/settings/smsConf',
            method: 'PUT',
            headers: [{
                key: 'Content-Type',
                value: 'application/json'
            }],
            paths: [{
                key: 'applicationId',
                name: 'Application Id',
                defaultValue: defaultApp
            }],
            body: [{
                    key: 'name',
                    name: 'Sms Service Provider',
                    defaultValue: 'Cequens'
                }, {
                    key: 'host',
                    name: 'Host',
                    defaultValue: '55mnubf889.execute-api.us-east-1.amazonaws.com'
                },
                {
                    key: 'port',
                    name: 'Port',
                    defaultValue: '80'
                },
                {
                    key: 'programName',
                    name: 'Path',
                    defaultValue: '/prod'
                },
                {
                    key: 'SenderName',
                    name: 'Sender Name',
                    xPath: 'parameters.0.SenderName',
                    defaultValue: 'ADIB'
                },
                {
                    key: 'MessageType',
                    name: 'Message Type',
                    xPath: 'parameters.0.MessageType',
                    defaultValue: 'text'
                },
                {
                    key: 'UserName',
                    name: 'User Name',
                    xPath: 'parameters.0.UserName',
                    defaultValue: 'MahmoudSamy'
                },
                {
                    key: 'Password',
                    name: 'Password',
                    xPath: 'parameters.0.Password',
                    defaultValue: 'v5Od5Y'
                }
            ],
            output: {
                message: 'SMS Settings is Applied Now'
            }
        },
        {
            name: 'Push Tags',
            operation: 'Retrieves tags',
            description: 'Retrieves all tags of push',
            viewLevel: 2,
            order: 2,
            urlPath: '/apps/:applicationId/tags',
            method: 'GET',
            headers: [{
                key: 'Content-Type',
                value: 'application/json'
            }],
            paths: [{
                key: 'applicationId',
                name: 'Application Id',
                defaultValue: defaultApp
            }],
            parameters: [{
                key: 'expand',
                value: true
            }],
            output: {
                xPath: 'tags',
                exclude: ['uri', 'href']
            }
        },
        {
            name: 'Push Notifications',
            operation: 'Send',
            description: 'Send Push Notification by tag',
            viewLevel: 2,
            order: 4,
            urlPath: '/apps/:applicationId/messages',
            method: 'POST',
            headers: [{
                key: 'Content-Type',
                value: 'application/json'
            }],
            paths: [{
                key: 'applicationId',
                name: 'Application Id',
                defaultValue: defaultApp
            }],
            body: [{
                key: 'message',
                name: 'Message',
                xPath: 'message.alert'
            }, {
                type: 'number',
                key: 'notificationType',
                name: 'Notification Type'
            }, {
                uiType: 'tag',
                type: 'stringBuilder',
                key: 'tagNames',
                name: 'Tag',
                xPath: 'target.tagNames'
            }],
            output: {
                message: 'Send Push Notification is done'
            }
        }
    ]
};