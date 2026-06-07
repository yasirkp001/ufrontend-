import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const SupportPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFaq, setActiveFaq] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeArticle, setActiveArticle] = useState(null);

    const categories = [
        {
            id: 'orders',
            title: 'Orders & Tracking',
            description: 'Track your shipment, manage orders, and get delivery updates.',
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                </svg>
            ),
            articles: [
                {
                    title: 'How to track your order',
                    content: `Once your order has been dispatched, you'll receive a confirmation email with your tracking number. You can use this on our Track Order page or directly on the carrier's website.\n\nTracking updates usually appear within 24–48 hours of dispatch. If you haven't received tracking information within 3 business days, please contact our support team with your Order ID and registered email.`
                },
                {
                    title: 'How long does delivery take?',
                    content: `Standard delivery within India takes 3–5 business days. International shipments typically arrive within 7–14 business days, depending on customs clearance in your destination country.\n\nExpress shipping is available at checkout for an additional fee, guaranteeing delivery within 1–2 business days for domestic orders.`
                },
                {
                    title: 'Can I change my delivery address?',
                    content: `You may change your delivery address within 1 hour of placing your order by contacting our support team. After this window, orders enter our warehouse processing queue and address changes can no longer be guaranteed.\n\nPlease double-check your shipping address at checkout to avoid delays.`
                },
                {
                    title: 'My order is delayed — what should I do?',
                    content: `Delays can occasionally occur due to high order volumes, holidays, or carrier disruptions. If your order hasn't arrived within the estimated delivery window, please:\n\n1. Check your tracking number for the latest update.\n2. Wait an additional 1–2 business days.\n3. If still unresolved, contact us at support@uclose.co with your Order ID.`
                },
                {
                    title: 'What if I receive the wrong item?',
                    content: `We sincerely apologise if this occurs. Please contact us within 48 hours of delivery with a photo of the item received and your order confirmation. We'll arrange for the correct item to be sent to you at no additional cost, along with a prepaid return label for the incorrect item.`
                }
            ]
        },
        {
            id: 'returns',
            title: 'Returns & Exchanges',
            description: 'Easy returns and hassle-free exchanges for all orders.',
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            ),
            articles: [
                {
                    title: 'How do I return an item?',
                    content: `We offer a 30-day return window from the date of delivery. To initiate a return:\n\n1. Log in to your account and go to My Orders.\n2. Select the order and click "Return Item".\n3. Print the prepaid return label we email you.\n4. Drop off the package at any designated courier point.\n\nRefunds are processed within 5–7 business days after we receive the item.`
                },
                {
                    title: 'What items can be returned?',
                    content: `Items are eligible for return if they are:\n• Unworn and in original condition\n• With all original tags attached\n• In the original packaging\n\nThe following items are NOT eligible for return: underwear, swimwear, and items marked as "Final Sale".`
                },
                {
                    title: 'How do I exchange for a different size?',
                    content: `To exchange an item for a different size, initiate a return as usual and select "Exchange" instead of "Refund". Specify the new size, and once we receive your returned item, we'll dispatch the new size immediately.\n\nExchanges typically take 3–7 business days from when we receive your return.`
                },
                {
                    title: 'When will I receive my refund?',
                    content: `Once we've processed your return (within 5–7 business days of receiving it), the refund will be credited to your original payment method. Please allow an additional 3–5 business days for your bank or card issuer to reflect the refund.\n\nYou'll receive an email confirmation once your refund has been issued.`
                },
                {
                    title: 'Can I return a sale item?',
                    content: `Items purchased during a promotion or sale can be returned for store credit only, unless marked as "Final Sale". Final Sale items cannot be returned or exchanged under any circumstances.\n\nRegular-priced items can always be returned for a full refund within 30 days.`
                }
            ]
        },
        {
            id: 'shipping',
            title: 'Shipping Info',
            description: 'Free shipping thresholds, international delivery & more.',
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.624v6.624" />
                </svg>
            ),
            articles: [
                {
                    title: 'Do you offer free shipping?',
                    content: `Yes! We offer free standard shipping on all orders above $200. This applies to both domestic and most international destinations.\n\nFor orders below $200, a flat shipping fee is calculated at checkout based on your location and selected delivery speed.`
                },
                {
                    title: 'Which countries do you ship to?',
                    content: `We ship to over 150 countries worldwide. International shipping rates and delivery times vary by destination. Countries we ship to include all of Europe, North America, Australia, and most of Asia.\n\nIf you're unsure whether we ship to your location, simply proceed to checkout — your country will appear in the shipping options if available.`
                },
                {
                    title: 'What shipping carriers do you use?',
                    content: `For domestic shipments (India), we partner with Delhivery, BlueDart, and India Post. International orders are handled via DHL, FedEx Express, and UPS depending on the destination.\n\nYou'll receive a tracking number and carrier details in your dispatch confirmation email.`
                },
                {
                    title: 'Are there customs duties on international orders?',
                    content: `International orders may be subject to import duties and taxes, which are determined by your local customs authority. These charges are the responsibility of the recipient and are NOT included in your order total.\n\nWe recommend checking with your local customs office before placing an order if you're unsure about applicable charges.`
                },
                {
                    title: 'What happens if my package is lost in transit?',
                    content: `In the rare event that your package is lost, please contact us at support@uclose.co with your Order ID and tracking number. We'll file a claim with the carrier on your behalf.\n\nIf the loss is confirmed, we'll either send a replacement at no charge or issue a full refund — whichever you prefer.`
                }
            ]
        },
        {
            id: 'payment',
            title: 'Payment & Billing',
            description: 'Accepted payment methods, invoices, and billing queries.',
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
            ),
            articles: [
                {
                    title: 'What payment methods do you accept?',
                    content: `We accept a wide range of payment methods to make your shopping experience as seamless as possible:\n\n• Credit & Debit Cards (Visa, Mastercard, Amex)\n• UPI (Google Pay, PhonePe, Paytm)\n• PayPal\n• Cash on Delivery (COD) for select locations\n• Net Banking\n• EMI options (via Razorpay)\n\nAll transactions are encrypted and processed securely.`
                },
                {
                    title: 'Is my payment information secure?',
                    content: `Absolutely. We use industry-standard 256-bit SSL encryption for all transactions. We do NOT store your card details on our servers — all payment processing is handled by our certified PCI-DSS compliant payment partners (Razorpay / Stripe).\n\nYou can shop with complete confidence.`
                },
                {
                    title: 'Can I get an invoice for my order?',
                    content: `Yes. A detailed invoice is automatically generated for every order and sent to your registered email address after purchase.\n\nIf you need a GST invoice for business purposes, please ensure your GST number is added during checkout. You can also request a reissued invoice by contacting support@uclose.co with your Order ID.`
                },
                {
                    title: 'Why was my payment declined?',
                    content: `Payments can be declined for several reasons:\n\n• Insufficient funds in your account\n• Incorrect card details entered\n• Your bank flagging the transaction as suspicious\n• An expired card or CVV mismatch\n\nWe suggest contacting your bank directly or trying with an alternative payment method. If the problem persists, reach out to our support team.`
                },
                {
                    title: 'Can I use multiple payment methods?',
                    content: `Currently, we support one primary payment method per transaction. However, you can use promo codes or gift cards in combination with any payment method to reduce the total amount charged.\n\nWe're working on adding split payment functionality in a future update.`
                }
            ]
        }
    ];

    const generalFaqs = [
        { question: "How long does shipping normally take?", answer: "Domestic orders typically arrive within 3-5 business days. International shipping can take 7-14 business days depending on customs processing." },
        { question: "What is your return policy?", answer: "We offer a 30-day return window for unworn items with tags attached. Refunds are processed within 5-7 business days of receiving your return." },
        { question: "Can I modify my order after placing it?", answer: "Orders can be modified within 1 hour of placement. After this window, our warehouse team has already started processing and changes cannot be guaranteed." },
        { question: "Do you ship internationally?", answer: "Yes, we ship to over 150 countries worldwide. International shipping costs are calculated at checkout based on destination and package weight." },
        { question: "How do I apply a promo code?", answer: "Enter your promo code at the cart page before proceeding to checkout. Discounts are applied instantly and reflected in your order total." },
    ];

    // GATHER ALL SEARCH RESULTS (from Categories & Articles)
    const allArticles = categories.flatMap(cat => cat.articles.map(art => ({ ...art, category: cat.title })));

    const matchingArticles = searchQuery.trim()
        ? allArticles.filter(art =>
            art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            art.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const matchingFaqs = searchQuery.trim()
        ? generalFaqs.filter(faq =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const selectedCategory = categories.find(c => c.id === activeCategory);

    return (
        <div className="min-h-screen bg-white font-sans text-black">
            <div className="pt-32 pb-24">
                {/* Header / Search */}
                <div className="max-w-4xl mx-auto px-6 mb-16 text-center">
                    <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6">How can we help?</h1>
                    <p className="text-gray-500 text-lg mb-10">Browse categories or search for instant answers.</p>
                    <div className="relative max-w-2xl mx-auto">
                        <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                if (e.target.value.trim()) setActiveCategory(null);
                            }}
                            placeholder="Search for articles, shipping, returns..."
                            className="w-full pl-14 pr-6 py-5 bg-[#f8f8f8] border border-transparent focus:border-black outline-none transition-colors text-base rounded-sm"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* ---- SEARCH RESULTS VIEW ---- */}
                {searchQuery.trim() ? (
                    <div className="max-w-4xl mx-auto px-6 animate-in fade-in duration-500">
                        <div className="mb-10 flex items-center justify-between border-b pb-6">
                            <h2 className="text-xl font-bold uppercase tracking-widest">Search Results for "{searchQuery}"</h2>
                            <p className="text-gray-400 text-sm">{matchingArticles.length + matchingFaqs.length} results found</p>
                        </div>

                        {matchingArticles.length > 0 || matchingFaqs.length > 0 ? (
                            <div className="space-y-4">
                                {/* Articles */}
                                {matchingArticles.map((art, idx) => (
                                    <div key={idx} className="bg-[#fafafa] p-8 rounded-sm hover:-translate-y-1 transition-all duration-300 border border-gray-100 group">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-[10px] bg-black text-white px-3 py-1 uppercase tracking-widest font-black rounded-full">Article</span>
                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{art.category}</span>
                                        </div>
                                        <h3 className="text-2xl font-medium tracking-tight mb-4 group-hover:text-black">{art.title}</h3>
                                        <p className="text-gray-500 line-clamp-2 leading-relaxed mb-6">{art.content}</p>
                                        <button
                                            onClick={() => {
                                                const catId = categories.find(c => c.title === art.category)?.id;
                                                setActiveCategory(catId);
                                                setActiveArticle(categories.find(c => c.id === catId).articles.findIndex(a => a.title === art.title));
                                                setSearchQuery('');
                                            }}
                                            className="text-[10px] uppercase tracking-widest font-black border-b border-black pb-1"
                                        >
                                            View Full Article
                                        </button>
                                    </div>
                                ))}

                                {/* FAQs in Search */}
                                {matchingFaqs.map((faq, idx) => (
                                    <div key={idx} className="border border-gray-100 p-8 bg-white rounded-sm">
                                        <span className="text-[10px] bg-gray-100 text-black px-3 py-1 uppercase tracking-widest font-black rounded-full mb-4 inline-block">Quick FAQ</span>
                                        <h3 className="text-xl font-medium tracking-tight mb-2 italic">"{faq.question}"</h3>
                                        <p className="text-gray-500 leading-relaxed">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-sm">
                                <svg className="w-16 h-16 mx-auto text-gray-200 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <h3 className="text-2xl font-medium mb-2">No matching help articles.</h3>
                                <p className="text-gray-400 mb-10">Try searching for keywords like "shipping", "return", or "refund".</p>
                                <button onClick={() => setSearchQuery('')} className="bg-black text-white px-10 py-4 text-[10px] uppercase tracking-widest font-black">Clear Search</button>
                            </div>
                        )}
                    </div>

                ) : activeCategory && selectedCategory ? (
                    /* ---- CATEGORY DETAIL VIEW ---- */
                    <div className="max-w-4xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Back button */}
                        <button
                            onClick={() => { setActiveCategory(null); setActiveArticle(null); }}
                            className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black transition-colors mb-12 group"
                        >
                            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            Back to all topics
                        </button>

                        {/* Category Header */}
                        <div className="flex items-start gap-6 mb-12 pb-12 border-b border-gray-100">
                            <div className="p-4 bg-black text-white rounded-sm flex-shrink-0">
                                {selectedCategory.icon}
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-3">{selectedCategory.title}</h2>
                                <p className="text-gray-500 text-lg">{selectedCategory.description}</p>
                                <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mt-3">{selectedCategory.articles.length} Articles</p>
                            </div>
                        </div>

                        {/* Article Accordion List */}
                        <div className="border-t border-gray-100">
                            {selectedCategory.articles.map((article, idx) => (
                                <div key={idx} className="border-b border-gray-100">
                                    <button
                                        onClick={() => setActiveArticle(activeArticle === idx ? null : idx)}
                                        className="w-full flex items-center justify-between py-7 text-left focus:outline-none group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 w-6 text-center">{String(idx + 1).padStart(2, '0')}</span>
                                            <span className={`text-lg font-medium transition-colors ${activeArticle === idx ? 'text-black' : 'text-gray-700 group-hover:text-black'}`}>
                                                {article.title}
                                            </span>
                                        </div>
                                        <span className={`ml-6 flex-shrink-0 transition-transform duration-300 ${activeArticle === idx ? 'rotate-180' : ''}`}>
                                            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeArticle === idx ? 'max-h-[600px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
                                        <div className="pl-10 pr-8 pb-2">
                                            {article.content.split('\n').map((line, i) => (
                                                line.trim() ? (
                                                    <p key={i} className={`text-gray-500 leading-relaxed ${line.startsWith('•') || line.match(/^\d\./) ? 'pl-4' : ''} mb-3`}>
                                                        {line}
                                                    </p>
                                                ) : <br key={i} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact Support within category */}
                        <div className="mt-12 bg-[#f8f8f8] p-8 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div>
                                <p className="font-medium text-lg mb-1">Didn't find what you need?</p>
                                <p className="text-gray-500 text-sm">Our team is always ready to help.</p>
                            </div>
                            <Link
                                to="/contact"
                                className="bg-black text-white px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors flex-shrink-0"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>

                ) : (
                    <>

                        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => { setActiveCategory(cat.id); setActiveArticle(null); }}
                                    className="group text-left border border-gray-100 bg-[#fafafa] p-8 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                                >
                                    <div className="text-black group-hover:text-white transition-colors duration-300 mb-4">
                                        {cat.icon}
                                    </div>
                                    <h3 className="text-xl font-medium tracking-tight mb-2 group-hover:text-white">{cat.title}</h3>
                                    <p className="text-sm text-gray-500 group-hover:text-gray-300 mb-4">{cat.description}</p>
                                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-300 group-hover:text-gray-400">
                                        {cat.articles.length} articles →
                                    </p>
                                </button>
                            ))}
                        </div>


                        <div className="max-w-3xl mx-auto px-6 mb-24">
                            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-10 text-center">Frequently Asked Questions</h2>
                            <div className="border-t border-gray-100">
                                {generalFaqs.map((faq, index) => (
                                    <div key={index} className="border-b border-gray-100">
                                        <button
                                            onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                            className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                                        >
                                            <span className={`text-lg font-medium transition-colors ${activeFaq === index ? 'text-black' : 'text-gray-700 group-hover:text-black'}`}>
                                                {faq.question}
                                            </span>
                                            <span className={`ml-6 flex-shrink-0 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>
                                                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-48 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                                            <p className="text-gray-500 leading-relaxed pr-8">{faq.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="max-w-4xl mx-auto px-6 text-center">
                            <div className="bg-black text-white p-12 md:p-16 rounded-sm">
                                <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Still need help?</h2>
                                <p className="text-gray-300 mb-8 max-w-lg mx-auto">Our customer support team is available 24/7. We usually respond within 2 hours during business operations.</p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Link to="/contact" className="bg-white text-black font-bold uppercase tracking-widest px-8 py-4 hover:bg-gray-200 transition-colors">
                                        Contact Us
                                    </Link>
                                    <Link to="/track" className="bg-transparent border border-white text-white font-bold uppercase tracking-widest px-8 py-4 hover:bg-white hover:text-black transition-colors text-center">
                                        Track Order
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SupportPage;
