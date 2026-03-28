import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, ChevronLeft, Calendar, MapPin, Music, DollarSign, ShieldCheck, Briefcase, Plane, Volume2, Globe, Sparkles, Save, RotateCcw, Trash2, AlertCircle } from 'lucide-react';
import { Artist } from '../types';
import { useExperience } from './ExperienceProvider';

interface BookingFormProps {
    onClose: () => void;
    preSelectedArtist?: Artist | null;
}

const STEPS = [
    { title: "Promoter Details", icon: Briefcase },
    { title: "Event Overview", icon: Calendar },
    { title: "Logistics", icon: MapPin },
    { title: "Lineup", icon: Music },
    { title: "Technical", icon: Volume2 },
    { title: "Travel", icon: Plane },
    { title: "Marketing", icon: Globe },
    { title: "Financial", icon: DollarSign },
    { title: "Review", icon: ShieldCheck },
];

const CONCEPT_SUGGESTIONS = [
    "High-energy festival set focusing on new releases.",
    "Intimate acoustic session for VIP audience.",
    "Headline club appearance with full production.",
    "Brand partnership launch event with curated guest list."
];

const DRAFT_KEY = 'lvrn_booking_draft_v1';
const PROMOTER_PROFILE_KEY = 'lvrn_promoter_profile';

export const BookingForm: React.FC<BookingFormProps> = ({ onClose, preSelectedArtist }) => {
    const { showNotification } = useExperience();
    const [currentStep, setCurrentStep] = useState(0);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const initialFormState = {
        // Step 0: Promoter
        promoterName: '',
        companyName: '',
        role: '',
        email: '',
        phone: '',
        website: '',

        // Step 1: Event
        eventName: '',
        eventType: '',
        eventDescription: '',

        // Step 2: Logistics
        eventDate: '',
        startTime: '',
        endTime: '',
        venueName: '',
        venueAddress: '',
        venueCapacity: '',

        // Step 3: Lineup
        artistRole: 'Headliner',
        performanceDuration: '60 Minutes',
        otherActs: '',

        // Step 4: Technical
        soundProvider: '',
        riderConfirmed: false,

        // Step 5: Travel
        travelCovered: 'Promoter',
        accommodation: true,
        groundTransport: true,
        partySize: 5,

        // Step 6: Marketing
        marketingChannels: [],
        sponsors: '',

        // Step 7: Financial
        budget: '',
        currency: 'USD',
        offerType: 'Flat Fee',

        // Meta
        artistName: preSelectedArtist?.name || '',
        agreedToTerms: false
    };

    const [formData, setFormData] = useState(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Smart Feature: Load Saved Promoter Profile & Drafts
    useEffect(() => {
        // 1. Load Promoter Profile (Always pre-fill if available)
        const savedPromoter = localStorage.getItem(PROMOTER_PROFILE_KEY);
        if (savedPromoter) {
            try {
                const profile = JSON.parse(savedPromoter);
                setFormData(prev => ({
                    ...prev,
                    promoterName: profile.promoterName || '',
                    companyName: profile.companyName || '',
                    role: profile.role || '',
                    email: profile.email || '',
                    phone: profile.phone || '',
                    website: profile.website || ''
                }));
            } catch { /* Error loading profile ignored in production */ }
        }

        // 2. Check for Drafts
        const draft = localStorage.getItem(DRAFT_KEY);
        if (draft) {
            try {
                const parsedDraft = JSON.parse(draft);
                if (parsedDraft.artistName === preSelectedArtist?.name || !preSelectedArtist) {
                    setFormData(prev => ({ ...prev, ...parsedDraft }));
                    if (parsedDraft._step) setCurrentStep(parsedDraft._step);
                    showNotification("Draft restored from previous session.", "info");
                } else {
                    showNotification("Previous draft available for a different artist.", "info");
                }
            } catch { /* Error loading draft ignored in production */ }
        }
    }, [preSelectedArtist]);

    // Smart Feature: Autosave
    useEffect(() => {
        const timer = setTimeout(() => {
            const dataToSave = { ...formData, _step: currentStep };
            localStorage.setItem(DRAFT_KEY, JSON.stringify(dataToSave));
            setLastSaved(new Date());
        }, 1000);
        return () => clearTimeout(timer);
    }, [formData, currentStep]);

    useEffect(() => {
        if (preSelectedArtist?.bookingRegion) {
            const region = preSelectedArtist.bookingRegion.toLowerCase();
            let smartCurrency = 'USD';
            if (region.includes('uk') || region.includes('europe')) smartCurrency = 'GBP';
            if (region.includes('africa') || region.includes('sa')) smartCurrency = 'ZAR';

            if (formData.currency === 'USD' && smartCurrency !== 'USD') {
                setFormData(prev => ({ ...prev, currency: smartCurrency }));
                showNotification(`Currency auto-set to ${smartCurrency}.`, 'info');
            }
        }
    }, [preSelectedArtist]);

    useEffect(() => {
        if (formData.eventType === 'Festival') {
            setFormData(prev => ({
                ...prev,
                travelCovered: 'Promoter (All Inclusive)',
                accommodation: true,
                groundTransport: true,
                artistRole: 'Headliner'
            }));
        }
    }, [formData.eventType]);

    // Smart Feature: Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                if (currentStep === STEPS.length - 1) {
                    handleSubmit(e as unknown as React.FormEvent);
                } else {
                    nextStep();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentStep, formData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        // @ts-ignore
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error on change
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const applySuggestion = (text: string) => {
        setFormData(prev => ({ ...prev, eventDescription: text }));
        showNotification("Suggestion Applied", "success");
    };

    const clearDraft = useCallback(() => {
        localStorage.removeItem(DRAFT_KEY);
        setFormData(prev => ({ ...initialFormState, artistName: preSelectedArtist?.name || '' }));
        setCurrentStep(0);
        setErrors({});
        showNotification("Form reset.", "info");
    }, [preSelectedArtist]);

    const validateStep = (step: number) => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        const requireField = (name: string, label: string) => {
            // @ts-ignore
            if (!formData[name]) {
                newErrors[name] = `${label} is required`;
                isValid = false;
            }
        };

        switch (step) {
            case 0:
                requireField('promoterName', 'Full Name');
                requireField('email', 'Email');
                requireField('phone', 'Phone');
                break;
            case 1:
                requireField('eventName', 'Event Name');
                requireField('eventType', 'Event Type');
                break;
            case 2:
                requireField('eventDate', 'Event Date');
                requireField('venueName', 'Venue Name');
                break;
            case 4:
                if (!formData.riderConfirmed) {
                    newErrors.riderConfirmed = 'You must acknowledge the technical rider.';
                    isValid = false;
                }
                break;
            case 7:
                requireField('budget', 'Budget');
                break;
            default:
                break;
        }

        setErrors(newErrors);
        if (!isValid) {
            showNotification("Please correct the errors before proceeding.", "error");
        }
        return isValid;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            if (currentStep < STEPS.length - 1) {
                setCurrentStep(prev => prev + 1);
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreedToTerms) {
            showNotification("You must agree to the terms.", "error");
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() > 0.98) {
                        reject(new Error("Network Error"));
                    } else {
                        resolve(true);
                    }
                }, 1500);
            });

            // Save Promoter Profile for future
            const profile = {
                promoterName: formData.promoterName,
                companyName: formData.companyName,
                role: formData.role,
                email: formData.email,
                phone: formData.phone,
                website: formData.website
            };
            localStorage.setItem(PROMOTER_PROFILE_KEY, JSON.stringify(profile));

            // Clear Draft
            localStorage.removeItem(DRAFT_KEY);

            setSubmitted(true);
            showNotification("Request Sent Successfully", "success");
        } catch (error) {
            showNotification("Connection interrupted. Draft saved locally.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderField = (label: string, name: string, type: string = 'text', placeholder: string = '', required: boolean = true) => (
        <div className="space-y-2">
            <div className="flex justify-between">
                <label htmlFor={name} className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            </div>
            {type === 'textarea' ? (
                <div className="space-y-2">
                    <textarea
                        id={name}
                        name={name}
                        // @ts-ignore
                        value={formData[name]}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className={`theme-input w-full rounded-lg p-3 focus:border-[var(--accent)] focus:outline-none transition-colors h-32 resize-none ${errors[name] ? 'border-red-500' : ''}`}
                        aria-invalid={!!errors[name]}
                        aria-describedby={errors[name] ? `${name}-error` : undefined}
                    />
                    {name === 'eventDescription' && !formData.eventDescription && (
                        <div className="flex flex-wrap gap-2">
                            {CONCEPT_SUGGESTIONS.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => applySuggestion(s)}
                                    type="button"
                                    className="text-[10px] px-2 py-1 rounded-md bg-[var(--text-color)]/5 hover:bg-[var(--text-color)]/10 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors border border-[var(--text-color)]/10 flex items-center gap-1"
                                >
                                    <Sparkles size={10} /> {s}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <input
                    id={name}
                    type={type}
                    name={name}
                    // @ts-ignore
                    value={formData[name]}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className={`theme-input w-full rounded-lg p-3 focus:border-[var(--accent)] focus:outline-none transition-colors ${errors[name] ? 'border-red-500' : ''}`}
                    aria-invalid={!!errors[name]}
                    aria-describedby={errors[name] ? `${name}-error` : undefined}
                />
            )}
            {errors[name] && (
                <p id={`${name}-error`} className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors[name]}
                </p>
            )}
        </div>
    );

    const renderStepContent = () => {
        switch (currentStep) {
            case 0: return (
                <div className="grid md:grid-cols-2 gap-6">
                    {renderField("Full Name", "promoterName")}
                    {renderField("Company / Entity", "companyName", "text", "", false)}
                    {renderField("Role / Position", "role", "text", "", false)}
                    {renderField("Email Address", "email", "email")}
                    {renderField("Phone (WhatsApp)", "phone", "tel")}
                    {renderField("Website / Socials", "website", "text", "", false)}
                </div>
            );
            case 1: return (
                <div className="space-y-6">
                    {renderField("Event Name", "eventName")}
                    <div className="space-y-2">
                        <label htmlFor="eventType" className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Event Type <span className="text-red-500">*</span></label>
                        <select
                            id="eventType"
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleInputChange}
                            className={`theme-input w-full rounded-lg p-3 focus:border-[var(--accent)] focus:outline-none ${errors.eventType ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select Type...</option>
                            <option value="Club">Club Show</option>
                            <option value="Festival">Festival</option>
                            <option value="Concert">Concert / Theater</option>
                            <option value="Corporate">Corporate / Brand</option>
                            <option value="Private">Private Event</option>
                            <option value="University">University / Campus</option>
                        </select>
                        {errors.eventType && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.eventType}</p>}
                    </div>
                    {renderField("Concept & Vibe Description", "eventDescription", "textarea", "Tell us about the event atmosphere, demographics, and vision...", false)}
                </div>
            );
            case 2: return (
                <div className="grid md:grid-cols-2 gap-6">
                    {renderField("Event Date", "eventDate", "date")}
                    {renderField("Venue Capacity", "venueCapacity", "number", "", false)}
                    {renderField("Start Time", "startTime", "time", "", false)}
                    {renderField("End Time", "endTime", "time", "", false)}
                    <div className="md:col-span-2">{renderField("Venue Name", "venueName")}</div>
                    <div className="md:col-span-2">{renderField("Venue Address", "venueAddress", "text", "", false)}</div>
                </div>
            );
            case 3: return (
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Proposed Role</label>
                            <select name="artistRole" value={formData.artistRole} onChange={handleInputChange} className="theme-input w-full rounded-lg p-3 focus:border-[var(--accent)] focus:outline-none">
                                <option>Headliner</option>
                                <option>Co-Headliner</option>
                                <option>Support / Opener</option>
                                <option>Special Guest</option>
                                <option>Host</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Set Duration</label>
                            <select name="performanceDuration" value={formData.performanceDuration} onChange={handleInputChange} className="theme-input w-full rounded-lg p-3 focus:border-[var(--accent)] focus:outline-none">
                                <option>15 Minutes</option>
                                <option>30 Minutes</option>
                                <option>45 Minutes</option>
                                <option>60 Minutes</option>
                                <option>75+ Minutes</option>
                            </select>
                        </div>
                    </div>
                    {renderField("Other Confirmed / Proposed Acts", "otherActs", "textarea", "List other key artists on the lineup...", false)}
                </div>
            );
            case 4: return (
                <div className="space-y-6">
                    {renderField("Sound / Production Provider", "soundProvider", "text", "", false)}
                    <div className={`flex items-start gap-3 p-4 rounded-xl border transition-colors ${formData.riderConfirmed ? 'bg-green-500/10 border-green-500/30' : (errors.riderConfirmed ? 'bg-red-500/10 border-red-500/30' : 'bg-[var(--input-bg)] border-[var(--input-border)]')}`}>
                        <input type="checkbox" name="riderConfirmed" checked={formData.riderConfirmed} onChange={handleInputChange} className="mt-1 w-4 h-4 rounded border-gray-600 text-orange-600 focus:ring-orange-500" />
                        <div>
                            <label className="text-sm font-bold text-[var(--text-color)] block">Production Rider Acknowledgement <span className="text-red-500">*</span></label>
                            <p className="text-xs text-[var(--text-secondary)]">I understand that the Artist will provide a technical rider containing specific sound, lighting, and stage requirements that must be met.</p>
                            {errors.riderConfirmed && <p className="text-xs text-red-500 mt-1">{errors.riderConfirmed}</p>}
                        </div>
                    </div>
                </div>
            );
            case 5: return (
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Travel Costs Covered By</label>
                            <select name="travelCovered" value={formData.travelCovered} onChange={handleInputChange} className="theme-input w-full rounded-lg p-3 focus:border-[var(--accent)] focus:outline-none">
                                <option>Promoter (All Inclusive)</option>
                                <option>Artist (Buyout)</option>
                                <option>Split (Flights Promoter / Hotel Artist)</option>
                            </select>
                        </div>
                        {renderField("Estimated Party Size", "partySize", "number")}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 bg-[var(--input-bg)] p-3 rounded-lg border border-[var(--input-border)]">
                            <input type="checkbox" name="accommodation" checked={formData.accommodation} onChange={handleInputChange} className="w-4 h-4 rounded text-orange-600" />
                            <label className="text-sm text-[var(--text-color)]">5-Star Hotel Provided</label>
                        </div>
                        <div className="flex items-center gap-3 bg-[var(--input-bg)] p-3 rounded-lg border border-[var(--input-border)]">
                            <input type="checkbox" name="groundTransport" checked={formData.groundTransport} onChange={handleInputChange} className="w-4 h-4 rounded text-orange-600" />
                            <label className="text-sm text-[var(--text-color)]">Ground Transport (SUV/Sprinter)</label>
                        </div>
                    </div>
                </div>
            );
            case 6: return (
                <div className="space-y-6">
                    {renderField("Sponsors / Brand Partners", "sponsors", "textarea", "List all brands associated with the event...", false)}
                    <div className="p-4 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/30">
                        <h4 className="text-sm font-bold text-[var(--text-color)] mb-2">Billing & Artwork</h4>
                        <p className="text-xs text-[var(--text-secondary)]">Artist must be billed according to the agreed tier (e.g., Headliner) on all artwork. All artwork must be approved by LVRN management prior to release.</p>
                    </div>
                </div>
            );
            case 7: return (
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {renderField("Budget Offer", "budget", "number", "Enter amount")}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Currency</label>
                            <select name="currency" value={formData.currency} onChange={handleInputChange} className="theme-input w-full rounded-lg p-3 focus:border-[var(--accent)] focus:outline-none">
                                <option>USD ($)</option>
                                <option>EUR (€)</option>
                                <option>GBP (£)</option>
                                <option>ZAR (R)</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Offer Type</label>
                        <select name="offerType" value={formData.offerType} onChange={handleInputChange} className="theme-input w-full rounded-lg p-3 focus:border-[var(--accent)] focus:outline-none">
                            <option>Flat Guarantee</option>
                            <option>Guarantee + Backend %</option>
                            <option>Door Split</option>
                        </select>
                    </div>
                </div>
            );
            case 8: return (
                <div className="space-y-6">
                    <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--text-color)]/10 space-y-4">
                        <h3 className="text-xl font-bold text-[var(--text-color)] mb-4">Summary</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div><span className="block text-[var(--text-secondary)] text-xs uppercase">Promoter</span><span className="text-[var(--text-color)]">{formData.companyName} ({formData.promoterName})</span></div>
                            <div><span className="block text-[var(--text-secondary)] text-xs uppercase">Artist</span><span className="text-[var(--accent)] font-bold">{formData.artistName || "TBD"}</span></div>
                            <div><span className="block text-[var(--text-secondary)] text-xs uppercase">Event</span><span className="text-[var(--text-color)]">{formData.eventName} ({formData.eventDate})</span></div>
                            <div><span className="block text-[var(--text-secondary)] text-xs uppercase">Offer</span><span className="text-[var(--text-color)]">{formData.currency} {formData.budget} ({formData.offerType})</span></div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <input type="checkbox" name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleInputChange} className="mt-1 w-5 h-5 rounded border-gray-600 text-orange-600 focus:ring-orange-500" />
                        <div>
                            <label className="text-sm font-bold text-[var(--text-color)] block">I confirm the details above are accurate.</label>
                            <p className="text-xs text-[var(--text-secondary)] mt-1">Submitting this form does not guarantee a booking. This is a request for availability and pricing confirmation. A formal contract will follow upon approval.</p>
                        </div>
                    </div>
                </div>
            );
            default: return null;
        }
    };

    if (submitted) {
        return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[var(--bg-color)] border border-[var(--text-color)]/10 rounded-2xl p-12 max-w-md text-center"
                    role="alertdialog"
                    aria-modal="true"
                >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 border border-green-500/30">
                        <Check size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-[var(--text-color)] mb-4">Request Sent</h2>
                    <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                        Thank you, {formData.promoterName}. Our booking team has received your inquiry for <strong>{formData.artistName}</strong>. You will receive a confirmation email shortly.
                    </p>
                    <button
                        onClick={onClose}
                        className="w-full py-4 rounded-full bg-[var(--text-color)] text-[var(--bg-color)] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30"
                    >
                        Close
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="w-full max-w-4xl h-[90vh] bg-[var(--bg-color)] border border-[var(--text-color)]/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
                role="dialog"
                aria-labelledby="booking-modal-title"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[var(--text-color)]/10 bg-[var(--bg-color)]/50">
                    <div>
                        <h2 id="booking-modal-title" className="text-2xl font-black text-[var(--text-color)] flex items-center gap-2">
                            {preSelectedArtist ? `Book ${preSelectedArtist.name}` : 'Artist Booking Request'}
                        </h2>
                        <div className="flex items-center gap-3">
                            <p className="text-xs text-[var(--text-secondary)] uppercase tracking-widest mt-1">Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}</p>
                            {lastSaved && <span className="text-[10px] text-green-500 flex items-center gap-1"><Save size={10} /> Autosaved</span>}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={clearDraft} className="p-2 bg-[var(--text-color)]/5 hover:bg-red-500/20 hover:text-red-500 rounded-full transition-colors text-[var(--text-secondary)]" title="Reset Form" aria-label="Reset Form">
                            <RotateCcw size={16} />
                        </button>
                        <button onClick={onClose} className="p-2 bg-[var(--text-color)]/5 hover:bg-[var(--text-color)]/10 rounded-full transition-colors text-[var(--text-color)]" aria-label="Close Modal">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[var(--text-color)]/5 h-1">
                    <motion.div
                        className="h-full bg-gradient-to-r from-[var(--accent)] to-blue-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-8 flex items-center gap-3 text-[var(--accent)]">
                                {React.createElement(STEPS[currentStep].icon, { size: 24 })}
                                <h3 className="text-xl font-bold">{STEPS[currentStep].title}</h3>
                            </div>
                            {renderStepContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[var(--text-color)]/10 bg-[var(--bg-color)]/50 flex justify-between items-center">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--text-color)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={16} /> Back
                    </button>

                    {currentStep === STEPS.length - 1 ? (
                        <button
                            onClick={handleSubmit}
                            disabled={!formData.agreedToTerms || isSubmitting}
                            className="flex items-center gap-2 px-8 py-3 rounded-full bg-[var(--text-color)] text-[var(--bg-color)] text-sm font-black uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Request'} <Check size={16} />
                        </button>
                    ) : (
                        <button
                            onClick={nextStep}
                            className="flex items-center gap-2 px-8 py-3 rounded-full bg-[var(--text-color)] text-[var(--bg-color)] text-sm font-black uppercase tracking-widest hover:opacity-90 transition-opacity"
                        >
                            Next Step <ArrowRight size={16} />
                        </button>
                    )}
                </div>

            </motion.div>
        </div>
    );
};