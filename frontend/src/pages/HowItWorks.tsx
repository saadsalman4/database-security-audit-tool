import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/ui/Container';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Database, Shield, Server, Search, AlertCircle, CheckCircle2 } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: 'Connect to Your Database',
      description: 'Provide your database connection details. All credentials are processed securely and never stored.',
      icon: <Database className="h-8 w-8 text-indigo-600" />,
    },
    {
      title: 'Automated Security Scan',
      description: 'Our tool performs a comprehensive scan of your database structure, settings, and privileges.',
      icon: <Search className="h-8 w-8 text-indigo-600" />,
    },
    {
      title: 'Vulnerability Assessment',
      description: 'We identify security vulnerabilities, misconfigurations, and risk factors in your database.',
      icon: <AlertCircle className="h-8 w-8 text-indigo-600" />,
    },
    {
      title: 'Actionable Recommendations',
      description: 'Receive detailed reports with prioritized remediation steps to improve your database security.',
      icon: <CheckCircle2 className="h-8 w-8 text-indigo-600" />,
    },
  ];

  const sqlFeatures = [
    'Schema weakness detection',
    'Privilege analysis',
    'Security configuration checks',
    'Index optimization suggestions',
    'Password policy validation',
  ];

  const mongoFeatures = [
    'Authentication method assessment',
    'Version vulnerability check',
    'Collection structure analysis',
    'User permission review',
    'Performance risk identification',
  ];

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white pt-24 pb-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              How Our Database Audit Works
            </motion.h1>
            <motion.p 
              className="mt-6 text-xl text-indigo-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our comprehensive audit process helps identify vulnerabilities and provides actionable security recommendations.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Steps Section */}
      <section className="py-16 -mt-12">
        <Container>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
                    {step.icon}
                  </div>
                  <div className="relative">
                    {/* {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-0 right-0 h-0.5 w-full bg-gray-200 transform translate-x-1/2 translate-y-10"></div>
                    )} */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* SQL Audit Section */}
      <section className="py-12">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-2 bg-sql-light rounded-lg mb-4">
                <Database className="h-6 w-6 text-sql-primary" />
                <span className="ml-2 text-sql-primary font-medium">SQL Database Audit</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive SQL Security Analysis</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our SQL audit tool performs in-depth analysis of your relational database security, looking for common vulnerabilities, misconfigurations, and performance risks.
              </p>
              
              <ul className="space-y-3 mb-8">
                {sqlFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-sql-primary mt-0.5" />
                    <span className="ml-2 text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/audit/sql">
                <Button theme="sql" size="lg">Start SQL Audit</Button>
              </Link>
            </div>
            
            <Card className="bg-sql-light border-none p-6 shadow-lg" theme="sql">
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">Schema Vulnerabilities</h4>
                  <p className="text-gray-600 text-sm">Detects tables without primary keys, missing indexes, and other schema design issues that could lead to data integrity problems.</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">Privilege Assessment</h4>
                  <p className="text-gray-600 text-sm">Identifies overprivileged database users and excessive permissions that could be exploited by attackers.</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">Configuration Review</h4>
                  <p className="text-gray-600 text-sm">Analyzes database configuration settings for security weaknesses such as weak password policies or insecure defaults.</p>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* MongoDB Audit Section */}
      <section className="py-12 bg-neutral-background">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="bg-mongo-light border-none p-6 shadow-lg order-2 md:order-1" theme="mongo">
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">Authentication Security</h4>
                  <p className="text-gray-600 text-sm">Checks for proper authentication mechanisms and identifies instances running without proper authentication.</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">Version Analysis</h4>
                  <p className="text-gray-600 text-sm">Detects outdated MongoDB versions with known security vulnerabilities that require updates.</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">Collection Structure</h4>
                  <p className="text-gray-600 text-sm">Identifies collections lacking proper indexing or at risk of unbounded growth, which can lead to performance issues.</p>
                </div>
              </div>
            </Card>
            
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center justify-center p-2 bg-mongo-light rounded-lg mb-4">
                <Server className="h-6 w-6 text-mongo-primary" />
                <span className="ml-2 text-mongo-primary font-medium">MongoDB Audit</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Specialized MongoDB Security Audit</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our MongoDB audit focuses on the unique security challenges of NoSQL databases, examining authentication, permissions, and performance optimizations.
              </p>
              
              <ul className="space-y-3 mb-8">
                {mongoFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-mongo-primary mt-0.5" />
                    <span className="ml-2 text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/audit/mongodb">
                <Button theme="mongo" size="lg">Start MongoDB Audit</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <Container>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to secure your database?</h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Start with a comprehensive security audit today and identify vulnerabilities before they can be exploited.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/audit/sql">
                  <Button theme="sql" size="lg" variant="secondary">
                    <Database className="mr-2 h-5 w-5" />
                    SQL Audit
                  </Button>
                </Link>
                <Link to="/audit/mongodb">
                  <Button theme="mongo" size="lg" variant="secondary">
                    <Server className="mr-2 h-5 w-5" />
                    MongoDB Audit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default HowItWorks;