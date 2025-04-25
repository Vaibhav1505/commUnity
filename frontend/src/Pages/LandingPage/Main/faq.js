import { Accordion, AccordionItem } from "@nextui-org/react";

export default function FAQSection() {
    return (
        <div className="px-36 mx-auto py-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-white">
                Frequently Asked Questions
            </h2>

            <Accordion
                className="bg-transparent p-5"
                variant="splitted"                
                itemClasses={{
                    base: "mb-4 p-3 rounded-xl bg-gray border-gray-800",
                    title: "text-2xl font-semibold text-white",
                    content: "text-lightGray text-base text-lg px-2 pb-4",
                    trigger: "hover:bg-gray-800 transition-colors"
                }}
            >
                <AccordionItem
                    key="1"
                    aria-label="security"
                    title="Is my data secure with Community?"
                >
                    Community uses enterprise-grade security including 256-bit encryption,
                    two-factor authentication, and regular third-party audits. All data
                    is stored in SOC 2-compliant data centers.
                </AccordionItem>

                <AccordionItem
                    key="2"
                    aria-label="pricing"
                    title="What's included in the free plan?"
                >
                    Our free tier includes:
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>Up to 10 team members</li>
                        <li>Unlimited 1:1 and group messaging</li>
                        <li>5GB file storage per team</li>
                        <li>Basic task management features</li>
                    </ul>
                </AccordionItem>

                <AccordionItem
                    key="3"
                    aria-label="compatibility"
                    title="Does Community integrate with other tools?"
                >
                    Yes! We integrate with 50+ tools including:
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>Google Workspace (Calendar, Drive, Docs)</li>
                        <li>Microsoft 365 (Teams, Outlook)</li>
                        <li>Project management tools (Jira, Trello, Asana)</li>
                        <li>CRM platforms (Salesforce, HubSpot)</li>
                    </ul>
                </AccordionItem>

                <AccordionItem
                    key="4"
                    aria-label="onboarding"
                    title="How long does setup take?"
                >
                    Most teams can start using Community in under 5 minutes.
                    For enterprise deployments, our success team offers:
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>Custom onboarding workshops</li>
                        <li>Data migration assistance</li>
                        <li>Admin training sessions</li>
                    </ul>
                </AccordionItem>

                <AccordionItem
                    key="5"
                    aria-label="support"
                    title="What support options are available?"
                >
                    We offer multiple support channels:
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>24/7 email and chat support</li>
                        <li>Priority phone support for enterprise plans</li>
                        <li>Comprehensive knowledge base and tutorials</li>
                        <li>Dedicated account managers for large teams</li>
                    </ul>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
