import React from "react";

function StepIndicator({currentStep}: { currentStep: number }){

    return (
        <div className="mb-6 w-full">
            {/* Main Container: Stacks vertically by default, goes horizontal at md (768px) */}
            <div className="flex flex-col md:flex-row w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
                
                {/* Left Info Section: Full width on mobile, 25% on desktop */}
                <div className="flex flex-row md:flex-col w-full md:w-[25%] lg:w-[20%] items-center md:items-start justify-between md:justify-center bg-linear-to-br from-indigo-600 via-indigo-700 to-violet-800 p-5 text-white gap-y-3 border-b md:border-b-0 md:border-r border-white/10">
                    {/* Title & Description Context */}
                    <div className="flex flex-col gap-0.5">
                        <h1 className="text-base md:text-lg font-bold tracking-tight text-white leading-tight">
                        Add Project
                        </h1>
                        <p className="hidden md:block text-xs text-indigo-200/80 font-medium">
                        Step {currentStep} of 6
                        </p>
                    </div>

                    {/* Modern Progress Pill badge */}
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/10 shadow-xs">
                        {/* Pulse Animation dot showing ongoing progress */}
                        <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        <span>{Math.round((currentStep / 6) * 100)}% Complete</span>
                    </div>
                </div>

                {/* Right Stepper Content: Full width on mobile, fills remaining space on desktop */}
                <div className="flex flex-1 items-center justify-center bg-slate-50 p-6">
                    {/* Increased max-w to max-w-3xl on larger screens so text has room to breathe */}
                    <div className="flex items-start justify-between w-full max-w-sm md:max-w-3xl">
                        
                        {/* 1️⃣ Step Titles Configuration Array */}
                        {(() => {
                        const stepTitles = [
                            "Project Info",
                            "Team Setup",
                            "Timeline",
                            "Budget Details",
                            "Documents",
                            "Review & Submit"
                        ];

                        return [1, 2, 3, 4, 5, 6].map((stepNumber, index) => {
                            const isCompleted = currentStep > stepNumber;
                            const isActive = currentStep === stepNumber;

                            return (
                            <React.Fragment key={stepNumber}>
                                {/* 2️⃣ Grouped Node Container (Badge + Text stacked vertically) */}
                                <div className="flex flex-col items-center flex-1 relative min-w-17.5">
                                
                                {/* Step Badge */}
                                <div
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 z-10 ${
                                    isActive
                                        ? "bg-indigo-600 text-white shadow-sm ring-4 ring-indigo-100"
                                        : isCompleted
                                        ? "bg-indigo-600 text-white"
                                        : "bg-white border-2 border-slate-200 text-slate-500"
                                    }`}
                                >
                                    {isCompleted ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    ) : (
                                    stepNumber
                                    )}
                                </div>

                                {/* 3️⃣ Step Title Typography */}
                                <span 
                                    className={`mt-2 text-[11px] md:text-xs font-medium text-center tracking-tight transition-colors duration-300 ${
                                    isActive 
                                        ? "text-indigo-600 font-bold" 
                                        : isCompleted 
                                        ? "text-slate-800" 
                                        : "text-slate-400"
                                    }`}
                                >
                                    {stepTitles[index]}
                                </span>

                                {/* 4️⃣ Precision Positioned Connecting Line */}
                                {index < 5 && (
                                    <div
                                    className={`hidden sm:block h-0.5 absolute transition-all duration-500 top-4 ${
                                        isCompleted ? "bg-indigo-600" : "bg-slate-200"
                                    }`}
                                    style={{
                                        // Extends the line perfectly from the center of this badge to the center of the next
                                        left: "calc(50% + 1rem)", 
                                        width: "calc(100% - 2rem)"
                                    }}
                                    />
                                )}
                                </div>
                            </React.Fragment>
                            );
                        });
                        })()}
                        
                    </div>
                </div>
            </div>
        </div>
    )

}


export default StepIndicator;