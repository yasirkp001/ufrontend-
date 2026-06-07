import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';
import { api } from '../services/api';

const ContactPage = () => {
    useScrollReveal();

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await api.submitSupportTicket(formData.name, formData.email, formData.message);
            setIsSuccess(true);
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            alert(err.message || 'Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white min-h-screen text-black font-sans">
            <div className="pt-32 pb-20 px-6 md:px-14 lg:px-20 max-w-[1400px] mx-auto min-h-[80vh] flex flex-col justify-center animate-in fade-in duration-700">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <div className="reveal">
                        <h1 className="text-7xl md:text-9xl font-medium tracking-tighter leading-none mb-10">Hello.</h1>
                        <div className="flex flex-col gap-10 text-lg">
                            <div>
                                <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Inquiries</h4>
                                <p className="font-medium hover:opacity-50 transition-opacity cursor-pointer underline">hello@uclose.co</p>
                            </div>
                            <div>
                                <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Press</h4>
                                <p className="font-medium hover:opacity-50 transition-opacity cursor-pointer underline">press@uclose.co</p>
                            </div>
                            <div>
                                <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2">HQ / Office</h4>
                                <p className="font-medium">Uclose Tower,<br />Bengaluru, Karnataka, INDIA</p>
                            </div>
                        </div>
                    </div>

                    <div className="reveal bg-gray-50 p-10 md:p-14 rounded-sm border border-gray-100">
                        {isSuccess ? (
                            <div className="flex flex-col items-center justify-center text-center py-20 animate-in zoom-in-95 duration-500">
                                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-6 shadow-xl">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-medium tracking-tight mb-4">Message Sent</h2>
                                <p className="text-gray-500 text-lg max-w-sm mb-8">Thank you for getting in touch. Our team will get back to you within 24 hours.</p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="text-xs uppercase tracking-widest font-bold border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form className="flex flex-col gap-8 transition-all" onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="bg-transparent border-b border-gray-300 py-2 focus:border-black outline-none transition-colors text-xl font-light"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-transparent border-b border-gray-300 py-2 focus:border-black outline-none transition-colors text-xl font-light"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="bg-transparent border-b border-gray-300 py-2 focus:border-black outline-none transition-colors text-xl font-light resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-black text-white px-8 py-5 text-xs uppercase tracking-widest font-bold hover:bg-gray-900 transition-colors w-full mt-4 flex items-center justify-center gap-2 disabled:opacity-75"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            SENDING...
                                        </>
                                    ) : (
                                        'SEND MESSAGE'
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            {/* Footer added inside the component as requested by the page structure */}
            <Footer />
        </div>
    );
};

export default ContactPage;
