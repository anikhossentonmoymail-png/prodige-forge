import { Check, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for individuals and small teams getting started",
    features: [
      "1 project",
      "Up to 3 team members",
      "Basic task management",
      "Calendar view",
      "Mobile app access",
      "Community support"
    ],
    limitations: [
      "Limited storage (100MB)",
      "Basic reporting",
      "No time tracking"
    ],
    cta: "Get Started Free",
    popular: false,
    icon: Star
  },
  {
    name: "Pro",
    price: "$12",
    period: "per user/month",
    description: "Advanced features for growing teams and professionals",
    features: [
      "10 projects",
      "Unlimited team members", 
      "Advanced task management",
      "Time tracking & reporting",
      "Kanban boards",
      "Custom fields",
      "Priority support",
      "Integrations (50+)",
      "Advanced analytics",
      "File storage (10GB per user)"
    ],
    limitations: [],
    cta: "Start Pro Trial",
    popular: true,
    icon: Zap
  },
  {
    name: "Advance",
    price: "$24",
    period: "per user/month",
    description: "Enterprise-grade features for large organizations",
    features: [
      "Unlimited projects",
      "Unlimited team members",
      "All Pro features",
      "Advanced automation",
      "Custom workflows",
      "API access",
      "SSO integration",
      "Advanced security",
      "24/7 priority support",
      "Unlimited file storage",
      "Custom reporting",
      "White-label options"
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
    icon: Check
  }
]

const Pricing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl animate-fade-in-up">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Choose the perfect plan for your team. Start free and scale as you grow.
              No hidden fees, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-6xl lg:grid-cols-3">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              return (
                <Card 
                  key={plan.name}
                  className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl animate-fade-in-up ${
                    plan.popular 
                      ? 'border-primary/50 shadow-xl scale-105 lg:scale-110' 
                      : 'border-border/50 hover:border-primary/30'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-primary px-3 py-2 text-sm font-medium text-white text-center animate-bounce-in">
                      Most Popular
                    </div>
                  )}
                  
                  <CardHeader className={`pb-6 pt-8 ${plan.popular ? 'pt-12' : ''}`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                        plan.popular ? 'bg-gradient-primary' : 'bg-gradient-primary/10'
                      }`}>
                        <Icon className={`h-6 w-6 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                        <span className="ml-2 text-sm text-muted-foreground">/{plan.period}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <Button 
                      className={`w-full mb-6 ${
                        plan.popular 
                          ? 'bg-gradient-primary hover:opacity-90' 
                          : plan.name === 'Free' 
                            ? 'bg-secondary hover:bg-secondary/80 text-secondary-foreground' 
                            : 'border-primary text-primary hover:bg-primary hover:text-white'
                      }`}
                      variant={plan.popular ? 'default' : plan.name === 'Free' ? 'secondary' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Everything included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <Check className="h-4 w-4 text-primary mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {plan.limitations.length > 0 && (
                        <div className="pt-4 border-t border-border/50">
                          <h5 className="text-xs font-medium text-muted-foreground mb-2">Limitations:</h5>
                          <ul className="space-y-1">
                            {plan.limitations.map((limitation, limitationIndex) => (
                              <li key={limitationIndex} className="text-xs text-muted-foreground flex items-start">
                                <div className="h-1 w-1 rounded-full bg-muted-foreground mt-1.5 mr-2 flex-shrink-0" />
                                {limitation}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-2">
            {[
              {
                question: "Can I change plans anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, we offer a 14-day free trial of our Pro plan with no credit card required."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
              },
              {
                question: "Do you offer discounts for annual billing?",
                answer: "Yes, save 20% when you choose annual billing on any paid plan."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Join thousands of teams already using UDX3 to boost their productivity and achieve better results.
            </p>
            <div className="mt-10">
              <a
                href="/signup"
                className="rounded-md bg-white px-8 py-3 text-sm font-semibold text-primary shadow-sm hover:bg-gray-50 transition-all duration-300 hover:scale-105"
              >
                Start Your Free Trial
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pricing