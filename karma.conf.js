// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
    var configuration = {
        basePath: '',
        frameworks: ['jasmine', 'angular-cli'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-remap-istanbul'),
            require('angular-cli/plugins/karma')
        ],
        files: [
            {pattern: './src/test.ts', watched: false}
        ],
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        preprocessors: {
            './src/test.ts': ['angular-cli']
        },
        remapIstanbulReporter: {
            reports: {
                html: 'coverage',
                lcovonly: './coverage/coverage.lcov'
            }
        },
        angularCli: {
            config: './angular-cli.json',
            environment: 'dev'
        },
        reporters: config.angularCli && config.angularCli.codeCoverage
            ? ['progress', 'karma-remap-istanbul']
            : ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome', 'ChromeCanary'],
        // This is the new content for your travis-ci configuration test
        //  Custom launcher for Travis-CI
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        singleRun: false
    };

    if (process.env.TRAVIS) {
        configuration.browsers = ['Chrome_travis_ci'];
        configuration.singleRun = true;
    }

    config.set(configuration);
};
