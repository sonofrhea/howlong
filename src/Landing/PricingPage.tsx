import React, { useState } from 'react';
import { X } from "lucide-react";
import { BillingCycle } from './Types';
import { BILLING_OPTIONS } from './Options';


function PricingPage() {
    const [cycle, setCycle] = useState<BillingCycle>("6 months");
    const [view, setView] = useState('/home');


    const buttons = () => (
        <div className="flex gap-2">
            {BILLING_OPTIONS.map(option => (
                <button
                    key={option}
                    onClick={() => setCycle(option)}
                    aria-pressed={cycle === option}
                    className={
                        cycle === option
                        ? "px-5 py-2 rounded-full font-medium bg-black text-white"
                        : "px-5 py-2 rounded-full font-medium text-slate-600"
                    }
                >
                    {option}
                </button>
            ))}
        </div>
    );



    const billingLabel: Record<string, Record<BillingCycle, string>> = {
        Basic: {
            "6 months": " MYR/ month (billed every 6 months)",
            "Yearly": " MYR/ month (billed yearly)",
        },
        Enterprise: {
            "6 months": " MYR/ month (billed every 6 months)",
            "Yearly": " MYR/ month (billed yearly)",
        },
    };

    const pricingLabel: Record<string, Record<BillingCycle, number | string>> = {
        Basic: {
            "6 months": 95.98,
            "Yearly": 79.99,
        },
        Enterprise: {
            "6 months": 190.89,
             "Yearly": 159.99,
        },
    };


    return(
        <div className="bg-white text-slate-900">
                <a 
                    className="fixed top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 shadow-md focus:outline-none focus:ring-2 focus:ring-black"
                    href='/home'
                    aria-label="Close pricing page"
                >
                    <X className="w-5 h-5" />
                </a>

            <div className="max-w-6xl mx-auto px-6 py-20">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-semibold tracking-tight mb-4">Pricing</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Choose a plan that fits your needs. Upgrade, downgrade, or cancel anytime.
                    </p>
                </div>

                {/* Billing toggle */}
                <div className="flex justify-center mb-20">
                    <div className="inline-flex rounded-full border border-slate-300 p-1 text-sm">
                        {buttons()}
                    </div>
                </div>

                {/* Pricing Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

                    {/* FREE TRIAL */}
                    <div className="border border-slate-200 rounded-2xl p-8 flex flex-col">
                        <h2 className="text-xl font-semibold mb-1">Free Trial</h2>
                        <p className="text-slate-600 mb-6">For exploring core functionality</p>

                        <div className="mb-6">
                            <span className="text-4xl font-semibold">0</span>
                            <span className="text-slate-500" data-cycle> MYR/ 3days</span>
                        </div>

                        <button className="w-full rounded-lg border border-slate-300 py-3 font-medium mb-8 hover:bg-slate-50"
                            onClick={() => window.location.href = "/register"}
                            aria-label="Registration page"
                        >
                            Get Started
                        </button>

                        <div className='space-y-10 text-sm'>
                            <div>
                                <h3 className="font-medium mb-3">Access</h3>
                                <ul className="space-y-2 text-slate-700">
                                    <li>✔ Core platform features</li>
                                    <li>✔ Limited 3days usage</li>
                                    <li>✔ support</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium mb-3">Limits</h3>
                                <ul className="space-y-2 text-slate-700">
                                    <li>• 1 user</li>
                                    <li>• 5 GB storage</li>
                                    <li>• Standard performance</li>
                                </ul>
                                <p className="mt-3 text-xs text-slate-500">Usage limits apply and may change over time.</p>
                            </div>
                        </div>
                    </div>

                    {/* Basic */}
                    <div className='border-2 border-black rounded-2xl p-8 flex flex-col'>

                        <h2 className="text-xl font-semibold mb-1">Basic</h2>
                        <p className="text-slate-600 mb-6">For individuals and teams doing production work</p>

                        <div className="mb-6">
                            <span className="text-4xl font-semibold">
                                {pricingLabel["Basic"][cycle]}
                            </span>
                            <span className="text-slate-500">{billingLabel["Basic"][cycle]}</span>
                        </div>

                        <button className="w-full rounded-lg border border-slate-300 py-3 font-medium mb-8 hover:bg-slate-50">
                            Contact sales
                        </button>

                        <div className="space-y-12 text-sm">
                            <div>
                                <ul className="space-y-2 text-slate-700">
                                    <li>✔ Unlimited Management access</li>
                                    <li>✔ Unlimited projects</li>
                                    <li>✔ Higher usage limits</li>
                                    <li>✔ Priority support</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium mb-3">Collaboration</h3>
                                <ul className="space-y-2 text-slate-700">
                                    <li>✔ Up to 3 users</li>
                                    <li>✔ Shared workspaces</li>
                                    <li>✔ Role-based permissions</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium mb-3">Usage & performance</h3>
                                <ul className="space-y-2 text-slate-700">
                                    <li>✔ 100 GB storage</li>
                                    <li>✔ Extended API limits</li>
                                    <li>✔ Faster processing</li>
                                </ul>
                                <p className="mt-3 text-xs text-slate-500">
                                    Fair-use policy applies. Excessive usage may be rate-limited.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Enterprise */}
                    <div className='border border-slate-200 rounded-2xl p-8 flex flex-col'>
                        <div className="mb-3 inline-flex self-start rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                            Most popular
                        </div>
                        <h2 className="text-xl font-semibold mb-1">Enterprise</h2>
                        <p className="text-slate-600 mb-6">For organizations with advanced needs</p>

                        <div className="mb-6">
                            <span className="text-4xl font-semibold">
                                {pricingLabel["Enterprise"][cycle]}
                            </span>
                            <span className="text-slate-500">
                                {billingLabel["Enterprise"][cycle]}
                            </span>
                        </div>

                        <button className="w-full rounded-lg border border-slate-300 py-3 font-medium mb-8 hover:bg-slate-50">
                            Contact sales
                        </button>

                        <div className="space-y-12 text-sm">
                            <div>
                                <h3 className="font-medium mb-3">Platform</h3>
                                <ul className="space-y-2 text-slate-700">
                                    <li>✔ Full Financial reports</li>
                                    <li>✔ Cloud Access</li>
                                    <li>✔ Client Server Database</li>
                                    <li>✔ Unlimited Management access</li>
                                    <li>✔ Unlimited projects</li>
                                    <li>✔ Custom integrations</li>
                                    <li>✔ Suppliers connection</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium mb-3">Collaboration</h3>
                                <ul className="space-y-2 text-slate-700">
                                    <li>✔ Up to 5 users</li>
                                    <li>✔ Shared workspaces</li>
                                    <li>✔ Role-based permissions</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium mb-3">Security & compliance</h3>
                                <ul className="space-y-2 text-slate-700">
                                    <li>✔ SSO & SAML</li>
                                    <li>✔ Audit logs</li>
                                    <li>✔ SOC 2 / ISO alignment</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium mb-3">Support & SLA</h3>
                                <ul className="space-y-2 text-slate-700">
                                    <li>✔ Dedicated account manager</li>
                                    <li>✔ 24/7 priority support</li>
                                    <li>✔ Custom SLA</li>
                                </ul>
                                <p className="mt-3 text-xs text-slate-500">
                                    Contract terms and pricing vary based on usage and requirements.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

                {/* FINE PRINT */}
                <div className="mt-20 max-w-3xl text-xs text-slate-500 leading-relaxed">
                    <p>
                        Pricing shown is exclusive of applicable taxes. Features and limits are subject to change. Certain advanced
                        capabilities may be gated or rolled out gradually. See terms of service for full details.
                    </p>
                </div>
            </div>
        </div>
    );
    
};
export default PricingPage;