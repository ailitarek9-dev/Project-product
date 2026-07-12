pipeline {
    agent {
        docker {
            image 'cypress/included:14.5.4'
            args '-u root:root'
        }
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npm install --save-dev @shelex/cypress-allure-plugin allure-commandline mochawesome mochawesome-merge mochawesome-report-generator'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    sh 'npx cypress run --spec "cypress/e2e/login.cy.js"'
                }
            }
        }

        stage('Merge Mochawesome Reports') {
            steps {
                sh 'npx mochawesome-merge cypress/reports/mochawesome/*.json -o cypress/reports/mochawesome/index.json'
                sh 'npx marge cypress/reports/mochawesome/index.json -o cypress/reports/mochawesome --inline'
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'npx allure generate allure-results --clean -o allure-report'
            }
        }

    }

    post {
        always {
            publishHTML(target: [
                allowMissing         : true,
                alwaysLinkToLastBuild: true,
                keepAll              : true,
                reportDir            : 'cypress/reports/mochawesome',
                reportFiles          : 'index.html',
                reportName           : 'Mochawesome Report'
            ])

            publishHTML(target: [
                allowMissing         : true,
                alwaysLinkToLastBuild: true,
                keepAll              : true,
                reportDir            : 'allure-report',
                reportFiles          : 'index.html',
                reportName           : 'Allure Report'
            ])

            archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
        }
        success {
            echo 'Tests passed'
        }
        unstable {
            echo 'Tests failed but reports were generated — check Mochawesome/Allure report'
        }
        failure {
            echo 'Pipeline failed before completing'
        }
    }
}