import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/ui/Container';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Database, Shield, Server, AlertTriangle, CheckCircle2 } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      title: 'Comprehensive SQL Database Auditing',
      description: 'Scan your SQL databases for security vulnerabilities, weak schemas, and privilege issues.',
      icon: <Database className="h-8 w-8 text-sql-primary" />,
      theme: 'sql',
      link: '/audit/sql',
    },
    {
      title: 'MongoDB Security Analysis',
      description: 'Identify security risks, performance issues, and configuration problems in your MongoDB databases.',
      icon: <Server className="h-8 w-8 text-mongo-primary" />,
      theme: 'mongo',
      link: '/audit/mongodb',
    },
    {
      title: 'Actionable Security Recommendations',
      description: 'Receive tailored recommendations to improve your database security posture.',
      icon: <CheckCircle2 className="h-8 w-8 text-indigo-600" />,
      theme: 'neutral',
      link: '/how-it-works',
    },
    {
      title: 'Risk Assessment & Prioritization',
      description: 'Vulnerabilities are analyzed and categorized by severity to help prioritize remediation efforts.',
      icon: <AlertTriangle className="h-8 w-8 text-amber-500" />,
      theme: 'neutral',
      link: '/how-it-works',
    },
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
              Database Security Audit Tool
            </motion.h1>
            <motion.p 
              className="mt-6 text-xl text-indigo-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Identify vulnerabilities, assess risks, and secure your databases with our comprehensive analysis tool.
            </motion.p>
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/audit/sql">
                <Button size="lg" theme="sql" className="w-full sm:w-auto">
                  SQL Database Audit
                </Button>
              </Link>
              <Link to="/audit/mongodb">
                <Button size="lg" theme="mongo" className="w-full sm:w-auto">
                  MongoDB Audit
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Comprehensive Database Security</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our tool helps you identify and address security risks in both SQL and NoSQL databases.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link} className="block h-full">
                <motion.div 
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-6 h-full" theme={feature.theme} hoverable>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                        <p className="mt-2 text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-background py-16">
        <Container>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900">Ready to secure your databases?</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl">
                  Start with a comprehensive security audit to identify vulnerabilities and receive actionable recommendations.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/how-it-works">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Learn How It Works
                    </Button>
                  </Link>
                  <Link to="/audit/sql">
                    <Button size="lg" theme="sql" className="w-full sm:w-auto">
                      Start SQL Audit
                    </Button>
                  </Link>
                  <Link to="/audit/mongodb">
                    <Button size="lg" theme="mongo" className="w-full sm:w-auto">
                      Start MongoDB Audit
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;